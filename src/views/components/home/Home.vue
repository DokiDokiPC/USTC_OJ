<template>
    <v-container>
        <NewsArea/>

        <RecentContestArea/>
    </v-container>
</template>

<script>
import NewsArea from "@/views/components/home/NewsArea";
import RecentContestArea from "@/views/components/home/RecentContestArea";
export default {
    name: "Home",
    components: {RecentContestArea, NewsArea}
}
</script>

<style scoped>
</style>