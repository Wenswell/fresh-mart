<template>
  <div>
    <div v-for="item in list" :key="item.skuId">
      <!-- <van-checkbox-group v-for="item in list" v-model="checkResult" :key="item.skuId"> -->

      <!-- 右滑删除容器 -->
      <van-swipe-cell :before-close="beforeClose" class="goods-box" :right-width="45" :name="item.skuId">

        <!-- 该店铺的商品 左侧选框-->
        <van-checkbox @change="updateItem(item)" :disabled="!item.isEffective" v-model="item.selected"
          class="checkbox"></van-checkbox>

        <!-- 该店铺的商品 商品卡片 -->
        <van-card num="2" class="goods-card" @click="$router.push(`/shop/products/${item.id}`)">

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

          <!-- <template #num> -->
          <!-- <van-stepper @change="sumPrice" v-model="checkResult[item.itemId]" :min="1" :max="item.amount.max" integer input-width="38px" -->
          <!-- </template> -->
        </van-card>
        <!-- 该店铺的商品 商品卡片 计数器 -->
        <van-stepper @change="updateItem(item)" v-model="item.count" :disabled="!item.isEffective" :min="1"
          :max="item.stock" integer input-width="38px" button-size="26px" class="stepper" />
        <template #right>

          <!-- 该店铺的商品 商品卡片 左滑显示删除按钮 -->
          <van-button type="danger" round text="删除" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItems',
  props: {
    list: Array,
  },
  methods:{
    
    updateItem(item) {
      console.log("updateItem")

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
    beforeClose({ name, position, instance }) {
      switch (position) {
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？',
          }).then(() => {
             this.$store.dispatch('cart/removeSomeItem',[name]).then(res => this.$toast(res==1?'已删除':'删除失败'))
            instance.close();
          }).catch(err => console.log(err));
          break;
      }
    },
  },

}
</script>

<style lang="less" scoped>
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
  padding: 30px 15px;
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


/deep/ .stepper {
  outline: solid;
  position: absolute;
  right: 8px;
  bottom: -8px;
}
</style>