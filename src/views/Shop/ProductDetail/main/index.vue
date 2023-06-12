<template>
  <div class="main-page">

    <!--———— 2.1 主体 ——————-->
    <!-- 轮播图 商品图片 -->
    <MainSwiper ref="swiper" :imgList="result.mainPictures" />

    <!--———— 2.2 主体 ——————-->
    <!-- 商品详情 商品标题 价格 包邮 已购 好评 -->
    <MainTitle :result="result" :evaluate="evaluate" />

    <!--———— 2.3 主体 ——————-->
    <!-- 商品SKU 已选 -->
    <MainSelect @open="skuShow = true" ref="selecteded" :selectSku="selectSku" />

    <!--———— 2.4 主体 ——————-->
    <!-- 更多选项 客服 分享 收藏 -->
    <MainOption @collect="onCollect" :collect=result.isCollect />

    <!--———— 2.5 主体 ——————-->
    <!-- 商品评价 评价数量 查看全部 预览评价 -->
    <MainEvaluate :evaluate="evaluate" :evaluateContent="evaluateContent" />

    <!--———— 3. 底部 ——————-->
    <!-- 按钮 加入购物车 购买 -->
    <MainPurchase @open="skuShow = true" />

    <!--———— 4. 弹窗 ——————-->
    <!-- 商品详情 sku -->
    <MainSku />


    <van-sku class="sku-div" v-model="skuShow" :sku="sku" :goods="goods" :goods-id="sku.collection_id" :quota="0"
      :quota-used="0" :hide-stock="sku.hide_stock" @sku-prop-selected="changeSelectedSku"
      @sku-selected="changeSelectedSku" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked">
      <template #sku-body-top>
        <ShowAddressCard :showAddressList="showAddressList" :chosenAddressId="chosenAddressId"></ShowAddressCard>
      </template>
    </van-sku>

  </div>
</template>

<script>
import { getEvaluatePageApi } from '@/api/product'
import ShowAddressCard from '../../ShowAddressCard.vue'
import MainSwiper from './components/main-swiper';
import MainTitle from './components/main-title';
import MainSelect from './components/main-select';
import MainOption from './components/main-option';
import MainEvaluate from './components/main-evaluate';
import MainPurchase from './components/main-purchase';
import MainSku from './components/main-sku';

export default {
  name: 'MainContent',
  components: {
    ShowAddressCard,
    MainSwiper,
    MainTitle,
    MainSelect,
    MainOption,
    MainEvaluate,
    MainPurchase,
    MainSku,
  },

  data() {
    return {
      productId: "",  // 当前商品id / 动态路由地址
      mySwiper: '',   //轮播图

      //以下是商品详情sku弹窗信息
      skuShow: false,   // 弹窗开关 Sku 商品规格
      result: {},           // 原始商品信息

      evaluate: {},          //评价数据
      evaluateContent: [],  // 评价具体内容

      props: ['productId'], // 点击购买/加购返回信息
      sku: {},        // 【主要】 result过滤后的 商品sku及数量
      selectSku: '',   // 选中的sku
      // cartCount: '',  // 购物车数量
      goods: {},      // 默认商品 sku 缩略图

      addressList: [],  // 收货地址列表
      showAddressList: [],  // 收货信息地址，只用于展示
      chosenAddressId: 0,  // 接收选择的地址id

      path: ''    //当前路由路径
    }
  },

  methods: {

    // 收藏、取消收藏
    onCollect() {
      this.result.isCollect ?
        //取消收藏
        (this.$store.dispatch('cart/cancelCollect', this.result.id),
          this.result.isCollect = !this.result.isCollect)
        //收藏
        : (this.$store.dispatch('cart/addToCollect', this.result.id),
          this.result.isCollect = !this.result.isCollect)
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

    // 加入购物车 - 已选sku
    onAddCartClicked(data) {
      // console.log("onAddCartClicked", data)
      this.$toast('skuid:' + data.selectedSkuComb.id + '\n添加成功');
      // 加入购物车
      this.$store.dispatch('cart/addProductToCart', { 'skuId': data.selectedSkuComb.id, 'count': data.selectedNum })
      // 关闭sku展示
      this.skuShow = false
      // 更新购物车数量
      // this.getCartCount()
    },

    // 直接购买 - 已选sku
    onBuyClicked(data) {
      // console.log("onBuyClicked", JSON.stringify(data))
      this.$toast('skuid:' + data.selectedSkuComb.id + '\n地址id:' + this.chosenAddressIndex + '\n直接前往购买');
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

      this.$store.dispatch('cart/getProductDetail', id).then(res => {
        if (!res) {
          this.$toast('商品不存在')
          this.$router.push('/layout/home')
          return
        }
        // result即结果
        let result = res
        // result 存至 data
        this.result = result
        console.log("this.result", this.result)
        this.goods = { // 默认商品 sku 缩略图
          'picture': this.result.mainPictures[0]
        }
        console.log("this.goods", this.goods)

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
            price: skus.price * 100,
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
        console.log("this.sku", this.sku)

        if (result.userAddresses.length) {
          // 保存一份地址列表至data
          this.addressList = result.userAddresses
          const { id, receiver, contact, fullLocation, address } = this.chosenAddressId
            // 提取选择的地址
            ? result.userAddresses.find(address => address.id === this.chosenAddressId)
            // 否则 未选择地址（默认为0）则使用默认地址
            : result.userAddresses.find(address => address.isDefault !== 0);
          // 保存至data用于展示
          this.showAddressList = [`${receiver}, ${contact}, ${fullLocation}`, address];
          console.log("this.showAddressList", this.showAddressList)
          // 保存至data用于发送订单请求
          this.chosenAddressId = id
        } else {
          this.$toast('没有添加地址！')
        }

        console.log("this.$refs", this.$refs.selecteded.showSku)
      }).then(() => {
        // 有数据后创建轮播图
        this.$refs.swiper.creatNewSwiper()
      })

    },

    // 商品id -> 商品评价数据
    getProductEvaluateById(id) {

      this.$store.dispatch('cart/getEvaluateKeywords', id).then(res => {
        this.evaluate = res
      })

    },

    // 商品id -> 商品评价具体内容
    getEvaluatePageById(id) {

      getEvaluatePageApi({ id, page: 1, pageSize: 3 }).then(res => {
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

    this.path = this.$route.fullPath

    // 商品id -> 商品详情
    this.getProductById(this.productId)

    // 商品id -> 商品评价信息
    this.getProductEvaluateById(this.productId)

    // 商品id -> 商品评价详细内容
    this.getEvaluatePageById(this.productId)

    // 获取购物车数量
    // this.getCartCount()


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
.main-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
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
</style>