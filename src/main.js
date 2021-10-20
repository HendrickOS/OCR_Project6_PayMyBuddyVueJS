import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
Vue.use(VueRouter);

Vue.config.productionTip = false;

import Homepage from "./views/Homepage.vue";
import Accountpage from "./views/Accountpage.vue";
import Loginpage from "./views/Loginpage.vue";
import AddContactpage from "./views/AddContactpage.vue";

import axios from "axios";
import VueAxios from "vue-axios";



Vue.use(VueAxios, axios);

axios.interceptors.request.use(
    config => {
        if (document.token) {
            config.headers["Authorization"] = "Bearer " + document.token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

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
            path: "/addcontactpage",
            name: "addcontactpage",
            component: AddContactpage,
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