<script setup lang="ts">
import { ref } from "vue";
const model = ref(0);
const colors = ["primary", "secondary", "yellow darken-2", "red", "orange"];
</script>

<template>
  <v-card>
    <v-card-title>
      <span>NEWS</span>
    </v-card-title>
    <v-card-text>
      <v-carousel v-model="model" height="58vh">
        <v-carousel-item v-for="(color, i) in colors" :key="color">
          <v-sheet :color="color" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="text-h2">Slide {{ i + 1 }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </v-card>
</template>
