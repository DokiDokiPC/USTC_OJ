<script setup lang="ts">
import { ref } from "vue";

const form_valid = ref(false);
const name = ref("");
const duration = ref("");
const start_time = ref("");

const contests_url = new URL(import.meta.env.VITE_BACKEND_URL + "contests/");
async function send_data() {
  const resp = await fetch(contests_url);
  console.log(resp);
}
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span>Create Problem</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="form_valid">
          <v-text-field
            label="name"
            v-model="name"
            :rules="[(v) => !!v || '此项必填']"
          >
          </v-text-field>
          <v-text-field
            label="start time"
            v-model="start_time"
            :rules="[(v) => !!v || '此项必填']"
          >
          </v-text-field>
          <v-text-field
            label="duration"
            v-model="duration"
            :rules="[(v) => !!v || '此项必填']"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="send_data">submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
