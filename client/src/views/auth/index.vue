<template>
  <div :class="$route.name" class="background">
    <!--———— 1. 顶部图片↑ ——————-->

    <!--———— 2.1 注册/登录 ——————-->
    <AuthSwitch></AuthSwitch>

    <!--———— 2.2 验证表单+登录按钮 ——————-->
    <AuthForm></AuthForm>


  </div>
</template>

<script>
import AuthSwitch from './components/auth-switch.vue';
import AuthForm from './components/auth-form.vue';

export default {
  name: 'AuthPage',
  components: {
    AuthSwitch,
    AuthForm,
  },

};
</script>

<style lang="less" scoped>
/***** 1. 顶部 *****/
// 顶部图片 注册页面
.register {
  background-image: url(https://blog0801-1319032318.cos.ap-shanghai.myqcloud.com/banner-register.jpg);
}
// 顶部图片 登录页面
.login {
  background-image: url(https://blog0801-1319032318.cos.ap-shanghai.myqcloud.com/banner-login.jpg);
}
</style>