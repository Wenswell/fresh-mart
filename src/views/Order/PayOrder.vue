<template>
  <div class="pay-order">

    <div class="count-down">
      请在<van-count-down :time="countDown" />内支付，逾期订单将自动取消
    </div>

    <ShowAddressCard :showAddressList="processedOrderInfo.getShowAddressList[0]"
      :chosenAddressId="processedOrderInfo.chosenAddressId" :banEdit="true"></ShowAddressCard>

    <div class="product">
      <van-cell title="【API中无店铺名称】" />
      <div class="product-card" v-for="item in getToBuyOrderInfo.goods" :key="item.skuId">
        <img class="product-card-left-img" :src="item.picture">
        <div class="product-card-right">
          <span class="product-name">{{ item.name }}</span>
          <span class="product-desc">{{ item.attrsText }}</span>
          <span class="product-price">{{ item.payPrice }}</span>
        </div>
        <!-- <div v-if="getToBuyOrderInfo.goods.length!==1" class="product-card-num"><van-icon name="cross" size="12" />{{ item.count }}</div> -->
        <div class="product-card-num"><van-icon name="cross" size="12" />{{ item.count }}</div>
      </div>
      <!-- <div v-if="getToBuyOrderInfo.goods.length===1" class="product-bottom-count">
        <span>购买数量</span>
        <van-stepper v-model="stepperValue" />
      </div> -->
    </div>

    <div class="product-sum">
      <span class="sum-left">商品总价<span class="sum-right">{{ getToPayOrderInfo.totalMoney.toFixed(2) }}</span></span>
      <span class="sum-left">邮费<span class="sum-right">{{ getToPayOrderInfo.postFee.toFixed(2) }}</span></span>
      <!-- <span class="sum-left">折扣<span class="sum-right">{{ getToPayOrderInfo.totalMoney }}.00</span></span> -->
      <span class="sum-left">合计<span class="sum-right">{{ getToPayOrderInfo.payMoney.toFixed(2) }}</span></span>
      <span class="sum-left">订单编号<span class="sum-right">{{ getToPayOrderInfo.id }}</span></span>
      <span class="sum-left">下单时间<span class="sum-right">{{ getToPayOrderInfo.createTime }}</span></span>
    </div>

    <div class="pay-channel">
      <div class="pay-method" v-if="getToPayOrderInfo.payChannel == 1"
        :class="{ chosen: getToPayOrderInfo.payChannel == 1 }">
        <van-icon name="alipay" size="16" color="#0273FD" />
        支付宝
      </div>
      <div class="pay-method" v-if="getToPayOrderInfo.payChannel == 2"
        :class="{ chosen: getToPayOrderInfo.payChannel == 2 }">
        <van-icon name="wechat-pay" size="16" color="#24B510" />
        微信支付
      </div>
    </div>

    <van-button @click="onToPay" class="pay-btn" type="primary"
      :color="toBuyOrderInfo.payChannel == 1 ? '#0273FD' : '#24B510'" size="large">付款（模拟）</van-button>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ShowAddressCard from '@/views/Shop/ShowAddressCard.vue'
import { mockPayApi } from "@/api/user";


export default {
  components: {
    ShowAddressCard,
  },
  data() {
    return {
      // getToPayOrderInfo: {
      // "id": "1666021170513711106",
      // "createTime": "2023-06-06 17:56:14",
      // "payType": 1,
      // "orderState": 1,
      // "payLatestTime": "2023-06-06 18:26:15",
      // "postFee": 9,
      // "payMoney": 3930.7,
      // "totalMoney": 3921.7,
      // "totalNum": 7,
      // "skus": null,
      // "payChannel": 1,
      // "countdown": null
      // },
    }
  },
  methods: {
    onToPay() {
      mockPayApi(this.getToPayOrderInfo.id).then(res => {
        console.log('mockPayApi ||||res:', res)
        if (res.code == 1) {
          this.$toast('支付成功')
          this.$router.back()
        }
      })
    }
  },
  mounted() {
    // console.log("toBuyOrderInfo",this.toBuyOrderInfo)
    console.log("new Date(this.toBuyOrderInfo.payLatestTime).getTime() - new Date().getTime()", new Date(this.toBuyOrderInfo.payLatestTime).getTime() - new Date().getTime())
    if (new Date(this.toBuyOrderInfo.payLatestTime).getTime() - new Date().getTime() <= 0) {
      this.$toast('订单超时，已取消！')
      this.$router.back()
    }
  },
  computed: {
    // 获取最新的订单信息
    toBuyOrderInfo: {
      get() {
        return this.$store.getters['user/getToPayOrderInfo']
      },
      set(value) {
        console.log("set toBuyOrderInfo value: ", value)
      }
    },
    ...mapGetters('user', ['getToBuyOrderInfo', 'getToPayOrderInfo']),
    processedOrderInfo() {
      // 提取展示地址
      const orderInfo = this.getToBuyOrderInfo;
      const getShowAddressList = orderInfo.userAddresses.map(({ receiver, contact, fullLocation, address }) => {
        const formattedLocation = fullLocation.split(' ').slice(1).join('')
        return [`${receiver} ${contact} ${formattedLocation}`, address]
      })
      const chosenAddressId = orderInfo.userAddresses[0].id
      // console.log("chosenAddressId", chosenAddressId)
      // console.log("getShowAddressList", getShowAddressList)

      return { getShowAddressList, chosenAddressId }
    },
    countDown() {
      return new Date(this.toBuyOrderInfo.payLatestTime).getTime() - new Date().getTime()
    }
  },

}
</script>

<style lang="less" scoped>
.pay-order {
  margin-top: 50px;

  >div:not(:last-child) {
    margin-bottom: 10px;
  }

}

.count-down {
  font-size: 14px;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: baseline;
  padding: 5px 0;

  &>div {
    color: crimson;
  }
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

  .product-card-num {
    margin-top: 10px;
  }
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

    &:nth-child(-n+3) .sum-right::before {
      content: '¥';
      margin-right: 2px;
      font-size: 80%;
    }

    .sum-right {
      font-weight: bold;

    }
  }
}

// 支付渠道
.pay-channel {
  padding: 10px;
  background-color: white;
  font-size: 14px;

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

//付款 按钮
.pay-btn {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  width: 300px;
  border-radius: 5px;
}</style>