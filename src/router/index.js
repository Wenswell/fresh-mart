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
    component: () => import('@/views/Auth/AuthPage'),
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/Auth/RegisterForm'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/Auth/LoginForm'),
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
        redirect: '/layout/category/featured',
        component: () => import('@/views/category/CategoryIndex'),
        children: [
          {
            path: 'featured',
            name: 'featured',
            // component: () => import('@/views/category/Featured'),
          },
          {
            path: 'fruits',
            name: 'fruits',
            // component: () => import('@/views/category/Fruits'),
          },
          {
            path: 'vegetables',
            name: 'vegetables',
            // component: () => import('@/views/category/Vegetables'),
          },
          {
            path: 'meat',
            name: 'meat',
            // component: () => import('@/views/category/Meat'),
          },
          {
            path: 'seafood',
            name: 'seafood',
            // component: () => import('@/views/category/Seafood'),
          },
          {
            path: 'snacks',
            name: 'snacks',
            // component: () => import('@/views/category/Snacks'),
          },
          {
            path: 'beverages',
            name: 'beverages',
            // component: () => import('@/views/category/Beverages'),
          },
          {
            path: 'groceries',
            name: 'groceries',
            // component: () => import('@/views/category/Groceries'),
          },
          {
            path: 'catering',
            name: 'catering',
            // component: () => import('@/views/category/Catering'),
          },
          {
            path: 'delicacies',
            name: 'delicacies',
            // component: () => import('@/views/category/Delicacies'),
          },
          {
            path: 'skincare',
            name: 'skincare',
            // component: () => import('@/views/category/Skincare'),
          },
        ],
      },
      {
        path: 'cart',
        name: 'cart',
        // component: () => import('@/views/home/HomePage'),
      },
      {
        path: 'my',
        name: 'my',
        // component: () => import('@/views/category/CategoryIndex'),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router