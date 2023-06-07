<template>
  <div>

    <!-- 手机号输入框 -->
    <van-field autofocus v-model="phoneNum" type="number" maxlength="11" name="手机" label="手机" placeholder="请输入手机号"
      class="verify-field" :center="true" :border="false" label-align="right" label-width="20px">
      <template slot="label">
        <span class="phone-ico ico"></span>
      </template>
    </van-field>

    <!-- 验证码输入框 -->
    <van-field v-model="verifyNum" type="text" maxlength="6" name="验证码" label="验证码" placeholder="请输入验证码"
      class="verify-field" :center="true" :border="false" label-align="right" label-width="20px">
      <template slot="label">
        <span class="safe-ico ico"></span>
      </template>
      <template #button>
        <van-button round class="get-verify" type="primary" size="mini" color="#5AD4EA" plain @click="getVerifyCode"
          :text="btnText" :disabled="btnDisable"></van-button>
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


import { getVerifyCodeApi, loginByVerifyNumberApi } from "@/api/user";
export default {
  // name: 'RegisterIndex',
  data() {
    return {
      active: 0,
      phoneNum: "13951611560",
      verifyNum: "",
      passWd: "",
      btnText: "获取验证码",
      btnDisable: false,
    };
  },
  methods: {
    async sendLoginMsg() {
      if (!this.btnDisable) {
        this.$toast("未获取验证码")
        return
      }
      const res = await loginByVerifyNumberApi(this.phoneNum, this.verifyNum)
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

      // 进入主页
      this.$router.push('/layout/home')
    },
    async getVerifyCode() {
      console.log("getVerifyCode")
      const type = 1
      const res = await getVerifyCodeApi(this.phoneNum, type)
      this.btnDisable = true;
      console.log(res)
      // this.$toast(res.msg)
      this.verifyNum = 123456;
    },
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

// 获取验证码按钮
.get-verify {
  vertical-align: middle;
  padding: 6px;
  margin: 0;
  border-radius: 5px;
  background-color: @light-blue;
}

// 登录按钮调整大小、阴影
.submit-btn {
  box-shadow: 0px 7px 12px 0px #5ad4eaaa;
  width: 222px;
  height: 40px;
  margin-top: 50px;
}
</style>