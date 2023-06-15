<template>
  <van-cell @click="$emit('click')" class="address-div" center :is-link="!banEdit" icon="location-o">
    <template #title>
      <div v-for="(item, index) in showAddressList" :key="index">{{ item }}</div>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'AddressCard',
  props: {
    showAddressList: Array,
    chosenAddressId: String,
    banEdit: Boolean,
    // selectSku:Object,
  },

}
</script>

<style lang="less" scoped>
.address-div {
  padding: 8px;
  font-size: 13px;

  //两侧图标大小
  >i {
    margin: 6px;
    font-size: 24px;
  }
}
</style>