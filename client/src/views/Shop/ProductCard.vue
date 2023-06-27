<template>
  <div>
    <van-card num="2" class="goods-box">
        <!-- 该店铺的商品 商品卡片 商品名称 -->
        <template #title>
          <p class="goods-title right-txt">{{ data.name }}</p>
        </template>
        <!-- 该店铺的商品 商品卡片 详情（尺寸规格，只传入了第一组） -->
        <template #desc>
          <!-- <div class="goods-desc right-txt" v-if="item2.skus" v-text="firstSku(item2.skus)"></div> -->
          <div class="goods-desc right-txt">{{ data.desc }}</div>
        </template>
        <!-- 该店铺的商品 商品卡片 价格 -->
        <template #price>
          <span class="goods-price now right-txt">{{ data.price }}
            <!-- .<span class="goods-price now deci">0</span> -->
          </span>
          <!-- <span class="goods-price old right-txt">{{ data.oldP }}<span class="goods-price old deci"></span>
          </span> -->
        </template>
        <!-- 该店铺的商品 商品卡片 图片 -->
        <template #thumb>
          <div class="goods-img-div">
            <img class="goods-img" :src="data.picture" />
          </div>
        </template>
        <!-- 该店铺的商品 商品卡片 计数器 -->
        <template #num>
          <van-button @click="$router.push('/shop/products/'+data.id)" class="toBuyBtn" round type="primary" color="#5ad4ea">加购</van-button>
        </template>
      </van-card>

  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>


<style lang="less" scoped>

// 商品框-整行
.goods-box {
  display: block;
  height: 110px;
  width: 100%;
  margin: 0;
  padding: 15px 18px 0 15px;
  border-bottom: 1px solid #F4F4F4;
  background-color: white;
}

// 商品图片
.goods-img-div {
  height: 80px;
  background-color: #e9f2f4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.goods-img {
  height: 100%;
  object-position: center;
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
    font-weight: bold;
    color: #ff8041;
    height: 15px;
    overflow: hidden;
  }

  &.goods-price {
    margin-top: 5px;
    font-size: 18px;
    display: inline-block;

    &::before {
      content: "¥";
      margin-right: 1px;
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

.toBuyBtn {
  width: 72px;
  height: 32px;
}
</style>