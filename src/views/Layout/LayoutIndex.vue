<template>
  <div class="home">
    <!-- 顶部搜索框 -->
    <router-view />

<!-- 底栏 -->

<van-tabbar v-model="active">
  <van-tabbar-item name="home" replace to="/layout/home">
    <!-- <span>首页</span> -->
    <template #icon="props">
      <!-- img标签无src或加载失败时浏览器会默认添加边框，无法去除 -->
      <img :class="['ico-footer home-ico', { 'fill': props.active }]" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" >
    </template>
  </van-tabbar-item>
  <van-tabbar-item name="category" replace to="/layout/category">
    <!-- <span>分类</span> -->
    <template #icon="props">
      <!-- img标签无src或加载失败时浏览器会默认添加边框，无法去除 -->
      <img :class="['ico-footer category-ico', { 'fill': props.active }]" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" >
    </template>
  </van-tabbar-item>
  <van-tabbar-item name="cart">
    <!-- <span>购物车</span> -->
    <template #icon="props">
      <!-- img标签无src或加载失败时浏览器会默认添加边框，无法去除 -->
      <img :class="['ico-footer cart-ico', { 'fill': props.active }]" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" >
    </template>
  </van-tabbar-item>
  <van-tabbar-item name="my">
    <!-- <span>我的</span> -->
    <template #icon="props">
      <!-- img标签无src或加载失败时浏览器会默认添加边框，无法去除 -->
      <img :class="['ico-footer my-ico', { 'fill': props.active }]" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" >
    </template>
  </van-tabbar-item>

</van-tabbar>

  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'home',
    }
  }
};
</script>

<style scoped>
/* 顶部背景 */
.home {
  background: url(@/assets/images/homeBack.jpg) no-repeat;
  background-size: 100%;
}

/* 底栏图标框增大 */
img{
  height: 42px;
  /* margin: 5px auto; */
  margin-top: 5px;
}
</style>