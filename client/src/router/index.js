import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {

return originalPush.call(this, location).catch(err => err)

}
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
        name: 'products',
        component: () => import('@/views/Shop/ProductDetail'),
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
        component: () => import('@/views/layout/edit'),
      }
    ],
  },
  { //layout 首页+分类+购物车+我的
    path: '/layout',
    redirect: '/layout/home',
    component: () => import('@/views/layout'),
    meta: {
      keepAlive: true // 缓存该路由
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/layout/home'),
        meta: {
          keepAlive: true // 缓存该路由
        }
      },
      {
        path: 'category',
        redirect: 'category/featured',
      },
      {
        path: 'category/:type',
        name: 'category',
        component: () => import('@/views/layout/category'),
        meta: {
          keepAlive: true // 缓存该路由
        }
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/layout/cart'),
        meta: {
          keepAlive: true // 缓存该路由
        }
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/layout/my'),
        meta: {
          keepAlive: true // 缓存该路由
        }
      },
    ],
  },
  { //无对应页面 先跳转至测试页面
    path: '*',
    redirect: '/test/test/aaa',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/client/',
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
