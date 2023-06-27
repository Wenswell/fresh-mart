<template>
  <div>

    <van-nav-bar class="top-bar" title="收藏" left-text="返回" left-arrow @click-left="$router.push('/layout/my')" />

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

      <div class="product-card-group">
        <ProductCard num="2" v-for="product in getCollect.items" :key="product.id" :data="product">
        </ProductCard>
      </div>

    </van-list>

  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      loading: false,
      finished: false,
    }
  },
  computed: {
    ...mapGetters('user', ['getCollect']),
  },
  methods: {
    onLoad() {
      // 判断是否加载完成，是否要更新本地收藏夹
      this.getCollect.page == this.getCollect.pages
      // 页数和总页数相等表示加载完了
      ? this.finished = true
      // 否则加载下一页
        : this.$store.dispatch('cart/updateCollect', this.getCollect.page + 1)
          .then(() => this.loading = false);
    },
  },
}
</script>

<style lang="less" scoped>
.top-bar {
  position: fixed;
  top: 0px;
  width: 100vw;
}

.product-card-group {
  margin-top: 50px;
}
</style>