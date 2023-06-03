<template>
  <div style="background: #F7F8FA;" >
    Address
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  data(){
    return {
      chosenAddressId: '2',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号',
        },
      ],
    }
  },
  methods: {
    onAdd() {
      this.$toast('新增地址');
    },
    onEdit(item, index) {
      this.$toast('编辑地址:' + index);
    },
    onSelect(item, index) {
      this.$toast(`选中地址${index}, ${item}`);
    },
    

  }

}
</script>

<style>

</style>