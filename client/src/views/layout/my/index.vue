<template>
  <div class="my-page">

    <!-- 个人信息 头像ID 会员信息 浏览 收藏 购物券 -->
    <MyInfo />

    <!-- 我的订单 + 我的工具 -->
    <MyOrderTool />

    <!-- 猜你喜欢 -->
    <MyLike />


  </div>
</template>

<script>

import MyInfo from './components/my-info';
import MyOrderTool from './components/my-order-tool';
import MyLike from './components/my-like';

export default {
  name: 'MyPage',
  components: {
    MyInfo,
    MyOrderTool,
    MyLike,
  },
}
</script>

<style lang="less" scoped>
//整个页面
.my-page {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0 60px;
}
</style>
