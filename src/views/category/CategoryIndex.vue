<template>
  <div>

    <van-nav-bar title="分类" @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" color="white" />
      </template>
    </van-nav-bar>

    <div class="container">
      <div class="left">
        <van-grid :gutter="10" :column-num="1" :border="false">
          <van-grid-item v-for="value in categoryList" :key="value.route" icon="photo-o" :text="value.name" />
        </van-grid>

      </div>
      <div class="divider"></div>  
      <div class="right">Right</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [
        {route:'cat1', name:"精选推荐"},
        {route:'cat2', name:"新鲜水果"},
        {route:'cat3', name:"时蔬净菜"},
        {route:'cat4', name:"肉离蛋品"},
        {route:'cat5', name:"海鲜水产"},
        {route:'cat6', name:"休闲零食"},
        {route:'cat7', name:"酒水饮料"},
        {route:'cat8', name:"油粮百货"},
        {route:'cat9', name:"餐饮烘焙"},
        {route:'cat10', name:"美食"},
        {route:'cat11', name:"护肤品"},
      ],
    }
  },
  methods: {
    onClickRight() {
      console.log("right");
    },
  },
};
</script>

<style lang="less">
.container {
  display: flex;
  height: calc(100vh - 50px);
  background: white;
  margin-top: 10px;
}

.left {
  flex: 4 15; /* width: 1/4 */
} 

.right {
  flex: 11; /* width: 11/15 */
}

.divider {
  width: 1px; /* 竖线宽度 */
  background: @grey;
}
</style>