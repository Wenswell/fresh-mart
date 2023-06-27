<template>
  <div class="cart-container">

    <CartNavBar @edit="changeEditMode" :editMode="editMode" />

    <CartItems :list="list" />

    <CartSubmitBar :editMode="editMode" />

  </div>
</template>

<script>
import { mapState } from 'vuex'

import CartNavBar from './components/cart-nav-bar';
import CartItems from './components/cart-items';
import CartSubmitBar from './components/cart-submit-bar';

export default {
  name: 'CartPage',
  components: {
    CartNavBar,
    CartItems,
    CartSubmitBar,
  },
  data() {
    return {
      editMode: false,
    };
  },
  methods: {
    changeEditMode() {
      this.editMode = !this.editMode
    },
  },

  computed: {
    ...mapState('cart', {
      list: state => state.list
    }),
  },
  created() {
    console.log("store.dispatch('cart/mergeCart)")
    this.$store.dispatch('cart/mergeCart')
  },

}
</script>

<style lang="less" scoped>
// 添加下边距 防止顶栏底栏结算框遮挡商品
.cart-container {
  margin-top: 46px;
  margin-bottom: 100px;
}
</style>