import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from '@/views/LoginRegister/LoginIndex'
import RegisterPage from '@/views/LoginRegister/RegisterIndex'
import HomePage from '@/views/home/HomeIndex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
]

const router = new VueRouter({
  routes
})

export default router