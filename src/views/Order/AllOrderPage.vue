<template>
  <div>
    <div v-if="allOrderObj.counts===undefined" style="margin:50px">加载中...</div>
    <div v-if="allOrderObj.counts==0" style="margin:50px">无相关订单！</div>
    <div class="product" v-for="items in allOrderObj.items" :key="items.id">
      <div class="product-top-card">
        <span>【API中无店铺名称】</span>
        <span>{{ getState(items.orderState) }}</span>
      </div>
      <div class="product-card" v-for="item in items.skus" :key="item.skuId">
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
      <div class="order-price-div">
        <span>实付</span>
        <span class="order-price">{{ items.payMoney }}</span>
        <span v-if="items.postFee">(邮费{{ items.postFee }}元)</span>
        <span v-if="!items.postFee">(免运费)</span>
      </div>
      <div class="order-option">
        <van-button @click="onBuyAgain(items.id)" class="add-cart-btn" color="#5AD4EA" round plain
          type="primary">再次购买</van-button>
        <van-button @click="onOrderDetail(items.id)" class="add-cart-btn" color="#5AD4EA" round plain
          type="primary">订单详情</van-button>


      </div>
      <!-- <div v-if="1" class="product-bottom-count"> -->
      <!-- <span>购买数量</span> -->
      <!-- <van-stepper v-model="stepperValue" /> -->
      <!-- </div> -->
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      allOrderObj: {}
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
onBuyAgain(orderId){
  console.log('onBuyAgain')
  console.log("orderId", orderId)
  // 提交后转到订单页面
  this.$store.dispatch('user/rePurchase', orderId).then(()=>this.$router.push('/order/check'))
},
onOrderDetail(orderId){
  console.log('onOrderDetail')
  console.log("orderId", orderId)
  this.$router.push(`/order/detail/${orderId}`)
},
  },
  created() {
    // console.log(this.$route.query.id)
    console.log("this.$route.query.id", this.$route.query.id)
    // async getOrder(context, page, orderState=0)
    //订单状态，1 为待付款、2 为待发货、3 为待收货、4 为待评价、5 为已完成、6 为已取消，未传该参数或 0 为全部
    this.$store.dispatch('user/getOrder',{page:1,orderState:this.$route.query.id}).then(res => {
      this.allOrderObj = res
    })

  },

}
</script>

<style lang="less" scoped>
.product {
  font-size: 14px;
  // background-color: antiquewhite;
  padding-bottom: 10px;
  border-bottom: 1px solid #CCC;

  &:first-child {
    margin-top: 50px;
  }
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

//订单总价
.order-price-div {
  text-align: right;
  padding: 10px;
  background: white;

  .order-price {
    font-weight: bold;
    font-size: 16px;
    margin: 0 3px;

    &::before {
      content: "¥";
      font-size: 80%;
    }
  }
}

//再次购买 订单详情
.order-option {
  display: flex;
  justify-content: flex-end;

  button {
    margin-right: 10px;
    height: 30px;
    padding: 0 10px;
  }
}</style>