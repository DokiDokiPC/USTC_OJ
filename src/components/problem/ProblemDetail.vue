<script setup lang="ts">
import router from "@/router";
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAlertStore, useUsernameStore } from "../../store";

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

// *********************提交********************* //
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

const submissions_url = import.meta.env.VITE_BACKEND_URL + "submissions/";
const alert_store = useAlertStore();
const username_store = useUsernameStore();
async function submit() {
  const temp = compilers_map.get(compiler_name.value);
  if (temp != null) submit_form.compiler = temp;

  // 向后端提交
  const resp = await fetch(submissions_url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(submit_form),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 提交成功, 跳转到submission列表, 并且用username作为query
  if (resp.status === 200) {
    alert_store.alert("success", "Submit success");
    setTimeout(() => {
      router.push({
        name: "submission",
        query: { username: username_store.username },
      });
    }, 1500);
  } else {
    // 提交失败, alert错误提示
    const errs: string[] = await resp.json();
    alert_store.alert("error", errs.join("\n"), -1);
  }
}
// *********************提交********************* //
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

        <!-- submit部分 -->
        <div v-if="username_store.username != null">
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
        </div>
        <div v-else>Sign in to submit your solution!</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
