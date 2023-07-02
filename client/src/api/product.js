// 商品相关接口

import request from '@/utils/require'

// 根据ID获取 商品详情
export const getProductDetailApi = ({ id }) => {
  return request('/goods', 'get', { id })
}

export const LOCALgetProductDetailApi = ({ id }) => {
  return request('/products/details', 'get', { id }, 'local')
}


// 根据ID获取 商品评价信息
export const getProductEvaluateApi = (id) => {
  return request(`/goods/${id}/evaluate`, 'get', {}, 'change')
}

// 根据ID获取 商品评价分页内容
export const getEvaluatePageApi = ({
  id,
  page = 1,
  pageSize = 10,
  hasPicture,
  tag,
  sortField,
  sortMethod,
}) => {
  const params = {
    page,
    pageSize
  }

  if (hasPicture) params.hasPicture = hasPicture;
  if (tag) params.tag = tag;
  if (sortField) params.sortField = sortField;
  if (sortMethod) params.sortMethod = sortMethod;

  return request(`/goods/${id}/evaluate/page`, 'get', params, 'change')
}


// 根据 skuID 加入购物车
export const addProductToCartApi = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}




// 获取商品


// 获取猜你喜欢商品
export const getGuessLikeProductApi = () => {
  return request('/home/goods/guessLike', 'get')
}

// 获取一级分类列表
export const getTopCategoryApi = () => {
  return request('/category/top', 'get')
}

// 特惠推荐分为了抢先尝鲜、新品预告
export const getPreferenceApi = () => {
  return request('/home/preference/mutli', 'get')
}

// 爆款推荐分为了 24 小时热榜，热销总榜，人气周榜
export const getInVogueApi = () => {
  return request('/home/inVogue/mutli', 'get')
}




// 搜索商品
// export const searchProductApi = ({  
//   keyword,
//   page = 1,
//   pageSize = 10,
//   onlyDiscount= false,
//   sortField = "",
//   sortMethod = "" 
// }) => {
//   return request(
//     '/search/all', 
//     'post', 
//     {
//       page, 
//       pageSize,
//       keyword,
//       onlyDiscount,
//       sortField,
//       sortMethod  
//     }
//   )
// }

export const get80discountApi = () => {
  return request(
    '/products/percent80',
    'get',
    {},
    'local',
  )
}

export const LOCALsearchProductApi = ({
  keyword,
  page = 1,
  pageSize = 10,
  onlyDiscount = false,
  sortField = "",
  sortMethod = ""
}) => {
  return request(
    '/products',
    'get',
    {
      page,
      pageSize,
      keyword,
      onlyDiscount,
      sortField,
      sortMethod
    },
    'local',
  )
}



// 收藏商品
export const collectProductApi = ({
  collectObjectIds = [],
  collectType = 1,
}) => {
  return request(
    '/member/collect',
    'post',
    {
      collectType,
      collectObjectIds,
    }
  )
}


// 获取收藏
export const getCollectObjApi = ({
  page = 1,
  pageSize = 10,
  collectType = 1,
}) => {
  return request(
    '/member/collect',
    'GET',
    {
      page,
      pageSize,
      collectType,
    }
  )
}


// 取消收藏
export const cancelCollectApi = ({
  ids = [],
  type = 1,
}) => {
  return request(
    '/member/collect/batch',
    'DELETE',
    {
      ids,
      type,
    }
  )
}

