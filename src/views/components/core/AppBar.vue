<template>
    <v-app-bar
        app
        fixed
        elevation="2"
    >
        <v-row>
            <v-col cols="4" class="d-flex align-center">
                <v-btn text color="orange" @click="$router.push({name:'problem'})">Problems</v-btn>
                <v-btn text color="orange" @click="$router.push({name:'status'})">Status</v-btn>
                <v-btn text color="orange" @click="$router.push({name:'contest'})">Contest</v-btn>
                <v-btn text color="orange" @click="$router.push({name:'user'})">User</v-btn>
            </v-col>
            <v-col class="d-flex justify-space-around align-center">
                <v-app-bar-title>
                    <v-img :src="require('@/assets/USTCOJ.svg')" contain></v-img>
                </v-app-bar-title>
            </v-col>
            <v-col cols="4" class="d-flex justify-end align-center">
                <v-btn text color="orange" v-if="is_logged" @click="logout">Log out</v-btn>
                <v-btn text color="orange" v-else @click="loginDialog=true">Sign in</v-btn>
            </v-col>
        </v-row>

        <UserDialog v-model="loginDialog"/>
    </v-app-bar>
</template>

<script>
import UserDialog from "@/views/components/common/UserDialog";

export default {
    name: "AppBar",
    components: {UserDialog},
    data: () => ({
        loginDialog: false,
        is_logged: false,
    }),
    methods: {
        test: function () {
            console.log(this.$vuetify.application);
        },
        logout: function () {
            localStorage.removeItem('token');
            this.is_logged = false
            this.$router.push({
                name: 'home'
            })
        }
    },
    mounted() {
        if (localStorage.getItem('token') !== null) {
            this.is_logged = true
        }
        console.log(this.is_logged)
    }
}
</script>


<style lang="scss" scoped>
.v-toolbar__title {
    a {
        text-decoration: none !important;
        color: rgba(0, 0, 0, 0.87) !important;
    }
}

.v-app-bar {
    // background-color: rgb(48, 65, 86) !important;
    background-color: white !important;
}

.v-icon {
    color: rgba(0, 0, 0, 0.87) !important;
}
</style>
