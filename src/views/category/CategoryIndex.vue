<template>
  <div>
    <van-nav-bar title="分类" @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" color="white" />
      </template>
    </van-nav-bar>

    <div class="container">
      <div class="left">
        <van-grid :column-num="1" :border="false">
          <van-grid-item
            v-for="value in categoryList"
            :key="value.route"
            :text="value.name"
          >
            <div
              class="category"
              :class="{ active: isThis(value.route) }"
              @click="goTo(value.route)"
            >
              {{ value.name }}
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="divider"></div>
      <div class="right">
        <van-grid :border="false" :column-num="3">
          <van-grid-item>
            <div class="right-container">
              <div class="text-title num one">1</div>
              <div class="text-title">龙虾</div>
              <img src="@/assets/images/rank1.png" alt="" class="image" />
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="right-container">
              <div class="text-title num two">2</div>
              <div class="text-title">鲫鱼</div>
              <img src="@/assets/images/rank2.png" alt="" class="image" />
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="right-container">
              <div class="text-title num three">3</div>
              <div class="text-title">大米</div>
              <img src="@/assets/images/rank3.png" alt="" class="image" />
            </div>
          </van-grid-item>
        </van-grid>
        
        <van-grid :border="false" :column-num="1">
          <van-grid-item>
            <div class="right-four-container">
              <div class="four-left">
                <div class="four-title">标题</div>
                <div class="four-text">这里是文字</div>
              </div>
              <div class="four-right">
                <img src="@/assets/images/discountItem1.png" alt="" class="four-image" />
              </div>
            </div>
          </van-grid-item>

          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [
        { route: "featured", name: "精选推荐" },
        { route: "fruits", name: "新鲜水果" },
        { route: "vegetables", name: "时蔬净菜" },
        { route: "meat", name: "肉离蛋品" },
        { route: "seafood", name: "海鲜水产" },
        { route: "snacks", name: "休闲零食" },
        { route: "beverages", name: "酒水饮料" },
        { route: "groceries", name: "油粮百货" },
        { route: "catering", name: "餐饮烘焙" },
        { route: "delicacies", name: "美食" },
        { route: "skincare", name: "护肤品" },
      ],
    };
  },
  methods: {
    onClickRight() {
      console.log("right");
    },
    goTo(page) {
      const currentPath = this.$route.name;
      if (currentPath == page) return;
      this.$router.push({ name: page });
    },
    isThis(page) {
      const currentPath = this.$route.name;
      return currentPath == page;
    },
  },
};
</script>

<style lang="less" scoped>
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

// 左侧按钮样式
.category {
  font-size: 14px;
  // outline: solid;
  width: 80px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  margin-top: 14px;
}
.category.active {
  font-weight: bold;
  color: white;
  // background-color: @blue;
  background-color: #45e2ff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px #45e2ff;
}

.right {
  padding: 5px 10px;
}
.right-container {
  margin: 2px;
  display: flex;
  flex-direction: column;
  width: 71px;
  height: 80px;
  padding-top: 13px;
  background-color: #e5f4f7;
  border-radius: 5px;
  overflow: hidden;
}
.text-title {
  z-index: 2;
  width: 1em;
  font-size: 12px;
  line-height: 12px;
  font-weight: bold;
  padding-left: 8px;
  color: #444646;

  &.num {
    font-size: 14px;
    font-style: italic;
    margin-bottom: 5px;
    &.one {
      color: #ff4646;
    }
    &.two {
      color: #ff8346;
    }
    &.three {
      color: #ffd146;
    }
  }
}

.image {
  position: relative;
  margin-top: -55px;
  width: auto;
  height: auto;
}


.right-four-container {
  width: 245px;
  display: flex;
  justify-content: space-between;
  flex: 0 1;
}

.four-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.four-title {
  font-size: 24px;
  font-weight: bold;
}

.four-text {
  margin-top: 10px;
}

.four-right {
  width: 300px;
  height: 300px;
}

.four-image {
  width: 100%;
  height: 100%;
}

</style>