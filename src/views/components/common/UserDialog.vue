<template>
    <v-dialog
        :value="value"
        scrollable
        @input="toggleDialog"
        content-class="medium"
        max-width="40vw"
    >
        <v-card
        >

            <v-card-text>
                <v-tabs
                    v-model="tab"
                    align-with-title
                >
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab>Sign In</v-tab>
                    <v-tab>Sign Up</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-form ref="form"
                                v-model="form_valid"
                                class="px-5"
                        >
                            <v-text-field v-model="username"
                                          required
                                          label="Username"
                                          @keydown.enter="login('login')"/>
                            <v-text-field v-model="password"
                                          required
                                          type="password"
                                          label="Password"
                                          @keydown.enter="login('login')"/>
                            <div class="d-flex">
                                <v-spacer></v-spacer>
                                <v-btn
                                    :loading="loading"
                                    color="primary"
                                    text
                                    @click="login('login')">Sign in
                                </v-btn>
                            </div>
                        </v-form>
                    </v-tab-item>
                    <v-tab-item>
                        <v-form ref="form"
                                v-model="form_valid"
                                class="px-5"
                        >
                            <v-text-field v-model="username"
                                          required
                                          label="Username"
                                          @keydown.enter="login('login')"/>
                            <v-text-field v-model="password"
                                          required
                                          type="password"
                                          label="Password"
                                          @keydown.enter="login('login')"/>
                            <div class="d-flex">
                                <v-spacer></v-spacer>
                                <v-btn
                                    :loading="loading"
                                    color="primary"
                                    text
                                    @click="login('register/')">Register
                                </v-btn>
                            </div>
                        </v-form>
                    </v-tab-item>
                </v-tabs-items>

            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "UserDialog",
    props: {
        value: Boolean
    },
    methods: {
        toggleDialog: function () {
            this.$emit("input", !this.value)
            return !this.value
        },
        login: function (urls) {
            if (this.form_valid) {
                this.loading = true
                this.$http.post(urls, {
                    email: this.username,
                    password: this.password
                }).then(resp => {
                    this.loading = false;
                    localStorage.clear()
                    console.log(resp)
                    localStorage.setItem('token', resp.data.token);
                    // localStorage.setItem('username', resp.data.username)

                    this.$http.defaults.headers.common['Authorization'] = 'Token ' + resp.data.token;
                    this.$toasted.success('Login Successful', {
                        duration: 1000,
                        theme: 'bubble',
                        icon: {
                            name: 'fingerprint',
                            after: false
                        }
                    })
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }).catch(resp => {
                    console.log(resp)
                })
            }
        }
    },
    data: () => ({
        form_valid: false,
        username: "",
        password: "",
        loading: false,
        tab: 0
    })
}
</script>

<style scoped>

</style>