<template>
  <div>
    <!-- 顶部图片 -->
    <van-image width="100%" :src="require('@/assets/images/banner-login.jpg')" />

    <!-- 注册/登录选项 -->
    <van-row type="flex" justify="center" align="bottom">
      <van-col span="9" @click="goToRegister">
        <van-image
          width="100%"
          :src="require('@/assets/images/register.png')"
        />
      </van-col>
      <van-col span="9">
        <van-image width="100%" :src="require('@/assets/images/loginfill.png')" />
      </van-col>
    </van-row>

    <!-- 手机号输入框 -->
    <van-cell-group inset :border="false">
      <van-field
        autofocus
        v-model="phoneNum"
        type="number"
        maxlength="11"
        name="手机"
        label="手机"
        placeholder="请输入手机号"
        label-align="right"
        label-width="15px"
      >
        <template slot="label">
          <span class="phone-ico ico"></span>
        </template>
      </van-field>
    </van-cell-group>

    <!-- 密码输入框 -->
    <van-cell-group inset :border="false">
      <van-field
        v-model="passWd"
        :type="fieldType"
        maxlength="6"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        label-align="right"
        label-width="15px"
      >
        <template slot="label">
          <span class="lock-ico ico"></span>
        </template>
        <template #right-icon>
          <span class="eye-ico ico" @click="changeType"></span>
        </template>
      </van-field>
    </van-cell-group>

    <!-- 底部登录按钮 -->
    <div style="text-align: center">
      <van-button class="submitBtn" round type="primary" color="#46E1FF" to="home"
        >登录</van-button
      >
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      active: 0,
      phoneNum: "",
      verifyNum: "",
      passWd: "",
      btnText: "获取验证码",
      btnDisable: false,
      fieldType: 'password',
    };
  },
  methods: {
    getVerifyCode() {
      this.btnDisable = true;
      this.verifyNum = 26433;
    },
    goToRegister() {
      this.$router.push({ name: 'register' })
    },
    changeType() {
      this.fieldType = this.fieldType === 'password' ? 'text' : 'password'
    }
  },
};
</script>

<style scoped>

/* 注册信息加外边距 */
.van-cell {
  padding: 10px 50px;
}

/* 获取验证码按钮垂直居中 */
.van-button--plain.van-button--primary {
  vertical-align: middle;
}
/* 登录按钮调整大小、阴影 */
.submitBtn {
  box-shadow: 0px 7px 12px 0px #5ad4eaaa;
  width: 15rem;
  height: 2.5rem;
  margin-top: 2rem;
}
</style>