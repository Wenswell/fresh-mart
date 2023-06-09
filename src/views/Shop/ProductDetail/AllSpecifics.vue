<template>
  <div>
    <div class="product-sum">
      <span v-for="item in detail" :key="item.name" class="sum-left">{{ item.name }}<span class="sum-right">{{ item.value
      }}</span></span>
    </div>
    <div class="product-img">
      <img v-for="img in img" :key="img" v-lazy="img" />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      img: [],
      detail: [],
    }
  },
  created() {
    this.$store.dispatch('cart/getProductDetail', this.$route.params.id).then(res => {
      console.log('+_+_+_res', res.details)
      this.img = res.details.pictures
      this.detail = res.details.properties
    })
  },
}
</script>

<style lang="less" scoped>
// 最后的价格展示
.product-sum {
  background-color: white;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 10px;
  padding: 10px 10px;

  .sum-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5px;

    border-bottom: 1px solid #F4F4F4;

    .sum-right {
      font-weight: bold;
      max-width: 75%;

    }
  }
}

.product-img {
  display: flex;
  flex-direction: column;

  img {
    width: 100vw;
  }
}
</style>