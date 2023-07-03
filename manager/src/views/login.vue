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
          >确 定</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Mock from "mockjs";
import api from "@/api";
export default {
  name: "login-page",
  data() {
    return {
      form: {
        username: "admin",
        password: "admin",
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
  methods: {
    onLogin() {
      Cookies.set("test", Mock.Random.guid());
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
  width: 400px;
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
</style>