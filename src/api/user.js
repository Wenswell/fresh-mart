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
