// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

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
});