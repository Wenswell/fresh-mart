import {toBuyNowApi,getAddressListApi,changeAddressApi,addNewAddressApi,createOrderApi,submitOrderApi,getHistoryApi} from "@/api/user"


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

  collect: {},

  address: [],

  order: '',

  payorder: {},

  // 登录后回跳路径
  redirectUrl: '/'
}

const getters = {

  // 获取用户名、头像
  getUserNameImg(state){
    return {name:state.profile.account,img:state.profile.avatar}
  },

  // 获取历史记录数量
  async getHistoryNum(){
    return await getHistoryApi({})
  },

  //获取收藏数量
  getCollectNum(state){
    return state.collect.counts
  },

  getCollect(state){
    return state.collect
  },

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

  // 获取订单【支付】信息
  getToPayOrderInfo(state) {
    return state.payorder
  },

  // 获取更新所需提交的订单信息
  getToBuyOrderToUpdateInfo(state){
    console.log("getToBuyOrderToUpdateInfo state", state)
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

  //获取历史记录
  async getHistoryPage(context, page){
    const res = await getHistoryApi({page:page})
    // return await getHistoryApi({})
    // console.log("res", res)
    return res.result
  },

  
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

  // 更新订单信息
  async toBuyNowUpdateOrder(context, updateObj){
    console.log("[[]]toBuyNowUpdateOrder", updateObj)
    const newOrderInfo = {...context.getters['getToBuyOrderToUpdateInfo'], ...updateObj}
    const res = await toBuyNowApi(newOrderInfo)
    context.commit('setOrder', res.result)
  },

  //购物车提交订单
  async createOrder(context) {
    const res = await createOrderApi()
    context.commit('setOrder', res.result)
  },

  //更改多件商品的地址
  async editCreatedOrder(context, id) {
    const addressObj = context.getters['getAddressById'](id)
    const orderObj = context.getters['getToBuyOrderInfo']
    // orderObj.userAddresses.unshift (addressObj)
    orderObj.userAddresses = [addressObj]
    context.commit('setOrder', orderObj)
  },

  //提交订单->付款
  async submitOrderApi(context, obj){
    const res = await submitOrderApi(obj)
    console.log("提交订单->付款 结果res", res)
    context.commit('setpayorder', res.result)
  },



  // 更新地址列表
  async updateAddressList(context) {
    const res = await getAddressListApi()
    if (!res.result.length) console.log('用户地址列表为空')
    context.commit('setAddress', res.result)
  },

  // 改变默认地址
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

  // 编辑现有地址
  async editAddress(context, [id, obj]) {
    const res = await changeAddressApi(id, obj)
    if (res.code == 1) {
      // 更新本地结果
      context.dispatch('updateAddressList')
      // 返回结果以进一步处理
      return res
    } else console.error('editAddress/changeAddressApi 失败', res)
  },
  
  //添加新地址
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
  // 保存收藏信息
  setCollect(state,newObj){
    // 初始化
    if(newObj.page == 1) {
      state.collect = newObj
      // 只有加载数据更新才会更新本地数据
    } else if (newObj.page > state.collect.page) {
      state.collect = {
        ...newObj,
        items: [
          // 保留顺序合并
          ...state.collect.items.map(item => ({ ...item })) ,   
          ...newObj.items.map(item => ({ ...item }))   
        ]  
      }
    }
    console.groupEnd()
  },

  
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
  //保存待支付订单信息
  setpayorder(state, result) {
    state.payorder = result
    console.log("NOW -+- state.payorder", state.payorder)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

