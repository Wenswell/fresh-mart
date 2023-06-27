<template>
  <!-- 猜你喜欢 -->
  <RoundBox class="like" left-title="猜你喜欢" @click-right="$toast('全部')">
    <template slot="flex">
      <img class="like-img" :src="require('@/assets/images/rank4.png')" height="200" width="200">
      <span class="like-desc">百年陈酿 囯窖茅台 小黑瓶 11111111111111150ml</span>
    </template>
  </RoundBox>
</template>

<script>
export default {
  name:'MyLike',

}
</script>

<style lang="less" scoped>
// 盒子 4 猜你喜欢 内容
.like {
  padding-bottom: 10px;

  .like-img {
    flex: 0;
    width: 50px;
    height: 77px;
    object-fit: cover;
    margin: 0 30px 0 20px;
  }

  .like-desc {
    margin-right: 10px;
    font-size: 15px;
    width: 210px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    display: inline-block;
  }
}
</style>