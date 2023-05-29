// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from "vuex-persistedstate"

Vue.use(Vuex);

const state = {
  // 用户信息
  profile: {
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
  setUser (state, payload) {
    state.profile = payload
  },
}

const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  // 配置 vuex-persistedstate
  plugins: [
    // 默认存储在localStorage
    persistedState({
      // 本地存储名字
      key: 'fresh-mart-local-store',
      // 指定需要存储的模块
      paths: ['profile'] 
    })
  ]
})