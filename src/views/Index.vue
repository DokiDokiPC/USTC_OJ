<template>
    <v-app>
        <app-bar/>
        <main-view/>
        <Footer/>
    </v-app>
</template>

<script>
import AppBar from "@/views/components/core/AppBar";
import MainView from "@/views/components/core/MainView";
import Footer from "@/views/components/core/Footer";

export default {
    name: "Index",
    components: {MainView, AppBar, Footer}
}
</script>

<style scoped>

</style>