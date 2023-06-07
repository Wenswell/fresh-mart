<template>
  <div>

    <!-- 手机号输入框 -->
    <van-field autofocus v-model="phoneNum" type="number" maxlength="11" name="手机" label="手机" placeholder="请输入手机号"
      class="verify-field" :center="true" :border="false" label-align="right" label-width="20px">
      <template slot="label">
        <span class="phone-ico ico"></span>
      </template>
    </van-field>

    <!-- 密码输入框 -->
    <van-field v-model="passWd" :type="fieldType" maxlength="16" name="密码" label="密码" placeholder="请输入密码"
      class="verify-field" :center="true" :border="false" label-align="right" label-width="20px">
      <template slot="label">
        <span class="lock-ico ico"></span>
      </template>
      <template #right-icon>
        <span class="eye-ico ico" @click="changeType"></span>
      </template>
    </van-field>

    <div style="text-align: center">
      <van-button @click="sendLoginMsg" class="submit-btn" round color="#46E1FF">{{ $route.name == "register" ? "注册" :
        "登录"
      }}</van-button>
    </div>

  </div>
</template>
<script>


import { loginByPasswordApi } from "@/api/user";
export default {
  data() {
    return {
      active: 0,
      phoneNum: "13951611560",
      verifyNum: "",
      passWd: "123456",
      btnText: "获取验证码",
      btnDisable: false,
      fieldType: 'password',
    };
  },
  methods: {
    async sendLoginMsg() {
      if (!this.passWd) {
        this.$toast("未输入密码")
        return
      }
      const res = await loginByPasswordApi(this.phoneNum, this.passWd)
      if (!res) {
        this.$toast("登录失败！\n控制台查看报错")
        return
      }
      console.log(res.result.account)
      this.$toast(res.result.account+"，欢迎回来！")
      // 将返回的user数据（包括token）存放到 Vuex 的 Store 中
      this.$store.commit('user/setUser', res.result)

      // 更新地址
      this.$store.dispatch('user/updateAddressList')
      
      // 更新收藏
      this.$store.dispatch('cart/updateCollect')
      
      // 进入主页
      this.$router.push('/layout/home')
    },
    changeType() {
      this.fieldType = this.fieldType === 'password' ? 'text' : 'password'
    }
  },
};
</script>

<style lang="less" scoped>
// 输入框
.verify-field {
  font-size: 14px;
  margin: 0 auto;
  width: 280px;
  padding: 0;
  height: 47px;
  border-bottom: 1px solid @light-grey;
}

// 登录按钮调整大小、阴影
.submit-btn {
  box-shadow: 0px 7px 12px 0px #5ad4eaaa;
  width: 222px;
  height: 40px;
  margin-top: 50px;
}
</style>