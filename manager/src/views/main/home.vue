<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="user-card">
          <div class="user-info">
            <img src="@/assets/image/avatar.png" alt="" />
            <div class="desc">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2023-06-27</span></p>
            <p>上次登录地点：<span>北京</span></p>
          </div>
        </el-card>
        <el-card class="table-card" style="margin-top: 20px; height: 460px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px">
        <div class="count">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{
              display: 'flex',
              padding: 0,
            }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="price">{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px; margin-block: 20px">
          <div ref="chart1" style="width: 100%; height: 280px"></div>
        </el-card>
        <div class="graph">
          <el-card>
            <div ref="chart2" style="width: 100%; height: 260px"></div>
          </el-card>
          <el-card>
            <div ref="chart3" style="width: 100%; height: 240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api";
import * as echarts from "echarts";
export default {
  name: "main--home",
  data() {
    return {
      tableLabel: {},
      tableData: [],
      countData: [],
    };
  },
  methods: {},
  mounted() {
    api.getData().then((res) => {
      console.log(res.code);
      console.log(res.data);
      console.log("tableLabel", res.data.tableLabel);
      console.log("tableData", res.data.tableData);
      console.log("videoData", res.data.videoData);
      console.log("userData", res.data.userData);
      console.log("orderData", res.data.orderData);
      console.log("orderData00", res.data.orderData.data[0]);
      this.tableLabel = res.data.tableLabel;
      this.tableData = res.data.tableData;
      this.countData = res.data.countData;

      const orderDataKeys = Object.keys(res.data.orderData.data[0]);
      const orderDataSeries = [];
      orderDataKeys.forEach((key) => {
        console.log("key", key);
        orderDataSeries.push({
          name: key,
          data: res.data.orderData.data.map((item) => item[key]),
          type: "line",
        });
      });

      const chart1Option = {};
      const chart1 = echarts.init(this.$refs.chart1);
      chart1Option.xAxis = { data: res.data.orderData.date };
      chart1Option.yAxis = {};
      chart1Option.tooltip = { trigger: "axis" };
      chart1Option.legend = { data: orderDataKeys };
      chart1Option.series = orderDataSeries;
      chart1.setOption(chart1Option);
      console.log("res.data.userData", res.data.userData);
      console.log("res.data.userData", res.data.userData);
      console.log("res.data.userData", res.data.userData);
      console.log("res.data.userData", res.data.userData);

      const chart2 = echarts.init(this.$refs.chart2);
      chart2.setOption({
        legend: {
          textStyle: { color: "#333" },
        },
        grid: { left: "20%" },
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: res.data.userData.map((item) => item.date),
          axisLine: {
            lineStyle: { color: "#17b3a3" },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: { color: "#17b3a3" },
            },
          },
        ],
        color: ["#2ec7c9", "#b5a2de"],
        series: [
          {
            name: "新增用户",
            data: res.data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: res.data.userData.map((item) => item.active),
            type: "bar",
          },
        ],
      });

      const chart3 = echarts.init(this.$refs.chart3);
      chart3.setOption({
        tooltip: { trigger: "item" },
        series: [
          {
            type: "pie",
            data: res.data.videoData,
          },
        ],
      });
    });
  },
};
</script>

<style lang="less" scoped>
// 左上卡片
.user-info {
  display: flex;
  align-items: center;
  gap: 40px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .name {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .access {
    color: #999;
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

// 右上卡片
.count {
  display: flex;
  gap: 20px 0;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-card {
    width: 32%;
  }
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: white;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin-left: 15px;
    .price {
      font-size: 30px;
      line-height: 30px;
      &::before {
        content: "¥ ";
      }
    }
    .desc {
      font-size: 14px;
      color: #999;
    }
  }
}
// 右下卡片
.graph {
  display: flex;
  justify-content: space-between;
  > * {
    height: 260px;
    width: 48%;
  }
}
</style>