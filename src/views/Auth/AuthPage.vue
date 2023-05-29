<template>
  <div :class="$route.name" class="background">
    <!--———— 1. 顶部↑ ——————-->
    
    <!--———— 2. 中间 ——————-->

    <!-- 注册/登录选项容器 -->
    <van-grid class="container" :border="false" :column-num="2" :gutter="0">
      
      <!-- 注册/登录选项 -->
      <van-grid-item 
        v-for="([key, value]) in Object.entries(options)" :key="key" 
        :class="{ active: $route.name == key }"
        @click="goTo(key)"
      >
        <p class="auth-title">{{ value }}</p>
        <div class="triangle-border"></div>
      </van-grid-item>
    <!-- 
      <van-grid-item @click="goTo('register')" :class="{ active: $route.name == 'register' }">
        <p class="auth-title">注册</p>
        <div class="triangle-border"></div>
      </van-grid-item>
      <van-grid-item @click="goTo('login')" :class="{ active: $route.name == 'login' }">
        <p class="auth-title">登录</p>
        <div class="triangle-border"></div>
      </van-grid-item>
    -->
    
  </van-grid>
    
      <!-- 注册/登录 验证表单 -->
      <router-view></router-view>
    
    <!--———— 3. 底部 ——————-->

    <!-- 底部登录按钮 -->
    <!-- <div style="text-align: center">
      <van-button class="submit-btn" round color="#46E1FF" to="/layout">{{ $route.name == "register" ? "注册" : "登录"
      }}</van-button>
    </div> -->

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
      options: {
        "register": "注册",
        "login": "登录",
      }
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
};
</script>

<style lang="less" scoped>

/***** 1. 顶部 *****/

// 顶部图片 注册页面
.register {
  background-image: url(@/assets/images/banner-register.jpg);
}

// 顶部图片 登录页面
.login {
  background-image: url(@/assets/images/banner-login.jpg);
  
}

/***** 2. 中间 *****/

// 注册/登录选项
.container {
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

/***** 3. 底部 *****/

// // 登录按钮调整大小、阴影
// .submit-btn {
//   box-shadow: 0px 7px 12px 0px #5ad4eaaa;
//   width: 222px;
//   height: 40px;
//   margin-top: 50px;
// }
</style>