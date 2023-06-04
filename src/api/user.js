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
  return request('/member/address', 'get' )
}

// 地址 修改原有地址
export const changeAddressApi = (id, newObj) => {
  return request(`/member/address/${id}`, 'PUT', newObj)
}

// 地址 删除地址
export const deleteAddressApi = (id) => {
  return request(`/member/address/${id}`, 'DELETE' )
}