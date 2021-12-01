import Game from "@/map/practice.vue";

const router = new VueRouter({
    routes: [
        { path: "map/practice", component: Game  },
    ]
});

new Vue({
    router: router,
    store: new Vuex.Store({
        state: {
            axios: isElectron() ? "http://localhost:8001" : ""
        }
    }),
    vuetify: new Vuetify(),
    el: '#app',
    components: {
        HeaderView,
        CenterView
    },
    data: {
        CONSTANTS: {
            isElectron: isElectron
        }
    }
});