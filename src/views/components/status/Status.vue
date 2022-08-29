<template>
    <v-container fluid style="padding-left: 6vw;padding-right: 6vw">
        <v-card>
            <v-card-title class="text-h4 text--primary">
                Status
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="status">
                    <template v-slot:item.status="{item}">
                        <v-chip :color="getColor(item.status)" outlined>
                            {{item.status}}
                        </v-chip>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "Status",
    data: () => ({
        headers: [
            {
                text: "Submission",
                value: "submitTime",
                align: "start"
            },
            {   text: "Problem",  value: "problemId"    },
            {   text: "By",  value: "coder"    },
            {   text: "Status",  value: "status"    },
            {   text: "Time",  value: "timeCost"    },
            {   text: "Memory", value: "memoryCost"   }
        ],
        status: [
            {
                submitTime: "2022-3-1",
                problemId: "003",
                coder: "Nyan the cat",
                status: "Accepted",
                timeCost: "10ms",
                memoryCost: "30Kb"
            },
            {
                submitTime: "2022-3-1",
                problemId: "002",
                coder: "Nyan the cat",
                status: "Compile Error",
                timeCost: "",
                memoryCost: ""
            }
        ]
    }),
    methods: {
        getColor: function(status) {
            switch (status) {
                case "Accepted": return "green"
                case "Failed": return "error"
                case "Compile Error": return "warning"
            }
            return "grey"
        }
    }
}
</script>

<style scoped>

</style>