<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import icon from "../../assets/USTCOJ.svg";
import { useMainTabStore, useAlertStore, useUsernameStore } from "../../store";

const main_tab_store = useMainTabStore();

// 退出
const tokens_url = import.meta.env.VITE_BACKEND_URL + "tokens/";
function logout() {
  // 由于cookie是HttpOnly的, 所以只能访问后端删除
  fetch(tokens_url, { method: "DELETE", credentials: "include" });
  username_store.username = null;
}

// 检测是否登录
const username_store = useUsernameStore();
onMounted(async function () {
  username_store.username = ""; // 先设置为非null, 如果没登录再显示sign in
  const resp = await fetch(tokens_url, {
    method: "HEAD",
    credentials: "include",
  });
  if (resp.status === 200)
    username_store.username = resp.headers.get("username");
  else username_store.username = null;
});

// Alert提示
const alert_store = useAlertStore();

// 登录/注册对话框
const tab = ref(0);
const loading = ref(false);

// 登录
const login_dialog = ref(false);
const login_form = reactive({
  username: "",
  password: "",
});
async function login() {
  loading.value = true;
  const resp = await fetch(tokens_url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(login_form),
    headers: {
      "Content-Type": "application/json",
    },
  });
  loading.value = false;

  if (resp.status === 200) {
    // 登录成功
    login_dialog.value = false;
    username_store.username = login_form.username;
    alert_store.alert("success", "Login success");
  } else {
    // 登录失败
    const errs: string[] = await resp.json();
    if (errs) alert_store.alert("error", errs.join("\n"), -1);
    else alert_store.alert("error", "Login failed");
  }
}

// 注册
const register_form = reactive({
  email: "",
  username: "",
  password: "",
});

// 点击复选框可以检查密码输入是否正确
const check_password = ref(false);
const users_url = import.meta.env.VITE_BACKEND_URL + "users/";
async function register() {
  loading.value = true;
  const resp = await fetch(users_url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(register_form),
    headers: {
      "Content-Type": "application/json",
    },
  });
  loading.value = false;
  if (resp.status === 201) {
    // 注册成功
    login_dialog.value = false;
    alert_store.alert("success", "Registration success");
    username_store.username = register_form.username;
  } else {
    // 注册失败
    const errs: string[] = await resp.json();
    if (errs) alert_store.alert("error", errs.join("\n"), -1);
    else alert_store.alert("error", "Registration failed");
  }
}
</script>

<template>
  <!-- 提示条 -->
  <v-alert
    :type="alert_store.alert_type"
    v-model="alert_store.alert_value"
    @click="alert_store.alert_value = false"
  >
    {{ alert_store.alert_text }}
  </v-alert>

  <v-app-bar app rounded elevation="2">
    <!-- 导航栏 -->
    <v-col cols="4" class="d-flex align-center">
      <v-tabs v-model="main_tab_store.main_tab">
        <v-tab color="orange" :to="{ name: 'home' }">Home</v-tab>
        <v-tab color="orange" :to="{ name: 'problem' }">Problem</v-tab>
        <v-tab color="orange" :to="{ name: 'submission' }">Submission</v-tab>
        <v-tab color="orange" :to="{ name: 'contest' }">Contest</v-tab>
        <v-tab color="orange" :to="{ name: 'leaderboard' }">Leaderboard</v-tab>
      </v-tabs>
    </v-col>

    <!-- 网站图标 -->
    <v-img
      :src="icon"
      style="cursor: pointer"
      @click="main_tab_store.go_home"
    />

    <!-- 名称, 下拉菜单 -->
    <v-col cols="4" class="d-flex justify-end align-center">
      <v-btn
        text
        color="orange"
        v-if="username_store.username == null"
        @click="login_dialog = true"
      >
        Sign in
      </v-btn>
      <v-menu rounded offset-y v-else>
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            color="orange"
            style="text-transform: none"
            class="text-body-1"
          >
            {{ username_store.username }}
          </v-btn>
        </template>
        <v-list>
          <!-- 这个div是必要的, 否则下拉菜单打开时会闪烁一下 -->
          <div>
            <v-list-item
              @click="logout"
              variant="plain"
              style="cursor: pointer"
            >
              SIGN OUT
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </v-col>

    <!-- 登录/注册对话框 -->
    <v-dialog
      :model-value="login_dialog"
      @update:model-value="login_dialog = false"
    >
      <!-- 加上@update:model-value, 关闭了该dialog之后才能再次打开 -->
      <v-card width="30vw" class="mx-auto">
        <v-card-text>
          <v-tabs v-model="tab" style="margin-bottom: 5vh">
            <v-tab>Sign In</v-tab>
            <v-tab>Sign Up</v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <!-- 登录 -->
            <v-window-item>
              <v-form>
                <v-text-field
                  v-model="login_form.username"
                  label="Username"
                  @keydown.enter="login"
                />
                <v-text-field
                  v-model="login_form.password"
                  type="password"
                  label="Password"
                  @keydown.enter="login"
                />
                <!-- 登录按钮 -->
                <div class="d-flex">
                  <v-spacer />
                  <v-btn
                    :loading="loading"
                    color="primary"
                    @click="login"
                    style="margin: 2vh"
                    >Sign in
                  </v-btn>
                </div>
              </v-form>
            </v-window-item>

            <!-- 注册 -->
            <v-window-item>
              <v-form>
                <v-text-field
                  v-model="register_form.email"
                  label="Email"
                  @keydown.enter="register"
                />
                <v-text-field
                  v-model="register_form.username"
                  label="Username"
                  @keydown.enter="register"
                />
                <v-text-field
                  v-model="register_form.password"
                  :type="check_password ? '' : 'password'"
                  label="Password"
                  @keydown.enter="register"
                />
                <!-- 注册按钮 -->
                <div class="d-flex">
                  <v-checkbox v-model="check_password" label="Check password" />
                  <v-spacer />
                  <v-btn
                    :loading="loading"
                    color="primary"
                    @click="register"
                    style="margin: 2vh"
                    >Sign up
                  </v-btn>
                </div>
              </v-form>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<style scoped>
.v-alert {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 10px;
  min-width: 340px;
  z-index: 10000; /* 显示在最上面 */
  white-space: pre; /* 允许换行 */
}
</style>
