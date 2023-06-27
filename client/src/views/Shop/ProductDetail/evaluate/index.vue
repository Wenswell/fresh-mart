<template>
  <div class="all-evaluate">
    <!-- 商品评价 评价数量 查看全部 预览评价 -->

    <!-- 2.5.2. 上部 评价标签 有图 ...... -->
    <EvaluateTag />
    <!-- 占位 -->
    <div style="height: 30px;"></div>

    <!-- 2.5.3. 主体 评价内容循环 -->
    <EvaluateContent />

  </div>
</template>

<script>
import EvaluateContent from './components/evaluate-content';
import EvaluateTag from './components/evaluate-tag';

export default {
  name: 'AllEvaluate',
  components: {
    EvaluateTag,
    EvaluateContent,
  },
}
</script>

<style lang="less" scoped></style>