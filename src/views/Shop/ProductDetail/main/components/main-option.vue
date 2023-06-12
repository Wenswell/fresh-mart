<template>
  <RoundBox class="option-box">
    <div @click="$toast('客服')" class="option">
      <span class="option-ico"></span>
      <span class="option-text">客服</span>
    </div>
    <div @click="$toast('分享')" class="option">
      <span class="option-ico"></span>
      <span class="option-text">分享</span>
    </div>
    <div @click="$emit('collect')" class="option">
      <span :class="{ collect: collect }" class="option-ico"></span>
      <span class="option-text">收藏</span>
    </div>
  </RoundBox>
</template>

<script>
export default {
  name: 'MainOption',
  props: {
    collect: Boolean,
  },

}
</script>

<style lang="less" scoped>
.option-box {
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 77px;
}

.option {
  display: flex;
  gap: 8px;
  flex: 1;
  flex-direction: column;
  align-items: center;

  .option-ico {
    display: inline-block;
    background: url(@/assets/images/icoAll.png) no-repeat;
    background-position-y: -73px;
    background-size: 110px;
    width: 20.5px;
    height: 21px;
  }

  &:nth-child(1) .option-ico {
    background-position-x: -26.5px;
  }

  &:nth-child(2) .option-ico {
    background-position-x: -47px;
  }

  &:nth-child(3) .option-ico {
    background-position-x: -67px;
    
    &.collect {
        background-position-x: -86px;
      }
  }
}
</style>