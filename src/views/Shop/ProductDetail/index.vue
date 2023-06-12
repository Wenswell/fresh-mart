<template>
  <div class="product-div">
    <!--———— 1. 顶栏 ——————-->
    <!-- 顶部导航栏 返回 商品icon 评价 详情 购物车icon -->
    <van-nav-bar class="top-nav-bar" :border="false" :fixed="true" @click-left="$router.back()"
      @click-right="$router.push('/layout/cart').catch(err => { err })">
      <template #left>
        <van-icon size="20" name="arrow-left" />
      </template>
      <template #right>
        <van-icon @click="$router.push('/layout/cart')" class="right-top-cart" size="20" name="shopping-cart-o" :badge="cartCount" />
      </template>
      <template #title>
        <van-row type="flex" justify="center" gutter="45">
          <van-col @click="$router.replace('main').catch(err => { })" class="top-bar-opt" span="6">商品</van-col>
          <van-col @click="$router.replace('evaluate').catch(err => { })" class="top-bar-opt" span="6">评价</van-col>
          <van-col @click="$router.replace('specifics').catch(err => { })" class="top-bar-opt" span="6">详情</van-col>
        </van-row>
      </template>
    </van-nav-bar>

    <router-view />

  </div>
</template>

<script>
export default {
  name: "ProductDetail",
  computed: {
    cartCount() {
      return this.$store.getters['cart/getCartCount']
    }
  },
}
</script>

<style lang="less" scoped>
// 页面容器
.product-div {
  background: url(@/assets/images/itemdetailback.png) fixed no-repeat 0 0 / 100% auto;
  position: absolute;
  width: 100vw;
  overflow: hidden;
  padding-top: 50px;
}

// <!--———— 1. 顶栏 ——————-->
// <!-- 顶部导航栏 返回 商品icon 评价 详情 购物车icon -->
.top-nav-bar {
  // background: transparent;
  z-index: 10;

  .top-bar-opt {
    text-shadow: 1px 1px 5px #000;
  }

  .right-top-cart>div {
    border: none;
    height: 16px;
    line-height: 16px;
    padding-right: 1px;
  }
}
</style>