<template>
  <div class="my-swiper">
    <swiper :options="swiperOptions" :pagination="true">
      <swiper-slide v-for="(item, index) in items" :key="index">
        <img :src="item.image" class="swiper-img" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "@/utils/swiper";


export default {
  name: "MySwiper",
  components: {
    Swiper,
    SwiperSlide
  },
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
                  grabCursor:true,
                  spaceBetween: 50,
                  centeredSlides: true,
                  autoplay: {
                      delay: 2500,
                      disableOnInteraction: false
                  },
                  loop: true,
                  pagination: {
                      el: '.swiper-pagination',
                      clickable: true
                  },
                  navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev'
                  },
              },
    };
  },

};
</script>

<style lang="less" scoped>

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-pagination-bullet {
  background-color: #fff;
}

/deep/ .swiper-pagination-bullet-active {
  background-color: #333;
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