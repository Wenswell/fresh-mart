import {
  toBuyNowApi,
  getAddressListApi,changeAddressApi,addNewAddressApi,
  createOrderApi,submitOrderApi,
  getHistoryApi, 
  getOrderListApi,getOrderDetailApi,rePurchaseApi,
  loginByPasswordApi,loginByVerifyNumberApi,
  updateProfileApi,
} from "@/api/user"


// 用户模块
const state = {
  // 用户信息
  profile: {
    "avatar": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png",
    "nickname": "技通武林玉面君子",
    "account": "慕容复",
    "gender": "男",
    "birthday": "1357-02-04",
    "cityCode": "320500",
    "provinceCode": "320000",
    "profession": "南・慕・容"
},

  collect: {},

  address: [],

  order: '',

  payorder: {},

  // 登录后回跳路径
  redirectUrl: '/'
}

const getters = {

  // 获取部分用户信息用于修改
  getUserInfo(state){
    // eslint-disable-next-line no-unused-vars
    const { token,mobile,id, ...other } = state.profile
    return other
  },

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

  //修改个人信息
  async updateProfile(context, newObj){
    const allProfile = {...context.state.profile,...newObj}
    const { nickname, gender, birthday, cityCode, provinceCode, countyCode, profession } = allProfile;
    const profile = {nickname,gender,birthday,cityCode,provinceCode,countyCode,profession};
    const res = await updateProfileApi(profile)
    context.commit('setUser', res.result)
    return res.code
  },

  // 登录
  async registerByPasswdVerify(context, {type,phoneNum,verifyNum,passWd}){
    const res = type =='login' 
    ? await loginByPasswordApi(phoneNum, passWd)
    : await loginByVerifyNumberApi(phoneNum, verifyNum)
    
    // 将返回的user数据（包括token）存放到 Vuex 的 Store 中
    context.commit('setUser', res.result)
    context.dispatch('updateAddressList')
    return res
  },

  //获取订单列表
  async getOrder(context, {page, orderState}){
    console.log("orderState", orderState)
    //订单状态，1 为待付款、2 为待发货、3 为待收货、4 为待评价、5 为已完成、6 为已取消，未传该参数或 0 为全部
    const res = await getOrderListApi({page:page, orderState:orderState})
    return res.result
  },

  //获取单个订单的详情
  async getOrderDatail(context, orderId){
    const res = await getOrderDetailApi(orderId)
    return res.result
  },
  
  // 再次购买 -> 订单详情
  async rePurchase(context, orderId){
    const res = await rePurchaseApi(orderId)
    context.commit('setOrder', res.result)
    return 'done'
  },
  

  

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
    return 'done'
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

