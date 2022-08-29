import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store"
import vuetify from "@/plugins/vuetify";
import axios from 'axios';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false
if (localStorage.getItem('token') !== null) {
    axios.defaults.headers.common['token'] = localStorage.getItem('token');
}
Vue.prototype.$http = axios.create({
    baseURL: process.env['VUE_APP_API_BASE_URL'],
});
// Vue.prototype.$http.interceptors.response.use((response) => {
//     if (response.config.method !== 'get') {
//         if (response.data?.no_notification === true) {
//             return
//         }
//         Vue.toasted.success("Successful", {
//             theme: "bubble",
//             duration: 1000,
//             // icon: {
//             //     name: 'check',
//             //     after: false
//             // }
//         })
//     }
//     return response
// }, (error) => {
//     const data = error.response?.data
//     console.log(data)
//     let detail = data?.msg ?? data?.detail ?? JSON.stringify(data) ?? JSON.stringify(error.response)
//     if (detail.length > 100) {
//         console.log(detail)
//         detail = 'Error'
//     }
//     Vue.toasted.error(`${error.response?.status ?? "Error"} ${detail}`, {
//         theme: "bubble",
//         duration: 3000,
//         // icon: {
//         //     name: 'clear',
//         //     after: false
//         // }
//     })
//     return error
// });
Vue.use(Toasted, {iconPack: 'material'})
new Vue({
    router,
    vuetify,
    store,
    render: h => h(App),
}).$mount('#app')
