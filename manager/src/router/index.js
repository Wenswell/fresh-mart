import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'main',
    redirect:'/home',
    component: () => import('@/views/main'),
    children: [
      { path: 'home', name: 'home', component: () => import('@/views/main/home'), },
      { path: 'user', name: 'user', component: () => import('@/views/main/user'), },
      { path: 'mall', name: 'mall', component: () => import('@/views/main/mall'), },
      { path: 'page-one', name: 'page-one', component: () => import('@/views/main/page-one'), },
      { path: 'page-two', name: 'page-two', component: () => import('@/views/main/page-two'), },
    ],
  },
  {
    path: '/test',
    component: () => import('@/views/test'),
  },
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === from.path) {
//     next(false);
//   } else {
//     next();
//   }
// })
export default router