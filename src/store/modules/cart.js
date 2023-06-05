import { getCartListApi, updateItemApi, selectAllItemApi,getCartCountApi } from "@/api/cart";

// 购物车模块

// 购物车商品列表
const state = {
  list: []
}

const getters = {

  async getCartCount() {
    const res = await getCartCountApi();
    // console.log("res.result", res.result)
    return res.result.count;
  },

  // 有效商品 列表
  validList(state) {
    // 有效商品: 有库存、isEffective
    return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
  },

  // 有效商品 && 选中的商品 列表
  validSelectedList(state, getters) {
    return getters.validList.filter(valid => valid.selected)
  },

  // 是否全选商品
  isCheckAll(state, getters) {
    // 1. 有效商品不为 0
    // 2. 有效商品全部选中
    return getters.validList.length !== 0 && getters.validSelectedList.length === getters.validList.length
  },

  // 计算 有效&&选中商品 价格
  validSelectedPrice(state) {
    let sum = 0
    state.list.forEach(item => {
      if (item.selected && item.isEffective) {
        sum += item.nowPrice * item.count
      }
    })
    return sum
  },
}

const actions = {

  // 全选 / 全部取消
  selectAllItem(context, selected) {
    // 得到有效商品的 skuId 列表 
    const ids = context.getters.validList.map(item => item.skuId)
    // 更新服务器数据
    selectAllItemApi({ selected, ids })
    // 更新本地数据
    context.commit('selectAllItemLocal', { selected, list:context.getters.validList })
  },
  updateCart(context, { skuId, payload }) {
    console.log("------updateCart start-------")
    return new Promise((resolve) => {
      console.log(context)
      // console.log(skuId)
      // console.log(payload)
      // console.log({skuId, payload})
      console.log({ skuId, ...payload })
      // updateItemApi = ({ skuId, selected, count })
      updateItemApi({ skuId, ...payload })
      context.commit('updataItemLocal', { skuId, ...payload })

      resolve()
      console.log("------updateCart end-------")
    })
  },
  async mergeCart(context) {
    // console.log("------async getWholeCartList start-------")

    // 【未登录时】加载时先上传本地购物车列表
    // console.log("local list: ")
    // console.log(context.state.list)
    // let res1 = await mergeLocalCartApi(context.state.list)
    // console.log("mergeLocalCartApi result: ")
    // console.log(res1)

    // 获取服务端完整列表
    let res2 = await getCartListApi()

    // res2.result 即 购物车列表
    // console.log("getCartListApi result: ")
    // console.log(res2.result)
    this.cartListFromApi = res2.result

    // eslint-disable-next-line no-undef
    context.commit('setCart', res2.result)
    console.log("------async getWholeCartList end-------")
  },
}

const mutations = {

  // 修改本地的有效物品全选状态
  selectAllItemLocal(state, payload) {
    payload.list.forEach(item => {
      item.selected = payload.selected
    })
  },

  // 更新本地物品信息 数量 // 选中
  updataItemLocal(context, { skuId, payload }) {
    context.list.forEach(item => {
      if (item.skuId === skuId) {
        Object.assign(item, payload)
        console.log("item: ")
        console.log(item)
        console.log("payload: ")
        console.log(payload)
      }
    })
  },

  // 更新购物车列表
  setCart(state, payload) {
    state.list = payload
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}