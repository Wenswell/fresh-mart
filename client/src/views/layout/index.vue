<template>
  <div :class="active" class="background">

    <!-- 二级路由 -->
        <keep-alive>
    <router-view />
        </keep-alive>

    <!-- 底栏 -->
    <van-tabbar style="z-index: 10;" v-model="active">
      <van-tabbar-item v-for="(item, index) in navs" :key="index" :name="item.name" :replace="true"
      :to="'/layout/' + item.name">
      
      <!-- 底栏图标 -->
        <template #icon="props">
          <div class="ico-footer" :class="[item.name + '-ico', props.active ? 'fill' : '']"></div>
        </template>

      </van-tabbar-item>
    </van-tabbar>


  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {
      // 定位二级路由名称
      active: this.$route.matched[1].name,
      navs: [
        { name: 'home', title: '首页' },
        { name: 'category', title: '分类' },
        { name: 'cart', title: '购物车' },
        { name: 'my', title: '我的' }
      ],
    };
  },
};
</script>

<style scoped>
/* 为 主页/我的 添加背景图 */
.home, .my {
  background-image: url(https://blog0801-1319032318.cos.ap-shanghai.myqcloud.com/homeBack.jpg);
}

</style>