<template>
  <div>
    <!-- 个人信息 头像ID 会员信息 浏览 收藏 购物券 -->
    <RoundBox class="info">
      <div @click="$router.push('/user/edit')" class="info-up">
        <van-image class="info-up-avatar" round width="48px" height="48px" :src="img" />
        <span class="info-up-name">{{ name }}</span>
        <span class="info-up-vip"><van-icon name="diamond" size="13" color="#4e3b20" /> 黄金会员 <van-icon
            name="arrow" /></span>
      </div>
      <div class="info-down">
        <div @click="$router.push('/shop/history')" class="info-down-item">
          <span class="info-down-num">{{ historyCount }}</span>
          浏览
        </div>
        <div @click="$router.push('/shop/collect')" class="info-down-item">
          <span class="info-down-num">{{ collectCount }}</span>
          收藏
        </div>
        <div @click="$toast('暂无购物券')" class="info-down-item">
          <span class="info-down-num">{{ 0 }}</span>
          购物券
        </div>
      </div>
    </RoundBox>
  </div>
</template>

<script>
export default {
  name:'MyInfo',
  data(){
    return{
      historyCount: 0,
      collectCount: 0,
      name: '',
      img: '',
    }
  },
  created() {
    this.$store.getters['user/getHistoryNum'].then(res => {
      // console.log("res", res)
      this.historyCount = res.result.counts
    })
    const { name, img } = this.$store.getters['user/getUserNameImg']
    this.name = name
    this.img = img
    // 更新收藏
    this.$store.dispatch('cart/updateCollect')
    this.collectCount = this.$store.getters['user/getCollectNum']
  },

}
</script>

<style lang="less" scoped>
// 盒子 1 个人信息 头像ID 会员信息 浏览 收藏 购物券
.info {
  display: flex;
  flex-direction: column;

  .info-up {
    display: flex;
    align-items: center;
    margin: 10px 0;

    .info-up-avatar {
      margin: 0 12px 0 20px;
    }

    .info-up-name {
      font-size: 16px;
    }

    .info-up-vip {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      background: linear-gradient(to bottom right, #ffeb0b, #ffae13);
      color: #4e3b20;
      margin-left: auto;
      border-radius: 100px 0 0 100px;
      padding: 0 2px 0 5px;
    }
  }

  .info-down {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-around;

    .info-down-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .info-down-num {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>