<template>
  <div>
    <van-nav-bar 
    title="购物车" 
    :fixed="true" 
    :right-text="editMode ? '退出管理' : '管理'" 
    @click-right="$emit('edit')"
    />
  </div>
</template>

<script>
export default {
  name: 'CartNavBar',
  props: {
    editMode: Boolean,
  },

}
</script>

<style lang="less" scoped></style>