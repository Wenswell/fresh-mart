<template>
  <div class="main-page">
    <!--———— 2.1 主体 ——————-->
    <!-- 轮播图 商品图片 -->
    <MainSwiper ref="swiper" :imgList="result.mainPictures" />

    <!--———— 2.2 主体 ——————-->
    <!-- 商品详情 商品标题 价格 包邮 已购 好评 -->
    <MainTitle :result="result" />

    <!--———— 2.3 主体 ——————-->
    <!-- 商品SKU 已选 -->
    <MainSelect
      @open="$refs.sku.skuShow = true"
      ref="selecteded"
      :selectSku="selectSku"
    />

    <!--———— 2.4 主体 ——————-->
    <!-- 更多选项 客服 分享 收藏 -->
    <MainOption @collect="onCollect" :collect="result.isCollect" />

    <!--———— 2.5 主体 ——————-->
    <!-- 商品评价 评价数量 查看全部 预览评价 -->
    <MainEvaluate
      :changeTab="changeTab"
      :prerate="prerate"
    />

    <!--———— 3. 底部 ——————-->
    <!-- 按钮 加入购物车 购买 -->
    <MainPurchase @open="$refs.sku.skuShow = true" />

    <!--———— 4. 弹窗 ——————-->
    <!-- 商品详情 sku -->
    <MainSku
      ref="sku"
      :sku="sku"
      :goods="goods"
      :userAddresses="result.userAddresses"
    />
  </div>
</template>

<script>
import MainSwiper from "./components/main-swiper";
import MainTitle from "./components/main-title";
import MainSelect from "./components/main-select";
import MainOption from "./components/main-option";
import MainEvaluate from "./components/main-evaluate";
import MainPurchase from "./components/main-purchase";
import MainSku from "./components/main-sku";
import api from "@/api";

export default {
  name: "AllMain",
  components: {
    MainSwiper,
    MainTitle,
    MainSelect,
    MainOption,
    MainEvaluate,
    MainPurchase,
    MainSku,
  },
  props: {
    changeTab: Function,
  },

  data() {
    return {
      //以下是商品详情sku弹窗信息
      result: {}, // 原始商品信息

      prerate:{},


      sku: {}, // 【主要】 result过滤后的 商品sku及数量
      selectSku: "", // 选中的sku
      // cartCount: '',  // 购物车数量
      goods: {}, // 默认商品 sku 缩略图

      // showAddressList: [],  // 收货信息地址，只用于展示
      // chosenAddressId: '0',  // 接收选择的地址id
    };
  },
  methods: {
    // 收藏、取消收藏
    onCollect() {
      this.result.isCollect
        ? //取消收藏
          (this.$store.dispatch("cart/cancelCollect", this.result.id),
          (this.result.isCollect = !this.result.isCollect))
        : //收藏
          (this.$store.dispatch("cart/addToCollect", this.result.id),
          (this.result.isCollect = !this.result.isCollect));
    },

    // 商品id -> API -> 商品详细内容
    getProductById(id) {
      this.$store
        .dispatch("cart/getProductDetail", id)
        .then((res) => {
          if (!res) {
            this.$toast("商品不存在");
            this.$router.push("/layout/home");
            return;
          }
          // result即结果
          let result = res;
          // result 存至 data
          this.result = result;
          console.log("this.result", this.result);
          this.goods = {
            // 默认商品 sku 缩略图
            picture: this.result.mainPictures[0],
          };
          // console.log("this.goods", this.goods)

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
            hide_stock: false,
          };

          // 填充 tree
          for (let i = 0; i < result.specs.length; i++) {
            const spec = result.specs[i];
            sku.tree.push({
              k: spec.name,
              k_s: spec.name,
              v: spec.values.map((value) => ({
                id: value.name,
                name: value.name,
                imgUrl: value.picture,
                previewImgUrl: value.picture,
              })),
            });
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
              }, {}),
            });
          }

          (sku.collection_id = result.id), // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
            (sku.stock_num = result.inventory || result.skus[0].inventory), // 商品总库存
            (sku.price = result.price), // 默认价格（单位元）
            (sku.none_sku = false), // 是否无规格商品
            (sku.messages = []),
            (sku.hide_stock = false); // 是否隐藏剩余库存

          // 填充完成 存至 data.sku
          this.sku = sku;
          // console.log("this.sku", this.sku)

          return res;
        })
        .then((res) => {
          // 有数据后创建轮播图
          if (!res) return;
          this.$refs.swiper.creatNewSwiper();
        });
    },

    // 商品评价预览内容
    getPreRateApi(id) {
      api.product.LOCALgetPreRateApi(id).then(res=>{
        this.prerate = res.result;
      })
    },


  },

  // beforeCreate(){console.log('%c index Main - beforeCreate','color:redkeep;')},
  // beforeMount(){console.log('%c index Main - beforeMount','color:redkeep;')},
  // beforeUpdate(){console.log('%c index Main - beforeUpdate','color:redkeep;')},
  // updated(){console.log('%c index Main - updated','color:redkeep;')},
  // destroyed(){console.log('%c index Main - destroyed','color:redkeep;')},

  created() {
    // 获取动态路由参数 -- 商品id
    const productId = this.$route.params.id;

    // 商品id -> 商品详情
    this.getProductById(productId);

   // 商品评价预览内容
    this.getPreRateApi(productId);


    // 获取购物车数量
    // this.getCartCount()

    this.$bus.$on("chosen-address-id", (params) => {
      console.log("=++++++++++chosen-address-id", params);
      // 接收选择的地址序号
      this.chosenAddressId = params;
    });
    // 打开SKU选择弹窗
    this.$bus.$on("open-sku", (params) => (this.skuShow = Boolean(params)));
  },
  watch: {
    // 监视路由变动/不同商品
    "$route.params.id"(newId, oldId) {
      // 当路由参数改变时,重新获取商品详情数据
      this.getProductById(newId);
      console.log(`id changed from ${oldId} to 【 ${newId} 】`);
    },
  },
};
</script>

<style lang="less" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}
</style>