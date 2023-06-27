<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar class="top-bar" :fixed="true" title="分类" @click-right="$router.push('/search')">
      <template #right>
        <van-icon name="search" size="18" color="white" />
      </template>
    </van-nav-bar>

    <!-- 主要内容 -->
    <div class="container">

      <CategoryLeft />

      <!-- 中间的分割线 -->
      <div class="container-divider"></div>

      <CategoryRight />

    </div>
  </div>
</template>

<script>
import CategoryLeft from './components/category-left';
import CategoryRight from './components/category-right';

export default {
  name: 'CategoryPage',
  components: {
    CategoryLeft,
    CategoryRight,
  },
};
</script>

<style lang="less" scoped>
.top-bar{
  z-index: 3;
}
// 主要内容区域
.container {
  height: 100px;
  display: flex;
  // svh: 手机浏览器地址栏会占据位置
  min-height: calc(100svh - 70px);
  background: white;
  margin-top: 47px;
}

.container-divider {
  /* 竖线宽度 */
  margin-top: 10px;
  width: 1px;
  background: #DADCDC;
}
</style>