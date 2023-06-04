import { toBuyNowApi } from "@/api/user";

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

    order:'',

    // 登录后回跳路径
    redirectUrl: '/'
  }

const getters = {

  getToBuyOrderInfo(state) {
    return state.order
  }
}

  const actions = {
    // 点击 直接购买 直接【预】提交单个物品的订单
    async toBuyNow(context,obj) {
      // console.log("toBuyNow--GET--obj", obj)
      const res = await toBuyNowApi(obj)
      // console.log("++ toBuyNow res", res)
      context.commit('setOrder', res.result)
    }
  }

  const mutations = {
    // 修改用户信息
    setUser (state, payload) {
      state.profile = payload
    },
    // 修改回跳地址
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    },
    // 保存订单信息
    setOrder(state, result) {
      state.order = result
      console.log("NOW -- state.order", state.order)
    },
  }

  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }
  
