import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import("../views/home/Home.vue")
        },
        {
            path: '/order',
            component: () => import("../views/order/Order.vue")
        },
        {
            path: '/favor',
            component: () => import("../views/favor/Favor.vue")
        },
        {
            path: '/msg',
            component: () => import("../views/message/Message.vue")
        }
    ]
})


export default router;