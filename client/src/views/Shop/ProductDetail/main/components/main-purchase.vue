<template>
    <van-goods-action class="purchase-tab">
      <van-goods-action-button @click="$emit('open')" class="purchase-button" color="#5BD3E9" type="warning" text="加入购物车" />
      <van-goods-action-button @click="$emit('open')" class="purchase-button" color="#F14242" type="danger" text="立即购买" />
    </van-goods-action>
</template>

<script>
export default {
  name: 'MainPurchase',
  props: {
    selectSku: Object,
  },

}
</script>

<style lang="less" scoped>
// <!--———— 3. 底部 ——————-->
// <!-- 按钮 加入购物车 购买 -->
.purchase-tab {
  // outline: solid;
  margin: 0 auto 20px;
  font-size: 18px;
  width: 300px;
  height: 46px;
  background-color: transparent;

  /deep/ .purchase-button {
    font-size: 16px;
  }
}
</style>