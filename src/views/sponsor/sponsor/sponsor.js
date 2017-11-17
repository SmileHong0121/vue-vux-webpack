import Vue from 'vue'
import VueRouter from 'vue-router'
import '@/assets/style/index.less'
import vuei18n from 'vue-i18n'
import '@/assets/awesome/css/font-awesome.min.css'

import Sponsor from './sponsor.vue'
import Finsh from './finsh.vue'
import Details from './details.vue'


const routes = [
    {
        path: '/',
        component: Sponsor
    },
    {
        path: '/finsh',
        component: Finsh
    },
    {
        path: '/details',
        component: Details
    }
]

Vue.use(VueRouter)
Vue.use(vuei18n)

const router = new VueRouter({
    routes:routes
})


new Vue({
    router: router
}).$mount('#app')
