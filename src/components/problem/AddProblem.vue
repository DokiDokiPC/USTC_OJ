<script setup lang="ts">
import { ref } from "vue";
import { useUrlStore } from "../../store";

const form_valid = ref(false);
const form_data = ref(new FormData());
const name = ref("");
const content = ref("");
const time = ref("");
const memory = ref("");
const type = ref("");

/* e的类型?
function on_template_file_selected(e: Event) {
  form_data.value.delete("file_archive");
  form_data.value.append("file_archive", e);
}*/

const problems_url = useUrlStore().problems_url;
async function send_data() {
  const new_form_data = form_data.value;
  new_form_data.append("name", name.value);
  new_form_data.append("content", content.value);
  new_form_data.append("time", time.value);
  new_form_data.append("memory", memory.value);
  new_form_data.append("type", type.value);

  const resp = await fetch(problems_url, {
    method: "POST",
    body: JSON.stringify(new_form_data),
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const data = await resp.json();

  console.log(data);
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
            label="content"
            v-model="content"
            :rules="[(v) => !!v || '此项必填']"
          >
          </v-text-field>
          <v-text-field
            label="time limit"
            v-model="time"
            :rules="[(v) => !!v || '此项必填']"
          >
          </v-text-field>
          <v-text-field
            label="memory limit"
            v-model="memory"
            :rules="[(v) => !!v || '此项必填']"
          >
          </v-text-field>
          <v-text-field
            label="judge type"
            v-model="type"
            :rules="[(v) => !!v || '此项必填']"
          >
          </v-text-field>
          <!-- @change="on_template_file_selected" 在v-file-input中 -->
          <v-file-input chips accept=".zip" label="select file(zip)*" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="send_data">submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
