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


// 购物车相关接口

export const mergeLocalCartApi = (localList) => {
  return request('/member/cart/merge', 'post', localList)
}

export const getCartListApi = () => {
  return request('/member/cart', 'get')
}

export const updateItemApi = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}

export const selectAllItemApi = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}

