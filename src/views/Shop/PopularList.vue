<template>
  <div>

    <van-nav-bar title="爆款推荐" left-arrow @click-left="$router.back()" :border="false" />

    <van-grid :border="false" :column-num="3">
      <van-grid-item @click="$router.push(item.id)" :class="{ 'active': $route.params.type == item.id }" class="popular-title" v-for="item in inVogueResult.subTypes" :key="item.id">
        {{ item.title }}
      </van-grid-item>

    </van-grid>

    <ProductCard num="2" v-for="product in popularList" :key="product.id" :data="product">
    </ProductCard>



  </div>
</template>

<script>
// import List from './ProductList.vue';
import { getInVogueApi } from "@/api/product";

import ProductCard from './ProductCard.vue'

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      nowTime: "",
      inVogueResult: [],
      popularList:[],
    };
  },
  methods: {
    getPopularList(type){
      this.popularList = this.inVogueResult.goodsItems[+type].items
    }
  },
  created() {
    getInVogueApi().then(res => {
      this.inVogueResult = res.result
      this.getPopularList(this.$route.params.type)
    })
  },
  watch:{
    '$route.params.type'(newType, oldType) {
      this.productType = newType
      this.getPopularList(newType)
      console.log(`type changed from ${oldType} to 【 ${newType} 】`);
    }
  }
};
</script>

<style lang="less" scoped>
.popular-title {
  height: 44px;
  background-color: @blue;
  color: #f4f4f4;

  :first-child {
    font-size: 16px;
  }

  :last-child {
    font-size: 11px;
  }

  &.active {
    background-color: #E9F2F4;
    color: @blue;
    font-weight: bold;
  }

}
</style>