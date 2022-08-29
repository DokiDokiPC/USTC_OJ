<template>
    <v-container>
        <v-card>
            <v-card-title>
                <span>Create Problem</span>
            </v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="form_valid"
                >
                    <v-text-field
                        label="name"
                        v-model="name"
                        :rules="[(v)=>!!v||'此项必填']"
                    >
                    </v-text-field>
                    <v-text-field
                        label="start time"
                        v-model="start_time"
                        :rules="[(v)=>!!v||'此项必填']"
                    >
                    </v-text-field>
                    <v-text-field
                        label="duration"
                        v-model="duration"
                        :rules="[(v)=>!!v||'此项必填']"
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="sendData">submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "AddContest",
    data: () => ({
        form_valid: false,
        name: "",
        duration: "",
        start_time: "",
    }),
    methods: {
        sendData() {
            this.loading = true

            this.$http.post('contest', {
                name: this.name,
                start_time: this.start_time,
                duration: this.duration
            },)
                .then(resp => {
                    console.log(resp)
                })
        }
    }
}
</script>

<style scoped>

</style>