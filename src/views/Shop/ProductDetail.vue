<template>
  <div class="product-div">
    <van-button type="primary" to="a">路由跳转 to id=a</van-button>
    <van-button type="primary" to="c">路由跳转 to id=c</van-button>
    <!-- 
    <van-button type="primary" to="3">路由跳转 to id=3</van-button>
    <van-button type="primary" to="4">路由跳转 to id=4</van-button>
    <van-button type="primary" to="5">路由跳转 to id=5</van-button>
    <van-button type="primary" to="6">路由跳转 to id=6</van-button> -->

    <van-nav-bar class="top-nav-bar" :border="false" @click-left="toBack" @click-right="toCart">
      <template #left>
        <van-icon size="20" name="arrow-left" />
      </template>
      <template #right>
        <van-icon size="20" name="shopping-cart-o" />
      </template>
      <template #title>
        <van-row type="flex" justify="center" gutter="45">
          <van-col span="6">商品</van-col>
          <van-col span="6">评价</van-col>
          <van-col span="6">详情</van-col>
        </van-row>
      </template>
    </van-nav-bar>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :loop="false" :width="300">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

  </div>
</template>

<script>
import tdata from '@/assets/test-data.json'


export default {
  data() {
    return {
      secKillProductList: tdata.secKillProductList,
      productId: "",
      productIdInfo: "",
      value: 2,
    }
  },
  created() {
    // 获取动态路由参数 
    this.productId = this.$route.params.id
    this.getProductById(this.productId)
  },
  watch: {
    '$route.params.id'(newId, oldId) {
      // 当路由参数改变时,重新获取商品详情数据
      this.productId = newId
      this.getProductById(this.productId)
      console.log(`id changed from ${oldId} to 【 ${newId} 】`);
    }
  },
  methods: {
    getProductById(id) {
      const theProductInfo = this.secKillProductList.find(item => item.id === id);
      console.dir(theProductInfo);
      return theProductInfo
    },
    toBack() {
      console.log("toBack")
    },
    toCart() {
      console.log("toCart")
    },

  },
  computed: {

  },
}
</script>

<style lang="less" scoped>
.product-div {
  background: url(@/assets/images/itemdetailback.png) no-repeat 0 0 / 100%;
  position: absolute;
  width: 100vw;
  height: 100%;
}

.top-nav-bar {
  background: transparent;
}

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .my-swipe{
    margin-left: 10px;
  }

</style>