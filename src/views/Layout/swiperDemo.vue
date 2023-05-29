<template>
  <div class="my-swiper">
    <swiper :options="swiperOptions" :pagination="true">
      <swiper-slide v-for="item in bannerImgList" :key="item"><img
          :src="item" class="swiper-img"/></swiper-slide>
      <div class="swiper-pagination aasasas" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "MySwiper",
  data() {
    return {
      items: [
        { image: "https://picsum.photos/id/1018/500/300" },
        { image: "https://picsum.photos/id/1019/500/300" },
        { image: "https://picsum.photos/id/1020/500/300" },
        { image: "https://picsum.photos/id/1021/500/300" }
      ],
      swiperOptions: {
        slidesPerView: 3,
        grabCursor: true,
        centeredSlides: true,
        autoplay: {
          delay: 250,
          disableOnInteraction: false,
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      },
    };
  },

};
</script>

<style lang="less" scoped>

// 
.swiper-container {
  width: 100vw;
}

.swiper-pagination-bullet {
  background-color: #fff;
}

/deep/.aasasas .swiper-pagination-bullet-active {
  background-color: #ff0;
}

.swiper-button-prev,
.swiper-button-next {
  color: #fff;
  font-size: 20px;
}

.swiper-button-prev:before,
.swiper-button-next:before {
  content: "";
  background-repeat: no-repeat;
  background-size: contain;
  width: 20px;
  height: 20px;
}
</style>