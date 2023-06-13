<template>
  <div class="evaluate-box">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

      <RoundBox class="evaluate-item" v-for="item in evaluateObj.items" :key="item.id">
        <div class="top">
          <img class="avatar" :src="item.member.avatar" />
          <span class="name">{{ item.member.nickname }}</span>
          <van-rate class="star" size="12" gutter="1" color="orange" v-model="item.score" readonly />
          <span class="time">{{ getTime(item.createTime) }}</span>
        </div>
        <div class="content">
          {{ item.content }}
          <div class="img" v-if="item.pictures.length">
            <img @click="previewImg(item)" v-for="item in item.pictures" :key="item" :src="item" alt="" srcset="">
          </div>
        </div>
        <div @click="onPraise(item)" :class="{ active: item.officialReply }" class="buttom">
          <van-icon :name="item.officialReply ? 'good-job' : 'good-job-o'" />
          {{ item.praiseCount }}
        </div>
      </RoundBox>
    </van-list>

  </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  name: 'EvaluateContent',
  data() {
    return {
      evaluateObj: {},
      loading: false,
      finished: false,
    }
  },
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  created() {
    this.$store.dispatch('cart/getEvaluate', {
      id: this.$route.params.id,
      page: 1,
    }).then(res => {
      this.evaluateObj = res
    })

    this.$bus.$on('type-changed', newType => {
      this.$store.dispatch('cart/getEvaluate', {
        id: this.$route.params.id,
        page: 1,
        ...newType
      }).then(res => {
        this.evaluateObj = res
      })
    })
  },
  watch: {
    evaluateObj(n) {
      console.log("evaluateObj new", n)
    }
  },
  methods: {

    previewImg(url) {
      ImagePreview({
        images: [url],
        showIndex: false,
        closeable: true,
      });
    },

    onLoad() {
      // 判断是否加载完成，是否加载新评论
      if (!this.evaluateObj.counts) {
        // 初始化时防止加载
        this.loading = false
      } else {
        this.evaluateObj.page == this.evaluateObj.pages
          // 页数和总页数相等表示加载完了
          ? this.finished = true
          // 否则加载下一页
          : this.$store.dispatch('cart/getEvaluate', { id: this.$route.params.id, page: +this.evaluateObj.page + 1, ...this.typeObj })
            .then(res => {
              let newRes = res
              newRes.items = [...this.evaluateObj.items, ...res.items]
              this.evaluateObj = newRes
              this.loading = false
            });
      }
    },

    onPraise(item) {
      item.officialReply
        ? (item.praiseCount--, item.officialReply = false)
        : (item.praiseCount++, item.officialReply = true, this.$toast('感谢你的赞'))
    },
    getTime(time) {
      const formatter = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const date = new Date(time);
      return formatter.format(date);
    }
  },

}
</script>

<style lang="less" scoped>
.evaluate-item {
  gap: 5px;
  height: 100%;
  padding: 10px;
  margin: 10px auto;

  .top {
    display: flex;
    gap: 5px;
    padding: 0 5px;
    align-items: center;
    line-height: 34px;

    .avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }

    .time {
      margin-left: auto;
      color: #999999;
    }
  }

  .content {
    margin-right: 10px;

    .img {
      margin: 10px -10px -10px 0;
      display: flex;
      height: 100px;
      overflow: scroll;
      gap: 10px;

      &::-webkit-scrollbar {
        opacity: 0;
      }

      img {
        height: 100%;
        min-width: 85px;
        object-fit: cover;
        border-radius: 5px;
      }
    }
  }

  .buttom {
    margin-left: auto;
    margin-right: 10px;

    &.active {
      color: #EE0A24;
    }
  }
}
</style>