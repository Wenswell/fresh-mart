<template>
  <div class="header">
    <div class="left">
      <el-button
        @click="handleMenu"
        size="mini"
        style="margin-right: 20px"
        icon="el-icon-menu"
      ></el-button>
      <span class="left-title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="item in tags"
            :key="item.path"
            :to="{ path: item.path }"
            >{{ item.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </span>
    </div>
    <el-dropdown @command="handleClick">
      <span class="dropdown">
        <img class="user" src="@/assets/image/avatar.png" alt="" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="my">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import jsCookie from "js-cookie";
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    handleClick(item) {
      if (item === "logout") {
        this.$router.push("/login");
        jsCookie.remove("token");
      }
      if(item==="my"){
        console.log('个人中心')
      }
    },
    // toPath(path) {
    //   if (this.$route.path !== path) {
    //     this.$router.push(path);
    //   }
    // },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>

<style lang="less" scoped>
.header {
  background-color: #333;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 20px;
}
.left {
  display: flex;
  align-items: center;
  /deep/ .el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;
      &.is-link {
        color: #777;
      }
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: white;
      }
    }
  }
}
.left-title {
  font-size: 14px;
  color: white;
  margin-left: 10px;
}

.user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>