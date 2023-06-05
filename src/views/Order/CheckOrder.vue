<template>
  <div>
    确认订单（未提交）
    <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <!-- <p>{{ getToBuyOrderInfo }}</p>
    <p>{{ getToBuyOrderInfo.goods }}</p>
    <p>{{ getToBuyOrderInfo.goods[0].count }}</p>
    <p>{{ getToBuyOrderInfo.userAddresses[0].id }}</p> -->
    +<p>{{ { goods, userAddresses } = getToBuyOrderInfo }}</p>
    <!-- ++<p>{{ goods[0].skuId }}</p>
    +++<p>{{ goods[0].count }}</p>
    ++++<p>{{ userAddresses[0].id }}</p> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      toBuyOrderInfo: {},
    }
  },
  methods: {
    onClickLeft() {
      this.$toast('确定取消订单吗？')
    },
  },
  created() {
    // let toBuyOrderInfo = this.$store.getters['user/getToBuyOrderInfo']
    // console.group("toBuyOrderInfo", toBuyOrderInfo)
    // console.log("订单提交所需：skuId",toBuyOrderInfo.goods[0].skuId)
    // console.log("订单提交所需：count",toBuyOrderInfo.goods[0].count)
    // console.log("订单提交所需：id",toBuyOrderInfo.userAddresses[0].id)
    console.log("mapGetters", mapGetters)
  },
  computed: {
    ...mapGetters('user', ['getToBuyOrderInfo'])
  }

}
</script>

<style></style>