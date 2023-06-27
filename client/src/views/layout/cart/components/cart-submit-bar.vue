<template>
  <div>
    <!-- 底部 提交订单栏 -->
    <van-submit-bar v-show="!editMode" class="submit-bar" :price="getTotalPrice * 100" button-text="结算" @submit="onSubmit"
      suffix-label="(不含运费)" button-color="#5AD4EA">
      <van-checkbox :disabled="isDisabled" v-model="checkedAll">全选</van-checkbox>
    </van-submit-bar>

    <div v-show="editMode" class="bottom-in-edit-mode">
      <van-checkbox class="edit-mode-check" :disabled="isDisabled" v-model="checkedAll">全选</van-checkbox>
      <!-- <div class="edit-mode-text"><van-icon name="delete-o" />清除无效商品</div> -->
      <van-button @click="onRemoveInvalid" class="edit-mode-btn" round><van-icon name="delete-o" /> 移除无效商品</van-button>
      <van-button @click="onAddToCollect" class="edit-mode-btn" round>移入收藏</van-button>
      <van-button @click="onDelete" class="edit-mode-btn" round>删除</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartSubmitBar',
  props: {
    editMode: Boolean,
  },
  methods: {

    onRemoveInvalid() {
      // console.group('onRemoveInvalid')
      // this.$toast('onRemoveInvalid')
      this.$store.dispatch('cart/removeInvalidItem').then(res => this.$toast(res == 1 ? '已清除' : '清除失败'))
      // console.groupEnd()
    },
    onAddToCollect() {
      console.group('onAddToCollect')
      this.$toast('onAddToCollect')
      this.$store.dispatch('cart/addSelectedToCollect').then(res => this.$toast(res == 1 ? '已加入收藏' : '收藏失败'))

      console.groupEnd()
    },
    onDelete() {
      // this.$toast('onDelete')
      // 全选时清空
      if (this.checkedAll) {
        this.$dialog.confirm({
          message: '确定清空购物车吗？',
        }).then(() => {
          console.log('清空购物车')
          this.$store.dispatch('cart/emptyCartItem').then(res => this.$toast(res == 1 ? '已清空' : '清空失败'))
        }).catch(err => console.log(err));
      } else {
        // 删除部分
        this.$store.dispatch('cart/removeSomeItem').then(res => this.$toast(res == 1 ? '已删除' : '删除失败'))
      }
    },
    
    onSubmit() {
      console.log("点击'结算'")
      // 提交后、订单创建成功后转到订单页面
      this.$store.dispatch('user/createOrder').then(()=>this.$router.push('/order/check'))
    },
  },
  computed: {
    getTotalPrice() {
      let res = this.$store.getters['cart/validSelectedPrice']
      console.log("getTotalPrice", res)
      return res
    },
    checkedAll: {
      get() {
        return this.$store.getters['cart/isCheckAll']
      },
      set(value) {
        this.$store.dispatch('cart/selectAllItem', value)
      }
    },
    isDisabled() {
      return this.$store.getters['cart/hasIneffective']
    },
  }
}
</script>

<style lang="less" scoped>
// 编辑模式 底栏
.bottom-in-edit-mode {
  height: 50px;
  bottom: 50px;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  background-color: white;
  font-size: 14px;

  // border-top: 1px solid #eee;
  // border: none;
  .edit-mode-check {
    flex: 1;
  }

  .edit-mode-text {
    line-height: 14px;
    color: coral;
  }

  .edit-mode-btn:last-child {
    background: linear-gradient(#ff005f, #ff1b00);
    color: white;
  }

  .edit-mode-btn {
    height: 30px;
    padding: 0 10px;
  }
}

// 结算栏
.submit-bar {
  margin-bottom: 49px;
  padding: 0 10px;
}
</style>