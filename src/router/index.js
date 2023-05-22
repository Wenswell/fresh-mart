import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from '@/views/LoginRegister/LoginIndex'
import RegisterPage from '@/views/LoginRegister/RegisterIndex'


import Layout from '@/views/Layout/LayoutIndex'
import HomePage from '@/views/home/HomePage'
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
    path: '/layout',
    redirect: '/layout/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'category',
        component: CategoryPage,
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router