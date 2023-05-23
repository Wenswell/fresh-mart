<template>
  <div>
    <router-view></router-view>
    <p>Auth.vue</p>




    <van-image
      width="100%"
      :src="require('@/assets/images/banner-register.jpg')"
    />

    <van-grid class="container" :border="false" :column-num="2" :gutter="0">
      <van-grid-item>
        <p class="auth-title active">注册</p>
        <div class="triangle-border active"></div>
      </van-grid-item>
      <van-grid-item>
        <p class="auth-title">登录</p>
        <div class="triangle-border"></div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  // name: "AuthForm",
  data() {
    return {
      active: 'home',
    }
  },
};
</script>

<style lang="less">
.container {
  margin: 0 3rem;
  align-items: flex-end;
}
.auth-title {
  color: @grey;

  &.active {
    color: @blue;
    font-size: 1.15em;
    font-weight: bold;
  }
}

.triangle-border {
  width: 100%;
  height: 2px; /* 线条高度 */
  background-color: @grey;
  position: relative;
  margin-top: 10px; /* 与注册文字间距 */
  &.active {
    background-color: @blue;
    &::after {
      content: "";
      position: absolute;
      top: -6px; /* 调整三角形位置 */
      left: calc(50% - 5px); /* 置中 */
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 6px solid @blue;
    }
  }
}
</style>