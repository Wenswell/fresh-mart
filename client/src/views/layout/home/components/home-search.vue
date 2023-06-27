<template>
  <div class="home-search">
    <!-- 搜索栏 定位 -->
    <div @click="$router.push('/search')" class="search-box">
      <van-icon class="search-ico" name="search" />
      搜索想送上门的商品、美食</div>
    <div class="location">
      <van-icon name="location" color="#DAF8FF" size="16px" />
      <span class="location-text">{{ location }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSearch',
  props: {
    location: String,
  },

}
</script>

<style lang="less" scoped>

// 顶部搜索栏
.home-search {
  position: fixed;
  z-index: 2;
  width: 100vw;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 6px 16px;
  opacity: 0.95;
}

// 左侧搜索框
.search-box {
  flex: 1;
  height: 28px;
  line-height: 28px;
  background-color: white;
  color: #32c4de;
  border-radius: 50px;
  padding: 0 5px;
}

// 右侧定位
.location {
  margin-left: 5px;

  .location-text {
    color: white;
    font-size: 15px;
    font-weight: bold;
  }
}
</style>