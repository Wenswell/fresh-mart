<template>
  <div ref="swiper" class="swiper">
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide" v-for="(item, index) in bannerImg" :key="index">
        <img :src="item" class="swiper-img" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  name: "HomeSwiper",
  // props: {
  //   imgList: Array,
  // },
  
  data() {
    return {
      swiper: null,
      bannerImg: [],
    };
  },

  beforeCreate() {
    api.images.getHomeBanner().then((res) => {
      const srcs = res.result.images
        .filter((item) => item.position === "homeBanner")
        .map((item) => item.src)
        .concat();
      this.bannerImg = [
//        "http://192.168.1.5:8333/images/homeTopBanner01.png",
        "http://124.221.124.116/server/images/homeTopBanner01.png",
        ...srcs,
      ];
    });
  },

  mounted() {
    setTimeout(() => {
      this.swiper = new this.$swiper(this.$refs.swiper, {
        loop: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        speed: 2000,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }, 250); // quick fix 
  },

  beforeDestroy() {
    this.swiper.destroy();
    this.swiper = null;
  },
};
</script>

<style lang="less" scoped>
// 上方轮播图
.swiper {
  height: 100px;
  max-width: 375px;
  margin: auto;

  img {
    /* 图片居中填充 */
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  /deep/ .swiper-pagination {
    text-align: end;
    right: 25px;
    left: auto;
    // outline: solid;
    width: max-content;

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
