<template>
  <div class="container-right">

    <div class="top-box">
      <div v-for="(item, index) in rankListTopThree" :key="index" class="top-3">
        <div class="text-title num" :class="item.img">{{ index + 1 }}</div>
        <div class="text-title">{{ item.title }}</div>
        <img :src="require('@/assets/images/' + item.img + '.png')" class="top-image" />
      </div>
    </div>

    <div class="middle-box" v-for="(item, index) in rankListFromFour" :key="index">
      <div class="right-middle-left">
        <div class="middle-title">{{ item.title }}</div>
        <div class="middle-text">{{ item.detail }}</div>
      </div>
      <div class="right-middle-right">
        <img :src="require('@/assets/images/' + item.img + '.png')" class="middle-image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryRight',
  data() {
    return {
      rankList: [
        {
          "img": "rank1",
          "title": "龙虾",
          "detail": ""
        },
        {
          "img": "rank2",
          "title": "鲫鱼",
          "detail": ""
        },
        {
          "img": "rank3",
          "title": "大米",
          "detail": ""
        },
        {
          "img": "rank4",
          "title": "百年酿",
          "detail": "bǎi nián niàng"
        },
        {
          "img": "rank5",
          "title": "手工包",
          "detail": "shǒu gōng bāo"
        },
        {
          "img": "rank6",
          "title": "特价橙",
          "detail": "tè jià chéng"
        },
        {
          "img": "rank7",
          "title": "绿色蔬",
          "detail": "lǜ sè shū"
        }
      ],
    }
  },
  computed: {
    rankListTopThree() {
      return this.rankList.slice(0, 3)
    },
    rankListFromFour() {
      return this.rankList.slice(3)
    },
  },

}
</script>

<style lang="less" scoped>
.container-right {
  flex: 11;
  /* width: 11/15 */
  padding: 0 20px;
  overflow-y: auto;
  padding-bottom: 50px;
  padding-top: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

// 右侧内容区域
.top-box {
  display: flex;
  justify-content: center;
  gap: 10px;

  .top-3 {
    margin: 2px;
    display: flex;
    flex-direction: column;
    width: 71px;
    height: 80px;
    padding-top: 13px;
    background-color: #e5f4f7;
    border-radius: 5px;
    overflow: hidden;

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

    .top-image {
      position: relative;
      margin-top: -55px;
      width: auto;
      height: auto;
    }

  }
}


.middle-box {
  width: 100%;
  height: 80px;
  display: flex;
  background-color: #e5f4f7;
  padding: 0 20px;
  border-radius: 5px;
}

// 间隔子项调换文字与图片的顺序
.middle-box:nth-child(2n+1) {
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