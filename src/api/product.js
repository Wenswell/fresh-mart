// 商品相关接口

import request from '@/utils/require'

// 根据ID获取商品详情
export const getProductDetailApi = ({id}) => {
  return request('/goods', 'get', {id})
}

export const getProductEvaluateApi = (id) => {
  return request(`/goods/${id}/evaluate`, 'get', {id})
}
