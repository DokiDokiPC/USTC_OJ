import Vue from 'vue';
import Vuetify from 'vuetify';
import zhHans from 'vuetify/es5/locale/zh-Hans';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: {zhHans},
        current: 'zhHans',
    },
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
});
