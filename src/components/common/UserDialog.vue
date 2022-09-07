<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  show_dialog: boolean;
}>();

/*const emit = defineEmits(["input"]);

function toggle_dialog(): boolean {
  emit("input", !props.show_dialog);
  return !props.show_dialog;
}*/

const form_valid = ref(false);
const username = ref("");
const password = ref("");
const loading = ref(false);
const tab = ref(0);

function login(urls: string) {
  if (!form_valid.value) return;
  loading.value = true;
  const data = {
    username: username.value,
    password: password.value,
  };
  fetch(urls, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      loading.value = false;
      console.log(resp);
      // bubble success
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch((resp) => {
      console.log(resp);
    });
}
</script>

<template>
  <v-dialog :value="props.show_dialog" content-class="medium" width="40vw">
    <v-card>
      <v-card-text>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs slider color="yellow"></v-tabs>
          <v-tab>Sign In</v-tab>
          <v-tab>Sign Up</v-tab>
        </v-tabs>

        <v-tabs v-model="tab">
          <v-tab>
            <v-form ref="form" v-model="form_valid" class="px-5">
              <v-text-field
                v-model="username"
                required
                label="Username"
                @keydown.enter="login('login')"
              />
              <v-text-field
                v-model="password"
                required
                type="password"
                label="Password"
                @keydown.enter="login('login')"
              />
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  color="primary"
                  text
                  @click="login('login')"
                  >Sign in
                </v-btn>
              </div>
            </v-form>
          </v-tab>

          <v-tab>
            <v-form ref="form" v-model="form_valid" class="px-5">
              <v-text-field
                v-model="username"
                required
                label="Username"
                @keydown.enter="login('login')"
              />
              <v-text-field
                v-model="password"
                required
                type="password"
                label="Password"
                @keydown.enter="login('login')"
              />
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  color="primary"
                  text
                  @click="login('register/')"
                  >Register
                </v-btn>
              </div>
            </v-form>
          </v-tab>
        </v-tabs>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
