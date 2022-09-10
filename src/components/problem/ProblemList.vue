<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useUrlStore } from "../../stores/url";
import router from "../../router";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridVue } from "ag-grid-vue3";
import type {
  GridReadyEvent,
  GridApi,
  RowClickedEvent,
} from "ag-grid-community";

const total_count = ref(0);
const page_size = ref(0);
const total_page = computed((): number => {
  if (page_size.value === 0) return 0;
  else return Math.ceil(total_count.value / page_size.value);
});
const page = ref(1);

// problem类型定义
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

// 获取grid的api
let grid_api: GridApi | null = null;
function grid_ready(event: GridReadyEvent) {
  grid_api = event.api;
}

// 获取数据到table
const problems_url = useUrlStore().problems_url;
async function get_problems(offset: number) {
  if (grid_api) grid_api.showLoadingOverlay();
  problems_url.searchParams.set("offset", offset.toString());
  const resp = await fetch(problems_url, { credentials: "include" });
  if (resp.status === 200) {
    const data = await resp.json();
    page_size.value = data.page_size;
    total_count.value = data.total_count;
    row_data.value = data.problems;
  }
  if (grid_api) grid_api.hideOverlay();
}

// 改变页数, 重新从服务器获取数据
watch(page, async (new_page: number) => {
  await get_problems((new_page - 1) * page_size.value);
});

// table行被点击进入problem详情页面
function row_clicked(event: RowClickedEvent<problem_type>) {
  const problem = event.data;
  if (problem)
    router.push({ name: "problem-detail", params: { id: problem.id } });
}

// 初始获取offset0的数据
onMounted(async () => {
  get_problems(0);
});
</script>

<template>
  <v-container>
    <v-card>
      <v-card-text>
        <!-- problem列表 -->
        <ag-grid-vue
          style="height: 74vh; margin-bottom: 0; padding-bottom: 0"
          align="center"
          class="ag-theme-material"
          :suppressCellFocus="true"
          :columnDefs="column_defs"
          :rowData="row_data"
          :paginationPageSize="page_size"
          @grid-ready="grid_ready"
          @rowClicked="row_clicked"
        />
        <!-- 分页 -->
        <v-container style="padding: 0">
          <v-pagination v-model="page" :length="total_page" />
        </v-container>
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
