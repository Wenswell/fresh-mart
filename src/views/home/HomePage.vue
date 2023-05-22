<template>
  <div>
    <van-sticky>
      <van-search
        v-model="searchStr"
        show-action
        shape="round"
        background="#fff0"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div class="location">
            <van-icon name="location" color="#DAF8FF" size="1.15rem" />
            <span class="white-blod">{{ locationStr }}</span>
          </div>
        </template>
      </van-search>
    </van-sticky>

    <!-- 顶部轮播 -->
    <van-swipe class="my-swipe" :autoplay="10000" indicator-color="white">
      <van-swipe-item
        ><van-image width="100%" :src="require('@/assets/images/topAd0.png')"
      /></van-swipe-item>
      <van-swipe-item
        ><van-image width="100%" :src="require('@/assets/images/topAd0.png')"
      /></van-swipe-item>
    </van-swipe>

    <!-- 上方分类导航 -->
    <div class="top-grid">
      <van-grid :column-num="5" :gutter="5" square :border="false">
        <van-grid-item
          v-for="value in gridItemList"
          :key="value"
          @click="toThisCont(value)"
        />
      </van-grid>
    </div>

    <!-- 暂用-导航点击事件 -->
    <van-popup v-model="popupShow">{{ popupCont }}</van-popup>

    <!-- 中部胶囊广告 -->
    <van-image width="100%" :src="require('@/assets/images/capsuleAd.png')" />

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
      <van-grid
        :border="false"
        :column-num="8"
        style="width: 1100px; overflow: scroll"
      >
        <van-grid-item v-for="(item, index) in discountItemList" :key="index">
          <div class="discountImg">
            <van-image
              width="90%"
              :src="require('@/assets/images/' + item.name + '.png')"
            />
          </div>
          <div class="nowPrice bigTxt">{{ item.newP }}</div>
          <div class="oldPrice smallTxt">{{ item.oldP }}</div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 团购/秒杀入口 -->
    <van-grid :border="false" :column-num="2" class="bottomContainer">
      <van-grid-item>
        <div class="container">
          <div class="text">
            <div class="text-title bigTitle">拼团购</div>
            <div class="text-content smallTxt">先到先得数量有限</div>   
          </div>  
          <div class="imageDiv">
            <img class="image" src="@/assets/images/pingtuanAd.png" alt="">
          </div>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="container">
          <div class="text">
            <div class="text-title bigTitle">抢秒杀</div>
            <div class="text-content smallTxt">精选精选精选精</div>   
          </div>  
          <div class="imageDiv">
            <img class="image" src="@/assets/images/miaoshaAd.png" alt="">
          </div>
        </div>
      </van-grid-item>
    </van-grid>

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchStr: "",
      locationStr: "天河区",
      gridItemList: [
        "水果",
        "饮品",
        "面包",
        "日用",
        "化妆",
        "油粮",
        "蔬菜",
        "海鲜",
        "母婴",
        "VIP",
      ],
      popupShow: false,
      popupCont: "",
      time: 2 * 60 * 60 * 1000,
      discountItemList: [
        { oldP: "550.00", newP: "300.00", name: "discountItem1" },
        { oldP: "550.00", newP: "200.00", name: "discountItem2" },
        { oldP: "400.00", newP: "350.00", name: "discountItem3" },
        { oldP: "400.00", newP: "250.00", name: "discountItem4" },
        { oldP: "550.00", newP: "300.00", name: "discountItem1" },
        { oldP: "550.00", newP: "200.00", name: "discountItem2" },
        { oldP: "400.00", newP: "350.00", name: "discountItem3" },
        { oldP: "400.00", newP: "250.00", name: "discountItem4" },
      ],
    };
  },

  methods: {
    onSearch() {
      console.log(this.searchStr);
    },
    toThisCont(value) {
      this.popupShow = !this.popupShow;
      this.popupCont = value;
    },
  },
}
</script>

<style scoped>

/* 定位 */
.location {
  padding-top: 5px;
}
/* 中间分类 */
.top-grid {
  background: url(@/assets/images/topGrid.png) no-repeat;
  background-size: 100%;
  margin: -1em 0 -1.5em;
  padding: 35px 10px;
}

/* 倒计时 */
.blackBold {
  margin: auto 0.75em;
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

/* 横向展示优惠折扣商品 */
::-webkit-scrollbar {
  display: none;
}
.discountDiv {
  overflow: scroll;
}
.discountImg {
  /* outline: solid; */
  width: 100px;
  height: 110px;
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
  content: "\00a0¥ ";
  margin-right: -2px;
}
.oldPrice::after {
  content: "";
  display: block;
  width: 115%;
  border-bottom: 1px solid;
  transform: translate(0px, -0.6em);
}

/* 团购/秒杀入口 */
.bottomContainer {
  margin: 0 10px 50px;
}
.container {
  display: flex;
  width: 100%;
  height: 75px;
  padding-top: 5px;
  box-shadow: 0px 5px 9px #3335;
}

.text {
  flex: 2;
  display: flex;  
  flex-direction: column;
  justify-content: space-between; 
  margin: 5px 0 15px 10px;

}

.imageDiv {
  flex: 1;
  margin-left: -30%;
  margin-top: 5px;
}

.image {
  width: 120%;
  /* height: 100%; */
  margin-left: -30%;

}


</style>