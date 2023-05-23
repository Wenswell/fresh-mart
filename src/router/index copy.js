import Vue from 'vue'
import VueRouter from 'vue-router'

// import AuthPage from '@/views/Auth/AuthForm.vue' 

// import LoginPage from '@/views/LoginRegister/LoginIndex'
// import RegisterPage from '@/views/LoginRegister/RegisterIndex'

// import Test from '@/views/Layout/testView'
import TestSub from '@/views/Layout/TestSub'
import Layout from '@/views/Layout/LayoutIndex'
import HomePage from '@/views/home/HomePage'
import CategoryPage from '@/views/category/CategoryIndex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/testsub',
  },
  {
    path: '/testsub',
    redirect: '/testsub/home',
    component: TestSub,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'category',
        component: CategoryPage,
      },
    ],
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
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router