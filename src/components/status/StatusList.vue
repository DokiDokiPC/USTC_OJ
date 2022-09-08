<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUrlStore } from "../../stores/url";

const items = ref([]);
/*const headers = reactive([
  {
    text: "Submission",
    value: "submitTime",
    align: "start",
  },
  { text: "Problem", value: "problemId" },
  { text: "By", value: "coder" },
  { text: "Status", value: "status" },
  { text: "Time", value: "timeCost" },
  { text: "Memory", value: "memoryCost" },
]);*/

const status_url = useUrlStore().status_url;
onMounted(async () => {
  status_url.searchParams.set("offset", "0");
  const resp = await fetch(status_url);
  const data = await resp.json();
  items.value = data.status;
  console.log(data);
});

/*function get_color(status: string): string {
  switch (status) {
    case "Accepted":
      return "green";
    case "Failed":
      return "error";
    case "Compile Error":
      return "warning";
  }
  return "grey";
}*/
</script>

<template>
  <v-container fluid style="padding-left: 6vw; padding-right: 6vw">
    <v-card>
      <v-card-title class="text-h4 text--primary"> Status </v-card-title>
      <v-card-text>
        <!-- <v-data-table :headers="headers" :items="items">
          <template v-slot:item.status="{ item }">
            <v-chip :color="get_color(item.status)" outlined>
              {{ item.status }}
            </v-chip>
          </template>
        </v-data-table> -->
      </v-card-text>
    </v-card>
  </v-container>
</template>
