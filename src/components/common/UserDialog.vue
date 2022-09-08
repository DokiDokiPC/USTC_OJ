<script setup lang="ts">
import { ref, reactive } from "vue";
import { useUrlStore } from "../../stores/url";

// 提示条
const snackbar = reactive({
  show: false,
  text: "",
  color: "",
  // 用此函数显示一个指定color和text的提示条
  pop: (color: string, text: string) => {
    snackbar.color = color;
    snackbar.text = text;
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
const form_valid = ref(false);
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
    emits("close_dialog");
    snackbar.pop("success", "Login success");
    emits("login_success");
  } else snackbar.pop("error", "Login failed");
}

// 注册
/*function register() {
  return;
}*/
</script>

<template>
  <!-- 提示条, z-index: 3000使其在dialog之上(越大越在上层) -->
  <v-snackbar
    v-model="snackbar.show"
    location="top"
    :timeout="1500"
    :color="snackbar.color"
    style="z-index: 3000"
  >
    {{ snackbar.text }}
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
            <v-form ref="form" v-model="form_valid">
              <v-text-field
                v-model="login_form.username"
                required
                label="Username"
                @keydown.enter="login"
              />
              <v-text-field
                v-model="login_form.password"
                required
                type="password"
                label="Password"
                @keydown.enter="login"
              />
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  color="primary"
                  text
                  @click="login"
                  style="margin: 2vh"
                  >Sign in
                </v-btn>
              </div>
            </v-form>
          </v-window-item>

          <!-- 注册 -->
          <!-- <v-window-item>
            <v-form ref="form" v-model="form_valid" class="px-5">
              <v-text-field
                v-model="username"
                required
                label="Username"
                @keydown.enter="register"
              />
              <v-text-field
                v-model="password"
                required
                type="password"
                label="Password"
                @keydown.enter="register"
              />
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  color="primary"
                  text
                  style="margin: 2vh"
                  @click="register"
                  >Register
                </v-btn>
              </div>
            </v-form>
          </v-window-item> -->
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
