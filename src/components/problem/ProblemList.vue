<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useUrlStore } from "@/stores/url";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridVue } from "ag-grid-vue3";
import router from "@/router";

const total_count = ref(0);
const page_size = ref(0);
type problem_type = {
  id: number;
  title: string;
  level: string;
  ac_num: number;
  submin_num: number;
};
const row_data = ref<[problem_type]>();
const column_defs = reactive([
  {
    headerName: "#",
    field: "id",
    suppressMovable: true, // 禁止列拖动
  },
  {
    headerName: "Title",
    field: "title",
    suppressMovable: true,
  },
  {
    headerName: "Level",
    field: "level",
    suppressMovable: true,
  },
  {
    headerName: "Accepted number",
    field: "ac_num",
    suppressMovable: true,
  },
  {
    headerName: "Submission number",
    field: "submit_num",
    suppressMovable: true,
  },
]);

function row_clicked(event: any) {
  const problem: problem_type = event.data;
  router.push({ name: "problem-detail", params: { id: problem.id } });
}

async function get_problems(offset: number) {
  const problems_url = useUrlStore().problems_url;
  problems_url.searchParams.set("offset", offset.toString());
  const resp = await fetch(problems_url);
  const data = await resp.json();
  return data;
}

onMounted(async () => {
  const data = await get_problems(0);
  page_size.value = data.page_size;
  total_count.value = data.total_count;
  row_data.value = data.problems;
});
</script>

<template>
  <v-container>
    <v-card>
      <v-card-text>
        <ag-grid-vue
          style="height: 75vh"
          align="center"
          class="ag-theme-material"
          :suppressCellFocus="true"
          :columnDefs="column_defs"
          :rowData="row_data"
          :paginationPageSize="page_size"
          @rowClicked="row_clicked"
        />
      </v-card-text>

      <!-- v-data-table将在3.1版本发布, 可能更名为v-table -->
      <!-- <v-table
          :headers="headers"
          :items="items"
          :server-items-length="total_count"
        /> -->
    </v-card>
  </v-container>
</template>

<style>
.ag-header-cell-label {
  justify-content: center;
}
</style>
