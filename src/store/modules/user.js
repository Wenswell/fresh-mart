import { toBuyNowApi, getAddressListApi, changeAddressApi, addNewAddressApi } from "@/api/user";

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

  address: [],

  order: '',

  // 登录后回跳路径
  redirectUrl: '/'
}

const getters = {

  // 获取所有地址
  getAddressList(state) {
    if (!state.address.length) console.log('本地地址列表为空')
    return [...state.address].sort((a, b) => {
      return a.isDefault === 0 ? -1 : b.isDefault === 0 ? 1 : 0;
    });

  },
  
  // 根据id获取对应地址
  getAddressById: (state) => (id) => { 
    return state.address.find(a => a.id === id)
  },

  // 获取订单信息
  getToBuyOrderInfo(state) {
    return state.order
  },

  getToBuyOrderToUpdateInfo(state){
    return {
      skuId: state.order.goods[0].skuId,
      count: state.order.goods[0].count,
      addressId: state.order.userAddresses[0].id,
    }
  },

  // 获取默认地址（isDefault:0）
  getDefaultAddress(state){
    console.log("state.address", state.address)
    const theId = state.address.find(address => address.isDefault === 0).id
    // console.log("state.address.find(address => address.isDefault === 0).id", state.addressList.find(address => address.isDefault === 0).id)
    return theId
  },
}

const actions = {
  
  // 点击 直接购买 直接【预】提交单个物品的订单
  // ----------以下为使用参考----------
  // this.$store.dispatch('user/toBuyNow', {
  //   skuId: data.selectedSkuComb.id,
  //   count: data.selectedNum,
  //   addressId: this.chosenAddressId,
  // })
  // // 提交后转到订单页面
  // this.$router.push('/order')
  // ----------以上为使用参考----------
  async toBuyNow(context, obj) {
    console.log("toBuyNow--GET--obj", obj)
    const res = await toBuyNowApi(obj)
    // console.log("++ toBuyNow res", res)
    context.commit('setOrder', res.result)
  },

  async toBuyNowUpdateAddress(context, id){
    const orderInfo = context.getters['getToBuyOrderToUpdateInfo']
    orderInfo.addressId = id
    const res = await toBuyNowApi(orderInfo)
    context.commit('setOrder', res.result)
  },

  async updateAddressList(context) {
    const res = await getAddressListApi()
    if (!res.result.length) console.log('用户地址列表为空')
    context.commit('setAddress', res.result)
  },

  async changeDefault(context, id) {
    console.group('changeDefault')
    console.log("context", context)
    const selectObj = context.getters['getAddressById'](id)
    const newRes = {
      ...selectObj,
      isDefault: 0
    }
    const res = await changeAddressApi(id, newRes)
    if (res.code == 1) {
      // 服务器更新成功
      // 之后更新本地
      context.commit('setDefaultAddress', id)
    }
    console.log('更新默认地址成功')
    console.groupEnd()
  },

  async editAddress(context, [id, obj]) {
    const res = await changeAddressApi(id, obj)
    if (res.code == 1) {
      // 更新本地结果
      context.dispatch('updateAddressList')
      // 返回结果以进一步处理
      return res
    } else console.error('editAddress/changeAddressApi 失败', res)
  },
  
  async addNewAddress(context, obj) {
    const res = await addNewAddressApi(obj)
    if (res.code == 1) {
      // 更新本地结果
      context.dispatch('updateAddressList')
      // 返回结果以进一步处理
      return res
    } else console.error('addNewAddress/addNewAddressApi 失败', res)
  }
}

const mutations = {
  // 修改用户信息
  setUser(state, payload) {
    state.profile = payload
  },
  // 修改回跳地址
  setRedirectUrl(state, url) {
    state.redirectUrl = url
  },
  // 更新地址信息
  setAddress(state, payload) {
    state.address = payload
  },
  // 更新本地默认地址
  setDefaultAddress(state, id){
    state.address.forEach(addr => {
      addr.isDefault = (addr.id === id) ? 0 : 1
    })
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

