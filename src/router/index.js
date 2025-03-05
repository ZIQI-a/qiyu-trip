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
            component: () => import("../views/message/Message.vue"),
            meta: {
                hideNavBar: true
            }
        },
        {
            path: '/msg/:id',
            component: () => import("@/views/message/ChatDetail.vue"),
            meta: {
                hideNavBar: true
            }
        },
        {
            path: '/msg/customer',
            component: () => import("../views/message/CustomerService.vue"),
            meta: {
                hideNavBar: true
            }
        },
        {
            path: '/city',
            component: () => import("../views/city/City.vue"),
            meta: {
                hideNavBar: true
            }
        },
        {
            path: '/search',
            component: () => import("@/views/search/Search.vue"),
            meta: {
                hideNavBar: true
            }
        },
        {
            path: '/detail/:id',
            component: () => import("@/views/details/details.vue"),
            meta: {
                hideNavBar: true
            }
        }
    ]
})


export default router;