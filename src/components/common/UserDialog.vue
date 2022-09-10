<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useUrlStore } from "../../stores/url";

// 提示条
const snackbar = reactive({
  show: false,
  text: "",
  color: "",
  timeout: 1500,
  // 用此函数显示一个指定color和text的提示条
  pop: (color: string, text: string, timeout: number = 1500) => {
    snackbar.color = color;
    snackbar.text = text;
    snackbar.timeout = timeout;
    snackbar.show = true;
  },
});

// 登录/注册对话框
const props = defineProps<{
  show_dialog: boolean;
}>();
const emits = defineEmits(["close_dialog", "login_success"]);
const tab = ref(0);

// 登录
const loading = ref(false);
const login_form = reactive({
  username: "",
  password: "",
});
const tokens_url = useUrlStore().tokens_url;
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
    emits("close_dialog");
    snackbar.pop("success", "Login success");
    emits("login_success");
  } else {
    // 登录失败
    const errs: string[] = await resp.json();
    if (errs) snackbar.pop("error", errs.join("\n"), -1);
    else snackbar.pop("error", "Login failed");
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
    emits("close_dialog");
    snackbar.pop("success", "Registration success");
    emits("login_success");
  } else {
    // 注册失败
    const errs: string[] = await resp.json();
    if (errs) snackbar.pop("error", errs.join("\n"), -1);
    else snackbar.pop("error", "Registration failed");
  }
}
</script>

<template>
  <!-- 提示条, z-index: 3000使其在dialog之上(越大越在上层) -->
  <v-snackbar
    v-model="snackbar.show"
    location="top"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    style="z-index: 3000; white-space: pre-line"
  >
    {{ snackbar.text }}

    <!-- 提示条的关闭按钮 -->
    <v-btn
      v-show="snackbar.timeout === -1"
      color="red"
      style="float: right"
      @click="snackbar.show = false"
    >
      Close
    </v-btn>
  </v-snackbar>

  <!-- 登录/注册对话框 -->
  <v-dialog
    :model-value="props.show_dialog"
    @update:model-value="emits('close_dialog')"
  >
    <v-card width="30vw">
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
</template>
