<template>
  <div>
    <van-nav-bar title="分类" @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" color="white" />
      </template>
    </van-nav-bar>

    <div class="container">
      <div class="container-left">
        <van-grid :column-num="1" :border="false">
          <van-grid-item
            v-for="value in categoryList"
            :key="value.route"
            :text="value.name"
          >
            <div
              class="category-button"
              :class="{ active: isThis(value.route) }"
              @click="goTo(value.route)"
            >
              {{ value.name }}
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="container-divider"></div>
      <div class="container-right">
        <van-grid
          :border="false"
          :column-num="3"
          :gutter="12"
          class="right-row"
        >
          <van-grid-item
          v-for="(item, index) in rankListTopThree" :key="index"
         >
            <div class="right-top">
              <div class="text-title num" :class="item.img">{{ index+1 }}</div>
              <div class="text-title">{{ item.title }}</div>
              <!-- 图片大小已统一。若不统一需要再包div用于定位？ -->
              <img :src="require('@/assets/images/' + item.img + '.png')" class="right-top-image" />
            </div>
          </van-grid-item>
        </van-grid>

        <van-grid :border="false" :column-num="1">
          <van-grid-item class="right-row"
          v-for="(item, index) in rankListFromFour" :key="index">
            <div class="right-middle">
              <div class="right-middle-left">
                <div class="middle-title">{{ item.title }}</div>
                <div class="middle-text">{{ item.detail }}</div>
              </div>
              <div class="right-middle-right">
                <img
                  :src="require('@/assets/images/' + item.img + '.png')"
                  class="middle-image"
                />
              </div>
            </div>
          </van-grid-item>

        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import tdata from '@/assets/test-data.json'

export default {
  data() {
    return {
      categoryList: tdata.categoryList,
      rankList: tdata.rankList,
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
  computed: {
    rankListTopThree() {
      return this.rankList.slice(0,3)
    },
    rankListFromFour() {
      return this.rankList.slice(3)
    },
  }
};
</script>

<style lang="less" scoped>
// 主要内容区域
.container {
  display: flex;
  // svh: 手机浏览器地址栏会占据位置
  height: calc(100svh - 70px);
  background: white;
  margin-top: 20px;
}

.container-left {
  flex: 4 15; /* width: 1/4 */
}

.container-right {
  flex: 11; /* width: 11/15 */
}

.container-divider {
  width: 1px; /* 竖线宽度 */
  background: #DADCDC;
}

// 左侧按钮样式
.category-button {
  font-size: 14px;
  // outline: solid;
  width: 80px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 14px;
  &.active {
    font-weight: bold;
    color: white;
    // background-color: @blue;
    background-color: #45e2ff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px #45e2ff;
  }
}
// 右侧内容区域
.right-row {
  margin-bottom: 14px;
}

.right-top {
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
    &.rank1 {
      color: #ff4646;
    }
    &.rank2 {
      color: #ff8346;
    }
    &.rank3 {
      color: #ffd146;
    }
  }
}



.right-top-image {
  position: relative;
  margin-top: -55px;
  width: auto;
  height: auto;
}

.right-middle {
  width: 245px;
  height: 80px;
  display: flex;
  background-color: #e5f4f7;
  padding: 0 20px;
}

// 间隔子项调换文字与图片的顺序
.right-row:nth-child(2n) .right-middle{
  flex-direction: row-reverse;
}

.right-middle-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right-middle-right {
  flex: 1;
  display: flex;
  justify-content: center;
}

.middle-title {
  font-size: 15px;
  font-weight: bold;
}

.middle-text {
  // margin-top: 10px;
  font-size: 12px;
  color: #999999;
}

.middle-image {
  width: auto;
  position: relative;
  margin-top: -10px;
  height: 100%;
}

</style>