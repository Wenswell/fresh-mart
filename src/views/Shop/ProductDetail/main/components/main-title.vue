<template>
  <!-- 商品详情 商品标题 价格 包邮 已购 好评 -->
  <RoundBox class="title-box">
    <div class="title">
      {{ result.name }}
    </div>
    <div class="price">
      <span class="now-price">{{ result.price }}</span>
      <span class="old-price">{{ result.oldPrice }}</span>
    </div>
    <div class="other">
      <span class="post">包邮</span>
      <span class="sold">{{ evaluate.salesCount }}</span>
      <span class="rate">{{ evaluate.praisePercent }}</span>
    </div>
  </RoundBox>
</template>

<script>

export default {
  name: 'MainTitle',
  props: {
    result: Object,
    evaluate: Object,
  },

}
</script>

<style lang="less" scoped>
.title-box {
  gap: 15px;
  padding: 26px 12px 21px;
}

.title {
  font-size: 16px;
}

.price {
  span::before {
    content: "¥";
    margin-right: 1px;
    margin-left: 3px;
  }

  .now-price {
    font-size: 21px;
    color: red;
    font-weight: bold;
  }

  .old-price {
    font-size: 12px;
    color: grey;
    text-decoration: line-through
  }
}

.other {
  span {
    margin-right: 20px;
    font-size: 14px;
    font-weight: bold;
  }

  .post,
  ::after {
    margin-left: 2px;
    font-weight: normal;
    font-size: 13px;
    color: #7c7c7c;
  }

  .sold::after {
    content: "已购";
  }

  .rate::after {
    content: "好评";
  }

}
</style>