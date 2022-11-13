import { defineStore } from "pinia";
import router from "./router";
import { ref } from "vue";

export const useMainTabStore = defineStore("main_tab", () => {
  const main_tab = ref(0);
  function go_home() {
    router.push({ name: "home" });
    main_tab.value = 0;
  }
  return {
    main_tab,
    go_home,
  };
});
