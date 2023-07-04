<template>
  <div class="mall">
    <el-table
      :data="productList.items"
      :default-sort="{ prop: 'name', order: 'descending' }"
      @sort-change="handleSort"
      stripe
      height="95%"
      style="width: 100%"
    >
      <el-table-column fixed sortable prop="shop" label="店铺名称" width="100">
      </el-table-column>
      <el-table-column
        v-show="false"
        sortable
        prop="id"
        label="商品ID"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="picture" label="商品图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.picture" alt="" srcset="" />
        </template>
      </el-table-column>
      <el-table-column prop="name" sortable label="商品名称" >
      </el-table-column>
      <el-table-column prop="description" label="商品描述" >
      </el-table-column>
      <el-table-column prop="oldPrice" sortable label="商品原价" width="100">
      </el-table-column>
      <el-table-column prop="nowPrice" sortable label="商品现价" width="100">
      </el-table-column>
      <el-table-column prop="discount" sortable label="商品折扣" width="100">
      </el-table-column>
      <el-table-column prop="orderNum" sortable label="订单顺序" width="100">
      </el-table-column>
      <el-table-column prop="publishTime" sortable label="发布顺序" width="100">
      </el-table-column>
      <el-table-column prop="evaluateNum" sortable label="评价排序" width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="edit"
        v-if="account === 'admin'"
        label="修改信息"
        width="100"
      >
        <template slot-scope="scope">
          <div class="edit">
            <el-button type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <!-- <el-button type="danger" @click="handleDelete(scope.row.id)"
              >删除</el-button
            > -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :page-count="productList.pages"
      @current-change="handlePage"
    >
    </el-pagination>

    <el-dialog
      title="暂未添加编辑功能"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form :inline="true" ref="form" :model="form">
        <el-form-item prop="shop" label="店铺名称">
          <el-input placeholder="请输入店铺名称" v-model="form.shop"></el-input>
        </el-form-item>
        <el-form-item prop="id" label="商品ID">
          <el-input
            disabled
            placeholder="请输入商品ID"
            v-model="form.id"
          ></el-input>
        </el-form-item>
        <el-form-item prop="description" label="商品描述">
          <el-input
            type="textarea"
            placeholder="请输入商品描述"
            v-model="form.description"
          ></el-input>
        </el-form-item>
        <el-form-item prop="picture" label="商品图片">
          <img style="width: 100px" :src="form.picture" alt="" srcset="" />
        </el-form-item>
        <el-form-item prop="name" label="商品名称">
          <el-input placeholder="请输入商品名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="discount" label="商品折扣">
          <el-input
            placeholder="请输入商品折扣"
            v-model="form.discount"
          ></el-input>
        </el-form-item>
        <el-form-item prop="oldPrice" label="商品原价">
          <el-input
            placeholder="请输入商品原价"
            v-model="form.oldPrice"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nowPrice" label="商品现价">
          <el-input
            placeholder="请输入商品现价"
            v-model="form.nowPrice"
          ></el-input>
        </el-form-item>
        <el-form-item prop="orderNum" label="商品订单数">
          <el-input
            disabled
            placeholder="请输入商品订单数"
            v-model="form.orderNum"
          ></el-input>
        </el-form-item>
        <el-form-item prop="publishTime" label="发布顺序">
          <el-input
            disabled
            placeholder="请输入发布顺序"
            v-model="form.publishTime"
          ></el-input>
        </el-form-item>
        <el-form-item prop="evaluateNum" label="评价排序">
          <el-input
            disabled
            placeholder="请输入评价排序"
            v-model="form.evaluateNum"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api";
import jsCookie from "js-cookie";
export default {
  name: "main--mall",
  data() {
    return {
      productList: [],
      sort: {},
      dialogVisible: false,
      form: {
        shop: "",
        id: "",
        name: "",
        description: "",
        discount: "",
        oldPrice: "",
        nowPrice: "",
        picture: "",
        orderNum: "",
        publishTime: "",
        evaluateNum: "",
      },
    };
  },
  computed: {
    account() {
      return jsCookie.get("account");
    },
  },
  methods: {
    loadProduct({
      page = 1,
      pageSize = 10,
      keyword = "",
      onlyDiscount = "",
      sortField = "",
      sortMethod = "",
    }) {
      const payload = {
        page,
        pageSize,
        keyword,
        onlyDiscount,
        sortField,
        sortMethod,
      };
      api
        .getProductList(payload)
        .then((res) => (this.productList = res.result.pageData));
    },
    handleSort({ prop, order }) {
      const sortField = prop || "name";
      const sortMethod = order === "descending" ? "DESC" : "ASC";
      const payload = {
        page: 1,
        pageSize: 10,
        sortField,
        sortMethod,
      };
      this.sort = { sortField, sortMethod };
      this.loadProduct(payload);
    },
    handlePage(page) {
      this.loadProduct({ page, ...this.sort });
    },
    handleEdit(data) {
      this.form.shop = data.shop;
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.description = data.description;
      this.form.discount = data.discount;
      this.form.oldPrice = data.oldPrice;
      this.form.nowPrice = data.nowPrice;
      this.form.picture = data.picture;
      this.form.orderNum = data.orderNum;
      this.form.publishTime = data.publishTime;
      this.form.evaluateNum = data.evaluateNum;
      this.dialogVisible = true;
    },
  },
  created() {
    this.loadProduct({});
  },
};
</script>

<style lang="less" scoped>
.mall {
  height: 100%;
}
</style>