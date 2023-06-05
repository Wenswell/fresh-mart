<template>
  <div>

        <!-- 收货 信息地址栏 -->
        <van-cell @click="toAddress" class="address-div" center :is-link="true" icon="location-o">
          <template #title>
            <div v-for="item in showAddressList" :key="item">{{ item }}</div>
          </template>
        </van-cell>
        {{ $router.path }}

<!-- 
import ProductCard from './ProductCard.vue'

export default {
  components: {
    ProductCard,
  }, 
-->
  </div>
</template>

<script>
export default {
  props: ['showAddressList'],
  methods:{


    toAddress() {
      this.path = this.$route.path
      // this.$router.push('/user/address')
      // 防止 product->address->product->address
      this.$router.replace({
        name: 'address'
      })
    },
  },
}
</script>

<style lang="less" scoped>

// sku 弹窗 地址栏

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