<template>

        <!-- 收货 信息地址栏 -->
        <van-cell @click="toAddress" class="address-div" center :is-link="!banEdit" icon="location-o">
          <template #title>
            <div v-for="(item,index) in showAddressList" :key="index">{{ item }}</div>
          </template>
        </van-cell>

<!-- 
import ProductCard from './ProductCard.vue'

export default {
  components: {
    ProductCard,
  }, 
-->
</template>

<script>
export default {
  props: ['showAddressList', 'chosenAddressId', 'banEdit'],
  data() {
    return {
    }
  },
// beforeCreate(){console.log('%c ShowAddressCard - beforeCreate','color:#f3f;')},
// beforeMount(){console.log('%c ShowAddressCard - beforeMount','color:#f3f;')},
// mounted(){console.log('%c ShowAddressCard - mounted','color:#f3f;')},
// beforeUpdate(){console.log('%c ShowAddressCard - beforeUpdate','color:#f3f;')},
// updated(){console.log('%c ShowAddressCard - updated','color:#f3f;')},
created(){
  console.log('%c ShowAddressCard - created','color:#f3f;')
  // 禁用点击
  if(this.banEdit) this.toAddress = ()=>{}
},
beforeDestroy(){
  console.log('%c ShowAddressCard - beforeDestroy','color:#f3f;')
  console.log("this.chosenAddressId", this.chosenAddressId)
  this.$bus.$emit('from-path', this.path)
    this.$bus.$off('from-path')
    this.$bus.$emit('chosen-address-id', this.chosenAddressId)
    this.$bus.$off('chosen-address-id')
},
// destroyed(){console.log('%c ShowAddressCard - destroyed','color:#f3f;')},

  methods:{


    toAddress() {
  console.log('this.props',this.props)
  console.log('this.banEdit',this.banEdit)
      //先保存当前路径（beforeDestroy执行时已经切换到下一个页面了
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