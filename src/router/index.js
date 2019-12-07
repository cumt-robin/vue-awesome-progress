import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import("@/views/home.vue"),
            meta: {
                name: '首页'
            }
        }
    ]
})

export default router;