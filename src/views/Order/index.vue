<template>
  <div class="order">
    <van-nav-bar :fixed="true" :title="$route.fullPath == '/order/pay' ? '待付款' : '提交订单'" left-text="返回" left-arrow @click-left="onCancel" />

    <router-view />
  </div>
</template>

<script>
export default {
  name: "OrderPage",
  methods:{
    onCancel(){
      this.$dialog.confirm({
        title: '确定要取消吗？',
        // message: '确定要取消吗？',
      })
        .then(() => {
          this.$router.back()
        })
        .catch(() => {
          // on cancel
        });
    }
  },
}
</script>

<style lang="less" scoped>
.order{

  background: #F4F4F4;
  // height: calc(100vh - 50px);
  height: 100vh;
}
</style>