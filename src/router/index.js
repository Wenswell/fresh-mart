import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
    redirect: '/auth/register',
    name: 'Auth',
    component: () => import('@/views/Auth/AuthForm'),
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/LoginRegister/RegisterIndex'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/LoginRegister/LoginIndex'),
      },
    ],
  },
  {
    path: '/layout',
    redirect: '/layout/home',
    component: () => import('@/views/Layout/LayoutIndex'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/HomePage'),
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/category/CategoryIndex'),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router