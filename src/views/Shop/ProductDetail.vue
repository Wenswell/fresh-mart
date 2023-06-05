<template>
  <div class="product-div">

    <!--———— 1. 顶栏 ——————-->
    <!-- 顶部导航栏 返回 商品icon 评价 详情 购物车icon -->
    <van-nav-bar class="top-nav-bar" :border="false" :fixed="true" @click-left="$router.back()"
      @click-right="$router.push('/layout/cart')">
      <template #left>
        <van-icon size="20" name="arrow-left" />
      </template>
      <template #right>
        <van-icon class="right-top-cart" size="20" name="shopping-cart-o" :badge="cartCount" />
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
        <!-- <div class="swiper-slide" v-for="(item,index) in product.item.images" :key="index"><img :src="item" class="swiper-img" /> -->
        <div class="swiper-slide" v-for="(item, index) in result.mainPictures" :key="index"><img :src="item"
            class="swiper-img" />
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
            <span class="cell-info-content rate">{{ evaluate.praisePercent }}</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <!--———— 2.3 主体 ——————-->
    <!-- 商品SKU 已选 -->
    <van-cell-group class="cell-group small-group" inset @click="skuShow = true">
      <van-cell class="cell-div selected" :border="false">
        <template #title>
          <div v-if="!selectSku">请选择规格</div>
          <span class="cell-selected info">{{ selectSku }}</span>
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

        <!-- 2.5.1. 顶部左侧 商品评价 {评价数量}  -->
        <template #title>
          <span class="cell header h-left">商品评价({{ evaluate.evaluateCount }})</span>
        </template>

        <!-- 2.5.1. 顶部右侧 查看全部  -->
        <template #right-icon>
          <span class="cell header h-right">查看全部
            <van-icon class="header h-ico" name="arrow" />
          </span>
        </template>

      </van-cell>

      <!-- 2.5.2. 上部 评价标签 有图 ...... -->
      <div class="labels" :border="false">
        <span class="label-item" v-for="item in keywords" :key="item.title">{{ item.title }}({{ item.count
        }})</span>
      </div>

      <!-- 2.5.3. 主体 评价内容循环 -->
      <van-cell class="cell rate" :border="false" v-for="item in evaluateContent" :key="item.id">
        <template #title>
          <div class="rate-wrapper">
            <van-image class="rate-avatar" round width="34px" height="34px" :src="item.avatar" />
            <div class="rate-info">
              <span class="rate-info-id">{{ item.nickname }}<van-image v-if="item.isVip == 'true'" class="vip-ico"
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
      <van-goods-action-button @click="skuShow = true" class="purchase-button" color="#F14242" type="danger"
        text="立即购买" />
    </van-goods-action>


    <!--———— 4. 弹窗 ——————-->
    <!-- 商品详情 sku -->
    <van-sku class="sku-div" v-model="skuShow" :sku="sku" :goods="goods" :goods-id="sku.collection_id" :quota="0"
      :quota-used="0" :hide-stock="sku.hide_stock" @sku-prop-selected="changeSelectedSku"
      @sku-selected="changeSelectedSku" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked">
      <template #sku-body-top>
        <!-- 收货 信息地址栏 -->
        <van-cell @click="toAddress" class="address-div" center :is-link="true" icon="location-o">
          <template #title>
            <div v-for="item in showAddressList" :key="item">{{ item }}</div>
          </template>
        </van-cell>
      </template>
    </van-sku>


  </div>
</template>

<script>
import { getProductDetailApi, getProductEvaluateApi, addProductToCartApi, getEvaluatePageApi } from '@/api/product'

export default {
  data() {
    return {
      productId: "",  // 当前商品id / 动态路由地址
      mySwiper: '',   //轮播图

      //以下是商品详情sku弹窗信息
      skuShow: false,   // 弹窗开关 Sku 商品规格
      result: '',           // 原始商品信息

      evaluate: '',         // 评价数据
      keywords: [],         // 评价关键词
      evaluateContent: [],  // 评价具体内容

      props: ['productId'], // 点击购买/加购返回信息
      sku: {},        // 【主要】 result过滤后的 商品sku及数量
      selectSku: '',   // 选中的sku
      cartCount: '',  // 购物车数量
      goods: {},      // 默认商品 sku 缩略图

      addressList: [],  // 收货地址列表
      showAddressList: [],  // 收货信息地址，只用于展示
      chosenAddressId: 0,  // 接收选择的地址id

      path: ''    //当前路由路径
    }
  },
  methods: {
    toAddress() {
      this.path = this.$route.path
      // this.$router.push('/user/address')
      // 防止 product->address->product->address
      this.$router.replace({
        name: 'address' 
      })
    },

    // 获取购物车数量
    async getCartCount() {
      let count = await this.$store.getters['cart/getCartCount']
      this.cartCount = count
    },

    // 获取选择的sku用于展示
    changeSelectedSku(res) {
      let result = ''
      for (let key in res.selectedSku) {
        let value = res.selectedSku[key] || "未选择"
        result += `${key}：${value}；`
      }
      result = result.slice(0, -1) // 去除最后一个";"号
      this.selectSku = result
    },

    // 构建轮播图
    creatNewSwiper() {
      // console.log("this.$refs.swiper", this.$refs.swiper)
      new this.$swiper(this.$refs.swiper, {

        // 已全局注册
        // modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1.5,
        spaceBetween: 10,

        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 13 * 1000,
          disableOnInteraction: false,
        },
        // speed: 2 * 1000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      })
    },

    // 加入购物车 - 已选sku
    onAddCartClicked(data) {
      // console.log("onAddCartClicked", data)
      this.$toast('skuid:' + data.selectedSkuComb.id + '\n添加成功');
      // 加入购物车
      addProductToCartApi({ 'skuId': data.selectedSkuComb.id, 'count': data.selectedNum })
      // 关闭sku展示
      this.skuShow = false
      // 更新购物车数量
      this.getCartCount()
    },

    // 直接购买 - 已选sku
    onBuyClicked(data) {
      // console.log("onBuyClicked", JSON.stringify(data))
      this.$toast('skuid:' + data.selectedSkuComb.id + '\n地址id:' + this.chosenAddressIndex +'\n直接前往购买');
      // console.group('直接前往购买')
      // console.group('所有信息',data)
      // console.group('购买数量',data.selectedNum)
      // console.group('商品信息',data.selectedSkuComb)
      // console.group('商品skuID',data.selectedSkuComb.id)
      // console.group('地址',this.addressList[this.chosenAddressIndex])
      // 直接提交订单 - 在vuex中完成
      this.$store.dispatch('user/toBuyNow', {
        skuId: data.selectedSkuComb.id,
        count: data.selectedNum,
        addressId: this.chosenAddressId,
      })
      // 提交后转到订单页面
      this.$router.push('/order/check')
    },

    // 商品id -> API -> 商品详细内容
    getProductById(id) {

      getProductDetailApi({ id }).then(res => {
        // result即结果
        let result = res.result
        // result 存至 data
        this.result = result
        this.goods = { // 默认商品 sku 缩略图
          'picture': this.result.mainPictures[0]
        }

        // result -> 过滤成 sku (van-sku 数据格式)
        // 大概框架
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
            price: skus.price*100,
            stock_num: skus.inventory,
            // ... 使用reduce赋值规格
            ...skus.specs.reduce((obj, spec) => {
              obj[spec.name] = spec.valueName;
              return obj;
            }, {})
          })
        }

        sku.collection_id = result.id, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          sku.stock_num = result.inventory || result.skus[0].inventory, // 商品总库存
          sku.price = result.price, // 默认价格（单位元）
          sku.none_sku = false, // 是否无规格商品
          sku.messages = [],
          sku.hide_stock = false // 是否隐藏剩余库存

        // 填充完成 存至 data.sku
        this.sku = sku

        if(result.userAddresses.length){
          // 保存一份地址列表至data
          this.addressList = result.userAddresses
          const { receiver, contact, fullLocation, address } = this.chosenAddressId 
          // 提取选择的地址
          ? result.userAddresses.find(address => address.id === this.chosenAddressId) 
          // 否则 未选择地址（默认为0）则使用默认地址
          : result.userAddresses.find(address => address.isDefault !== 0);
          // 保存至data用于展示
          this.showAddressList = [`${receiver}, ${contact}, ${fullLocation}`, address];
        } else {
          this.$toast('没有添加地址！')
        }

      }).then(() => {
        // 有数据后创建轮播图
        this.creatNewSwiper()
      })

    },

    // 商品id -> 商品评价数据
    getProductEvaluateById(id) {
      getProductEvaluateApi(id).then(res => {
        let evaluate = res.result
        this.evaluate = evaluate

        const keywords = [];

        if (evaluate.hasPictureCount) {
          keywords.push({
            title: "有图",
            count: evaluate.hasPictureCount
          });
        }

        for (let i = 0; i < evaluate.tags.length; i++) {
          keywords.push({
            title: evaluate.tags[i].title,
            count: evaluate.tags[i].tagCount
          });
        }

        this.keywords = keywords

      })
    },

    // 商品id -> 商品评价具体内容
    getEvaluatePageById(id) {

      getEvaluatePageApi(id, 1, 3).then(res => {
        const result = res.result
        const data = [];

        // 只预览 3 条评价
        // 按格式整理结果
        for (let i = 0; i < 3; i++) {
          data.push({
            id: result.items[i].id,
            createTime: result.items[i].createTime,
            nickname: result.items[i].member.nickname,
            avatar: result.items[i].member.avatar,
            content: result.items[i].content
          });
        }

        // 结果存放至 data
        this.evaluateContent = data
      })
    },

  },
  beforeDestroy() {
    this.$bus.$emit('from-path', this.path)
    this.$bus.$emit('chosen-address-index', this.chosenAddressIndex)
    this.$bus.$off('chosen-address-index')
  },
  created() {
    this.$bus.$on('chosen-address-id', (params) => {
      console.log("=======chosen-address-id", params)
      // 接收选择的地址序号
      this.chosenAddressId = params
    })
    // 打开SKU选择弹窗
    this.$bus.$on('open-sku', params => this.skuShow = Boolean(params))

    // 获取动态路由参数 -- 商品id
    this.productId = this.$route.params.id

    // 商品id -> 商品详情
    this.getProductById(this.productId)

    // 商品id -> 商品评价信息
    this.getProductEvaluateById(this.productId)

    // 商品id -> 商品评价详细内容
    this.getEvaluatePageById(this.productId)

    // 获取购物车数量
    this.getCartCount()


  },
  watch: {
    // 监视路由变动/不同商品
    '$route.params.id'(newId, oldId) {
      this.productId = newId
      // 当路由参数改变时,重新获取商品详情数据
      this.getProductById(this.productId)
      console.log(`id changed from ${oldId} to 【 ${newId} 】`);
    }
  },
}
</script>

<style lang="less" scoped>
// 页面容器
.product-div {
  background: url(@/assets/images/itemdetailback.png) fixed no-repeat 0 0 / 100% auto;
  position: absolute;
  width: 100vw;
  overflow: hidden;
}

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
}

// <!--———— 1. 顶栏 ——————-->
// <!-- 顶部导航栏 返回 商品icon 评价 详情 购物车icon -->
.top-nav-bar {
  background: transparent;
  z-index: 10;

  .top-bar-opt {
    text-shadow: 1px 1px 5px #000;
  }

  .right-top-cart>div {
    border: none;
    height: 16px;
    line-height: 16px;
    padding-right: 1px;
  }
}

// <!--———— 2.1 主体 ——————-->
// <!-- 轮播图 商品图片 -->
.swiper {
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


// <!--———— 2.4 主体 ——————-->
// <!-- 更多选项 客服 分享 收藏 -->
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

// <!--———— 2.5 主体 ——————-->
// <!-- 商品评价 评价数量 查看全部 预览评价 -->
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

// <!-- 2.5.2. 上部 评价标签 有图 ...... -->
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
}

// <!--———— 3. 底部 ——————-->
// <!-- 按钮 加入购物车 购买 -->
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

// <!--———— 4. 弹窗 ——————-->
// <!-- 商品详情 sku -->
/deep/ .sku-div {
  max-height: 75%;

  &>div:first-child {
    &>div:last-child {
      margin-left: 130px;
    }

    &>div:first-child {
      width: 125px;
      height: 125px;
      border: 5px solid #5AD4EA;
      margin: 12px 12px 12px 0;
      overflow: hidden;
      border-radius: 15px;
      position: absolute;
      bottom: 5px;
      background-color: #fff;
    }
  }

  &>div:nth-child(2) {
    *[class*=active] {
      background: #5AD4EA;
      color: white;
    }
  }

  &>div:nth-child(3) {
    button:first-child {
      background: #5AD4EA;
    }
  }
}



// sku 弹窗 地址栏

.address-div {
  padding: 8px;
  font-size: 13px;

  //两侧图标大小
  >i {
    margin: 8px;
    font-size: 22px;
  }
}
</style>