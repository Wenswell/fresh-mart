import { getCartListApi,updateItemApi,selectAllItemApi } from "@/api/user";
// import { reject, resolve } from "core-js/fn/promise";


// 购物车模块
const state = {
  // 购物车商品列表
  list: [
  //   {
  //     "id": "1369155859933827074",
  //     "skuId": "1369155866451775490",
  //     "name": "钻石陶瓷涂层多用锅18cm 小奶锅",
  //     "attrsText": "颜色:蓝色 产地:中国 尺寸:30cm ",
  //     "specs": [],
  //     "picture": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-05/6fdcac19-dd44-442c-9212-f7ec3cf3ed18.jpg",
  //     "price": "128.00",
  //     "nowPrice": "128.00",
  //     "nowOriginalPrice": "128.00",
  //     "selected": false,
  //     "stock": 99957,
  //     "count": 5,
  //     "isEffective": true,
  //     "discount": null,
  //     "isCollect": false,
  //     "postFee": 0
  //   },
  //   {
  //     "id": "1369155859933827074",
  //     "skuId": "1369155868389543937",
  //     "name": "钻石陶瓷涂层多用锅18cm 小奶锅",
  //     "attrsText": "颜色:蓝色 产地:日本 尺寸:20cm ",
  //     "specs": [],
  //     "picture": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-05/6fdcac19-dd44-442c-9212-f7ec3cf3ed18.jpg",
  //     "price": "128.00",
  //     "nowPrice": "128.00",
  //     "nowOriginalPrice": "128.00",
  //     "selected": true,
  //     "stock": 99948,
  //     "count": 4602,
  //     "isEffective": true,
  //     "discount": null,
  //     "isCollect": false,
  //     "postFee": 0
  //   }
  ]
}

const getters = {
  hasUnchecked(state) {
    return state.list.every(item => item.selected)
  },
  updateTotalPrice(state) {
    let sum = 0
    state.list.forEach(item => {
      if (item.selected) {
        sum += item.nowPrice * item.count
      }
    })
    return sum 
},
}

const actions = {

  selectAllItem(context, selected){
    
    const ids = context.state.list.map(item => item.skuId)
    selectAllItemApi({selected, ids})
    context.commit('selectAllItemLocal',{selected})

  },
  updateCart(context, { skuId, payload }){
    console.log("------updateCart start-------")
    return new Promise((resolve) => {
      console.log(context)
      // console.log(skuId)
      // console.log(payload)
      // console.log({skuId, payload})
      console.log({skuId, ...payload})
      // updateItemApi = ({ skuId, selected, count })
      updateItemApi({skuId, ...payload})
      context.commit('updataItemLocal',{skuId, ...payload})
      
      resolve()
      console.log("------updateCart end-------")
    })
  },
  async mergeCart(context) {
    console.log("------async getWholeCartList start-------")
    
    // 加载时先上传本地购物车列表
    console.log("local list: ")
    console.log(context.state.list)
    // let res1 = await mergeLocalCartApi(context.state.list)
    // console.log("mergeLocalCartApi result: ")
    // console.log(res1)

    
    // 再获取服务端完整列表
    let res2 = await getCartListApi()
    
    // res2.result 即 购物车列表
    console.log("getCartListApi result: ")
    console.log(res2.result)
    this.cartListFromApi = res2.result
    
    // eslint-disable-next-line no-undef
    context.commit('setCart', res2.result)
    console.log("------async getWholeCartList end-------")
  },
}

const mutations = {

  selectAllItemLocal(context, selected) { 
    // context.state.list.forEach(item => {
      context.list.forEach(item => {
      console.log("selectAllItemLocal")
      console.log("item: ")
      console.log(item)
      console.log("selected: ")
      console.log(selected.selected)
      item.selected = selected.selected
    })
  } ,
  updataItemLocal(context, { skuId, payload }) { 
    // context.state.list.forEach(item => {
    context.list.forEach(item => {
      if (item.skuId === skuId){
        Object.assign(item, payload)  
        console.log("item: ")
        console.log(item)
        console.log("payload: ")
        console.log(payload)
      }
    })
  } ,

  // 修改购物车信息
  setCart (state, payload) {
    state.list = payload
  },
  changeSku(state, { skuId, payload }) {
    console.log("changeSku")
    console.log(state)
    console.log(skuId)
    console.log(payload)
    
    state.list.forEach(item => {
      if (item.skuId === skuId) {
        if (payload.type === 'increment') {
          item.count++
        } else if (payload.type === 'decrement') {
          item.count--
        } else {
          // 选中/取消选中
          console.log(item);
          console.log("item.selected: "+item.selected);
          console.log("typeof(item.selected: "+typeof(item.selected));
          let constant = item.selected ? false : true;
          console.log("constant: "+constant);
          item.selected = false;
          console.log("item.selected: "+item.selected);
          console.log(item.selected);
        }
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}