<template>
  <div class="label-box" :border="false">
    <span @click="rateType = '最新'" :class="{ 'chosen': rateType == '最新' }" class="label-item">最新</span>
    <span @click="rateType = item.title" :class="{ 'chosen': rateType == item.title }" class="label-item"
      v-for="item in keywordsObj.tags" :key="item.title">{{ item.title }}({{ item.tagCount }})</span>
  </div>
</template>

<script>
export default {
  name: 'EvaluateTag',
  props: {
  },
  data() {
    return {
      rateType: '全部',
      keywordsObj: {},
    }
  },
  created() {
    this.$store.dispatch('cart/getEvaluateKeywords', this.$route.params.id).then(res => {
      this.keywordsObj = res
    })
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
      this.$bus.$emit('type-changed', this.typeObj)
    },
  },

}
</script>

<style lang="less" scoped>
// <!-- 2.5.2. 上部 评价标签 有图 ...... -->
.label-box {
  // display: flex;
  background-color: #5AD4EA;
  width: 100vw;
  position: fixed;
  white-space: nowrap;
  overflow-x: scroll;
  padding: 5px;
  z-index: 2;
  margin-top: -10px;

  &::-webkit-scrollbar {
    display: none;
  }

  // flex-direction: row;
  // flex-wrap: wrap;
  // justify-content: space-evenly;
  // align-items: center;
  // overflow: hidden;
  // border-spacing: 0;
  .label-item {
    font-size: 14px;
    display: inline-block;
    padding: 0 7px;
    background-color: @light-blue;
    height: 26px;
    line-height: 26px;
    border-radius: 13px;
    margin-right: 5px;
    &.chosen {
   background-color: #aef0ff;
   border: 1px solid #5ad4ea;
 }
    // flex: 1 0 25%;
    // display: flex;
    // height: 50%;
    // justify-content: center;
    // align-items: center;
    // border: 1px solid;   
    // margin: -1px;  
    // box-sizing: border-box;   
  }




  // width: 100vw;
  // /* 固定最大宽度 */
  // overflow-x: scroll;
  // /* 水平方向显示滚动条 */
  // white-space: nowrap;
  // position: fixed;
  // margin-top: -35px;
  // padding: 5px;
  // z-index: 2;
  // background-color: white;
  // box-shadow: 0px 1px 2px #ccc;

  // &::-webkit-scrollbar {
  //   display: none;
  // }

  // .label-item {
  //   font-size: 14px;
  //   display: inline-block;
  //   padding: 0 7px;
  //   background-color: @light-blue;
  //   height: 26px;
  //   line-height: 26px;
  //   border-radius: 13px;
  //   margin-right: 5px;

  //   &.chosen-type {
  //     background-color: #aef0ff;
  //     border: 1px solid #5ad4ea;
  //   }
  // }
}
</style>