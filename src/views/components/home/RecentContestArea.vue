<template>
    <v-card>
        <v-card-title>
            <span>RECENT CONTESTS</span>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col
                    v-for="n in 3"
                    :key="n"
                    cols="6"
                    md="4"
                >
                    <v-card
                        outlined
                    >
                        <v-card-title>contest</v-card-title>
                        <v-card-text>Good Contest</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "RecentContestArea"
}
</script>

<style scoped>

</style>