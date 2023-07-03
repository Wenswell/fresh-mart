<template>
  <RoundBox class="evaluate-box" :unflex=true :left-title="title" @click-right="changeTab('evaluate')">
    <template slot="unflex">

      <!-- 评价标签 -->
      <div class="labels" :border="false">
        <span class="label-item" v-for="item in prerate.keywords" :key="item.attribute" v-show="item.title != '全部'">{{ item.word
        }}({{ item.count }})</span>
      </div>

      <!-- 评价内容 -->
      <div class="evaluate">
        <div class="evaluate-item" v-for="item in prerate.rateList" :key="item.feedId">
          <div class="evaluate-item-title">
            <img class="avatar" :src="item.headPic" />
            <div class="info">
              <span class="name">{{ item.userName }} <img v-show="item.isVip" style="width:25px" :src="item.blackCardUserUrl" /></span>
              <span class="time">{{ item.createTimeInterval }}</span>
            </div>
          </div>

          <div class="evaluate-item-content">
            {{ item.content }}
          </div>
        </div>
      </div>

    </template>
  </RoundBox>
</template>

<script>
export default {
  name: 'MainContent',
  props: {
    prerate: Object,
    changeTab: Function,
  },
  computed: {
    title() {
      return `商品评价(${this.prerate.totalCount})`
    },

  },
  // watch: {
  //   evaluateContent(n, o) {
  //     console.log('evaluateContent new', n)
  //     console.log('evaluateContent old', o)
  //   },
  // },

}
</script>

<style lang="less" scoped>
.evaluate-box {
  height: 100%;
}

// <!-- 2.5.2. 上部 评价标签 有图 ...... -->
.labels {
  max-width: 323x;
  overflow-x: scroll;
  white-space: nowrap;
  padding-left: 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  .label-item {
    font-size: 14px;
    display: inline-block;
    padding: 0 7px;
    background-color: @light-blue;
    height: 26px;
    line-height: 26px;
    border-radius: 13px;
    margin-right: 5px;
  }
}

.evaluate {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;


}

.evaluate-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evaluate-item-title {
  display: flex;
  gap: 10px;

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .name {
      color: rgb(17, 17, 17);
    }

    .time {
      font-size: 90%;
      color: rgb(153, 153, 153);
    }
  }
}
</style>