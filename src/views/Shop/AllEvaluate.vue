<template>
  <div>
    全部评价
    {{ $route.params.id }}
        <!-- 商品评价 评价数量 查看全部 预览评价 -->

      <!-- 2.5.2. 上部 评价标签 有图 ...... -->
      <!-- <div class="labels" :border="false">
        <span class="label-item" v-for="item in keywords" :key="item.title">{{ item.title }}({{ item.count
        }})</span>
      </div> -->

      <!-- 2.5.3. 主体 评价内容循环 -->
      <van-cell class="cell rate" :border="false" v-for="item in evaluateObj.items" :key="item.id">
        <template #title>
          <div class="rate-wrapper">
            <van-image class="rate-avatar" round width="34px" height="34px" :src="item.member.avatar" />
            <div class="rate-info">
              <span class="rate-info-id">{{ item.member.nickname }}<van-image v-if="item.isVip == 'true'" class="vip-ico"
                  height="12px" src="//img.alicdn.com/tfs/TB1wrG1elv0gK0jSZKbXXbK2FXa-225-96.png" /></span>
              <span class="rate-info-date">{{ item.createTimeInterval }}</span>
            </div>
          </div>
        </template>

        <template #label>
          <div class="rate-content">{{ item.content }}
          </div>
        </template>

      </van-cell>

  </div>
</template>

<script>
import { getEvaluatePageApi } from '@/api/product'

export default {
  data() {
    return {
      evaluateObj: {},
    }
  },
  created() {
    console.log(this.$route.params.id)
    getEvaluatePageApi({
      id: this.$route.params.id,
      page: 1,
      pageSize: 10,
      // tag: 'good',
      // sortField: 'time', 
    }).then(res => {
      console.log('评价', res)
      this.evaluateObj = res
    })
  },
  methods: {
    getEvaluate() {
    },
  },

}
</script>

<style lang="less" scoped>

</style>