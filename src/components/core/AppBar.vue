<script setup lang="ts">
import { ref, onMounted } from "vue";
import UserDialog from "../common/UserDialog.vue";
import icon from "../../assets/USTCOJ.svg";
import { useUrlStore } from "../../stores/url";

const login_dialog = ref(false);
const is_logged = ref(false);

// 退出
const tokens_url = useUrlStore().tokens_url;
function logout() {
  // 由于cookie是HttpOnly的, 所以只能访问后端删除
  fetch(tokens_url, { method: "DELETE", credentials: "include" });
  is_logged.value = false;
}

onMounted(async function () {
  const resp = await fetch(tokens_url, {
    method: "HEAD",
    credentials: "include",
  });
  if (resp.status === 200) is_logged.value = true;
});
</script>

<template>
  <v-app-bar app rounded elevation="2">
    <v-col cols="4" class="d-flex align-center">
      <v-tabs>
        <v-tab color="orange" :to="{ name: 'home' }">Home</v-tab>
        <v-tab color="orange" :to="{ name: 'problem' }">Problem</v-tab>
        <v-tab color="orange" :to="{ name: 'status' }">Status</v-tab>
        <v-tab color="orange" :to="{ name: 'contest' }">Contest</v-tab>
        <v-tab color="orange" :to="{ name: 'user' }">User</v-tab>
      </v-tabs>
    </v-col>

    <v-img
      :src="icon"
      @click="$router.push({ name: 'home' })"
      style="cursor: pointer"
    />

    <v-col cols="4" class="d-flex justify-end align-center">
      <v-btn text color="orange" v-if="is_logged" @click="logout">
        Log out
      </v-btn>
      <v-btn text color="orange" v-else @click="login_dialog = true">
        Sign in
      </v-btn>
    </v-col>

    <UserDialog
      :show_dialog="login_dialog"
      @close_dialog="login_dialog = false"
      @login_success="is_logged = true"
    />
  </v-app-bar>
</template>
