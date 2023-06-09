// 用户相关的接口

import request from '@/utils/require'

// 
// 获取手机号的短信验证码
// @param {String} mobile - 手机号
// @param {String} type - 发送短信类型，取值范围 [register, login]
// @returns promise
// 
export const getVerifyCodeApi = (mobile, type) => {
  return request('/login/code', 'get', { mobile, type })
}


export const loginByVerifyNumberApi = (mobile, code) => {
  return request('/login/code', 'post', { mobile, code })
}


export const loginByPasswordApi = (account, password) => {
  return request('/login', 'post', { account, password })
}



// 地址 添加新地址 -> 得到id
export const addNewAddressApi = (newObj) => {
  return request('/member/address', 'post', newObj)
}

// 地址 获取所有地址列表
export const getAddressListApi = () => {
  return request('/member/address', 'get')
}

// 地址 修改原有地址
export const changeAddressApi = (id, newObj) => {
  console.group("changeAddressApi", changeAddressApi)
  console.log("id", id)
  console.log("newObj", newObj)
  console.groupEnd()
  return request(`/member/address/${id}`, 'PUT', newObj)
}

// 地址 删除地址
export const deleteAddressApi = (id) => {
  return request(`/member/address/${id}`, 'DELETE')
}


// 获取历史记录
export const getHistoryApi = ({
  page = 1,
  pagSize = 10,
}) => {
  return request('/member/browseHistory', 'GET', {
    page,
    pagSize,
  })
}





//订单 立即购买 单件商品
export const toBuyNowApi = ({
  skuId,
  count = 1,
  addressId,
}) => {
  return request('/member/order/pre/now', 'GET', {
    skuId,
    count,
    addressId,
  })
}



// 生成订单 购物车结算
export const createOrderApi = () => {
  return request('/member/order/pre', 'GET')
}



// 提交订单 

export const submitOrderApi = (obj) => {
  return request('/member/order', 'POST', obj)
}



// 支付 - 支付宝 - APP用

export const toPayViaAliPayApi = (id) => {
  return request('/pay/aliPay/app', 'GET', {orderId:id})
}

// 支付 模拟支付

export const mockPayApi = (id) => {
  return request('/pay/mock', 'GET', {orderId:id})
}



// 获取订单列表

export const getOrderListApi = ({
  page = 1,
  orderState = 0,
  //订单状态，1 为待付款、2 为待发货、3 为待收货、4 为待评价、5 为已完成、6 为已取消，未传该参数或 0 为全部
  pagSize = 10,
}) => {
  return request('/member/order', 'GET', {
  page,
  pagSize,
  orderState,
  })
}


// 获取单个订单的详细信息
export const getOrderDetailApi = (id) => {
  return request(`/member/order/${id}`, 'GET', {id})
}


// 订单id -> 再次购买
export const rePurchaseApi = (id) => {
  return request(`/member/order/repurchase/${id}`, 'GET', {id})
}

