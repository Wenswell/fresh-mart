<template>
  <div style="margin: 10px 20px">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
      style="margin-right: 15px; cursor: pointer"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  methods: {
    changeMenu(tag) {
      if (this.$route.path == tag.path) return;
      this.$router.push(tag.path);
      // console.log("tag", tag);
      // this.$store.updateMenu(tag)
    },
    handleClose(tag, index) {
      this.$store.commit("closeTab", { tag, index });
      if (index == this.tags.length) {
        // 删除最后一项
        console.log("index", index);
        console.log("this.tags.length", this.tags.length);
        this.$router.push(this.tags[index - 1].path);
      } else {
        //删除中间项
        this.$router.push(this.tags[index].path);
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>

<style>
</style>