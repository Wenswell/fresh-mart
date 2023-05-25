<template>
  <div class="cart-container">
    <!-- 顶栏 -->
    <van-nav-bar :fixed="true" title="购物车" right-text="管理" @click-right="onClickRight" />

    <!-- 购物车 主体 循环 -->
    <van-checkbox-group v-model="shopCheckResult" direction="horizontal" v-for="item1 in taobaoList" :key="item1.id">

      <!-- 店铺选框 + 名称 + 领券 -->
      <van-cell v-if="item1.bundles[0].orders.length" center class="shop-title">
        <!-- 店铺选框 + 名称-->
        <template #title>
          <div class="shop-title-left">

            <!-- 店铺 左侧选框-->
            <!-- 店铺选择 向taobaoList添加checked属性值且默认为FALSE -->
            <van-checkbox @click="checkShopSelect(item1.shopId)" :name="item1.shopId"
              class="inline checkbox"></van-checkbox>

            <!-- 店铺 名称-->
            <van-icon class="inline" name="shop-o" size="16" />
            <p class="inline shop-name">{{ item1.title }}</p>
          </div>
        </template>
        <!-- 店铺 领券 -->
        <template #default>
          <span class=" inline to-coupon">领券</span>
        </template>
      </van-cell>

      <!-- 购物车 商品列表 子循环 每个店铺的商品 -->
      <van-checkbox-group v-for="item2 in item1.bundles[0].orders" v-model="checkResult[item2.shopId]" :key="item2.itemId">

        <!-- 右滑删除容器 -->
        <van-swipe-cell :before-close="beforeClose" class="goods-box" :right-width="45" :name="item2.itemId">

          <!-- 该店铺的商品 左侧选框-->
          <!-- 该店铺的商品 绑定taobaoList中该商品的checked属性 -->
          <van-checkbox :name="item2.itemId" class="checkbox"></van-checkbox>

          <!-- 该店铺的商品 商品卡片 -->
          <van-card num="2" class="goods-card">
            <!-- 该店铺的商品 商品卡片 商品名称 -->
            <template #title>
              <p class="goods-title right-txt">{{ item2.title }}</p>
            </template>
            <!-- 该店铺的商品 商品卡片 详情（尺寸规格，只传入了第一组） -->
            <template #desc>
              <div class="goods-desc right-txt" v-if="item2.skus" v-text="firstSku(item2.skus)"></div>
            </template>
            <!-- 该店铺的商品 商品卡片 价格 -->
            <template #price>
              <!-- 该店铺的商品 商品卡片 价格 现在价格 -->
              <span class="goods-price now right-txt">
                {{ item2.price.now.toString().slice(0, -2) }}<span class="goods-price now deci">.{{
                  item2.price.now.toString().slice(-2) }}</span>
              </span>
              <!-- 该店铺的商品 商品卡片 价格 原价 > 现价时显示 -->
              <span v-if="item2.price.now - item2.price.origin < 0" class="goods-price old right-txt">
                {{ item2.price.origin.toString().slice(0, -2) }}<span class="goods-price old deci">.{{
                  item2.price.origin.toString().slice(-2) }}</span>
              </span>
            </template>
            <!-- 该店铺的商品 商品卡片 图片 -->
            <template #thumb>
              <div class="goods-img-div">
                <img class="goods-img" :src="require('@/assets/images/' + 'rank1.png')" />
              </div>
            </template>
            <!-- 该店铺的商品 商品卡片 计数器 -->
            <template #num>
              <!-- 
                "amount": {
                  "demand": 0,
                  "max": 20,
                  ......
                },
              -->
              <!-- 该店铺的商品 商品卡片 计数器 暂时用数组中的空值（demand）接收 -->
              <!-- <van-stepper v-model="checkResult[item2.itemId]" :min="1" :max="item2.amount.max" integer input-width="38px" -->
              <van-stepper @change="sumPrice" v-model="item2.amount.demand" :min="1" :max="item2.amount.max" integer
                input-width="38px" button-size="26px" class="stepper" />
            </template>
          </van-card>
          <template #right>
            <!-- 该店铺的商品 商品卡片 左滑显示删除按钮 -->
            <van-button type="danger" round text="删除" class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </van-checkbox-group>

    <!-- 底部 提交订单栏 -->
    <van-submit-bar class="submit-bar" :price="totalPrice" button-text="结算" @submit="onSubmit" suffix-label="(不含运费)"
      button-color="#5AD4EA">
      <van-checkbox @click="checkSelectAll" v-model="sumChecked">全选</van-checkbox>
    </van-submit-bar>

  </div>
</template>

<script>
import tdata from '@/assets/test-data.json'

export default {
  data() {
    return {
      cartList: tdata.cartList,
      taobaoList: tdata.taobaoList,
      // value: 1,
      totalPrice: 1,
      sumChecked: false,
      shopSelect: false,
      checkResult: {},
      shopCheckResult: [],
    };
  },
  methods: {
    onClickRight() {
      console.log("right")
    },
    onSubmit() {
      console.log("点击结算 " + this.totalPrice)
    },
    checkShopSelect(shopId) {
      // console.log(shopId)
      // console.log(this.checkResult[shopId])
      // 点击时
      console.log(this.shopCheckResult.includes(shopId)) // true表示选中，FALSE表示取消选择
      // 1. 已经全选后点击 全部取消
      // 2. 未全选中时点击 全部选中
      if (this.shopCheckResult.includes(shopId)) {
        // console.log("选中")
        // console.log(this.checkResult[shopId])
        this.selectShopAllItems(shopId)
      } else {
        // console.log("取消")
        this.checkResult[shopId] = []
      }
    },
    selectShopAllItems(shopId) {
      // console.log("selectShopAllItems: " + shopId)
      // this.checkResult.aa = "123"
      // console.log(this.checkResult)
      this.taobaoList.forEach(item1 => {
        if (shopId == item1.shopId) {
          // console.log(shopId)
          this.checkResult[shopId] = item1.bundles[0].orders.map(item2 => {
            return item2.itemId
          })
          // console.dir("this.checkResult: ")
          // console.dir(this.checkResult)
          // item1.bundles[0].orders.forEach(item2 => {
          //   console.log(item2.itemId)
          // })

        }

      })

      // console.log("cancelAll")
      // if (this.sumChecked) {
      //   this.checkResult = this.cartList.map(item => item.id);
      // } else {
      //   this.checkResult = []
      // }
    },
    allShopItem() {
      console.log('allShopItem Check')
    },

    // 计算总价格
    sumPrice() {
      console.log("sumPrice")
      // console.log(this.taobaoList[3].bundles[0].orders.length)
      // let ress = 0;
      // console.log(this.taobaoList[0].bundles[0].orders[0].price.origin)
      // console.log(this.taobaoList[0].bundles[0].orders[0].price.now)
      // console.log(this.taobaoList[0].bundles[0].orders[0].amount)
      // console.log(this.taobaoList[0].bundles[0].orders[0].title)
      // console.log(this.taobaoList[0].title)
      // console.log(this.taobaoList[0].checked)
      let res = 0;
      const selectedItemId = Object.values(this.checkResult).flat();
      // console.log(selectedItemId)
      this.taobaoList.forEach(item1 => {
        // console.log("item1: "+ item1)
        // console.log(item1.bundles[0].orders)
        item1.bundles[0].orders.forEach(item2 => {
          // console.log("item2.itemId: "+ item2.itemId)

          if (selectedItemId.indexOf(item2.itemId) !== -1) {
            // console.log("yes")
            // console.log(item2.price.now)
            // console.log(this.totalPrice)
            res += item2.price.now * item2.amount.demand
          }
          // console.log(item2.itemId)
          // console.log(item2.price.now)
          // console.log(this.totalPrice)
          //   item2.orders.forEach()
        })
      })
      this.totalPrice = res;
    },

    checkSelectAll() {
      const that = this;
      if (this.sumChecked) {
        // 选中 全部选择
        // console.log("this.sumChecked为真： "+ this.sumChecked)
        Object.keys(this.checkResult).forEach(shopId => {
          // console.log(shopId)
          that.selectShopAllItems(shopId)
        })
      } else {
        // 取消全选 全不选
        // console.log("this.sumChecked为FALSE： "+ this.sumChecked)
        this.cancelAllSelected()
      }
    },

    cancelAllSelected() {
      this.checkResult = this.taobaoList.reduce((obj, item) => {
        obj[item.shopId] = [];
        return obj;
      }, {});
    },

    // 购物车删除商品时 1.从商品列表中移除； 2. 从选择列表中移除
    deleteItem(cartId) {
      this.taobaoList.forEach(parent => {
        parent.bundles.forEach(bundle => {
          bundle.orders = bundle.orders.filter(order => {
            // console.log("order.cartId: "+order.itemId)
            // console.log("cartId: "+cartId)
            return order.itemId !== cartId
          })
        })
      })
      this.sumPrice();
      let obj = this.checkResult;

      for (const key in obj) {
        if (obj[key].includes(cartId)) {
          const index = obj[key].indexOf(cartId);
          obj[key].splice(index, 1);
        }
      }

      // for (const key in obj) {
      //   if (Object.hasOwnProperty.call(obj, key)) {
      //     let element = obj[key];
      //     console.log("element111");
      //     console.dir(element);
      //     element = element.filter(ele => {
      //       console.log("cartId");
      //       console.dir(cartId);
      //       console.dir(ele);
      //       console.log("ele@@@@@@@@@@");
      //       return ele != cartId
      //     })
      //     console.log("element222222");
      //     console.dir(element);
          
      //   }
      // }
      // 遍历对象
      // for (const key in obj) {
      //   console.log("key"+ key);
      //   console.log("obj[key]"+obj[key]);
      //   console.log(obj[key]);
      //   if (obj[key].includes(cartId)) {
      //     console.log("sdfsfdfsdaaaaaaaa");
      //     console.log("obj[key]"+obj[key]);
      //     const index = obj[key].indexOf(+cartId);
      //     obj[key].splice(index, 1);
      //   }
      // }
      // console.log("obj");
      // console.dir(obj);

    },

    beforeClose({ name, position, instance }) {
      switch (position) {
        case 'outside':
          instance.close();
          break;
        case 'right':
          // console.log("name: ")
          // console.log(name)
          // console.log("position: ")
          // console.log(position)
          // console.log("instance: ")
          // console.log(instance)
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
    firstSku(skus) {
      const entries = Object.entries(skus);
      const [key, value] = entries[0];
      return `${key}: ${value}`;
    },
  },
  computed: {
  },
  watch: {
    checkResult: {
      deep: true,
      handler(newRes) {
        this.sumPrice()
        // console.log("checkResult Changed")
        for (let [key, value] of Object.entries(newRes)) {
          // 店铺数量
          // console.log(this.taobaoList.length)
          if (this.shopCheckResult.length == this.taobaoList.length) this.sumChecked = true
          this.taobaoList.forEach(item => {
            // 针对该商店
            if (item.shopId == key) {
              // 判断选中商品数量与购物车中商品数量是否相等
              if (value.length === item.bundles[0].orders.length) {
                // console.log('全选')
                // console.log(value.length)
                // console.log(item.bundles[0].orders.length)
                if (this.shopCheckResult.indexOf(+key) === -1) {
                  this.shopCheckResult.push(+key);
                }
              } else {
                // console.log("取消全选")
                this.sumChecked = false
                this.shopCheckResult = this.shopCheckResult.filter(item => item !== +key);
              }
            }
          })
        }
      }
    },
    shopCheckResult() {
      // 追加判断
      if (this.shopCheckResult.length == this.taobaoList.length) this.sumChecked = true

      //     handler(newVal, oldVal) {
      //       this.sumPrice()
      //       setTimeout(() => {
      //         const added = newVal.filter(x => !oldVal.includes(x));
      //         const removed = oldVal.filter(x => !newVal.includes(x)); 

      //         console.log("added: " + added)
      //         console.log("removed: " + removed)

      //       },0)
      //        // 使用 added 和 removed 数组       
      //     },  
      //     deep: true
    }

    // taobaoList: {
    //   deep: true,
    //   handler() {
    //     console.log('taobaoListChanged')

    //     // 1. 判断店铺、全选 是否要勾选
    //   // console.log(this.taobaoList[0].bundles[0].orders[0].price.origin)
    //   // console.log(this.taobaoList[0].bundles[0].orders[0].price.now)
    //   // console.log(this.taobaoList[0].bundles[0].orders[0].amount)
    //   // console.log(this.taobaoList[0].bundles[0].orders[0].title)
    //   // console.log(this.taobaoList[0].title)
    //   console.log(this.taobaoList[0].checked)

    //     // 2. 计算总价


    //   }
    // },
    // checkResult() {
    //   this.sumPrice()
    //   // 根据数组长度判断是否全选
    //   // 并且排除空数组
    //   // console.log("1"+ this.sumChecked)
    //   // this.sumChecked = false;
    //   this.sumChecked = this.checkResult.length === this.cartList.length && this.cartList.length > 0;
    //   console.log("2" + this.sumChecked)
    //   console.log("3checkResult:" + this.checkResult)
    // },
  },
  mounted() {
    this.cancelAllSelected()



    // 引入订单id 
    // let orderId = "4937588929466";  

    // // 过滤数组,移除对应订单的整个对象
    // let newBundles = this.taobaoList[0].bundles[0].orders.filter(item  => {
    //   console.log("orderId: ")
    //   console.log(orderId)
    //   console.log("item: ")
    //   console.log(item)
    //   console.log(item)
    // });
    // console.log("newBundles")
    // console.log(newBundles)

    // this.bundles = newBundles;

    //   this.taobaoList.forEach(item => {
    //     // console.log("item")
    //     // console.log(item)
    //     item.bundles.forEach(item => {
    //     // console.log("bundles")
    //     // console.log(item)
    //     item.orders.forEach(item => {
    //     console.log("orders")
    //     console.log(item.title)
    //     })
    //     })
    //   })
    //   console.log(this.taobaoList[0].bundles[0].orders[0].price.origin)
    // console.log(this.taobaoList[0].bundles[0].orders[0].price.now)
    // console.log(this.taobaoList[0].bundles[0].orders[0].amount)
    //   console.log(this.taobaoList[0].bundles[0].orders[0].title)
    //   console.log(this.taobaoList[0].title)
    //   console.log(this.taobaoList[0])
  }
}
</script>

<style lang="less" scoped>
.shop-title {
  height: 40px;
}

.shop-title-left {
  display: flex;
  align-content: center;
}

.inline {
  display: inline-block;
  margin: auto 0;

  &.shop-name {
    font-size: 14px;
    margin: auto 5px auto 7px;
    width: max-content;

    &::after {
      content: '＞';
    }
  }

  &.to-coupon {
    color: @blue;
    font-style: 10px;
    margin-right: 15px;
  }
}




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
  width: 42px;
  height: 30px;
  margin-left: 3px;
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
    font-size: 14px;
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
    display: inline-block;

    &::before {
      content: "¥";
      margin-right: -2px;
    }

    // .deci {
    //   font-size: 60%;
    // }

    &.now {
      font-weight: bold;
      color: red;
    }

    &.old {
      color: @grey;
      font-size: 13px;
      text-decoration: line-through
    }
  }
}

// 结算栏
.submit-bar {
  margin-bottom: 49px;
  padding: 0 10px;
}
</style>