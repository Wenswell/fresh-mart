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
      class="fieldCont"
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
      v-model="passWd"
      :type="fieldType"
      maxlength="16"
      name="密码"
      label="密码"
      placeholder="请输入密码"
      class="fieldCont"
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
</style>