<template>
  <div>
    确认订单（未提交）
    <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>

    <ShowAddressCard 
    :showAddressList="processedOrderInfo.getShowAddressList[0]"
    :chosenAddressId="processedOrderInfo.chosenAddressId"
    ></ShowAddressCard>


    <!-- +<p>{{ { goods, userAddresses } = getToBuyOrderInfo }}</p> -->
    {{ getToBuyOrderInfo }}
    skuId: <p>{{ getToBuyOrderInfo.goods[0].skuId }}</p>
    count: <p>{{ getToBuyOrderInfo.goods[0].count }}</p>
    address id: <p>{{ getToBuyOrderInfo.userAddresses[0].id }}</p>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ShowAddressCard from '@/views/Shop/ShowAddressCard.vue'

export default {
  components: {
    ShowAddressCard,
  },
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
  beforeCreate() {
    // let toBuyOrderInfo = this.$store.getters['user/getToBuyOrderInfo']
    // console.group("toBuyOrderInfo", toBuyOrderInfo)
    // console.log("订单提交所需：skuId",toBuyOrderInfo.goods[0].skuId)
    // console.log("订单提交所需：count",toBuyOrderInfo.goods[0].count)
    // console.log("订单提交所需：id",toBuyOrderInfo.userAddresses[0].id)
    this.$bus.$on('chosen-address-id', newId => {
      console.log("+++this.$bus.$on【chosen-address-id】", newId)
      this.chosen = newId
      // 需要根据修改的地址更新订单
      this.$store.dispatch('user/toBuyNowUpdateAddress', newId)

    })
  },
  computed: {
    ...mapGetters('user', ['getToBuyOrderInfo']),
    processedOrderInfo() {
      // 提取展示地址
      const orderInfo = this.getToBuyOrderInfo;
      const getShowAddressList = orderInfo.userAddresses.map(({ receiver, contact, fullLocation, address }) => {
        const formattedLocation = fullLocation.split(' ').slice(1).join('')
        return [`${receiver} ${contact} ${formattedLocation}`,address]
      })
      const chosenAddressId = orderInfo.userAddresses[0].id
      console.log("chosenAddressId", chosenAddressId)
      console.log("getShowAddressList", getShowAddressList)

      return { getShowAddressList, chosenAddressId }
    },
  }

}
</script>

<style></style>