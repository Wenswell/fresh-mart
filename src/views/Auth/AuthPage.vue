<template>
  <div>
    <!-- 顶部图片 -->
    <van-image
      width="100%"
      :src="require('@/assets/images/banner-register.jpg')"
      v-show="$route.name === 'register'"
    />
    <van-image
      width="100%"
      :src="require('@/assets/images/banner-login.jpg')"
      v-show="$route.name === 'login'"
    />

    <!-- 注册/登录选项 -->
    <van-grid class="container" :border="false" :column-num="2" :gutter="0">
      <van-grid-item @click="goTo('register')">
        <p class="auth-title" :class="getActiveClass('register')">注册</p>
        <div
          class="triangle-border"
          :class="{ active: $route.name == 'register' }"
        ></div>
      </van-grid-item>
      <van-grid-item @click="goTo('login')">
        <p class="auth-title" :class="getActiveClass('login')">登录</p>
        <div
          class="triangle-border"
          :class="{ active: $route.name == 'login' }"
        ></div>
      </van-grid-item>
    </van-grid>

<router-view></router-view>

    <!-- 底部登录按钮 -->
    <div style="text-align: center">
      <van-button
        class="submitBtn"
        round
        type="primary"
        color="#46E1FF"
        to="/layout"
        >登录</van-button
      >
    </div>

  </div>
</template>

<script>
export default {
  // name: "AuthForm",
  data() {
    return {
      phoneNum: "",
      verifyNum: "",
      btnText: "获取验证码",
      btnDisable: false,
    };
  },
  methods: {
    getVerifyCode() {
      this.btnDisable = true;
      this.verifyNum = 26433;
    },
    goTo(page) {
      const currentPath = this.$route.name;
      if (currentPath == page) return;
      this.$router.push({ name: page });
    },
  },
  computed: {
    // 计算属性，返回一个包含 'active' 类名的对象或空对象
    getActiveClass() {
      return function (page) {
        return { active: this.$route.name === page };
      };
    },
  },
};
</script>

<style lang="less" scoped>
// 注册/登录选项
.container {
  width: 278px;
  margin: -20px auto 56-47px;
  align-items: flex-end;
}

// 字体样式
.auth-title {
  color: @grey;
  font-size: 18px;

  &.active {
    color: @blue;
    font-weight: bold;
  }
}

// 下框线 & 三角形
.triangle-border {
  width: 100%;
  height: 1.5px; /* 线条高度 */
  background-color: @grey;
  position: relative;
  margin-top: 10px; /* 与注册文字间距 */
  &.active {
    background-color: @blue;
    &::after {
      content: "";
      position: absolute;
      top: -5px; /* 调整三角形位置 */
      left: calc(50% - 5px); /* 置中 */
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 6px solid @blue;
    }
  }
}


/* 登录按钮调整大小、阴影 */
.submitBtn {
  box-shadow: 0px 7px 12px 0px #5ad4eaaa;
  width: 222px;
  height: 40px;
  margin-top: 50px;
}
</style>