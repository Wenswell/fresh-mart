export default {
  state: {
    isCollapse: false, //控制侧边栏菜单的展开
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
    updateMenu(state, value) {
      if (value.name === 'home') return
      if (state.tabList.findIndex(item => item.name == value.name) === -1) {
        state.tabList.push(value)
      }
      //   {
      //     "path": "/user",
      //     "name": "user",
      //     "label": "用户管理",
      //     "icon": "user",
      //     "url": "UserManage/UserManage"
      // }
      state.tabList
    },
  }

}