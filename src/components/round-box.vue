<template>
  <!-- 
1. 不添加left-title直接添加内容，没有布局
2. 添加left-title，<template slot="flex">中添加内容为flex布局
   -->
  <div class="box">
    <slot></slot>
    <div v-if="leftTitle" class="header">
      <span class="left-title">{{ leftTitle }}</span>
      <span @click="$emit('click-right')" class="right-all">查看全部<van-icon name="arrow" /></span>
    </div>
    <div v-if="leftTitle" class="flex">
      <slot name="flex"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoundBox',
  props: {
    leftTitle: {
      type: String,
      default: null
    },
    clickRight: String
  },
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  height: 140px;
  width: 343px;
  background-color: white;
  margin: auto;
  // padding: 12px 0;
  border-radius: 12px;
  flex-direction: column;
  font-size: 14px;
  box-shadow: 0px 2px 8px rgba(133, 172, 216, 0.32);

  .header {
    display: flex;
    justify-content: space-between;
    margin: 0 16px;
    height: 40px;
    align-items: center;

    .left-title {
      font-size: 16px;
      font-weight: bold;
    }

    .right-all {
      font-size: 12px;
    }
  }

  .flex {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 10px;


    >* {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>