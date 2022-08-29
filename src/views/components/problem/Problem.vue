<template>
    <v-container>
        <v-card>
            <v-card-title>
                <span>Problem List</span>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="items">
                    <template v-slot:item.name="{item}">
                        <router-link
                            :to="{ name: 'problemDetail', params:{ id: item.pid }}">
                            {{ item.name }}
                        </router-link>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "Problem",
    mounted() {
        this.$http.get('http://localhost:5000/problem'
        // , 
        // {
        //     params: {
        //         offset: 0,
        //         limit: 10
        //     }
        // }
        ).then(resp => {
            console.log("HELLO123")
            console.log(resp)
            this.items = resp.data.problem
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
                value: 'Problem_ID',
            },
            {
                text: 'Title',
                align: 'start',
                sortable: false,
                value: 'Problem_Title',
            },
            {
                text: 'Level',
                align: 'start',
                sortable: false,
                value: 'level',
            },
            {
                text: 'Total',
                align: 'start',
                sortable: false,
                value: 'submit_num',
            },
            {
                text: 'Accepted number',
                align: 'start',
                sortable: false,
                value: 'ac_num',
            },
            {
                text: 'Submission number',
                align: 'start',
                sortable: false,
                value: 'submit_num',
            },
        ],

    }),
}
</script>

<style scoped>

</style>