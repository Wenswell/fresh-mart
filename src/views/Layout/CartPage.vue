<template>
  <div class="cart-container">
    <!-- 顶栏 -->
    <van-nav-bar :fixed="true" title="购物车" right-text="管理" @click-right="onClickRight" />

    <!-- 购物车 商品列表 子循环 每个店铺的商品 -->
    <div v-for="item in list" :key="item.skuId">
      <!-- <van-checkbox-group v-for="item in list" v-model="checkResult" :key="item.skuId"> -->

      <!-- 右滑删除容器 -->
      <van-swipe-cell :before-close="beforeClose" class="goods-box" :right-width="45" :name="item.skuId">

        <!-- 该店铺的商品 左侧选框-->
        <van-checkbox @click="updateItem(item)" v-model="item.selected" class="checkbox"></van-checkbox>

        <!-- 该店铺的商品 商品卡片 -->
        <van-card num="2" class="goods-card">
          <!-- 该店铺的商品 商品卡片 商品名称 -->
          <template #title>
            <p class="goods-title right-txt">{{ item.name }}</p>
          </template>
          <!-- 该店铺的商品 商品卡片 详情（尺寸规格，只传入了第一组） -->
          <template #desc>
            <div class="goods-desc right-txt" v-if="item.attrsText" v-text="item.attrsText"></div>
            <!-- <div class="goods-desc right-txt" v-if="item.skus" v-text="firstSku(item.skus)"></div> -->
          </template>
          <!-- 该店铺的商品 商品卡片 价格 -->
          <template #price>
            <!-- 该店铺的商品 商品卡片 价格 现在价格 -->
            <span class="goods-price now right-txt">
              {{ item.nowPrice.toString().slice(0, -2) }}<span class="goods-price now deci">{{
                item.nowPrice.toString().slice(-2) }}</span>
              <!-- {{ item.price.now.toString().slice(0, -2) }}<span class="goods-price now deci">.{{item.price.now.toString().slice(-2) }}</span> -->
            </span>
            <!-- 该店铺的商品 商品卡片 价格 原价 > 现价时显示 -->
            <span v-if="item.nowPrice - item.nowOriginalPrice <= 0" class="goods-price old right-txt">
              {{ item.nowOriginalPrice.toString().slice(0, -2) }}<span class="goods-price old deci">.{{
                item.nowOriginalPrice.toString().slice(-2) }}</span>
            </span>
          </template>
          <!-- 该店铺的商品 商品卡片 图片 -->
          <template #thumb>
            <div class="goods-img-div">
              <img class="goods-img" :src="item.picture" />
            </div>
          </template>
          <!-- 该店铺的商品 商品卡片 计数器 -->
          <template #num>
            <!-- <van-stepper @change="sumPrice" v-model="checkResult[item.itemId]" :min="1" :max="item.amount.max" integer input-width="38px" -->
            <van-stepper @change="updateItem(item)" v-model="item.count" :disabled="!item.isEffective" :min="1"
              :max="item.stock" integer input-width="38px" button-size="26px" class="stepper" />
          </template>
        </van-card>
        <template #right>
          <!-- 该店铺的商品 商品卡片 左滑显示删除按钮 -->
          <van-button type="danger" round text="删除" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
    <!-- <p>{{ list }}</p> -->
    <!-- 底部 提交订单栏 -->
    <van-submit-bar class="submit-bar" :price="getTotalPrice * 100" button-text="结算" @submit="onSubmit"
      suffix-label="(不含运费)" button-color="#5AD4EA">
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
    </van-submit-bar>

  </div>
</template>

<script>
// import store from '@/store'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      cartListFromApi: '',
      sumChecked: false,
    };
  },
  methods: {

    updateItem(item) {
      console.log("updateItem")
      // console.log(skuId)
      // console.log(payload)

      this.$store.dispatch('cart/updateCart', {
        skuId: item.skuId,
        payload: {
          "selected": item.selected,
          "count": +item.count
        }
      }).then(() => {
        console.log('Cart updated successfully.');
      }).catch((error) => {
        console.error('Failed to update cart:', error);
      });
    },
    onClickRight() {
      console.log("right")
    this.$store.dispatch('cart/selectAllItem', true)
      
    },
    onSubmit() {
      console.log("点击结算 " + this.totalPrice)
    },

    checkSelectAll() {
      console.log("左下全选⭕ checkSelectAll")
    this.$store.dispatch('cart/selectAllItem', this.sumChecked)
    console.log(this.sumChecked)

    },

    beforeClose({ name, position, instance }) {
      switch (position) {
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？',
          }).then(() => {
            console.log("deleteItem: " + name);
            console.log("close");
            instance.close();
          }).catch(err => console.log(err));
          break;
      }
    },

  },
  computed: {
    ...mapState('cart', {
      list: state => state.list
    }),
    getTotalPrice() {
      let res = this.$store.getters['cart/updateTotalPrice']
      // this.totalPrice = res
      console.log("getTotalPrice", res)
      return res
    },

    checkedAll: {
    get() {
      console.log("this.$store.getters['cart/hasUnchecked']", this.$store.getters['cart/hasUnchecked'])
      return this.$store.getters['cart/hasUnchecked']
    },
    set(value) {
      this.$store.dispatch('cart/selectAllItem', value)      
    }
  },
  },
  watch: {

  },
  mounted() {
    console.log("store.dispatch('cart/mergeCart")
    this.$store.dispatch('cart/mergeCart')
  }
}
</script>

<style lang="less" scoped>
.shop-title {
  height: 40px;
}

.shop-title-left {
  display: flex;
  align-content: center;
}

.inline {
  display: inline-block;
  margin: auto 0;

  &.shop-name {
    font-size: 14px;
    margin: auto 5px auto 7px;
    width: max-content;

    &::after {
      content: '＞';
    }
  }

  &.to-coupon {
    color: @blue;
    font-style: 10px;
    margin-right: 15px;
  }
}

/deep/ .stepper {
  outline: solid;
}


// 添加下边距 防止顶栏底栏结算框遮挡商品
.cart-container {
  margin-top: 46px;
  margin-bottom: 100px;
}

// 商品框-整行
.goods-box {
  // outline: solid;
  display: flex;
  height: 110px;
  margin-top: 2px;
  padding: 15px 0;

  &::after {
    content: '';
    position: absolute;
    left: 3%;
    bottom: 0;
    width: 94%;
    border-bottom: 1px solid #F4F4F4;
  }
}

// 商品框-左侧勾选框
.checkbox {
  display: inline-block;
  margin: 20px 15px;
  margin: 0;
  padding: 20px 15px;
}

// 商品框-主体
div.goods-card {
  display: inline-block;
  padding-left: 0;
  padding-right: 10px;
  margin: 0;
  background-color: white;
  width: calc(100vw - 50px);
}

// 商品框-右滑删除按钮
.delete-button {
  top: 20%;
  white-space: nowrap;
  width: 42px;
  height: 30px;
  margin-left: 3px;
}

// 商品图片
.goods-img-div {
  height: 80px;
  background-color: #e9f2f4;
  display: flex;
  /* 使用 flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  border-radius: 8px;
}

.goods-img {
  height: 100%;
  // width: 80%;
  object-position: center;
  /* 水平和垂直居中 */
}

.right-txt {
  margin-left: 10px;

  &.goods-title {
    margin-top: 5px;
    font-size: 14px;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.goods-desc {
    font-size: 10px;
    color: #999999;
  }

  &.goods-price {
    margin-top: 5px;
    font-size: 16px;
    display: inline-block;

    &::before {
      content: "¥";
      margin-right: -2px;
    }

    // .deci {
    //   font-size: 60%;
    // }

    &.now {
      font-weight: bold;
      color: red;
    }

    &.old {
      color: @grey;
      font-size: 13px;
      text-decoration: line-through
    }
  }
}

// 结算栏
.submit-bar {
  margin-bottom: 49px;
  padding: 0 10px;
}
</style>