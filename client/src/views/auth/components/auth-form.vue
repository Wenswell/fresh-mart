<template>
  <div>
    <!-- 手机号输入框 -->
    <van-field
      autofocus
      v-model="phoneNum"
      type="number"
      maxlength="11"
      name="手机"
      label="手机"
      placeholder="请输入手机号"
      class="verify-field"
      :center="true"
      :border="false"
      label-align="right"
      label-width="20px"
    >
      <template slot="label">
        <span class="phone-ico ico"></span>
      </template>
    </van-field>

    <!-- 密码输入框 -->
    <van-field
      v-show="$route.name == 'login'"
      v-model="passWd"
      :type="fieldType"
      maxlength="16"
      name="密码"
      label="密码"
      placeholder="请输入密码"
      class="verify-field"
      :center="true"
      :border="false"
      label-align="right"
      label-width="20px"
    >
      <template slot="label">
        <span class="lock-ico ico"></span>
      </template>
      <template #right-icon>
        <span class="eye-ico ico" @click="changeType"></span>
      </template>
    </van-field>

    <!-- 验证码输入框 -->
    <van-field
      v-show="$route.name == 'register'"
      v-model="verifyNum"
      type="text"
      maxlength="6"
      name="验证码"
      label="验证码"
      placeholder="请输入验证码"
      class="verify-field"
      :center="true"
      :border="false"
      label-align="right"
      label-width="20px"
    >
      <template slot="label">
        <span class="safe-ico ico"></span>
      </template>
      <template #button>
        <van-button
          round
          class="get-verify"
          type="primary"
          size="mini"
          color="#5AD4EA"
          plain
          @click="getVerifyCode"
          :text="btnText"
          :disabled="btnDisable"
        ></van-button>
      </template>
    </van-field>

    <!-- 底部登录按钮 -->
    <van-button @click="sendLoginMsg" class="submit-btn" round color="#46E1FF">
      <!-- {{ $route.name == "register" ? "注册" : "登录" }} -->
      <!-- 因API限制，暂未添加注册功能 -->
      登录
    </van-button>
  </div>
</template>

<script>
import { getVerifyCodeApi } from "@/api/user";

export default {
  name: "AuthForm",
  data() {
    return {
      phoneNum: "13951611560",
      verifyNum: "",
      passWd: "123456",
      btnText: "获取验证码",
      btnDisable: false,
      fieldType: "password",
    };
  },
  created() {
    const token = this.$store.getters["user/getToken"];
    if (token.length > 100) {
      this.$router.push("/layout/home");
    }
    console.log(
      "this.$store.getters['user/getToken']",
      this.$store.getters["user/getToken"].length
    );
  },
  methods: {
    // 显示/隐藏密码
    changeType() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
    //获取验证码
    async getVerifyCode() {
      console.log("getVerifyCode");
      const type = 1;
      const res = await getVerifyCodeApi(this.phoneNum, type);
      this.btnDisable = true;
      console.log(res);
      // this.$toast(res.msg)
      this.verifyNum = 123456;
    },

    goTo(page) {
      const currentPath = this.$route.name;
      if (currentPath == page) return;
      this.$router.push({ name: page });
    },
    async sendLoginMsg() {
      // 验证登录信息完整
      if (!this.phoneNum) return this.$toast("请输入手机号");
      if (this.$route.name == "login" && !this.passWd)
        return this.$toast("未输入密码");
      if (this.$route.name == "register" && !this.btnDisable)
        return this.$toast("未获取验证码");

      // 获取登录信息
      const res = await this.$store.dispatch("user/registerByPasswdVerify", {
        type: this.$route.name,
        phoneNum: this.phoneNum,
        verifyNum: this.verifyNum,
        passWd: this.passWd,
      });

      // 进入主页
      if (res.code == 1) {
        this.$toast(res.result.account + "，欢迎回来！");
        this.$router.push("/layout/home");
      }
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
  display: block;
  width: 222px;
  height: 40px;
  margin: 50px auto;
}
</style>