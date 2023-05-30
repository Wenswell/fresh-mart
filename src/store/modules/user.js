// 用户模块
const state = {
    // 用户信息
    profile: {
      // 传登录后入的JSON格式
      id: '',
      avatar: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    },

    // 登录后回跳路径
    redirectUrl: '/'
  }

  const mutations = {
    // 修改用户信息
    setUser (state, payload) {
      state.profile = payload
    },
    // 修改回跳地址
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  }

  export default {
    namespaced: true,
    state,
    mutations
  }
  
