<template>
  <div class="login-page">
    <el-card class="box-card">
      <el-form ref="form" :inline="true" :model="form" :rules="rules">
        <h3 class="login-title">后台登录</h3>
        <el-form-item prop="username" label="用户名">
          <el-input
            clearable
            placeholder="请输入用户名"
            v-model="form.username"
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
          >登 录</el-button
        >
        <div class="test">
          <el-button @click="fillForm('admin')" type="primary" plain
            >管理员（所有权限）</el-button
          >
          <el-button @click="fillForm('user')" type="success" plain
            >用户（限制访问）</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import api from "@/api";
export default {
  name: "login-page",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    const token = Cookies.get("token");
    const account = Cookies.get("account");
    if (token) {
      api.verifyToken({ token, account }).then((res) => {
        if (res.code === 200) this.$router.push("/home");
      });
    }
  },
  methods: {
    fillForm(account) {
      const accounts = {
        admin: { username: "admin", password: "549fu7PgsR22vUK" },
        user: { username: "user", password: "658XYEn2VppACeB" },
      };

      if (account in accounts) {
        const { username, password } = accounts[account];
        this.form.username = username;
        this.form.password = password;
      }
    },
    onLogin() {
      this.$refs.form.validate((isValid) => {
        if (!isValid) return;
        api.authGetMenu(this.form).then((res) => {
          if (res.code === 401) {
            this.$refs.form.resetFields();
            this.$message.error("账号或密码错误");
            return;
          }
          console.log(res);
          if (res.code === 200) {
            Cookies.set("account", this.form.username);
            Cookies.set("token", res.data.token);
            this.$store.commit("setMenu", res.data.menu);
            this.$store.commit("addMenu", this.$router);
            this.$router.push("/home");
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  padding-block: 60px 20px;
}
.box-card {
  margin-inline: auto;
  border-radius: 10px;
  max-width: 400px;
  padding-bottom: 10px;
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
  .login-title:first-child,
  .login-btn {
    margin-inline: auto;
  }
}
.test {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>