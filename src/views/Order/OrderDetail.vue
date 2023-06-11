<template>
  <div>

    <ShowAddressCard class="top-address"
      :showAddressList="[orderDetail.receiverContact + ' ' + orderDetail.receiverMobile, orderDetail.receiverAddress]"
      :chosenAddressId="orderDetail.countyCode" :banEdit="true"></ShowAddressCard>

    <div class="product">
      <div class="product-top-card">
        <span>【API中无店铺名称】</span>
        <span>{{ getState(orderDetail.orderState) }}</span>
      </div>
      <div class="product-card" v-for="item in orderDetail.skus" :key="item.skuId">
        <img class="product-card-left-img" :src="item.image">
        <div class="product-card-mid">
          <span class="product-name">{{ item.name }}</span>
          <span class="product-desc">{{ item.attrsText }}</span>
        </div>
        <div class="product-card-right">
          <div class="right-price">{{ item.realPay }}</div>
          <div class="right-num"><van-icon name="cross" size="12" />{{ item.quantity }}</div>
        </div>
        <!-- <van-button @click="addToCart(item.id)" class="add-cart-btn" color="#5AD4EA" round plain type="primary">加入购物车</van-button> -->
      </div>

    </div>

    <div class="product-sum">
      <span class="sum-left">商品总价<span class="sum-right">{{ orderDetail.totalMoney.toFixed(2) }}</span></span>
      <span class="sum-left">邮费<span class="sum-right">{{ orderDetail.postFee.toFixed(2) }}</span></span>
      <!-- <span class="sum-left">折扣<span class="sum-right">{{ orderDetail.totalMoney }}.00</span></span> -->
      <span class="sum-left">合计<span class="sum-right">{{ orderDetail.payMoney.toFixed(2) }}</span></span>
      <span class="sum-left">订单编号<span class="sum-right">{{ orderDetail.id }}</span></span>
      <span class="sum-left">下单时间<span class="sum-right">{{ orderDetail.createTime }}</span></span>
      <span v-if="orderDetail.payTime" class="sum-left">支付时间<span class="sum-right">{{ orderDetail.payTime }}</span></span>
    </div>

  </div>
</template>

<script>
import ShowAddressCard from '@/views/Shop/ShowAddressCard.vue'

export default {
  components: {
    ShowAddressCard,
  },
  data() {
    return {
      orderDetail:{},
    }
  },
  methods: {
    getState(state) {
      switch (state) {
        //订单状态，1 为待付款、2 为待发货、3 为待收货、4 为待评价、5 为已完成、6 为已取消，未传该参数或 0 为全部
        case 1:
          return '订单待付款';
        case 2:
          return '已付款，待发货';
        case 3:
          return '已付款，待收货';
        case 4:
          return '已收货，待评价';
        case 5:
          return '订单已完成';
        case 6:
          return '订单已取消';
        default:
          return '';
      }
    },
  },
  created() {
    this.$store.dispatch('user/getOrderDatail', this.$route.params.type).then(res => {
      this.orderDetail = res
      console.log("this.orderDetail", this.orderDetail)
    })


  },

}
</script>

<style lang="less" scoped>
.top-address {
  margin-top: 50px;
}

.product {
  font-size: 14px;
  // background-color: antiquewhite;
  padding-bottom: 10px;
  // border-bottom: 1px solid #CCC;

  // &:first-child {
    // margin-top: 50px;
  // }
}

.product-top-card {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: white;
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

  .product-card-mid {
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

    // .product-price {
    //   bottom: -7px;
    //   position: relative;

    //   &::before {
    //     content: '¥';
    //   }
    // }
  }

  .product-card-right {
    .right-price::before {
      content: '¥';
      font-size: 80%;
      margin: 1px;
    }

    margin-top: 10px;
  }

  .add-cart-btn {
    position: absolute;
    right: 10px;
    margin-top: 65px;
    height: 25px;
    padding: 0 8px;
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
}</style>