<template>
    <van-grid class="switcher" :border="false" :column-num="2" :gutter="0">
      <!-- 注册/登录选项 -->
      <van-grid-item 
        v-for="(value,key) in {register: '验证码登录', login: '密码登录'}" 
        :key="key" 
        :class="{ active: $route.name == key }"
        @click="$router.push(key).catch(err => {})">
      <p class="auth-title">{{ value }}</p>
      <div class="triangle-border"></div>
      </van-grid-item>
    </van-grid>
</template>

<script>
export default {
  name:'AuthSwitch',
}
</script>

<style lang="less" scoped>

// 注册/登录选项
.switcher {
  width: 278px;
  margin: 280px auto 56-47px;

  // 注册/登录 默认字体样式
  .auth-title {
    color: @grey;
    font-size: 18px;
  }

  // 注册/登录 默认下框线
  .triangle-border {
    width: 100%;
    height: 1.5px;
    background-color: @grey;
    position: relative;
    // 与 注册/登录 文字的间距
    margin-top: 10px;
  }

  // 注册/登录 激活后的样式
  .active {

    // 注册/登录 激活后的字体
    .auth-title {
      color: @blue;
      font-weight: bold;
    }

    // 注册/登录 激活后的下框线
    .triangle-border {
      background-color: @blue;

      // 注册/登录 激活后的下框线正中添加三角形
      &::after {
        content: "";
        position: absolute;
        /* 调整三角形位置 */
        top: -5px;
        /* 置中 */
        left: calc(50% - 5px);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 6px solid @blue;
      }
    }
  }
}

</style>