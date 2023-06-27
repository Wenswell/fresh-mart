<template>
  <div class="container-left">
    <div 
      v-for="value in categoryList" 
      :key="value.route"
      class="category-button"
      :class="{ active: $route.params.type == value.route }"
      @click="goTo(value.route)"
    >
        {{ value.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryLeft',
  methods: {
    goTo(page) {
      if (page == this.$route.params.type) return
      this.$router.push({ name: 'category', params: { type: page } });
    },
  },
  data() {
    return {
      categoryList: [
        {
          "route": "featured",
          "name": "精选推荐"
        },
        {
          "route": "fruits",
          "name": "新鲜水果"
        },
        {
          "route": "vegetables",
          "name": "时蔬净菜"
        },
        {
          "route": "meat",
          "name": "肉离蛋品"
        },
        {
          "route": "seafood",
          "name": "海鲜水产"
        },
        {
          "route": "snacks",
          "name": "休闲零食"
        },
        {
          "route": "beverages",
          "name": "酒水饮料"
        },
        {
          "route": "groceries",
          "name": "油粮百货"
        },
        {
          "route": "catering",
          "name": "餐饮烘焙"
        },
        {
          "route": "delicacies",
          "name": "美食"
        },
        {
          "route": "skincare",
          "name": "护肤品"
        }
      ],
    }
  },

}
</script>

<style lang="less" scoped>
.container-left {
  flex: 4 15;
  overflow-y: auto;
  padding-bottom: 50px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

// 左侧按钮样式
.category-button {
  font-size: 14px;
  width: 80px;
  height: 28px;
  line-height: 28px;
  text-align: center;

  &.active {
    font-weight: bold;
    color: white;
    // background-color: @blue;
    background-color: #45e2ff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px #45e2ff;
  }
}
</style>