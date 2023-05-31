<template>
  <div class="product-div">

    <!--———— 1. 顶栏 ——————-->
    <!-- 顶部导航栏 返回 商品icon 评价 详情 购物车icon -->
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

    <!--———— 2.1 主体 ——————-->
    <!-- 轮播图 商品图片 -->
    <div ref="swiper" class="swiper">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" v-for="item in result.mainPictures" :key="item"><img :src="item" class="swiper-img" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <!--———— 2.2 主体 ——————-->
    <!-- 商品详情 商品标题 价格 包邮 已购 好评 -->
    <van-cell-group class="cell-group product-info" inset>
      <van-cell class="cell-div title" :border="false">
        <template #title>
          <div class="cell-title content">{{ result.name }}
          </div>
        </template>
      </van-cell>
      <van-cell class="cell-div price" :border="false">
        <template #title>
          <div class="cell-price content">
            <span class="cell-price-content nowPrice">{{ result.price }}</span>
            <span class="cell-price-content oldPrice">{{ result.oldPrice }}</span>
          </div>
        </template>
      </van-cell>
      <van-cell class="cell-div info" :border="false">
        <template #title>
          <div class="cell-info content">
            <span class="cell-info-content post">包邮</span>
            <span class="cell-info-content sold">{{ evaluate.salesCount }}</span>
            <span class="cell-info-content rate">{{ evaluate.praisePercent }}%</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <!--———— 2.3 主体 ——————-->
    <!-- 商品SKU 已选 -->
    <van-cell-group class="cell-group small-group" inset>
      <van-cell class="cell-div selected" :border="false">
        <template #title>
          <span class="cell-selected info">已选规格</span>
        </template>
      </van-cell>
    </van-cell-group>

    <!--———— 2.4 主体 ——————-->
    <!-- 更多选项 客服 分享 收藏 -->
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


    <!--———— 2.5 主体 ——————-->
    <!-- 商品评价 评价数量 查看全部 预览评价 -->
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

    <!--———— 3. 底部 ——————-->
    <!-- 按钮 加入购物车 购买 -->
    <van-goods-action class="purchase-tab">
      <van-goods-action-button @click="skuShow = true" class="purchase-button" color="#5BD3E9" type="warning"
        text="加入购物车" />
      <van-goods-action-button @click="skuShow = true" class="purchase-button" color="#F14242" type="danger" text="立即购买" />
    </van-goods-action>


    <!--———— 4. 弹窗 ——————-->
    <!-- 商品详情 sku -->
    <van-sku v-model="skuShow" :sku="sku" :goods="goods" :goods-id="goodsId" :quota="quota" :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock" :message-config="messageConfig" @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked" />`


  </div>
</template>

<script>
import tdata from '@/assets/test-data.json'
// import { register } from 'swiper/element/bundle';
import { getProductDetailApi, getProductEvaluateApi } from '@/api/product'

// register();


export default {
  data() {
    return {
      onBuyClicked() {
        console.log("onBuyClicked")
      },
      onAddCartClicked() {
        console.log("onAddCartClicked")
      },
      result: '',
      evaluate: '',
      props: ['productId'],
      skuShow: false,
      sku: {},
      goods: {
        // 数据结构见下方文档
      },
      messageConfig: {
        // 数据结构见下方文档
      },
      goodsId: 123,
      quota: 123,
      quotaUsed: 123,
      //以上是商品详情sku弹窗信息

      secKillProductList: tdata.secKillProductList,
      product: tdata.productDetail[0],
      productId: "",
      productIdInfo: "",
      value: 2,
      mySwiper: '',

    }
  },
  created() {
    // 获取动态路由参数 
    this.productId = this.$route.params.id

    this.getProductById(this.productId)
    

    this.getProductEvaluateById(this.productId)
    
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

      getProductDetailApi({ id }).then(res => {
        console.log("------------------------------res", res)
        let result = res.result
        this.result = result
        console.log("this.result", this.result)

        let sku = {
          tree: [], // 使用循环填充
          list: [],
          collection_id: result.id,
          stock_num: result.inventory,
          price: result.price,
          none_sku: false,
          messages: [],
          hide_stock: false
        }

        // 填充 tree
        for (let i = 0; i < result.specs.length; i++) {
          const spec = result.specs[i];
          sku.tree.push({
            k: spec.name,
            k_s: spec.name,
            v: spec.values.map(value => ({
              id: value.name,
              name: value.name,
              imgUrl: value.picture,
              previewImgUrl: value.picture
            }))
          })
        }

        // 填充 list  
        for (let i = 0; i < result.skus.length; i++) {
          const skus = result.skus[i];
          sku.list.push({
            //... 其他属性   
            id: skus.id,
            // ... 使用reduce赋值规格
            ...skus.specs.reduce((obj, spec) => {
              obj[spec.name] = spec.valueName;
              return obj;
            }, {})
          })
        }

        sku.collection_id = result.id, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          sku.stock_num = result.inventory, // 商品总库存
          sku.price = result.price, // 默认价格（单位元）
          sku.none_sku = false, // 是否无规格商品
          sku.messages = [],
          sku.hide_stock = false // 是否隐藏剩余库存

        this.sku = sku
        console.log("this.sku", this.sku)

      })

    },

    getProductEvaluateById(id){
      getProductEvaluateApi(id).then(res => {
        console.log("getProductEvaluateApi res", res)
        this.evaluate = res.result
        
      })
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
  mounted() {
    const SECOND = 1000 // milliseconds

    new this.$swiper(this.$refs.swiper, {

      // 已全局注册
      // modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1.5,
      spaceBetween: 10,

      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 13 * SECOND,
        disableOnInteraction: false,
      },
      // speed: 2 * SECOND,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },

      // on: {
      //   slideChange: (swiper) => {
      //     this.activeIndex = swiper.realIndex
      //   },
      // },
    })
  },

}
</script>

<style lang="less" scoped>
.purchase-tab {
  // outline: solid;
  margin: 0 auto 20px;
  font-size: 18px;
  width: 300px;
  height: 46px;
  background-color: transparent;

  /deep/ .purchase-button {
    font-size: 16px;
  }
}

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
  overflow: hidden;
}

.top-nav-bar {
  background: transparent;
  z-index: 10;

  .top-bar-opt {
    text-shadow: 1px 1px 5px #000;
  }
}


.swiper {
  // transition: 300ms;
  // // align-items: center;
  // // display: flex;
  // // justify-content: center;
  // transform: scale(0.8);
  // // height: 375px;
  // height: 100vw;
  // border-radius: 5px;
  // // margin: 50px 0 20px;
  // margin-top: 10px;

  // overflow: visible;
  // max-width: 600px;
  .swiper-slide {
    transition: 300ms;
    // align-items: center;
    display: flex;
    // justify-content: center;
    transform: scale(0.85);
    // height: 250px;
    // width: 250px;
    box-shadow: 0px 4px 10px #122e7447;
    background-color: white;
    border-radius: 5px;
    margin-top: 70px;
  }

  .swiper-slide-active {
    transform: scale(1);
    margin: 50px 0 20px;
  }

  img {
    /* 图片居中填充 */
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
  }

  /deep/ .swiper-pagination {
    width: max-content;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;


    // outline: solid;
    .swiper-pagination-bullet {
      background-color: #000;
      width: 10px;
      height: 10px;
      margin-right: 2px;
      opacity: 0.35;
    }

    .swiper-pagination-bullet-active {
      background-color: #fff;
      opacity: 1;
    }
  }
}

// .swiper-container {
//   --swiper-pagination-bottom: 30px;
// }



// .swiper-slide {
//   transition: 300ms;
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   transform: scale(0.8);
//   height: 250px;
//   box-shadow: 0px 4px 10px #122e7447;
//   background-color: white;
//   border-radius: 5px;
//   margin: 50px 0 20px;

//   & img {
//     height: 100%;
//     border-radius: 5px;
//     // 可能会裁剪图片 ( 设备宽度 != 375px ) 
//     object-fit: cover;
//     flex: 1;
//   }

// }

// // 当前图片恢复大小
// .swiper-slide-active {
//   transform: scale(1);
// }



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
// }
</style>