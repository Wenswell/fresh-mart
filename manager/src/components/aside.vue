<template>
  <el-menu
    default-active="1-4-1"
    class="menu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "fresh-mart 后台管理" }}</h3>
    <el-menu-item
      @click="toMenu(menu)"
      v-for="menu in noChildren"
      :key="menu.name"
      :index="menu.name"
    >
      <i :class="`el-icon-${menu.icon}`"></i>
      <span slot="title">{{ menu.label }}</span>
    </el-menu-item>

    <el-submenu
      v-for="menu in hasChildren"
      :key="menu.label"
      index="menu.label"
    >
      <template slot="title">
        <i :class="`el-icon-${menu.icon}`"></i>
        <span slot="title">{{ menu.label }}</span>
      </template>
      <el-menu-item-group v-for="sub in menu.children" :key="sub.name">
        <el-menu-item @click="toMenu(sub)" :index="sub.name">{{
          sub.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import jsCookie from "js-cookie";
export default {
  name: "CommonAside",
  data() {
    return {
      // menuData: [],
      // isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toMenu(item) {
      if (this.$route.path !== item.path) {
        this.$router.push(item.path);
        this.$store.commit("updateMenu", item);
      }
    },
  },

  computed: {
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    menuData() {
      return JSON.parse(jsCookie.get("menu")) || this.$store.state.tab.menu;
    },
  },
};
</script>


<style lang="less" scoped>
.menu {
  height: 100vh;
  overflow: hidden;
  border: 0;
  h3 {
    color: white;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 48px;
    padding-inline: 1rem;
  }
  & > * {
    text-align: left;
  }
}
</style>