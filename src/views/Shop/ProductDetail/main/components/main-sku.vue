<template>
  <van-sku class="sku-div" v-model="skuShow" :sku="sku" :goods="goods" :goods-id="sku.collection_id" :quota="0"
    :quota-used="0" :hide-stock="sku.hide_stock" @sku-prop-selected="changeSelectedSku" @sku-selected="changeSelectedSku"
    @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked">
    <template #sku-body-top>
      <ShowAddressCard :showAddressList="showAddressList" :chosenAddressId="chosenAddressId"></ShowAddressCard>
    </template>
  </van-sku>
</template>

<script>
import ShowAddressCard from '../../../ShowAddressCard.vue'
export default {
  name: 'MainSku',
  components: {
    ShowAddressCard,
  },
  props: {
    sku: Object, // 【主要】 result过滤后的 商品sku及数量 
    goods: Object, // 默认商品 sku 缩略图
    showAddressList: Array, // 收货信息地址，只用于展示
    chosenAddressId: String,// 接收选择的地址id

  },
  data() {
    return {
      skuShow: false,  //打开sku弹窗
      selectSku: '',   // 选中的sku
    }
  },
  methods: {

    // 获取选择的sku用于展示
    changeSelectedSku(res) {
      let result = ''
      for (let key in res.selectedSku) {
        let value = res.selectedSku[key] || "未选择"
        result += `${key}：${value}；`
      }
      result = result.slice(0, -1) // 去除最后一个";"号
      console.log("result", result)
      this.selectSku = result
    },
    // 加入购物车 - 已选sku
    onAddCartClicked(data) {
      console.log("onAddCartClicked", data)
      // console.log("onAddCartClicked", data)
      this.$toast('skuid:' + data.selectedSkuComb.id + '\n添加成功');
      // 加入购物车
      this.$store.dispatch('cart/addProductToCart', { 'skuId': data.selectedSkuComb.id, 'count': data.selectedNum })
      // 关闭sku展示
      this.skuShow = false
      // 更新购物车数量
      // this.getCartCount()
    },

    // 直接购买 - 已选sku
    onBuyClicked(data) {
      console.log("onBuyClicked", data)
      // console.log("onBuyClicked", JSON.stringify(data))
      this.$toast('skuid:' + data.selectedSkuComb.id + '\n地址id:' + this.chosenAddressIndex + '\n直接前往购买');
      // 直接提交订单 - 在vuex中完成
      this.$store.dispatch('user/toBuyNow', {
        skuId: data.selectedSkuComb.id,
        count: data.selectedNum,
        addressId: this.chosenAddressId,
      })
      // 提交后转到订单页面
      this.$router.push('/order/check')
    },
  },
}
</script>

<style lang="less">

// <!--———— 4. 弹窗 ——————-->
// <!-- 商品详情 sku -->
.sku-div {
  max-height: 75%;

  &>div:first-child {
    &>div:last-child {
      margin-left: 130px;
    }

    &>div:first-child {
      width: 125px;
      height: 125px;
      border: 5px solid #5AD4EA;
      margin: 12px 12px 12px 0;
      overflow: hidden;
      border-radius: 15px;
      position: absolute;
      bottom: 5px;
      background-color: #fff;
    }
  }

  &>div:nth-child(2) {
    *[class*=active] {
      background: #5AD4EA;
      color: white;
    }
  }

  &>div:nth-child(3) {
    button:first-child {
      background: #5AD4EA;
    }
  }
}
</style>