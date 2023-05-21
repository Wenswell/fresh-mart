import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginRegister from '@/views/LoginRegister/LoginIndex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginRegister,
  },
]

const router = new VueRouter({
  routes
})

export default router