<script setup lang="ts">
import { ref, onMounted } from "vue";
// import VueMarkdown from "vue-markdown";
import { useRoute } from "vue-router";
import { useUrlStore } from "@/stores/url";

const problem_id = ref(0);

async function get_problem_detail(id: number) {
  let problems_url = useUrlStore().problems_url;
  problems_url = new URL(id.toString(), problems_url);
  const resp = await fetch(problems_url);
  const data = await resp.json();
  return data;
}

onMounted(async () => {
  const route = useRoute();
  const [data] = await get_problem_detail(parseInt(route.params.id as string));
  if (data) {
    console.log(data, data.id);
    problem_id.value = parseInt(data.id);
  } else problem_id.value = 0;
});
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title :hidden="problem_id == 0">{{ problem_id }}</v-card-title>
      <v-card-text>
        <!-- <vue-markdown /> -->
      </v-card-text>
    </v-card>
  </v-container>
</template>
