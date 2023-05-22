<template>
  <div>
    <!-- 顶部图片 -->
    <van-image width="100%" :src="require('@/assets/images/banner-register.jpg')" />

    <!-- 注册/登录选项 -->
    <van-row type="flex" justify="center" align="bottom">
      <van-col span="9">
        <van-image
          width="100%"
          :src="require('@/assets/images/registerfill.png')"
        />
      </van-col>
      <van-col span="9" @click="goToLogin">
        <van-image width="100%" :src="require('@/assets/images/login.png')" />
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

    <!-- 验证码输入框 -->
    <van-cell-group inset :border="false">
      <van-field
        v-model="verifyNum"
        type="text"
        maxlength="6"
        name="验证码"
        label="验证码"
        placeholder="请输入验证码"
        label-align="right"
        label-width="15px"
      >
        <template slot="label">
          <span class="safe-ico ico"></span>
        </template>
        <template #button>
          <van-button
            round
            type="primary"
            size="mini"
            color="#46E1FF"
            plain
            @click="getVerifyCode"
            :text="btnText"
            :disabled="btnDisable"
          ></van-button>
        </template>
      </van-field>
    </van-cell-group>
    
    <!-- 底部登录按钮 -->
    <div style="text-align: center">
      <van-button class="submitBtn" round type="primary" color="#46E1FF" to="layout"
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
    };
  },
  methods: {
    getVerifyCode() {
      this.btnDisable = true;
      this.verifyNum = 26433;
    },
    goToLogin() {
      this.$router.push({ name: 'login' })
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