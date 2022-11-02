<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import icon from "../../assets/USTCOJ.svg";
import { useUrlStore, useMainTabStore } from "../../store";

const login_dialog = ref(false);
const is_logged = ref(false);
const main_tab_store = useMainTabStore();

// 退出
const tokens_url = useUrlStore().tokens_url;
function logout() {
  // 由于cookie是HttpOnly的, 所以只能访问后端删除
  fetch(tokens_url, { method: "DELETE", credentials: "include" });
  is_logged.value = false;
}

// 检测是否登录
onMounted(async function () {
  const resp = await fetch(tokens_url, {
    method: "HEAD",
    credentials: "include",
  });
  if (resp.status === 200) is_logged.value = true;
});

// 提示条
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

// 登录/注册对话框
const tab = ref(0);
const loading = ref(false);

// 登录
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
    alert("success", "Login success");
    is_logged.value = true;
  } else {
    // 登录失败
    const errs: string[] = await resp.json();
    if (errs) alert("error", errs.join("\n"), -1);
    else alert("error", "Login failed");
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
const users_url = useUrlStore().users_url;
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
    alert("success", "Registration success");
    is_logged.value = true;
  } else {
    // 注册失败
    const errs: string[] = await resp.json();
    if (errs) alert("error", errs.join("\n"), -1);
    else alert("error", "Registration failed");
  }
}
</script>

<template>
  <!-- 提示条 -->
  <v-alert
    :type="alert_type"
    v-model="alert_value"
    @click="alert_value = false"
  >
    {{ alert_text }}
  </v-alert>

  <v-app-bar app rounded elevation="2">
    <!-- 导航栏 -->
    <v-col cols="4" class="d-flex align-center">
      <v-tabs v-model="main_tab_store.main_tab">
        <v-tab color="orange" :to="{ name: 'home' }">Home</v-tab>
        <v-tab color="orange" :to="{ name: 'problem' }">Problem</v-tab>
        <v-tab color="orange" :to="{ name: 'submission' }">Submission</v-tab>
        <v-tab color="orange" :to="{ name: 'contest' }">Contest</v-tab>
        <v-tab color="orange" :to="{ name: 'rank' }">Rank</v-tab>
      </v-tabs>
    </v-col>

    <!-- 图标 -->
    <v-img
      :src="icon"
      style="cursor: pointer"
      @click="main_tab_store.go_home"
    />

    <!-- 登入登出按钮 -->
    <v-col cols="4" class="d-flex justify-end align-center">
      <v-btn text color="orange" v-if="is_logged" @click="logout">
        Log out
      </v-btn>
      <v-btn text color="orange" v-else @click="login_dialog = true">
        Sign in
      </v-btn>
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
