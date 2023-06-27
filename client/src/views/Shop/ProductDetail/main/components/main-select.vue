<template>
  <RoundBox @click="$emit('open')" class="select-box">
    <span v-if="!selectSku">请选择规格</span>
    <span>{{ selectSku }}</span>
  </RoundBox>
</template>

<script>
export default {
  name: 'MainSelect',
  props: {
    selectSku: String,
  },
}
</script>

<style lang="less" scoped>
.select-box {
  height: 41px;
  font-size: 14px;
  font-weight: bold;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;

  &::before {
    content: "已选";
    margin-right: 25px;
    font-weight: normal;
    font-size: 13px;
    color: #7c7c7c;
  }
}
</style>