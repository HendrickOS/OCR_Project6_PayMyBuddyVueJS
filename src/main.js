import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
Vue.use(VueRouter);

Vue.config.productionTip = false;

import Homepage from "./views/Homepage.vue";
import Accountpage from "./views/Accountpage.vue";
import Loginpage from "./views/Loginpage.vue";

import axios from "axios";
import VueAxios from "vue-axios";
/* document.token = "14";*/
Vue.use(VueAxios, axios);

/* axios.interceptors.request.use(
    config => {
        if (store.getters.getToken) {
            config.headers["Authorization"] = document.token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
); */

const router = new VueRouter({
    mode: "hash",
    routes: [{
            path: "/homepage",
            name: "homepage",
            component: Homepage,
        },

        {
            path: "/accountpage",
            name: "accountpage",
            component: Accountpage,
        },
        {
            path: "/loginpage",
            name: "loginpage",
            component: Loginpage,
        },
        {
            path: "/",
            redirect: "homepage",
        },
    ],
});

let vue = new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");