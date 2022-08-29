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
                        label="content"
                        v-model="content"
                        :rules="[(v)=>!!v||'此项必填']"
                    >
                    </v-text-field>
                    <v-text-field
                        label="time limit"
                        v-model="time"
                        :rules="[(v)=>!!v||'此项必填']"
                    >
                    </v-text-field>
                    <v-text-field
                        label="memory limit"
                        v-model="memory"
                        :rules="[(v)=>!!v||'此项必填']"
                    >
                    </v-text-field>
                    <v-text-field
                        label="judge type"
                        v-model="type"
                        :rules="[(v)=>!!v||'此项必填']"
                    >
                    </v-text-field>
                    <v-file-input
                        chips
                        @change="onTemplateFileSelected"
                        accept=".zip"
                        label="select file(zip)*"
                    />
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
    name: "AddProblem",
    data: () => ({
        form_valid: false,
        formData: new FormData,
        name: "",
        content: "",
        time: "",
        memory: "",
        type: "",
    }),
    methods: {
        onTemplateFileSelected(e) {
            this.formData.delete('file_archive')
            this.formData.append('file_archive', e)
        },
        sendData() {
            this.loading = true
            let newFormData = this.formData
            newFormData.append("name", this.name)
            newFormData.append("content", this.content)
            newFormData.append("time", this.time)
            newFormData.append("memory", this.memory)
            newFormData.append("type", this.type)

            this.$http.post('problem', newFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(resp => {
                    console.log(resp)
                })
        }
    }
}
</script>

<style scoped>

</style>