<template>
  <div>
    
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
    <div class="discount-div">
      <van-grid :border="false" :column-num="guesslikeproduct.length"
        :style="{ width: `calc(${guesslikeproduct.length} * 120px)` }" style="overflow: scroll">
        <van-grid-item v-for="(item, index) in guesslikeproduct" :key="index"
          @click="$router.push(`/shop/products/${item.id}`)">
          <van-image class="discount-img-div" :src="item.picture" />
          <div class="nowPrice bigTxt">{{ item.price }}</div>
          <div class="oldPrice smallTxt">{{ (item.price / 0.8).toFixed(2) }}</div>
        </van-grid-item>
      </van-grid>
    </div>

  </div>
</template>

<script>
import { getGuessLikeProductApi } from '@/api/product'

export default {
  name:'HomeDiscount',
  data(){return{
    guesslikeproduct: [],
    time: 2 * 60 * 60 * 1000,
  }},
  created(){
    getGuessLikeProductApi().then(res => {
        this.guesslikeproduct = res.result.items
      })
  },
}
</script>

<style lang="less" scoped>

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


/* 横向展示优惠折扣商品 */
::-webkit-scrollbar {
  display: none;
}

.discount-div {
  overflow: scroll;
  margin-top: 15px;
}

.discount-img-div {
  width: 85px;
  height: 85px;
  display: flex;
  background-color: #DDF8FF;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  /deep/ img {
    border-radius: 10px;
    overflow: hidden;
  }

  &::before {
    content: "8.0折";
    white-space: nowrap;
    z-index: 2;
    position: absolute;
    zoom: 0.45;
    color: white;
    width: 70px;
    left: -15px;
    top: 15px;
    height: 37px;
    padding: 2px 0 0 10px;
    background-color: #46E1FF;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }
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
</style>