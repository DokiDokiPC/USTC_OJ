<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
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

// 检测是否登录
onMounted(async function () {
  const resp = await fetch(tokens_url, {
    method: "HEAD",
    credentials: "include",
  });
  if (resp.status === 200) is_logged.value = true;
});

// 提示条
type AlertType = "success" | "error" | "warning" | "info";
type Alert = {
  value: boolean;
  type: AlertType;
  text: string;
  pop: (type: AlertType, text: string, timeout?: number) => void;
};
const alert: Alert = reactive({
  value: false,
  type: "success",
  text: "",
  // 用此函数显示一个指定color和text的提示条
  pop: (type: AlertType, text: string, timeout: number = 1500) => {
    alert.type = type;
    alert.text = text;
    alert.value = true;
    if (timeout >= 0) setTimeout(() => (alert.value = false), timeout); // -1代表不自动消失
  },
});

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
    alert.pop("success", "Login success");
    is_logged.value = true;
  } else {
    // 登录失败
    const errs: string[] = await resp.json();
    if (errs) alert.pop("error", errs.join("\n"), -1);
    else alert.pop("error", "Login failed");
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
const show_password = computed((): string =>
  check_password.value ? "" : "password"
);
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
    alert.pop("success", "Registration success");
    is_logged.value = true;
  } else {
    // 注册失败
    const errs: string[] = await resp.json();
    if (errs) alert.pop("error", errs.join("\n"), -1);
    else alert.pop("error", "Registration failed");
  }
}
</script>

<template>
  <!-- 提示条 -->
  <v-alert
    :type="alert.type"
    v-model="alert.value"
    @click="alert.value = false"
  >
    {{ alert.text }}
  </v-alert>

  <v-app-bar app rounded elevation="2">
    <!-- 导航栏 -->
    <v-col cols="4" class="d-flex align-center">
      <v-tabs>
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
      @click="$router.push({ name: 'home' })"
      style="cursor: pointer"
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
                  :type="show_password"
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
