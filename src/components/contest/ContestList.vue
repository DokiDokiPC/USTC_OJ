<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useUrlStore } from "@/stores/url";

onMounted(async () => {
  const contests_url = useUrlStore().contests_url;
  contests_url.searchParams.set("offset", "0");
  const resp = await fetch(contests_url);
  const data = await resp.json();
  console.log(data);
});

const items = ref([]);
const page_size = ref(0);
const headers = reactive([
  {
    text: "#",
    align: "start",
    sortable: false,
    value: "id",
  },
  {
    text: "Name",
    align: "start",
    sortable: false,
    value: "name",
  },
  {
    text: "Start time",
    align: "start",
    sortable: false,
    value: "start_time",
  },
  {
    text: "Duration",
    align: "start",
    sortable: false,
    value: "duration",
  },
  {
    text: "Problem Number",
    align: "start",
    sortable: false,
    value: "problem_number",
  },
]);
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span>Problem List</span>
      </v-card-title>
      <v-card-text>
        <!-- <v-data-table :headers="headers" :items="items"> </v-data-table> -->
      </v-card-text>
    </v-card>
  </v-container>
</template>
