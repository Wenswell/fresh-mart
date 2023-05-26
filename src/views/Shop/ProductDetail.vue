<template>
  <div class="product-div">

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


    <!-- <swiper-container 
    :grab-cursor="true"
    :slides-per-view="1.3"
    :centered-slides="true" 
    :space-between="30"
    effect="coverflow"
    :coverflow-effect-scale ="1"
    :coverflow-effect-depth="1000"
    :coverflow-effect-rotate="0"
    :coverflow-effect-stretch="3"
    :coverflow-effect-modifier="1"
    :coverflow-effect-slideShadows="false"

    :pagination="false"
     :modules="modules"
      class="my-swiper-two"> -->

    <swiper-container :grab-cursor="true" :slides-per-view="1.5" :centered-slides="true" :space-between="0"
      :pagination="true" class="swiper-container">
      <swiper-slide class="swiper-slide" v-for="item in images" :key="item"><img :src="item" /></swiper-slide>
    </swiper-container>



  </div>
</template>

<script>
import tdata from '@/assets/test-data.json'
import { register } from 'swiper/element/bundle';


register();


export default {
  data() {
    return {
      secKillProductList: tdata.secKillProductList,
      productId: "",
      productIdInfo: "",
      value: 2,
      images: [
        'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2208161521967/O1CN01EJ689a1QOvsm0SaXE_!!2208161521967.jpg',
        'https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2208161521967/O1CN01dmIrTn1QOvnsq1y9J_!!2208161521967.jpg',
        'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2208161521967/O1CN01IKwLpO1QOvsc5GY6b_!!2208161521967.jpg',
        'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2208161521967/O1CN01VUYlpN1QOvsb3A3iI_!!2208161521967.jpg',
        'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2208161521967/O1CN01dlbvB01QOvoA3yVZb_!!2208161521967.jpg',
        'https://img.alicdn.com/imgextra/i4/880734502/O1CN01WRjUlw1j7xvqWdoCm_!!0-item_pic.jpg',
        'https://img.alicdn.com/imgextra/i3/880734502/O1CN01Y4YtHS1j7xvTvcMaV_!!880734502.jpg',
        'https://img.alicdn.com/imgextra/i2/880734502/O1CN01GEh5CT1j7xur5MZvs_!!880734502.jpg',
        'https://img.alicdn.com/imgextra/i4/880734502/O1CN01DTWe5Z1j7xt4au5G3_!!880734502.jpg',
        'https://img.alicdn.com/imgextra/i4/880734502/O1CN01DTWe5Z1j7xt4au5G3_!!880734502.jpg',
        'https://img.alicdn.com/imgextra/i4/880734502/O1CN01lX4tTE1j7xu5woC6r_!!880734502.jpg'
      ],
      mySwiper: '',

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
  overflow: hidden;
}

.top-nav-bar {
  background: transparent;
}

.swiper-container {
  // outline: solid;
  margin: 10px 0;
  overflow: visible;
}



.swiper-slide {
  transition: 300ms;
  align-items: center;
  display: flex;
  justify-content: center;
  transform: scale(0.8);
  height: 250px;
  box-shadow: 0px 4px 10px #122e7447;
  background-color: white;
  border-radius: 5px;

  & img {
    height: 100%;
    // 可能会裁剪图片 ( 设备宽度 != 375px ) 
    object-fit: cover;
    flex: 1;
  }

}

// 当前图片恢复大小
.swiper-slide-active {
  transform: scale(1);
}

.swiper-pagination{
  margin-bottom: 10px;
  outline: solid;
}
</style>