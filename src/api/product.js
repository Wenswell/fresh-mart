// 商品相关接口

import request from '@/utils/require'

// 根据ID获取 商品详情
export const getProductDetailApi = ({id}) => {
  return request('/goods', 'get', {id})
}

// 根据ID获取 商品评价信息
export const getProductEvaluateApi = (id) => {
  return request(`/goods/${id}/evaluate`, 'get', {}, 'change')
}

// 根据ID获取 商品评价分页内容
export const getEvaluatePageApi = (id, page, pageSize) => {
  return request(`/goods/${id}/evaluate/page`, 'get', {page, pageSize}, 'change')
}


// 根据 skuID 加入购物车
export const addProductToCartApi = ({ skuId, count }) => {
  return request(`/member/cart`, 'post', { skuId, count })
}




// 获取商品


// 获取猜你喜欢商品
export const getGuessLikeProductApi = () => {
  return request(`/home/goods/guessLike`, 'get')
}
