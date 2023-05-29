<template>
  <div>
    <van-sticky>
      <van-search class="top-search" v-model="searchStr" show-action shape="round" background="#fff0"
        placeholder="请输入搜索关键词" @search="onSearch">
        <template #left-icon>
          <van-icon class="search-ico" name="search" />
        </template>
        <template #action>
          <div class="location">
            <van-icon name="location" color="#DAF8FF" size="16px" />
            <span class="location-text">{{ locationStr }}</span>
          </div>
        </template>
      </van-search>
    </van-sticky>

    <!-- 顶部轮播 -->
    <!-- <swiper :options="swiperOptions">
      <swiper-slide v-for="(item,index) in bannerImgList" :key="index"><img :src="item" class="swiper-img" /></swiper-slide>
      <div class="swiper-pagination home-page-swiper" slot="pagination"></div>
    </swiper> -->

    <!-- 顶部轮播 -->
    <!-- <van-swipe class="my-swipe" :autoplay="10000" indicator-color="white">
      <van-swipe-item><van-image width="100%" :src="require('@/assets/images/topAd0.png')" /></van-swipe-item>
      <van-swipe-item><van-image width="100%" :src="require('@/assets/images/topAd0.png')" /></van-swipe-item>
    </van-swipe> -->

    <!-- 顶部轮播 -->
    <!-- Slider main container -->
    <div ref="swiper" class="swiper">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" v-for="(item,index) in bannerImgList" :key="index"><img :src="item" class="swiper-img" /></div>
      </div>

      <!-- Navigation arrows -->
      <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->

      <div class="swiper-pagination"></div>
    </div>


    <!-- 上方分类导航 -->
    <van-cell-group class="cell-group product-info" inset>
      <van-grid :column-num="5" :border="false">
        <van-grid-item class="top-category" v-for="item in homeCatalog" :key="item.route" @click="toThisPage(item.route)">
          <div class="top-category-ico"></div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 上方分类导航 -->
    <!-- <div class="top-grid">
      <van-grid :column-num="5" :gutter="5" square :border="false">
        <van-grid-item
          v-for="value in gridItemList"
          :key="value"
          @click="toThisCont(value)"
        />
      </van-grid>
    </div> -->

    <!-- 暂用-导航点击事件 -->
    <!-- <van-popup v-model="popupShow">{{ popupCont }}</van-popup> -->

    <!-- 中部胶囊广告 -->
    <van-image width="100%" :src="require('@/assets/images/capsuleAd.png')" @click="toThisPage('新用户注册')" />

    <!-- 限时折扣标题 + 倒计时 -->
    <div>
      <van-count-down :time="time">
        <template #default="timeData">
          <span class="blackBold">限时折扣</span>
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div>

    <!-- 横向展示优惠折扣商品 -->
    <!-- 需要商品图统一宽度/高度，否则无法统一展示大小 -->
    <div class="discountDiv">
      <van-grid :border="false" :column-num="8" style="width: 1100px; overflow: scroll">
        <van-grid-item v-for="(item, index) in discountItemList" :key="index">
          <div class="discountImg">
            <van-image width="90%" :src="require('@/assets/images/' + item.name + '.png')" />
          </div>
          <div class="nowPrice bigTxt">{{ item.newP }}</div>
          <div class="oldPrice smallTxt">{{ item.oldP }}</div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 团购/秒杀入口 -->
    <van-grid :border="false" :column-num="2" class="bottomContainer">
      <van-grid-item to="/shop/seckill">
        <div class="container">
          <div class="text-title bigTitle">拼团购</div>
          <div class="text-content smallTxt">先到先得数量有限</div>
          <img src="@/assets/images/pingtuanAd.png" alt="" class="image" />
        </div>
      </van-grid-item>
      <van-grid-item to="/shop/seckill">
        <div class="container">
          <div class="text-title bigTitle">抢秒杀</div>
          <div class="text-content smallTxt">精选精选精选精</div>
          <img src="@/assets/images/miaoshaAd.png" alt="" class="image" />
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import tdata from '@/assets/test-data.json'

export default {
  data() {
    return {
      searchStr: "",
      locationStr: "天河区",
      popupCont: "",
      time: 2 * 60 * 60 * 1000,
      bannerImgList: tdata.bannerImgList,
      homeCatalog: tdata.homeCatalog,
      discountItemList: tdata.discountItemList,
    };
  },

  methods: {
    onSearch() {
      console.log(this.searchStr);
    },
    toThisPage(value) {
      console.log(value)
      this.$toast(value);
    },
  },
  mounted() {
    const SECOND = 1000 // milliseconds

    new this.$swiper(this.$refs.swiper, {

      // 已全局注册
      // modules: [Navigation, Pagination, Autoplay],

      loop: true,
      autoplay: {
        delay: 1 * SECOND,
        disableOnInteraction: false,
      },
      speed: 2 * SECOND,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },

      // on: {
      //   slideChange: (swiper) => {
      //     this.activeIndex = swiper.realIndex
      //   },
      // },
    })
  },

};
</script>

<style lang="less" scoped>
// 顶部搜索栏
.top-search {
  margin: 10px 10px 5px 10px;

  .search-ico {
    margin-left: 10px;
  }

  .location {
    margin-left: 5px;

    .location-text {
      color: white;
      font-size: 15px;
      // font-weight: bold;
    }
  }
}

// 上方轮播图
.swiper {
  // max-width: 600px;
  height: 100px;
// .swiper-slide {
//    display: flex;
//    justify-content: center;
//    align-items: center;
// }
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


// .swiper-container {
//   height: 110px;

//   .swiper-img {
//     /* 图片居中填充 */
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     object-position: center;
//   }

//   .home-page-swiper {
//     text-align: end;
//     padding-right: 25px;

//     /deep/.swiper-pagination-bullet {
//       background-color: #000;
//       width: 10px;
//       height: 10px;
//       margin-right: 2px;
//       opacity: 0.35;
//     }

//     /deep/ .swiper-pagination-bullet-active {
//       background-color: #fff;
//       opacity: 1;
//     }
//   }
// }

/* 中间分类 */
.cell-group {
  margin-top: 5px;
  height: 180px;
  flex-direction: row;

  .top-category {
    @icoDia: 47px; // 图标直径47px

    .top-category-ico {
      background: url(@/assets/images/homeCatalogIco.png) no-repeat;
      display: inline-block;
      width: @icoDia;
      height: @icoDia;
      background-position-y: 1px;
      background-size: 235px;
    }

    &:not(:nth-child(-n + 5)):nth-child(-n + 10) .top-category-ico {
      background-position-y: -@icoDia; // 6-10是第二行图标
    }

    .loop(@start, @end) when (0 <=@end) {
      // 取余数，1-5和6-10都是从0开始偏移
      // 修正，增加偏移量，使 5 的倍数结果是 5 而不是 0
      @n: mod(@start - 1, 5);

      &:nth-child(@{start}) .top-category-ico {
        background-position-x: (-@icoDia * (@n));
      }

      .loop(@start + 1, @end - 1);
    }

    .loop(1, 5);
    .loop(6, 5);

  }
}


/* 倒计时 */
.blackBold {
  margin: auto 14px auto 17px;
  font-size: large;
  font-weight: bold;
  vertical-align: bottom;
}

.colon {
  display: inline-block;
  margin: 0 4px;
}

.block {
  display: inline-block;
  border-radius: 5px;
  width: 20px;
  font-size: 12px;
  text-align: center;
  color: #62e7ff;
  background-color: #363636;
}

body::-webkit-scrollbar {
  display: none;
}

/* 横向展示优惠折扣商品 */
::-webkit-scrollbar {
  display: none;
}

.discountDiv {
  overflow: scroll;
  margin-top: 15px;
}

.discountImg {
  /* outline: solid; */
  width: 90px;
  height: 85px;
  background: url(@/assets/images/discount80p.png) no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
}

.nowPrice {
  color: #ff3d3d;
  margin: 2px 0 1px;
}

/* 价格样式 */
.nowPrice::before,
.oldPrice::before {
  content: "¥";
  margin-right: 1px;
  margin-left: 3px;
}

.oldPrice::after {
  content: "";
  display: block;
  width: 115%;
  border-bottom: 1px solid;
  transform: translate(0px, -8px);
}

/* 团购/秒杀入口 */
.bottomContainer {
  margin: 20px 7px 70px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 166px;
  height: 80px;
  padding: 5px 0 5px 7.5px;
  box-shadow: 0px 5px 9px #6665;
}

.image {
  position: absolute;
  top: 10px;
  left: 40%;
  width: 50%;
  height: auto;
}
</style>