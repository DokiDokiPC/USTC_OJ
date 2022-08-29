<template>
    <v-container fluid style="padding-left: 6vw;padding-right: 6vw">
        <v-row justify="center">
            <v-col :cols="3">
                <v-card elevation="1">
                    <v-list>
                        <v-list-item-group v-model="selectedItem" color="orange">
                            <v-list-item v-for="(item,i) in sidebar" :key="i">
                                    <v-list-item-icon style="margin-left: 5px; margin-right: 12px">
                                        <v-icon>
                                        {{item.icon[0]}}
                                        </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        {{item.name}}
                                    </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
            <v-col :cols="9">
                <v-card style="padding-left:12px" elevation="0">
                    <v-card-title class="text-h4 text--primary">
                        {{this.item.name}}
                    </v-card-title>
                    <v-card-subtitle class="text-h6 text--primary">
                        {{this.sidebar[this.selectedItem].name}}
                    </v-card-subtitle>
                    <v-card-text class="text--primary">
                        <div v-if="selectedItem===0">
                            <span style="margin-right: 15px">Start Time: {{this.item.start_time}}</span>
                            <span>Duration: {{this.item.duration}}</span>
                        </div>
                        Some text here for {{this.sidebar[this.selectedItem].name}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "ContestDetail",
    created() {
        this.id = this.$route.params.id
    },
    mounted() {
        this.$http.get('contest/' + this.id).then(resp => {
            this.item = resp.data
            console.log(this.item)
        })
    },
    data: () => ({
        item: {},
        sidebar: [
            {
                icon: ["mdi-home-outline","mdi-home"],
                name: "Overview"
            },
            {
                icon: ["mdi-message-alert-outline","mdi-message-alert"], //second icon is for dark mode (not implemented yet)
                name: "Announcements"
            },
            {
                icon: ["mdi-clock-time-four-outline","mdi-clock-time-four"],
                name: "Submissions"
            }
        ],
        selectedItem: 0
    })
}
</script>

<style scoped>
</style>