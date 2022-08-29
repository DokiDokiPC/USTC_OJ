<template>
    <v-container>
        <v-card>
            <v-card-title>
                <span>Problem List</span>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="items">

                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "Contest",
    mounted() {
        this.$http.get('contestList', {
            params: {
                offset: 0,
                limit: 10
            }
        }).then(resp => {
            console.log(resp)
            this.items = resp.data
        })
    },
    methods: {},
    data: () => ({
        items: [],
        headers: [
            {
                text: '#',
                align: 'start',
                sortable: false,
                value: 'id',
            },
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {
                text: 'Start time',
                align: 'start',
                sortable: false,
                value: 'start_time',
            },
            {
                text: 'Duration',
                align: 'start',
                sortable: false,
                value: 'duration',
            },
            {
                text: 'Problem Number',
                align: 'start',
                sortable: false,
                value: 'problem_number',
            },
        ],

    }),
}
</script>

<style scoped>

</style>