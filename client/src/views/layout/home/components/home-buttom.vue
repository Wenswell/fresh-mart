<template>
  <!-- 团购/秒杀入口 -->
  <van-grid :border="false" :column-num="2" class="bottomContainer">
    <van-grid-item to="/shop/popular">
      <div class="container">
        <div class="text-title bigTitle">拼团购</div>
        <div class="text-content smallTxt">先到先得数量有限</div>
        <img src="https://blog0801-1319032318.cos.ap-shanghai.myqcloud.com/pingtuanAd.png" alt="" class="image" />
      </div>
    </van-grid-item>
    <van-grid-item to="/shop/popular">
      <div class="container">
        <div class="text-title bigTitle">抢秒杀</div>
        <div class="text-content smallTxt">精选精选精选精</div>
        <img src="https://blog0801-1319032318.cos.ap-shanghai.myqcloud.com/miaoshaAd.png" alt="" class="image" />
      </div>
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  name: 'HomeButtom',
}
</script>

<style lang="less" scoped>

/* 团购/秒杀入口 */
.bottomContainer {
  margin: 20px 7px;
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