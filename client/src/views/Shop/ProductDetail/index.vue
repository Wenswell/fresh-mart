<template>
  <div class="product-div">
    <!--———— 1. 顶栏 ——————-->
    <!-- 顶部导航栏 返回icon 购物车icon -->
    <van-nav-bar class="top-nav-bar" :border="false" :fixed="true" @click-left="$router.back()"
      @click-right="$router.push('/layout/cart').catch(err => { err })">
      <template #left>
        <van-icon size="20" name="arrow-left" />
      </template>
      <template #right>
        <van-icon @click="$router.push('/layout/cart')" class="right-top-cart" size="20" name="shopping-cart-o"
          :badge="cartCount" />
      </template>
    </van-nav-bar>

    <!-- 顶部导航栏  商品 评价 详情  -->
    <van-tabs class="top-tab" v-model="activeName" type="card">
      <van-tab class="tab-content" title="商品" name="main">
        <AllMain :changeTab="changeTab" />
      </van-tab>
      <van-tab class="tab-content" title="评价" name="evaluate">
        <AllEvaluate />
      </van-tab>
      <van-tab class="tab-content" title="详情" name="specifics">
        <AllSpecifics />
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import AllMain from './main';
import AllEvaluate from './evaluate';
import AllSpecifics from './specifics';
export default {
  name: "ProductDetail",
  methods: {
    changeTab(newTab) {
      this.activeName = newTab
    },
  },
  computed: {
    cartCount() {
      return this.$store.getters['cart/getCartCount']
    }
  },
  components: {
    AllMain,
    AllEvaluate,
    AllSpecifics,
  },
  data() {
    return {
      activeName: 'main',
    }
  },
}
</script>

<style lang="less" scoped>
.top-tab {
  > :first-child {
    height: 0;
    display: flex;
    justify-content: center;

    > :first-child {
      position: fixed;
      z-index: 2;
      height: 50px;
      top: 0;
      border: none;
      background: transparent;

      /deep/ &>div {
        font-size: 17px;
        width: 60px;
        background: transparent;
        border: none;
        color: white;

        &[class*=active] {
          font-weight: bold;
        }

      }
    }

  }

}





// 页面容器
.product-div {
  background: url(https://blog0801-1319032318.cos.ap-shanghai.myqcloud.com/itemdetailback.png) fixed no-repeat 0 0 / 100% auto;
  position: absolute;
  width: 100vw;
  overflow: hidden;
  padding-top: 50px;
}

// <!--———— 1. 顶栏 ——————-->
// <!-- 顶部导航栏 返回 商品icon 评价 详情 购物车icon -->
.top-nav-bar {
  // background: transparent;
  z-index: 2;

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