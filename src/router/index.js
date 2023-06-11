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
        name: 'products',
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
    path: '/test/test/:type',
    name: 'test',
    component: () => import('@/views/test/TEST'),
  },
  {
    path: '/auth',
    redirect: '/auth/register',
  },
  {
    path: '/auth',
    component: () => import('@/views/auth'),
    children: [
      {
        path: 'register',
        name: 'register',
      },
      {
        path: 'login',
        name: 'login',
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
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/layout/EditProfile'),
      }
    ],
  },
  { //layout 首页+分类+购物车+我的
    path: '/layout',
    redirect: '/layout/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/layout/home'),
      },
      {
        path: 'category',
        redirect: 'category/featured',
      },
      {
        path: 'category/:type',
        name: 'category',
        component: () => import('@/views/layout/CategoryPage'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/layout/CartPage'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/layout/my'),
      },
    ],
  },
  { //无对应页面 先跳转至测试页面
    path: '*',
    redirect: '/test/test/aaa',
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === from.path) {
    next(false);
  } else {
    next();
  }
})
export default router