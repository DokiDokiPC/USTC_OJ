<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
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
  if (problem.value) submit_form.problem_id = problem.value.id;
}

onMounted(async () => {
  const route = useRoute();
  await get_problem_detail(parseInt(route.params.id as string));
});

const compiler_name = ref("GCC");
const compilers_map = new Map([
  ["GCC", "GCC"],
  ["G++", "GPP"],
]);
const submit_form = reactive({
  problem_id: 0,
  compiler: "",
  source_code: "",
});

function submit() {
  const temp = compilers_map.get(compiler_name.value);
  if (temp) submit_form.compiler = temp;
  console.log(submit_form);
}
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
        <br />
        <v-select
          label="Compiler"
          v-model="compiler_name"
          :items="[...compilers_map.keys()]"
          density="comfortable"
        />
        <v-textarea
          v-model="submit_form.source_code"
          label="Paste your code here"
          auto-grow
          variant="outlined"
          rows="3"
          row-height="25"
          shaped
        ></v-textarea>
        <v-btn @click="submit" variant="outlined" style="color: SeaGreen">
          Submit
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
