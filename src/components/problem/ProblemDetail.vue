<script setup lang="ts">
import { ref, onMounted } from "vue";
// import VueMarkdown from "vue-markdown";
import { useRoute } from "vue-router";

type ProblemDetail = {
  id: number;
  name: string;
  level: string;
  ac_num: number;
  submit_num: number;
  description: string;
  time_limit: number;
  memory_limit: number;
};

const problem = ref<ProblemDetail | undefined>(undefined);

const problems_url = import.meta.env.VITE_BACKEND_URL + "problems/";
async function get_problem_detail(id: number) {
  const problem_id_url = problems_url + id.toString();
  const resp = await fetch(problem_id_url);
  [problem.value] = await resp.json();
}

onMounted(async () => {
  const route = useRoute();
  await get_problem_detail(parseInt(route.params.id as string));
});
</script>

<template>
  <v-container>
    <v-card v-if="problem">
      <v-card-title>{{ problem ? problem.name : "" }}</v-card-title>
      <v-card-text>
        <div>{{ problem.level }}</div>
        <div>Time Limit: {{ problem.time_limit }}ms</div>
        <div>Memory Limit: {{ problem.memory_limit }}KB</div>
        <div>{{ problem.description }}</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
