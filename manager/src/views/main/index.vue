<template>
  <el-container>
    <el-aside>
      <common-aside />
    </el-aside>
    <el-container>
      <el-header class="header">
        <common-header />
      </el-header>

        <common-tag />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/aside.vue";
import CommonHeader from "@/components/header.vue";
import CommonTag from "@/components/tag.vue";
export default {
  name: "main-page",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
};
</script>

<style scoped>
.el-container {
  height: 100vh;
}

.el-header {
  padding: 0;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  width: auto !important;
}
</style>