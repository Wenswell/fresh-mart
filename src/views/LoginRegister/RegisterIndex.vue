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

    <!-- 验证码输入框 -->
    <van-field
      v-model="verifyNum"
      type="text"
      maxlength="6"
      name="验证码"
      label="验证码"
      placeholder="请输入验证码"
      class="fieldCont"
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

  </div>
</template>



<script>
export default {
  // name: 'RegisterIndex',
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
  },
};
</script>

<style scoped>

</style>