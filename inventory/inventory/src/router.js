import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home.vue";
import Inventory from "./components/layout/Inventory.vue";
import Cluenote from "./components/layout/Cluenote.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {path:"/", component: Home},
        {path:"/inventory", component: Inventory},
        {path:"/cluenote", component: Cluenote},
    ]
});

export default router;