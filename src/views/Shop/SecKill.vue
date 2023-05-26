<template>
  <div>
    <!-- <ul>
      <li v-for="(item, index) in tabs" :key="index" @click="changeTab(index)">
        {{ item }}
      </li>
    </ul> -->

    <van-nav-bar title="秒杀专场" left-arrow @click-left="onClickLeft" />


    <!-- console.log(this.nowTime>this.secKillTimeInfo[1].time.slice(0, 2)) -->

    <van-grid :border="false" :column-num="4">
      <van-grid-item :class="[competeTime(item.time) || 'active']" class="seckill-title" v-for="item in secKillTimeInfo"
        :key="item.time">
        <div>{{ item.time.slice(0, -2) }}:{{ item.time.slice(-2) }}</div>
        <div v-if="!competeTime(item.time)">秒杀中</div>
        <div v-else-if="competeTime(item.time) > 0">敬请期待</div>
        <div v-else>已结束</div>

      </van-grid-item>
    </van-grid>

    <div class="goods-box" v-for="product in secKillProductList" :key="product.id">

      <van-card num="2" class="goods-card">
        <!-- 该店铺的商品 商品卡片 商品名称 -->
        <template #title>
          <p class="goods-title right-txt">{{ product.title }}</p>
        </template>
        <!-- 该店铺的商品 商品卡片 详情（尺寸规格，只传入了第一组） -->
        <template #desc>
          <!-- <div class="goods-desc right-txt" v-if="item2.skus" v-text="firstSku(item2.skus)"></div> -->
          <div class="goods-desc right-txt">{{ product.assess }}</div>
        </template>
        <!-- 该店铺的商品 商品卡片 价格 -->
        <template #price>
          <span class="goods-price now right-txt">{{ product.nowP }}
            <!-- .<span class="goods-price now deci">0</span> -->
          </span>
          <span class="goods-price old right-txt">{{ product.oldP }}<span class="goods-price old deci"></span>
          </span>
          <!-- <span class="goods-price now right-txt">
                {{ item2.price.now.toString().slice(0, -2) }}<span class="goods-price now deci">.{{
                  item2.price.now.toString().slice(-2) }}</span>
              </span> -->
          <!-- 该店铺的商品 商品卡片 价格 原价 > 现价时显示 -->
          <!-- <span v-if="item2.price.now - item2.price.origin < 0" class="goods-price old right-txt">
                {{ item2.price.origin.toString().slice(0, -2) }}<span class="goods-price old deci">.{{
                  item2.price.origin.toString().slice(-2) }}</span>
              </span> -->
        </template>
        <!-- 该店铺的商品 商品卡片 图片 -->
        <template #thumb>
          <div class="goods-img-div">
            <img class="goods-img" :src="require('@/assets/images/' + 'rank1.png')" />
          </div>
        </template>
        <!-- 该店铺的商品 商品卡片 计数器 -->
        <template #num>
          <van-button to="/layout/cart" class="toBuyBtn" round type="primary" color="#5ad4ea">抢购</van-button>
        </template>
      </van-card>
    </div>



    <div>
      <list :data="listData" />
    </div>
  </div>
</template>

<script>
import List from './ProductList.vue';
import tdata from '@/assets/test-data.json'


export default {
  components: {
    List,
  },
  data() {
    return {
      secKillTimeInfo: tdata.secKillTimeInfo,
      secKillProductList: tdata.secKillProductList,
      tabs: ['标签1', '标签2', '标签3', '标签4'],
      currentTab: 0,
      listData: [],
      nowTime: "",
    };
  },
  methods: {
    changeTab(index) {
      this.currentTab = index;
      // 根据当前选中的标签获取对应的列表数据
      this.listData = this.getListData(index);
    },
    getListData(index) {
      // 根据标签索引获取对应的列表数据
      // 这里可以根据具体业务// 逻辑从后端请求数据
      console.log(index)
      return [
        { id: 1, name: '商品1', price: 100 },
        { id: 2, name: '商品2', price: 200 },
        { id: 3, name: '商品3', price: 300 },
      ];
    },
    onClickLeft() {
      // console.log('点击返回')
      this.$router.push(
        {path: '/layout/home',}
      )
    },
    competeTime(val) {
      return val.slice(0, 2) - new Date().getHours()
    },
  }, computed: {
  },
  mounted() {
    // console.log("this.secKillTimeInfo")
    // console.log(this.secKillTimeInfo)
  },
};
</script>

<style lang="less" scoped>
.seckill-title {
  height: 44px;
  background-color: @blue;
  color: #f4f4f4;

  :first-child {
    font-size: 16px;
  }

  :last-child {
    font-size: 11px;
  }

  &.active {
    background-color: #E9F2F4;
    color: @blue;
    font-weight: bold;
  }

}


// 商品框-整行
.goods-box {
  // outline: solid;
  display: flex;
  height: 110px;
  margin-top: 2px;
  padding: 15px 0;
  position: relative;
  border-bottom: 1px solid #F4F4F4;
  
  // &::after {
  //   content: '';
  //   // outline: solid;
  //   position: absolute;
  //   left: 3%;
  //   bottom: 0;
  //   width: 94%;
  //   border-bottom: 1px solid #F4F4F4;
  // }
}

// 商品框-主体
div.goods-card {
  flex: 1;
  padding-left: 15px;
  padding-right: 18px;

  display: inline-block;
  margin: 0;
  background-color: white;
  width: calc(100vw - 50px);
}


// 商品图片
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
    font-weight: bold;

    color: #ff8041;
  }

  &.goods-price {
    margin-top: 5px;
    font-size: 18px;
    display: inline-block;

    &::before {
      content: "¥";
      margin-right: 1px;
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


.toBuyBtn {
  width: 72px;
  height: 32px;
}
</style>