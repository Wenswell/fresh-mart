<template>
  <div>

    <!-- 个人信息 头像ID 会员信息 浏览 收藏 购物券 -->
    <van-cell-group class="cell-group" inset>
      <van-cell class="my-info" :border="false">
        <template #title>
          <div class="my-info-left">
            <van-image round width="48px" height="48px" :src="require('@/assets/images/' + 'rank5.png')" />
            <span>佚名</span>
          </div>

        </template>

        <template #right-icon>
          <van-button round size="small" class="vip-btn" color="linear-gradient(to bottom right, #ffeb0b, #ffae13)">
            <template #default>
              <van-icon name="diamond" size="13" color="#4e3b20" />
              <span class="vip-btn text">黄金会员 ></span>
            </template>
          </van-button>
        </template>

      </van-cell>
      <!-- <van-cell class="my-data" title="单元格" value="内容" label="描述信息" /> -->
      <van-grid class="my-data" :border="false" :column-num="3">
        <van-grid-item class="my-data-item" v-for="item in myDataTop" :key="item.title">
          <div class="my-data-div up">{{ item.num }}</div>
          <div class="my-data-div down">{{ item.title }}</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    
    <!-- 我的订单 -->
    <van-cell-group class="cell-group" inset>
      <van-cell class="cell header" :border="false">
        <template #title>
          <span class="cell header h-left">我的订单</span>
        </template>
        <template #right-icon>
          <span class="cell header h-right">查看全部
            <van-icon class="cell header h-ico" name="arrow" />
          </span>
        </template>
      </van-cell>
      <van-grid class="cell items" :border="false" :column-num="5">
        <van-grid-item class="item order" v-for="item in myOrderInfo" :key="item.page" @click="toPage(item.page)">
          <span class="item item-ico"></span>
          <div class="item text">{{ item.detail }}</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    
    <!-- 我的工具 -->
    <van-cell-group class="cell-group" inset>
      <van-cell class="cell header" :border="false">
        <template #title>
          <span class="cell header h-left">我的工具</span>
        </template>
        <template #right-icon>
          <span class="cell header h-right">查看全部
            <van-icon class="cell header h-ico" name="arrow" />
          </span>
        </template>
      </van-cell>
      <van-grid class="cell items" :border="false" :column-num="4">
        <van-grid-item class="item tool" v-for="item in myToolInfo" :key="item.page" @click="toPage(item.page)">
          <span class="item item-ico"></span>
          <div class="item text">{{ item.detail }}</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    
    <!-- 猜你喜欢 -->
    <van-cell-group class="cell-group" inset>
      <van-cell class="cell header" :border="false">
        <template #title>
          <span class="cell header h-left">猜你喜欢</span>
        </template>
        <template #right-icon>
          <span class="cell header h-right">查看全部
            <van-icon class="order header h-ico" name="arrow" />
          </span>
        </template>
      </van-cell>
      <van-grid direction="horizontal" class="cell items" :border="false" :column-num="2">
        <van-grid-item class="like">
          <!-- <van-image 
            width="100"
            height="100" src="https://img01.yzcdn.cn/vant/apple-1.jpg" /> -->
          <!-- <div class="like"> -->

          <img :src="require('@/assets/images/rank4.png')" height="200" width="200">

          <span>百年陈酿 囯窖茅台 小黑瓶 11111111111111150ml</span>
          <!-- </div> -->
        </van-grid-item>

        <!-- <van-grid-item class="item group" v-for="item in myToolInfo" :key="item.page" @click="toPage(item.page)">
          <span class="item item-ico"></span>
          <div class="item text">{{ item.detail }}</div>
        </van-grid-item> -->
      </van-grid>
    </van-cell-group>

  </div>
</template>

<script>
import tdata from '@/assets/test-data.json'

export default {
  data() {
    return {
      myDataTop: tdata.myDataTop,
      myOrderInfo: tdata.myOrderInfo,
      myToolInfo: tdata.myToolInfo,
    }
  },
  methods: {
    toPage(page) {
      console.log(page)
    }
  },
  mounted() {
    console.log(this.cartList)
  }
}
</script>

<style lang="less" scoped>

// 固定盒子大小
.cell-group {
  /* outline: solid; */
  box-shadow: 0px 2px 8px rgba(133, 172, 216, 0.32);
  width: 343px;
  height: 140px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  // margin: 10px auto;
  margin-bottom: 15px;
  
  // 整体偏移 顶部
  &:first-child {
    margin-top: 47px;
  }
  
  // 整体偏移 底部 防止底栏遮挡
  &:last-child {
    margin-bottom: 55px;
  }
}

// 盒子 1 个人信息 头像ID 会员信息 浏览 收藏 购物券
.my-info {
  // outline: solid;
  height: 50px;
  flex: 1;
  display: flex;
  align-items: center;
  /* 垂直居中 */

}

.my-data {
  height: 65px;
  vertical-align: bottom;
}

.my-data-item {
  padding: 10px 0;
}

.my-data-div {
  flex: 1;
  display: flex;
  align-items: center;

  /* 垂直居中 */
  &.up {
    font-size: 24px;
    font-weight: bold;
  }

  &.down {
    font-size: 12px;
  }
}

.my-info-left {
  margin-left: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;

  /* 垂直居中 */
  >span {
    //  outline: solid;
    margin-left: 10px;
    font-size: 16px;
  }
}

.vip-btn {
  height: 21px;
  width: 100px;
  top: 10px;
  left: 15px;
  padding-right: 10px;
  padding-left: 2px;

  color: #4e3b20;
}

.vip-btn.text {
  // display: inline-block;
  // font-size: 10px;
  // flex: 2;
  margin-left: 2px;
}


// 盒子 234 顶部 我的订单 我的工具 猜你喜欢 & 查看全部
.cell {
  display: flex;
  align-items: center;

  &.header {
    height: 40px;

    &.h-left {
      // outline: solid;
      font-size: 16px;
      font-weight: bold;
      margin-left: 15px;
    }

    &.h-right {
      margin-right: 10px;
    }

    &.h-ico {
      margin: 0 3px;
    }

  }

  &.items {
    flex: 1;
    margin: 0 5px;
  }
}

// 盒子 23 我的工具 我的订单 图标 + 文本
.item {
  margin: 5px 0;

  .text {
    font-size: 12px;
  }

  .item-ico {
    background: url(@/assets/images/icoAll.png) no-repeat;
    display: inline-block;
  }

  &.order {
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

  &.tool {
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
}

// 盒子 4 猜你喜欢 内容
.like {
  flex: 1;
  padding-bottom: 10px;

  img {
    display: inline-block;
    // outline: solid;
    width: 50px;
    height: 77px;
    object-fit: cover;
    // margin-left: 20px;
    margin-right: 30px;
  }

  span {
    font-size: 15px;
    width: 210px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    // color: #4d4d4d;
  }
}
</style>
