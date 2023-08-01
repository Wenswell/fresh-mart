<template>
  <div class="home-page">
    <!--———— 1. 顶栏 ——————-->
    <HomeSearch :location="locationStr" />

    <!-- 为顶栏占位 -->
    <div style="height: 40px"></div>

    <!--———— 2.1. 主体 轮播图 ——————-->
    <!-- <HomeSwiper :imgList="bannerImgList" /> -->
    <keep-alive>
    <HomeSwiper />
    </keep-alive>

    <!--———— 2.2. 主体 分类导航 ——————-->
    <HomeCategory />

    <!--———— 2.3. 主体 新用户广告 ——————-->
    <keep-alive>
    <van-image
      width="100%"
      :src="'https://blog0801-1319032318.cos.ap-shanghai.myqcloud.com/capsuleAd.png'"
      @click="$toast('新用户注册')"
    />
    </keep-alive>

    <!--———— 2.4 主体 限时折扣 ——————-->
    <keep-alive>
    <HomeDiscount />
    </keep-alive>

    <!--———— 2.5 主体 团购/秒杀入口 ——————-->
    <HomeButtom />
  </div>
</template>

<script>
import HomeSearch from "./components/home-search";
import HomeSwiper from "./components/home-swiper";
import HomeCategory from "./components/home-category";
import HomeDiscount from "./components/home-discount";
import HomeButtom from "./components/home-buttom";

export default {
  name: "HomePage",
  components: {
    HomeSearch,
    HomeSwiper,
    HomeCategory,
    HomeDiscount,
    HomeButtom,
  },

  data() {
    return {
      locationStr: "天河区",
      guesslikeproduct: [],
    };
  },
};
</script>

<style lang="less" scoped>
.home-page {
  margin-bottom: 70px;
}
</style>