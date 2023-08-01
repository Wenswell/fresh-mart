<template>
  <div class="order-tool">
    <RoundBox left-title="我的订单" @click-right="$router.push('/order/all')">
      <template slot="flex">
        <div class="order" v-for="item in myOrderInfo" :key="item.page" @click="toOrder(item.id)">
          <span class="item-ico"></span>
          <div class="item-text">{{ item.detail }}</div>
        </div>
      </template>
    </RoundBox>

    <!-- 我的工具 -->
    <RoundBox left-title="我的工具" @click-right="$toast('全部工具')">
      <template slot="flex">
        <div class="tool" v-for="item in myToolInfo" :key="item.page" @click="$toast(item.page)">
          <span class="item-ico"></span>
          <div class="item-text">{{ item.detail }}</div>
        </div>
      </template>
    </RoundBox>
  </div>
</template>

<script>
export default {
  name: 'MyOrderTool',
  methods: {
    toOrder(id) {
      this.$router.push({
        name: 'all',
        query: { id }
      })
    },
  },
  data() {
    return {
      myOrderInfo: [
        {
          "id": 1,
          "page": "WaitingPayment",
          "detail": "待付款"
        },
        {
          "id": 2,
          "page": "WaitingShipment",
          "detail": "待发货"
        },
        {
          "id": 3,
          "page": "WaitingReceipt",
          "detail": "待收货"
        },
        {
          "id": 4,
          "page": "WaitingReview",
          "detail": "待评价"
        },
        {
          "id": 5,
          "page": "ReturnExchange",
          "detail": "退款售后"
        }
      ],
      myToolInfo: [
        {
          "page": "MyWallet",
          "detail": "我的钱包"
        },
        {
          "page": "ContactService",
          "detail": "联系客服"
        },
        {
          "page": "PointsExchange",
          "detail": "积分兑换"
        },
        {
          "page": "MySettings",
          "detail": "我的设置"
        }
      ],
    }
  },

}
</script>

<style lang="less" scoped>
.order-tool {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

// 盒子 23 我的工具 我的订单 图标 + 文本
.item-ico {
  background: url(https://blog0801-1319032318.cos.ap-shanghai.myqcloud.com/icoAll.png) no-repeat;
  display: inline-block;
}

.item-text {
  font-size: 12px;
}

.order {
  gap: 10px;

  .item-ico {
    background-position-y: -149px;
    background-size: 110px;
    width: 22px;
    height: 21px;
  }

  &:nth-child(2) .item-ico {
    background-position-x: -22.5px;
  }

  &:nth-child(3) .item-ico {
    background-position-x: -45px;
    width: 25px;
  }

  &:nth-child(4) .item-ico {
    background-position-x: -70px;
    width: 20px;
  }

  &:nth-child(5) .item-ico {
    background-position-x: -90px;
  }
}

.tool {
  gap: 10px;

  .item-ico {
    width: 24px;
    height: 25px;
    background-size: 110px;
    background-position-y: -121px;
    background-position-x: 1px;
  }

  &:nth-child(2) .item-ico {
    background-position-x: -22.5px;
  }

  &:nth-child(3) .item-ico {
    background-position-x: -47px;
  }

  &:nth-child(4) .item-ico {
    background-position-x: -71px;
  }
}
</style>