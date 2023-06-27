<template>
  <div>
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
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
      console.log("tag", tag);
      // this.$store.updateMenu(tag)
    },
    handleClose(tag, index) {
      console.log("tag", tag);
      console.log("index", index);
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