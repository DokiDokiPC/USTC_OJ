<script setup lang="ts">
import { onMounted } from "vue";
import { useMainTabStore } from "../../store";

const main_tab_store = useMainTabStore();

onMounted(() => {
  main_tab_store.main_tab = -1;
});
</script>

<template>
  <v-container>
    <p>User Info</p>
  </v-container>
</template>
