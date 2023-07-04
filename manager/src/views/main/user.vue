<template>
  <div class="user">
    <div class="user-header">
      <el-button
        style="height: 40px"
        @click="dialogVisible = true"
        size="small"
        type="primary"
        v-if="account === 'admin'"
      >
        <i class="el-icon-plus"></i>
        新增
      </el-button>

      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchKey" placeholder="输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-table">
      <el-table
        class="table"
        :data="tableData"
        height="90%"
        stripe
        style="width: 100%"
      >
        <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="100"> </el-table-column>
        <el-table-column prop="gender" label="性别" width="100">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              {{ scope.row.gender == 1 ? "男" : "女" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column
          prop="edit"
          v-if="account === 'admin'"
          label="修改信息"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="user-footer">
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :page-count="totalPage"
        @current-change="handlePage"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :rules="rules"
        :inline="true"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item v-show="false" prop="id" label="姓名">
          <el-input placeholder="请输入姓名" v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
          <el-input
            placeholder="请输入年龄"
            v-model.number="form.age"
          ></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-select placeholder="请输入年龄" v-model="form.gender">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="birth" label="出生日期">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-model="form.birth"
              value-format="yyyy-MM-DD"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input placeholder="请输入地址" v-model="form.address"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="onCencel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api";
import jsCookie from "js-cookie";

export default {
  name: "main--user",
  data() {
    return {
      dialogVisible: false,
      form: {
        id: undefined,
        name: "",
        age: "",
        gender: "",
        birth: "",
        address: "",
      },
      initialForm: {
        id: undefined,
        name: "",
        age: "",
        gender: "",
        birth: "",
        address: "",
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        age: [
          { required: true, message: "年龄不能为空" },
          { type: "number", message: "年龄必须为数字值" },
        ],
        gender: [{ required: true, message: "请选择性别" }],
        birth: [
          {
            required: true,
            message: "请选择时间",
            trigger: ["blur", "change"],
          },
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
      },
      tableData: null,
      totalPage: 0,
      searchKey: null,
    };
  },
  computed: {
    account() {
      return jsCookie.get("account");
    },
  },
  methods: {
    onCencel() {
      this.handleClose();
    },
    onSubmit() {
      //提交表单
      this.$refs.form.validate((isValid) => {
        if (!isValid) return;
        // this.form;
        // console.log("this.form", this.form);
        const { id, ...res } = this.form;
        // console.log("this.form", this.form);
        id;
        if (id) {
          api.updateUser(this.form).then((res) => {
            if (res.code === 200) {
              this.loadUser();
              this.$refs.form.resetFields();
              this.dialogVisible = false;
              console.log(res.data.message);
            }
          });
        } else {
          api.createUser({ res }).then((res) => {
            if (res.code === 200) {
              this.loadUser();
              this.dialogVisible = false;
              this.$refs.form.resetFields();
              console.log(res.data.message);
            }
          });
        }
      });
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        })
        .catch(() => {});
    },
    onSearch() {
      this.loadUser(null, this.searchKey);
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        //防止绑定非空值
        this.form.id = row.id;
        this.form.name = row.name;
        this.form.age = row.age;
        this.form.gender = 1;
        this.form.birth = row.birth;
        this.form.address = row.address;
      });
    },
    handleDelete(id) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.deleteUser({ id }).then((res) => {
            if (res.code === 200) this.loadUser();
          });
        })
        .catch(() => {});
    },
    loadUser(page, keyword) {
      const newPage = page ?? 1;
      api
        .getUser({
          name: keyword,
          page: newPage,
          pageCount: 20,
        })
        .then((res) => {
          // console.log("res", res);
          this.tableData = res.result.pageList;
          this.totalPage = res.result.totalLength
            ? res.result.totalLength / res.result.count
            : 0;
        });
    },
    handlePage(page) {
      this.loadUser(page);
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>

<style lang="less" scoped>
.user {
  height: 100%;
}
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-table {
  height: calc(100% - 62px);
}
.el-form-item{
  margin-block: 0;
}
.user-footer {
  position: relative;
  .pagination {
    position: absolute;
    right: 20px;
    bottom: 0;
  }
}
</style>