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

export const useAlertStore = defineStore("alert", () => {
  const alert_value = ref(false);
  type AlertTypeEnum = "success" | "error" | "warning" | "info";
  const alert_type = ref<AlertTypeEnum>("success");
  const alert_text = ref("");
  function alert(type: AlertTypeEnum, text: string, timeout: number = 1500) {
    alert_type.value = type;
    alert_text.value = text;
    alert_value.value = true;
    if (timeout >= 0) setTimeout(() => (alert_value.value = false), timeout); // -1代表不自动消失
  }
  return {
    alert_value,
    alert_type,
    alert_text,
    alert,
  };
});

export const useUsernameStore = defineStore("username", () => {
  const username = ref<string | null>(null); // username为null代表没登录, 否则代表已登录
  return { username };
});
