// 购物车相关接口

import request from '@/utils/require'

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
