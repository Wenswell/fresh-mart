import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from '@/views/LoginRegister/LoginIndex'
import RegisterPage from '@/views/LoginRegister/RegisterIndex'
import HomePage from '@/views/home/HomeIndex'
import CategoryPage from '@/views/category/CategoryIndex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/register',
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/category',
    name: 'category',
    component: CategoryPage,
  },
]

const router = new VueRouter({
  routes
})

export default router