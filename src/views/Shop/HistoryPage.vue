<template>
  <div>

    <van-nav-bar class="top-bar" title="浏览记录" left-text="返回" left-arrow @click-left="$router.push('/layout/my')" />

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

      <div class="product-card-group">
        <ProductCard num="2" v-for="product in history.items" :key="product.id" :data="product">
        </ProductCard>
      </div>

    </van-list>

  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      loading: false,
      finished: false,

      history: {
        // "counts": 47,
        // "pageSize": 10,
        // "pages": 5,
        // "page": 1,
        // "items": [
        //   {
        //     "id": "1471002",
        //     "spuId": "1471002",
        //     "name": "列级名庄出品，法国普罗旺斯桃红750毫升",
        //     "desc": "普罗旺斯列级酒庄，优雅精致",
        //     "price": "4.90",
        //     "picture": "https://yanxuan-item.nosdn.127.net/bc033185ab24f5e541e77b198adee609.jpg",
        //     "orderNum": null
        //   },
        // ]
      },
    }
  },
  created() {
    this.$store.dispatch('user/getHistoryPage').then(res => {
      this.history = this.formatHistoryRes(res)
    })

  },
  computed: {
  },
  methods: {

    formatHistoryRes(res){
      console.log("formatHistoryRes res", res)
      const newItems = res.items.map(item => {
        return {
          id: item.id,
          spuId: item.spu.id,
          ...item.spu,
          spu: undefined
        }
      })
      return {
        ...res,
        items: newItems
      }
    },

    onLoad() {
      // 判断是否加载完成，是否要更新本地历史记录
      // 初始化时防止加载
      if(!this.history.counts) {
        this.loading = false
      } else if(this.history.page == this.history.pages){
        this.finished = true
      } else {
        this.$store.dispatch('user/getHistoryPage', this.history.page+1).then(res => {
          const newRes = this.formatHistoryRes(res)
          newRes.items = this.history.items.concat(newRes.items)
          // 把新值赋给data中的history
          this.history = newRes
          this.loading = false
        })
      }
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