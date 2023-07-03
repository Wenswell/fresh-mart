import Cookies from 'js-cookie'
import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => {
    if (Router.isNavigationFailure(err)) {
      // resolve err
      return err
    }
    // rethrow error
    return Promise.reject(err)
  })
}

Vue.use(Router)


const routes = [
  {
    path: '/',
    name: 'main',
    redirect: '/home',
    component: () => import('@/views/main/index'),
    children: [
      // { path: 'home', name: 'home', component: () => import('@/views/main/home'), },
      // { path: 'user', name: 'user', component: () => import('@/views/main/user'), },
      // { path: 'mall', name: 'mall', component: () => import('@/views/main/mall'), },
      // { path: 'page-one', name: 'page-one', component: () => import('@/views/main/page-one'), },
      // { path: 'page-two', name: 'page-two', component: () => import('@/views/main/page-two'), },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test'),
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/test/404'),
  },
]

const router = new Router({
  routes
})

// the NavigationDuplicated is generated prior to the $router.beforeEach is called
// github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
// if (to.path === from.path) next(false)
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  if (!token && to.name !== 'login') {
    next({ name: 'login' });
  } else {
    next();
  }
})
export default router