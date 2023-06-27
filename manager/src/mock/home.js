import Mock from "mockjs";

let list = []

export default {

  getStatisticaData: () => {
    for (let i = 0; i < 7; i++) {
      list.push(
        Mock.mock({
          香蕉: Mock.Random.float(100, 8000, 0, 0),
          橙子: Mock.Random.float(100, 8000, 0, 0),
          草莓: Mock.Random.float(100, 8000, 0, 0),
          葡萄: Mock.Random.float(100, 8000, 0, 0),
          西瓜: Mock.Random.float(100, 8000, 0, 0),
          菠萝: Mock.Random.float(100, 8000, 0, 0),
          柠檬: Mock.Random.float(100, 8000, 0, 0),
          梨子: Mock.Random.float(100, 8000, 0, 0),
          桃子: Mock.Random.float(100, 8000, 0, 0),
          樱桃: Mock.Random.float(100, 8000, 0, 0),
        })
      )
    }
    return {
      code: 200,
      data: {
        videoData: [
          { name: '华为', value: 3999 },
          { name: '苹果', value: 4999 },
          { name: '三星', value: 3599 },
          { name: 'OPPO', value: 2999 },
          { name: 'vivo', value: 2599 },
          { name: '魅族', value: 1999 },
          { name: '一加', value: 4399 }
        ],
        userData: [
          { date: '周一', new: Mock.Random.float(0, 1000, 0, 0), active: Mock.Random.float(10, 200, 0, 0) },
          { date: '周二', new: Mock.Random.float(0, 1000, 0, 0), active: Mock.Random.float(10, 200, 0, 0) },
          { date: '周三', new: Mock.Random.float(0, 1000, 0, 0), active: Mock.Random.float(10, 200, 0, 0) },
          { date: '周四', new: Mock.Random.float(0, 1000, 0, 0), active: Mock.Random.float(10, 200, 0, 0) },
          { date: '周五', new: Mock.Random.float(0, 1000, 0, 0), active: Mock.Random.float(10, 200, 0, 0) },
          { date: '周六', new: Mock.Random.float(0, 1000, 0, 0), active: Mock.Random.float(10, 200, 0, 0) },
          { date: '周日', new: Mock.Random.float(0, 1000, 0, 0), active: Mock.Random.float(10, 200, 0, 0) },
        ],
        orderData: {
          date: ['202201', '202202', '202203', '202204', '202205', '202206', '202207'],
          data: list
        },
        tableLabel: {
          name: "类目",
          todayBuy: "今日购买",
          monthBuy: "本月购买",
          totalBuy: "总购买",
        },
        tableData: [
          { name: "香蕉", todayBuy: 50, monthBuy: 200, totalBuy: 1000 },
          { name: "橙子", todayBuy: 80, monthBuy: 250, totalBuy: 700 },
          { name: "草莓", todayBuy: 120, monthBuy: 400, totalBuy: 1200 },
          { name: "葡萄", todayBuy: 90, monthBuy: 300, totalBuy: 900 },
          { name: "西瓜", todayBuy: 150, monthBuy: 500, totalBuy: 1500 },
          { name: "菠萝", todayBuy: 70, monthBuy: 150, totalBuy: 600 },
          { name: "柠檬", todayBuy: 40, monthBuy: 100, totalBuy: 400 },
          { name: "梨子", todayBuy: 60, monthBuy: 180, totalBuy: 550 },
          { name: "桃子", todayBuy: 100, monthBuy: 350, totalBuy: 1100 },
          { name: "樱桃", todayBuy: 200, monthBuy: 600, totalBuy: 1800 }
        ],
        countData: [
          {
            name: "今日支付订单",
            value: 1445,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            name: "今日收藏订单",
            value: 445,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            name: "今日未支付订单",
            value: 45,
            icon: "s-goods",
            color: "#5ab1ef",
          },
          {
            name: "本月支付订单",
            value: 12445,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            name: "本月收藏订单",
            value: 2445,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            name: "本月未支付订单",
            value: 245,
            icon: "s-goods",
            color: "#5ab1ef",
          },
        ],
      }
    }
  }

}