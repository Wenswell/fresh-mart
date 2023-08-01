<template>
  <!-- 分类导航*10 -->
  <RoundBox class="category-box">
    <van-grid :column-num="5" :border="false">
      <van-grid-item class="category-item" v-for="item in homeCatalog" :key="item.route" @click="$toast(item.route)">
        <div class="category-ico"></div>
      </van-grid-item>
    </van-grid>
  </RoundBox>
</template>

<script>

export default {
  name: 'HomeCategory',
  data() {
    return {
      homeCatalog: [
        {
          "route": "freshfruits",
          "name": "水果"
        },
        {
          "route": "drinks",
          "name": "饮品"
        },
        {
          "route": "bakery",
          "name": "面包"
        },
        {
          "route": "daily",
          "name": "日用"
        },
        {
          "route": "cosmetics",
          "name": "化妆"
        },
        {
          "route": "oilandgrains",
          "name": "油粮"
        },
        {
          "route": "veggies",
          "name": "蔬菜"
        },
        {
          "route": "seafoods",
          "name": "海鲜"
        },
        {
          "route": "babycare",
          "name": "母婴"
        },
        {
          "route": "vipsection",
          "name": "VIP"
        }
      ],
    }
  },

}
</script>

<style lang="less" scoped>
/* 中间分类 */
.category-box {
  margin: 5px auto;
  height: 180px;
  flex-direction: row;

  .category-item {
    @icoDia: 47px; // 图标直径47px

    .category-ico {
      background: url(https://blog0801-1319032318.cos.ap-shanghai.myqcloud.com/homeCatalogIco.png) no-repeat;
      display: inline-block;
      width: @icoDia;
      height: @icoDia;
      background-position-y: 1px;
      background-size: 235px;
    }

    &:not(:nth-child(-n + 5)):nth-child(-n + 10) .category-ico {
      background-position-y: -@icoDia; // 6-10是第二行图标
    }

    .loop(@start, @end) when (0 <=@end) {
      // 取余数，1-5和6-10都是从0开始偏移
      // 修正，增加偏移量，使 5 的倍数结果是 5 而不是 0
      @n: mod(@start - 1, 5);

      &:nth-child(@{start}) .category-ico {
        background-position-x: (-@icoDia * (@n));
      }

      .loop(@start + 1, @end - 1);
    }

    .loop(1, 5);
    .loop(6, 5);

  }
}
</style>