<template>
  <div class="check-order">

    <ShowAddressCard :showAddressList="processedOrderInfo.getShowAddressList[0]"
      :chosenAddressId="processedOrderInfo.chosenAddressId"></ShowAddressCard>

    <div class="product">
      <van-cell title="【API中无店铺名称】" />
      <div class="product-card" v-for="item in getToBuyOrderInfo.goods" :key="item.skuId">
        <img class="product-card-left-img" :src="item.picture">
        <div class="product-card-right">
          <span class="product-name">{{ item.name }}</span>
          <span class="product-desc">{{ item.attrsText }}</span>
          <span class="product-price">{{ item.payPrice }}</span>
        </div>
        <div v-if="getToBuyOrderInfo.goods.length!==1" class="product-card-num"><van-icon name="cross" size="12" />{{ item.count }}</div>
      </div>
      <div v-if="getToBuyOrderInfo.goods.length===1" class="product-bottom-count">
        <span>购买数量</span>
        <van-stepper v-model="stepperValue" />
      </div>
    </div>

    <div class="product-sum">
      <span class="sum-left">商品总价<span class="sum-right">{{ getToBuyOrderInfo.summary.totalPrice.toFixed(2) }}</span></span>
      <span class="sum-left">邮费<span class="sum-right">{{ getToBuyOrderInfo.summary.postFee.toFixed(2) }}</span></span>
      <span class="sum-left">折扣<span class="sum-right">{{ getToBuyOrderInfo.summary.discountPrice.toFixed(2) }}</span></span>
      <span class="sum-left">合计<span class="sum-right">{{ getToBuyOrderInfo.summary.totalPayPrice.toFixed(2) }}</span>
      </span>
    </div>

    <div class="pay-channel">
      <div class="pay-method" :class="{ chosen: payChosen == 'alipay' }" @click="payChosen = 'alipay'">
        <van-icon name="alipay" size="16" color="#0273FD" />
        支付宝
      </div>
      <div class="pay-method" :class="{ chosen: payChosen == 'wechat-pay' }" @click="clickWechatPay">
        <van-icon name="wechat-pay" size="16" color="#24B510" />
        微信支付
      </div>
    </div>

    <van-submit-bar class="submit-bar" :price="getToBuyOrderInfo.summary.totalPayPrice * 100" button-text="提交订单"
      @submit="onSubmit" />

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
      radio: '1',
      payChosen: 'alipay',
      // chosenAddress:'',
    }
  },
  methods: {
    clickWechatPay() {
      this.payChosen = 'wechat-pay'
      // this.$toast("只支持支付宝")
      // setTimeout(() => {
      //   this.payChosen = 'alipay'
      // }, 300);
    },
    onSubmit(){
      console.group('提交订单 -> 结算')
      // console.log("chosenAddress", this.chosenAddress)
      // console.log("getToBuyOrderInfo", this.getToBuyOrderInfo)
      let newData = {
        deliveryTimeType:1,
        payType:1,
        payChannel:this.payChosen=='alipay'?1:2,
        buyerMessage:'',
        addressId:this.getToBuyOrderInfo.userAddresses[0].id,
        goods: this.getToBuyOrderInfo.goods.map(good => ({
          skuId: good.skuId,
          count: good.count   
        }))
      }
      
      console.log("!!newData", newData)
      
      this.$store.dispatch('user/submitOrderApi', newData)
      
      console.groupEnd()

      this.$router.replace('/order/pay')
    }
  },
  beforeCreate() {
    // let toBuyOrderInfo = this.$store.getters['user/getToBuyOrderInfo']
    // console.group("toBuyOrderInfo", toBuyOrderInfo)
    // console.log("订单提交所需：skuId",toBuyOrderInfo.goods[0].skuId)
    // console.log("订单提交所需：count",toBuyOrderInfo.goods[0].count)
    // console.log("订单提交所需：id",toBuyOrderInfo.userAddresses[0].id)
    // if(!this.$store.getters['user/getToBuyOrderInfo'].userAddresses){location.reload()}
    this.$bus.$on('chosen-address-id', newId => {
      console.log("+++this.$bus.$on【chosen-address-id】", newId)
      // this.chosenAddress = newId
      // 需要根据修改的地址更新订单
      let toBuyOrderInfo = this.$store.getters['user/getToBuyOrderInfo']
      if(toBuyOrderInfo.goods.length===1){
        // 直接购买时可以直接用API更新订单
        this.$store.dispatch('user/toBuyNowUpdateOrder', { addressId: newId })
      } else {
        // 否则更新本地信息
        this.$store.dispatch('user/editCreatedOrder', newId)
      }

    })
  },
  computed: {
    ...mapGetters('user', ['getToBuyOrderInfo']),
    processedOrderInfo() {
      // 提取展示地址
      const orderInfo = this.getToBuyOrderInfo;
      const getShowAddressList = orderInfo.userAddresses.map(({ receiver, contact, fullLocation, address }) => {
        const formattedLocation = fullLocation.split(' ').slice(1).join('')
        return [`${receiver} ${contact} ${formattedLocation}`, address]
      })
      const chosenAddressId = orderInfo.userAddresses[0].id
      console.log("chosenAddressId", chosenAddressId)
      console.log("getShowAddressList", getShowAddressList)

      return { getShowAddressList, chosenAddressId }
    },
    stepperValue: {
      get() {
        // 返回当前物品数值
        return this.getToBuyOrderInfo.goods[0].count
      },
      set(num) {
        // 更新订单信息
        this.$store.dispatch('user/toBuyNowUpdateOrder', { count: num })
      }
    }

  }

}
</script>

<style lang="less" scoped>
// 整个界面
.check-order {
  margin-top: 50px;

}

// 商品卡片（图片+名称+描述+价格
.product-card {
  background: #F4F4F4;
  display: flex;
  padding: 10px 15px;
  gap: 10px;
  font-size: 14px;

  .product-card-left-img {
    width: 85px;
    height: 100%;
    background: white;
    border-radius: 4px;
  }

  .product-card-right {
    height: 90px;
    display: flex;
    flex: 1;
    gap: 2px;
    flex-direction: column;

    :nth-child(-n+2) {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /* 显示两行 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      /* 使用省略号来表示未显示的文本 */
    }

    .product-desc {
      font-size: 12px;
      color: #9C9C9C;
    }

    .product-price {
      bottom: -7px;
      position: relative;

      &::before {
        content: '¥';
      }
    }
  }

  .product-card-num{
    margin-top: 10px;
  }
}

// 商品卡片下方的 购买数量
.product-bottom-count {
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 17px 10px 10px;
  font-size: 14px;
}

// 最后的价格展示
.product-sum {
  background-color: white;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 10px;
  padding: 10px 10px;

  .sum-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5px;

    border-bottom: 1px solid #F4F4F4;

    .sum-right {
      font-weight: bold;

      &::before {
        content: '¥';
        margin-right: 2px;
        font-size: 80%;
      }
    }
  }
}

// 支付渠道
.pay-channel {
  padding: 10px;
  background-color: white;
  font-size: 14px;
  padding-bottom: 50px;

  .pay-method {
    border-bottom: 1px solid #F4F4F4;
    padding: 10px 0;

    &.chosen::after {
      content: '✔';
      position: absolute;
      right: 15px;
    }
  }
}


// 底部 提交订单
.submit-bar>:first-child {
  gap: 10px
}
</style>