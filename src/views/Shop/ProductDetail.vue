<template>
  <div class="product-div">

    <van-nav-bar class="top-nav-bar" :border="false" :fixed="true" @click-left="toBack" @click-right="toCart">
      <template #left>
        <van-icon size="20" name="arrow-left" />
      </template>
      <template #right>
        <van-icon size="20" name="shopping-cart-o" />
      </template>
      <template #title>
        <van-row type="flex" justify="center" gutter="45">
          <van-col class="top-bar-opt" span="6">商品</van-col>
          <van-col class="top-bar-opt" span="6">评价</van-col>
          <van-col class="top-bar-opt" span="6">详情</van-col>
        </van-row>
      </template>
    </van-nav-bar>


    <!-- <swiper-container 
    :grab-cursor="true"
    :slides-per-view="1.3"
    :centered-slides="true" 
    :space-between="30"
    effect="coverflow"
    :coverflow-effect-scale ="1"
    :coverflow-effect-depth="1000"
    :coverflow-effect-rotate="0"
    :coverflow-effect-stretch="3"
    :coverflow-effect-modifier="1"
    :coverflow-effect-slideShadows="false"

    :pagination="false"
     :modules="modules"
      class="my-swiper-two"> -->

    <swiper-container :grab-cursor="true" :slides-per-view="1.5" :centered-slides="true" :space-between="0"
      :pagination="true" class="swiper-container">
      <swiper-slide class="swiper-slide" v-for="item in product.item.images" :key="item"><img
          :src="item" /></swiper-slide>
    </swiper-container>

    <van-cell-group class="cell-group product-info" inset>
      <van-cell class="cell-div title" :border="false">
        <template #title>
          <div class="cell-title content">{{ product.item.title }}
          </div>
        </template>
      </van-cell>
      <van-cell class="cell-div price" :border="false">
        <template #title>
          <div class="cell-price content">
            <span class="cell-price-content nowPrice">{{ product.mockData.price.price.priceText }}</span>
            <!-- <span class="cell-price-content oldPrice">888.0</span> -->
          </div>
        </template>
      </van-cell>
      <van-cell class="cell-div info" :border="false">
        <template #title>
          <div class="cell-info content">
            <span class="cell-info-content post">包邮</span>
            <span class="cell-info-content sold">{{ product.item.favcount }}</span>
            <span class="cell-info-content rate">{{ product.item.commentCount }}</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="cell-group small-group" inset>
      <van-cell class="cell-div selected" :border="false">
        <template #title>
          <span class="cell-selected info">{{ product.skuBase.props[0].values[0].name }}</span>
          <!-- <div class="cell-title content">鲜果优精选水果盒子 500g
          </div> -->
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="cell-group middle-group" inset>
      <van-cell class="cell-div more" :border="false">
        <van-grid class="cell items" :border="false" :column-num="3">
          <van-grid-item class="item more">
            <span class="item item-ico"></span>
            <div class="item text">客服</div>
          </van-grid-item>
          <van-grid-item class="item more">
            <span class="item item-ico"></span>
            <div class="item text">分享</div>
          </van-grid-item>
          <van-grid-item class="item more">
            <span class="item item-ico"></span>
            <div class="item text">收藏</div>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-cell-group>


    <!-- <van-cell-group class="cell-group" inset> -->
    <van-cell-group class="cell-group large-group" inset>

      <van-cell class="cell header" :border="false">

        <template #title>
          <span class="cell header h-left">商品评价({{ product.rate.totalCount }})</span>
        </template>

        <template #right-icon>
          <span class="cell header h-right">查看全部
            <van-icon class="header h-ico" name="arrow" />
          </span>
        </template>

      </van-cell>

      <div class="labels" :border="false">
        <span class="label-item" v-for="item in product.rate.keywords" :key="item.attribute">{{ item.word }}({{ item.count
        }})</span>
      </div>

      <van-cell class="cell rate" :border="false" v-for="item in product.rate.rateList" :key="item.feedId">

        <template #title>
          <div class="rate-wrapper">
            <van-image class="rate-avatar" round width="34px" height="34px" :src="item.headPic" />
            <div class="rate-info">
              <span class="rate-info-id">{{ item.userName }}<van-image v-if="item.isVip == 'true'" class="vip-ico"
                  height="12px" src="//img.alicdn.com/tfs/TB1wrG1elv0gK0jSZKbXXbK2FXa-225-96.png" /></span>
              <span class="rate-info-date">{{ item.createTimeInterval }}</span>
            </div>
          </div>
        </template>

        <template #label>
          <div class="rate-content">{{ item.content }}
          </div>
        </template>

      </van-cell>



    </van-cell-group>


  </div>
</template>

<script>
import tdata from '@/assets/test-data.json'
// import { register } from 'swiper/element/bundle';


// register();


export default {
  data() {
    return {
      secKillProductList: tdata.secKillProductList,

      product: tdata.productDetail[0],

      // product.item: this.aaa.item,
      // product.item: tdata.productDetail[0].item,
      // product.rate: tdata.productDetail[0].rate,
      // pSkuBase: tdata.productDetail[0].skuBase,
      // product.mockData: tdata.productDetail[0].mockData,
      // productDetail: tdata.productDetail[0],

      productId: "",
      productIdInfo: "",
      value: 2,
      images: [
        'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2208161521967/O1CN01EJ689a1QOvsm0SaXE_!!2208161521967.jpg',
        'https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2208161521967/O1CN01dmIrTn1QOvnsq1y9J_!!2208161521967.jpg',
        'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2208161521967/O1CN01IKwLpO1QOvsc5GY6b_!!2208161521967.jpg',
        'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2208161521967/O1CN01VUYlpN1QOvsb3A3iI_!!2208161521967.jpg',
        'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2208161521967/O1CN01dlbvB01QOvoA3yVZb_!!2208161521967.jpg',
        'https://img.alicdn.com/imgextra/i4/880734502/O1CN01WRjUlw1j7xvqWdoCm_!!0-item_pic.jpg',
        'https://img.alicdn.com/imgextra/i3/880734502/O1CN01Y4YtHS1j7xvTvcMaV_!!880734502.jpg',
        'https://img.alicdn.com/imgextra/i2/880734502/O1CN01GEh5CT1j7xur5MZvs_!!880734502.jpg',
        'https://img.alicdn.com/imgextra/i4/880734502/O1CN01DTWe5Z1j7xt4au5G3_!!880734502.jpg',
        'https://img.alicdn.com/imgextra/i4/880734502/O1CN01DTWe5Z1j7xt4au5G3_!!880734502.jpg',
        'https://img.alicdn.com/imgextra/i4/880734502/O1CN01lX4tTE1j7xu5woC6r_!!880734502.jpg'
      ],
      mySwiper: '',

    }
  },
  created() {
    // 获取动态路由参数 
    this.productId = this.$route.params.id
    this.getProductById(this.productId)
    if (this.productId == 2) {
      this.product = tdata.productDetail[1]
    } else {
      this.product = tdata.productDetail[0]
    }
  },
  watch: {
    '$route.params.id'(newId, oldId) {
      // 当路由参数改变时,重新获取商品详情数据
      this.productId = newId
      this.getProductById(this.productId)
      console.log(`id changed from ${oldId} to 【 ${newId} 】`);
      if (this.productId == 2) {
        this.product = tdata.productDetail[1]
      } else {
        this.product = tdata.productDetail[0]
      }
    }
  },
  methods: {
    getProductById(id) {
      const theProductInfo = this.secKillProductList.find(item => item.id === id);
      console.dir(theProductInfo);
      return theProductInfo
    },
    toBack() {
      console.log("toBack")
    },
    toCart() {
      console.log("toCart")
    },
  },
  computed: {
  },


}
</script>

<style lang="less" scoped>
.labels {
  max-width: 323x;
  /* 固定最大宽度 */
  overflow-x: scroll;
  /* 水平方向显示滚动条 */
  white-space: nowrap;
  margin-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.label-item {
  font-size: 14px;
  display: inline-block;
  padding: 0 7px;
  background-color: @light-blue;
  height: 26px;
  line-height: 26px;
  border-radius: 13px;
  margin-right: 5px;
}

.product-div {
  background: url(@/assets/images/itemdetailback.png) fixed no-repeat 0 0 / 100% auto;
  position: absolute;
  width: 100vw;
  // overflow: hidden;
}

.top-nav-bar {
  background: transparent;
  z-index: 10;
  .top-bar-opt{
    text-shadow: 1px 1px 5px #000;
  }
}

.swiper-container {
  --swiper-pagination-bottom: 30px;
}



.swiper-slide {
  transition: 300ms;
  align-items: center;
  display: flex;
  justify-content: center;
  transform: scale(0.8);
  height: 250px;
  box-shadow: 0px 4px 10px #122e7447;
  background-color: white;
  border-radius: 5px;
  margin: 50px 0 20px;

  & img {
    height: 100%;
    border-radius: 5px;
    // 可能会裁剪图片 ( 设备宽度 != 375px ) 
    object-fit: cover;
    flex: 1;
  }

}

// 当前图片恢复大小
.swiper-slide-active {
  transform: scale(1);
}



// // 盒子 4 猜你喜欢 内容
// .like {
//   flex: 1;
//   padding-bottom: 10px;

//   img {
//     display: inline-block;
//     // outline: solid;
//     width: 50px;
//     height: 77px;
//     object-fit: cover;
//     // margin-left: 20px;
//     margin-right: 30px;
//   }

//   span {
//     font-size: 15px;
//     width: 210px;
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     -o-text-overflow: ellipsis;
//     // color: #4d4d4d;
//   }
// }

// 固定盒子大小
.cell-group {
  margin-bottom: 15px;
  padding: 0 10px;

  &.product-info {
    padding-top: 15px;
    padding-bottom: 10px;
  }

  // // 整体偏移 顶部
  &:first-child {
    // margin-top: 47px;
  }

  // 整体偏移 底部 防止底栏遮挡
  &:last-child {
    margin-bottom: 20px;
  }

  &.small-group {
    height: 41px;
  }

  &.middle-group {
    height: 77px;
  }

  // 商品评价预览
  &.large-group {
    // outline: solid;
    justify-content: flex-start;
    height: fit-content;
    padding: 5px 10px 10px;
    // height: 77px;
  }

  .h-left {
    // 覆盖引入样式
    // 减少「商品评价」左边距
    margin: 0;
  }
}


.cell-div {
  &.title {
    font-size: 16px;
  }

  &.price {
    // outline: solid;

    span::before {
      content: "¥";
      margin-right: 1px;
      margin-left: 3px;
    }

    .nowPrice {
      font-size: 21px;
      color: red;
      font-weight: bold;
    }

    .oldPrice {
      font-size: 12px;
      color: grey;
      text-decoration: line-through
    }
  }

  &.info {
    span {
      margin-right: 20px;
    }

    .cell-info-content {
      // outline: solid;
      font-size: 14px;
      font-weight: bold;

      &.post,
      &::after {
        margin-left: 2px;
        font-weight: normal;
        font-size: 13px;
        color: #7c7c7c;
      }

      &.sold::after {
        content: "已购";
      }

      &.rate::after {
        content: "好评";
      }
    }
  }

  &.selected {
    font-size: 14px;
    font-weight: bold;

    &::before {
      content: "已选";
      margin-right: 25px;
      font-weight: normal;
      font-size: 13px;
      color: #7c7c7c;
    }
  }
}




.item {
  margin: 2px 0;

  .text {
    font-size: 12px;
  }

  .item-ico {
    background: url(@/assets/images/icoAll.png) no-repeat;
    display: inline-block;
  }

  &.more {
    padding-top: 4px;

    .item-ico {
      background-position-y: -73px;
      background-size: 110px;
      width: 20.5px;
      height: 21px;
    }

    &:nth-child(1) .item-ico {
      background-position-x: -26.5px;
    }

    &:nth-child(2) .item-ico {
      background-position-x: -47px;
    }

    &:nth-child(3) .item-ico {
      background-position-x: -67px;
    }

  }
}


.rate {
  margin: 10px 0;

  .rate-wrapper {
    display: flex;
    line-height: normal;
    align-items: center;

    .rate-avatar {
      margin-right: 10px;
    }

    .rate-info {
      display: flex;
      flex-direction: column;
    }

    .rate-info-id {
      font-size: 15px;
      display: flex;
      align-items: center;

      .vip-ico {
        margin: auto;
        margin-left: 5px;
      }
    }

    .rate-info-date {
      color: #999999;
    }
  }

  .rate-content {
    color: #111111;
    font-size: 14px;
    margin: 11px 0px 0px;
  }
}


// avatar
// info
// id
// date
// .my-info-left {
//   margin-left: 20px;
//   margin-top: 20px;
//   display: flex;
//   align-items: center;

//   /* 垂直居中 */
//   >span {
//     //  outline: solid;
//     margin-left: 10px;
//     font-size: 16px;
//   }
// }</style>