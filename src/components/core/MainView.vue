<template>
  <v-main>
    <router-view v-slot="{ Component }">
      <transition name="zoom-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-main>
</template>

<style lang="scss">
$zoom-fade-timeout: 0.28s;

.zoom-fade-enter-active,
.zoom-fade-leave-active {
  -webkit-transition: opacity $zoom-fade-timeout ease-in-out,
    -webkit-transform $zoom-fade-timeout;
  transition: opacity $zoom-fade-timeout ease-in-out,
    -webkit-transform $zoom-fade-timeout;
  transition: transform $zoom-fade-timeout,
    opacity $zoom-fade-timeout ease-in-out;
  transition: transform $zoom-fade-timeout,
    opacity $zoom-fade-timeout ease-in-out, -webkit-transform $zoom-fade-timeout;
  //-webkit-transition: opacity .28s ease-in-out, -webkit-transform .35s;
  //transition: opacity .28s ease-in-out, -webkit-transform .35s;
  //transition: transform .35s, opacity .28s ease-in-out;
  //transition: transform .35s, opacity .28s ease-in-out, -webkit-transform .35s
}

.zoom-fade-enter {
  -webkit-transform: scale(0.97);
  transform: scale(0.97);
  opacity: 0;
}

.zoom-fade-leave-to {
  -webkit-transform: scale(1.03);
  transform: scale(1.03);
  opacity: 0;
}

.v-main {
  background-color: #f0f2f5 !important;
}
</style>
