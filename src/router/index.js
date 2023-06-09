import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/order',
    redirect: '/order/check',
    component: () => import('@/views/Order'),
    children: [
      {
        path: 'all',
        name: 'all',
        component: () => import('@/views/Order/AllOrderPage'),
      },
      {
        path: 'check',
        name: 'check',
        component: () => import('@/views/Order/CheckOrder'),
      },
      {
        path: 'pay',
        name: 'pay',
        component: () => import('@/views/Order/PayOrder'),
      },
      {
        path: 'detail',
        redirect: 'all',
      },
      {
        path: 'detail/:type',
        name: 'detail',
        component: () => import('@/views/Order/OrderDetail'),
      },
    ],
  },
  {
    path: '/search',
    // redirect: '/shop',
    component: () => import('@/views/Shop/SearchPage'),
  },
  {
    path: '/shop',
    redirect: '/shop/products',
    component: () => import('@/views/Shop/ShopContainer'),
    children: [
      {
        path: 'products',
        redirect: 'products/3995846'
      },
      {
        path: 'products/:id',
        redirect: '/shop/products/:id/product',
        name:'products',
        component: () => import('@/views/Shop/ProductDetail'),
        children: [
          {
            path: 'product',
            name: 'product',
            component: () => import('@/views/Shop/ProductDetail/ProductDetail'),
          },
          {
            path: 'evaluate',
            name: 'evaluate',
            component: () => import('@/views/Shop/ProductDetail/AllEvaluate'),
          },
          {
            path: 'specifics',
            name: 'specifics',
            component: () => import('@/views/Shop/ProductDetail/AllSpecifics'),
          },
        ],
    
      },
      // {
      //   path: 'evaluate',
      //   redirect: 'evaluate/3995846',
      // },
      // {
      //   path: 'evaluate/:id',
      //   name: 'evaluate',
      //   component: () => import('@/views/Shop/AllEvaluate'),
      // },
      {
        path: 'collect',
        name: 'collect',
        component: () => import('@/views/Shop/CollectPage'),
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('@/views/Shop/HistoryPage'),
      },
      {
        path: 'popular',
        redirect: 'popular/2087394920',
      },
      {
        path: 'popular/:type',
        name: 'popular',
        component: () => import('@/views/Shop/PopularList'),
      },
    ],
  },
  {
    path: '/auth',
    redirect: '/auth/register',
    // name: 'Auth',
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
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/Auth/TestPage'),
      },
    ],
  },
  {
    path: '/user',
    redirect: '/user/address',
    component: () => import('@/views/user'),
    children: [
      {
        path: 'address',
        name: 'address',
        component: () => import('@/views/user/UserAddress'),
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
        component: () => import('@/views/Layout/HomePage'),
      },
      {
        path: 'category',
        name: 'category',
        redirect: '/layout/category/featured',
        component: () => import('@/views/Layout/CategoryPage'),
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
        component: () => import('@/views/Layout/CartPage'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/Layout/MyPage'),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router