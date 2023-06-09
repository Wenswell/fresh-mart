<template>
  <div class="all-evaluate">
    <!-- 商品评价 评价数量 查看全部 预览评价 -->

    <!-- 2.5.2. 上部 评价标签 有图 ...... -->
    <div class="labels" :border="false">
      <span @click="rateType = '最新'" :class="{ 'chosen-type': rateType == '最新' }" class="label-item">最新</span>
      <span @click="rateType = item.title" :class="{ 'chosen-type': rateType == item.title }" class="label-item"
        v-for="item in keywordsObj.tags" :key="item.title">{{ item.title }}({{ item.tagCount }})</span>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 2.5.3. 主体 评价内容循环 -->
      <van-cell class="cell rate" :border="false" v-for="item in evaluateObj.items" :key="item.id">
        <template #title>
          <div class="rate-wrapper">
            <van-image class="rate-avatar" round width="34px" height="34px" :src="item.member.avatar" />
            <div class="rate-info">
              <span class="rate-info-id">{{ item.member.nickname }}</span>
              <span class="rate-info-date">{{ item.createTimeInterval }}</span>
            </div>
            <van-rate class="rate-star" size="12" gutter="1" color="orange" v-model="item.score" readonly />
            <div class="rate-date">{{ item.createTime }}</div>
          </div>
        </template>

        <template #label>
          <div class="rate-content">{{ item.content }}</div>
          <div class="rate-content-img" v-if="item.pictures.length">
            <img @click="previewImg(item)" v-for="item in item.pictures" :key="item" :src="item" alt="" srcset="">
          </div>
        </template>

      </van-cell>
    </van-list>

  </div>
</template>

<script>
// import { getEvaluatePageApi } from '@/api/product'
import { ImagePreview } from 'vant';

export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      rateType: '全部',
      typeObj: {},
      loading: false,
      finished: false,
      evaluateObj: {},
      keywordsObj: {},
    }
  },
  created() {
    this.$store.dispatch('cart/getEvaluateKeywords', this.$route.params.id).then(res => {
      this.keywordsObj = res
    })
    // ImagePreview([
    //  'https://img01.yzcdn.cn/vant/apple-1.jpg',
    //   'https://img01.yzcdn.cn/vant/apple-2.jpg',
    // ]);

    console.log(this)
    this.$store.dispatch('cart/getEvaluate', {
      id: this.$route.params.id,
      page: 1,
    }).then(res => {
      this.evaluateObj = res
    })
  },
  methods: {

    previewImg(url) {
      ImagePreview([url]);
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
  },
  watch: {
    rateType(newType) {
      switch (newType) {
        case '全部':
          this.typeObj = {};
          break;
        case '最新':
          this.typeObj = { sortMethod: 'desc' };
          break;
        case '有图':
          this.typeObj = { hasPicture: true };
          break;
        default:
          this.typeObj = { tag: newType };
          break;
      }
      this.$store.dispatch('cart/getEvaluate', {
        id: this.$route.params.id,
        page: 1,
        ...this.typeObj
      }).then(res => {
        this.evaluateObj = res
      })
    },
  },


}
</script>

<style lang="less" scoped>
.all-evaluate:nth-child(2) {
  padding-top: 30px;
}

// <!--———— 2.5 主体 ——————-->
// <!-- 商品评价 评价数量 查看全部 预览评价 -->
.rate {
  padding: 10px 10px;

  .rate-wrapper {
    display: flex;
    line-height: normal;
    align-items: center;

    .rate-avatar {
      margin-right: 10px;
    }

    .rate-info {
      display: flex;
      flex-direction: column;
    }

    .rate-info-id {
      font-size: 15px;
      display: flex;
      align-items: center;

      .vip-ico {
        margin: auto;
        margin-left: 5px;
      }
    }

    .rate-star {
      margin: 10px;
      padding-top: 3px;
    }

    .rate-date {
      padding-top: 3px;
      margin-left: auto;
    }

    .rate-info-date {
      color: #999999;
    }
  }

  .rate-content {
    color: #111111;
    font-size: 14px;
    margin: 11px 0px 0px;
  }

  .rate-content-img {
    margin-top: 10px;
    display: flex;
    height: 85px;
    width: 96vw;
    overflow: scroll;
    gap: 10px;

    &::-webkit-scrollbar {
      opacity: 0;
    }

    img {
      border-radius: 3px;
    }
  }
}


// <!-- 2.5.2. 上部 评价标签 有图 ...... -->
.labels {
  width: 100vw;
  /* 固定最大宽度 */
  overflow-x: scroll;
  /* 水平方向显示滚动条 */
  white-space: nowrap;
  position: fixed;
  margin-top: -35px;
  padding: 5px;
  z-index: 2;
  background-color: white;
  box-shadow: 0px 1px 2px #ccc;

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

    &.chosen-type {
      background-color: #aef0ff;
      border: 1px solid #5ad4ea;
    }
  }
}
</style>