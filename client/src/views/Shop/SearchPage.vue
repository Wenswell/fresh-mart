<template>
  <div>
    <!--———— 1. 顶栏 ——————-->
    <!-- 搜索栏 定位 -->
    <van-sticky>
      <van-search
        class="top-search-bar"
        v-model="searchStr"
        show-action
        shape="round"
        placeholder="未搜索时按默认顺序加载所有商品"
        @search="onSearch"
        @cancel="$router.push('/layout/home')"
      >
        <!-- @search="onSearch" @cancel="$router.back()"> -->
      </van-search>

      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item
          v-model="params1"
          @change="dropDownChange"
          :options="option1"
        />
        <van-dropdown-item
          v-model="params2"
          @change="dropDownChange"
          :options="option2"
        />
      </van-dropdown-menu>
    </van-sticky>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-grid :column-num="2" :border="false">
        <van-grid-item
          class="product-div"
          v-for="item in searchResult"
          :key="item.id"
          @click="$router.push(`/shop/products/${item.id}`)"
        >
          <van-image class="product-div-img" :src="item.picture" />
          <div class="product-div-text">
            <div class="product-div-text-name">{{ item.name }}</div>
            <div class="product-div-text-price">{{ item.nowPrice }}</div>
            <div v-if="item.description" class="product-div-text-desc">
              {{ item.description }}
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script>
import { LOCALsearchProductApi } from "@/api/product";
export default {
  data() {
    return {
      searchStr: "",
      currentPage: 0,
      loading: false,
      finished: false,
      searchResult: [],
      params1: "pageSize:10",
      params2: "pageSize:10",
      option1: [
        { text: "全部商品", value: "pageSize:10" },
        { text: "特惠商品", value: "onlyDiscount:true" },
        { text: "正序", value: "sortMethod:asc" },
        { text: "倒序", value: "sortMethod:desc" },
      ],
      option2: [
        { text: "默认排序", value: "pageSize:10" },
        { text: "发布时间", value: "sortField:publishTime" },
        { text: "按价格", value: "sortField:price" },
        { text: "按评价", value: "sortField:evaluateNum" },
      ],
    };
  },
  methods: {
    // 触底加载更多
    onLoad() {
      this.loading = true;
      LOCALsearchProductApi({
        keyword: this.searchStr,
        page: ++this.currentPage,
      }).then((res) => {
        this.searchResult = this.searchResult.concat(res.result.pageData.items);
        this.loading = false;
        // 加载完成
        if (this.searchResult.length == res.result.pageData.counts)
          this.finished = true;
      });
    },

    // 开始搜索
    onSearch() {
      this.currentPage = 1;
      const [key1, value1] = this.params1.match(/(\w+):(\w+)/).slice(1);
      const [key2, value2] = this.params2.match(/(\w+):(\w+)/).slice(1);
      const jsonStr = `{ "${key1}": "${value1}", "${key2}": "${value2}" }`;
      let paramsObj = JSON.parse(jsonStr);
      // console.log({ 'keyword': this.searchStr, 'page': this.currentPage, ...paramsObj })

      LOCALsearchProductApi({
        keyword: this.searchStr,
        page: this.currentPage,
        ...paramsObj,
      }).then((res) => {
        if (res.result.pageData.counts === 0) {
          this.$toast("没有结果，请更换关键词");
          return;
        }
        this.searchResult = res.result.pageData.items;
      });
    },

    // 下拉菜单值改变
    dropDownChange(res) {
      console.log("res", res);
      this.onSearch(res);
    },
  },
};
</script>

<style lang="less" scoped>
.top-search-bar {
  padding: 15px;
  background: white;
  > div > div {
    font-size: 15px;
  }

  & > div:first-child {
    // outline: solid;
    padding-left: 10px;
    margin-right: 10px;
  }
}

.product-div {
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  padding: 10px;

  .product-div-img {
    border-radius: 15px;
    overflow: hidden;
  }

  .product-div-text {
    font-size: 14px;
    margin-right: auto;
    font-weight: bold;
    flex: 2;

    .product-div-text-name {
      height: 38px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .product-div-text-price {
      font-size: 18px;
      color: red;
      margin: 1px 0;

      &::before {
        content: "¥";
        font-size: 12px;
        margin: 0 1px;
      }
    }

    .product-div-text-desc {
      font-size: 12px;
      height: 8px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-weight: normal;
      color: grey;

      &::before {
        content: "“";
      }

      &::after {
        content: "”";
      }
    }
  }
}
</style>