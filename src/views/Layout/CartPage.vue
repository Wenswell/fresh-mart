<template>
  <div class="cart-container">
    <van-nav-bar :fixed="true" title="购物车" right-text="管理" @click-right="onClickRight" />

    <van-checkbox-group v-model="checkResult" direction="horizontal">
      <van-swipe-cell :before-close="beforeClose" class="goods-box" :right-width="50" v-for="item in cartList"
        :key="item.id" :name="item.id">
        <van-checkbox :name="item.id" class="checkbox"></van-checkbox>
        <van-card num="2" class="goods-card">
          <template #title>
            <p class="goods-title right-txt">{{ item.title }}</p>
          </template>
          <template #desc>
            <p class="goods-desc right-txt">{{ item.detail }}</p>
          </template>
          <template #price>
            <p class="goods-price right-txt">
              {{ item.price.split('.')[0] }}<span>.{{ item.price.split('.')[1] }}</span>
            </p>
          </template>
          <template #thumb>
            <div class="goods-img-div">
              <img class="goods-img" :src="require('@/assets/images/' + item.img)" />
            </div>
          </template>
          <!-- 计数器 -->
          <template #num>
            <van-stepper v-model="item.count" integer input-width="38px" button-size="28px" class="stepper" />
          </template>
        </van-card>
        <template #right>
          <van-button type="danger" round text="删除" class="delete-button" />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>

    <!-- 底部 提交订单栏 -->
    <van-submit-bar class="submit-bar" :price="totalPrice * 100" button-text="结算" @submit="onSubmit" suffix-label="(不含运费)"
      button-color="#5AD4EA">
      <van-checkbox v-model="sumChecked" @click="cancelAll">全选</van-checkbox>
    </van-submit-bar>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      checkResult: [],
      cartList: [
        { id: "a", count: "", price: "128.00", title: "百年陈酿 囯窖茅台 小黑瓶 150ml", detail: "30ml", img: "rank4.png", },
        { id: "b", count: "", price: "68.01", title: "意大利进口 法式面包 长条包 150g", detail: "300g", img: "rank5.png", },
        { id: "c", count: "", price: "6.02", title: "有机种植脐橙 甜度适中 口感鲜美 10个", detail: "20个", img: "rank6.png", },
        { id: "d", count: "", price: "8.10", title: "新鲜蔬菜沙拉 色彩缤纷 营养丰富 100g", detail: "300g", img: "rank7.png", },
        { id: "e", count: "", price: "128.00", title: "百年陈酿 囯窖茅台 小黑瓶 150ml", detail: "30ml", img: "rank4.png", },
        { id: "f", count: "", price: "68.01", title: "意大利进口 法式面包 长条包 150g", detail: "300g", img: "rank5.png", },
        { id: "g", count: "", price: "6.02", title: "有机种植脐橙 甜度适中 口感鲜美 10个", detail: "20个", img: "rank6.png", },
        { id: "h", count: "", price: "8.10", title: "新鲜蔬菜沙拉 色彩缤纷 营养丰富 100g", detail: "300g", img: "rank7.png", },
      ],
      sumChecked: false,
      totalPrice: 1,
    };
  },
  methods: {
    onClickRight() {
      console.log("right")
    },
    onSubmit() {
      console.log("点击结算 " + this.totalPrice)
    },
    cancelAll() {
      if (this.sumChecked) {
        this.checkResult = this.cartList.map(item => item.id);
      } else {
        this.checkResult = []
      }
    },

    // 计算总价格
    sumPrice() {
      let ress = 0;
      this.checkResult.forEach(id => {
        this.cartList.forEach(item => {
          if (item.id === id) {
            ress += item.count * parseFloat(item.price);
          }
        })
      })
      this.totalPrice = ress.toFixed(2)
    },

    // 购物车删除商品时 1.从商品列表中移除； 2. 从选择列表中移除
    deleteItem(id) {
      this.cartList = this.cartList.filter(item => {
        return item.id !== id
      })
      this.checkResult = this.checkResult.filter(item => {
        return item !== id
      })
    },
    beforeClose({ name, position, instance }) {
      switch (position) {
        case 'outside':
          instance.close();
          break;
        case 'right':
          console.log(name)
          console.log(position)
          console.log(instance)
          this.$dialog.confirm({
            message: '确定删除吗？',
          }).then(() => {
            console.log("close");
            this.deleteItem(name);
            instance.close();
          }).catch(err => console.log(err));
          break;
      }
    },
  },
  computed: {
  },
  watch: {
    cartList: {
      deep: true,
      handler() {
        this.sumPrice()
      }
    },
    checkResult() {
      this.sumPrice()
      // 根据数组长度判断是否全选
      // 并且排除空数组
      // console.log("1"+ this.sumChecked)
      // this.sumChecked = false;
      this.sumChecked = this.checkResult.length === this.cartList.length && this.cartList.length > 0;
      console.log("2" + this.sumChecked)
      console.log("3checkResult:" + this.checkResult)
    },
  },
}
</script>

<style lang="less" scoped>
// 添加下边距 防止顶栏底栏结算框遮挡商品
.cart-container {
  margin-top: 46px;
  margin-bottom: 100px;
}

// 商品框-整行
.goods-box {
  // outline: solid;
  display: flex;
  height: 110px;
  margin-top: 2px;
  padding: 15px 0;
  &::after {
    content: '';
    position: absolute;  
    left: 3%;
    bottom: 0;  
    width: 94%;    
    border-bottom: 1px solid #F4F4F4;
  }
}

// 商品框-左侧勾选框
.checkbox {
  display: inline-block;
  margin: 20px 15px;
  margin: 0;
  padding: 20px 15px;
}

// 商品框-主体
div.goods-card {
  display: inline-block;
  padding-left: 0;
  padding-right: 10px;
  margin: 0;
  background-color: white;
  width: calc(100vw - 50px);
}

// 商品框-右滑删除按钮
.delete-button {
  top: 20%;
  white-space: nowrap;
  width: 50px;
  height: 30px;
}

.goods-img-div {
  height: 80px;
  background-color: #e9f2f4;
  display: flex;
  /* 使用 flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  border-radius: 8px;
}

.goods-img {
  height: 75%;
  // width: 80%;
  object-position: center;
  /* 水平和垂直居中 */
}

.right-txt {
  margin-left: 10px;

  &.goods-title {
    margin-top: 5px;
    font-size: 15px;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.goods-desc {
    font-size: 10px;
    color: #999999;
  }

  &.goods-price {
    margin-top: 5px;
    font-size: 16px;
    font-weight: bold;
    color: red;

    &::before {
      content: "¥";
      margin-right: 2px;
    }

    & span {
      font-size: 12px;
    }
  }
}
// 结算栏
.submit-bar {
  margin-bottom: 49px;
  padding: 0 10px;
}
</style>