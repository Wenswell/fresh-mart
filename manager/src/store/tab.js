import Cookies from "js-cookie"

export default {
  state: {
    isCollapse: false, //控制侧边栏菜单的展开
    menu: [],
    tabList: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ],
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    setMenu(state, newMenu) {
      state.menu = newMenu
      Cookies.set('menu', JSON.stringify(newMenu))
    },
    addMenu(state, router) {
      if (!Cookies.get('menu')) return
      const menu = JSON.parse(Cookies.get('menu'))
      state.menu = menu
      let children = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children.forEach((child) => {
            children.push(child);
          });
        } else {
          children.push(item);
        }
      });
      children = children.map((route) => {
        return {
          path: route.name,
          name: route.name,
          component: () => import(`../views/main/${route.name}`)
          // component: () => {const path=route.url; return import(path)}
        };
      });
      console.log(children);
      const mainRoute = router.options.routes.find(route => route.name === 'main');
      mainRoute.children = children;
      // router.options.routes[0].children.push(children)
      // 使用 $router.addRoutes 方法添加路由
      router.addRoute({
        path: '/',
        redirect: '/home',
        component: () => import('@/views/main/index.vue'),
        children: children
      });

    },
    updateMenu(state, value) {
      if (value.name === 'home') return
      if (state.tabList.findIndex(item => item.name == value.name) === -1) {
        state.tabList.push(value)
      }
    },
    closeTab(state, { tag, index }) {
      tag
      state.tabList.splice(index, 1)

    },
  }

}