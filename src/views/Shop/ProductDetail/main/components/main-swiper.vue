<template>
    <!-- 轮播图 商品图片 -->
    <div ref="swiper" class="swiper">
      <div v-if="!imgList" style="height: 420px;">
        加载中...
      </div>
      <div class="swiper-wrapper">
        <!-- Slides -->
        <!-- <div class="swiper-slide" v-for="(item,index) in product.item.images" :key="index"><img :src="item" class="swiper-img" /> -->
        <div class="swiper-slide" v-for="(item, index) in imgList" :key="index"><img :src="item" class="swiper-img" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
</template>

<script>

export default {
  name: 'MainSwiper',
  props: {
    imgList: Array,
  },
  methods: {
    // 构建轮播图
    creatNewSwiper() {
      // console.log("this.$refs.swiper", this.$refs.swiper)
      new this.$swiper(this.$refs.swiper, {

        // 已全局注册
        // modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1.5,
        spaceBetween: 10,

        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 13 * 1000,
          disableOnInteraction: false,
        },
        // speed: 2 * 1000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      })
    },
  },

}
</script>

<style lang="less" scoped>
// <!-- 轮播图 商品图片 -->
.swiper {
  .swiper-slide {
    transition: 300ms;
    // align-items: center;
    display: flex;
    // justify-content: center;
    transform: scale(0.85);
    // height: 250px;
    // width: 250px;
    box-shadow: 0px 4px 10px #122e7447;
    background-color: white;
    border-radius: 5px;
    margin-top: 20px;
  }

  .swiper-slide-active {
    transform: scale(1);
    margin: 0 0 20px;
  }

  img {
    /* 图片居中填充 */
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
  }

  /deep/ .swiper-pagination {
    width: max-content;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;


    // outline: solid;
    .swiper-pagination-bullet {
      background-color: #000;
      width: 10px;
      height: 10px;
      margin-right: 2px;
      opacity: 0.35;
    }

    .swiper-pagination-bullet-active {
      background-color: #fff;
      opacity: 1;
    }
  }
}
</style>