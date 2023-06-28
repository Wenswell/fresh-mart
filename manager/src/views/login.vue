<template>
  <div class="login-page">
    <el-card class="box-card">
      <el-form ref="form" :inline="true" :model="form" :rules="rules">
        <h3 class="login-title">后台登录</h3>
        <el-form-item prop="user" label="用户名">
          <el-input
            clearable
            placeholder="请输入用户名"
            v-model="form.user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            clearable
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-button class="login-btn" type="primary" @click="onLogin"
          >确 定</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login-page",
  data() {
    return {
      form: {
        user: "",
        password: "",
      },
      rules: {
        user: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs.form.validate((isValid) => {
        if (!isValid) return;
        console.log("登录信息", this.form);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-card {
  width: 400px;
}
.el-form {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-end;
  .login-title {
    margin-block: 1rem;
  }
  .el-form-item {
    margin-right: 13%;
  }
  .login-title,
  .login-btn {
    margin-inline: auto;
  }
}
</style>