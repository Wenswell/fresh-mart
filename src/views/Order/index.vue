<template>
  <div class="order">
    <van-nav-bar :fixed="true" :title="getTitle" left-text="返回" left-arrow @click-left="onCancel" />

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
  computed:{
    getTitle(){
      switch (this.$route.name) {
      case 'pay':
        return '待付款';
      case 'check':
        return '提交订单';
      case 'all':
        return '全部订单';
      case 'detail':
        return '订单详情';
      default:
        return '订单';
    }
    },
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