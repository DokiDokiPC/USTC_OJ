<script setup lang="ts">
import { ref, onMounted } from "vue";
// import VueMarkdown from "vue-markdown";
import { useRoute } from "vue-router";
import { useUrlStore } from "../../stores/url";

const problem_id = ref(0);

const problems_url = useUrlStore().problems_url;
async function get_problem_detail(id: number) {
  const problem_id_url = new URL(id.toString(), problems_url);
  const resp = await fetch(problem_id_url);
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
      <v-card-title>{{ problem_id }}</v-card-title>
      <v-card-text>
        <!-- <vue-markdown /> -->
      </v-card-text>
    </v-card>
  </v-container>
</template>
