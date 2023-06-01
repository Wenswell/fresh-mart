// 购物车相关接口

import request from '@/utils/require'

// 合并购物车 未登录时使用
export const mergeLocalCartApi = (localList) => {
  return request('/member/cart/merge', 'post', localList)
}

// 从服务器获取 购物车数量
export const getCartCountApi = () => {
  return request('/member/cart/count', 'get')
}

// 从服务器获取 购物车全部信息
export const getCartListApi = () => {
  return request('/member/cart', 'get')
}

// 更新服务器购物车信息
export const updateItemApi = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}

// 服务器购物车 全选/全部取消
export const selectAllItemApi = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}
