<script setup lang="ts">
import router from "@/router";
import { ref, onMounted } from "vue";
import UserDialog from "../common/UserDialog.vue";
import icon from "../../assets/USTCOJ.svg";

const login_dialog = ref(false);
const is_logged = ref(false);

function logout() {
  // delete api/tokens/xxx
  is_logged.value = false;
  router.push({
    name: "home",
  });
}

onMounted(function () {
  return;
});
</script>

<template>
  <v-app-bar app rounded elevation="2">
    <v-col cols="4" class="d-flex align-center">
      <v-tabs>
        <v-tab color="orange" to="/">Home</v-tab>
        <v-tab color="orange" to="problem">Problem</v-tab>
        <v-tab color="orange" to="status">Status</v-tab>
        <v-tab color="orange" to="contest">Contest</v-tab>
        <v-tab color="orange" to="user">User</v-tab>
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

    <UserDialog :show_dialog="login_dialog" />

    <!-- 待解决: dialog不显示 -->
    <div class="text-center">
      <v-dialog :value="true" width="500px">
        <p>123123123</p>
      </v-dialog>
    </div>
  </v-app-bar>
</template>
