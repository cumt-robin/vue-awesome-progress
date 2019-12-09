import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import("@/views/home.vue"),
            meta: {
                name: '首页'
            }
        }
    ]
})

export default router;