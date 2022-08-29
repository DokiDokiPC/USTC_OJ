<template>
    <v-container>
        <v-card>
            <v-card-title><span>{{ problemName }}</span></v-card-title>
            <v-card-text>
                <vue-markdown/>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
    name: "ProblemDetail",
    mounted() {
        this.$http.get(`problem/${this.$route.params.id}`).then(resp => {
            this.problemName = resp.data.name
        })
    },
    data: () => ({
        problemName: ""
    }),
    components: {
        VueMarkdown
    },
}
</script>

<style scoped>

</style>