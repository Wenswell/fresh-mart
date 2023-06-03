<template>
  <div>
    <van-nav-bar
      class="top-bar"
      title="收货地址"
      left-arrow
      @click-left="onBackPage"
    />
    <button @click="closebtn">显示隐藏使用按钮</button>

    <div class="address-div" v-for="item in userAddresses" :key="item.id">
      <div class="address-div-content">
        <div class="address-div-text">
          <div>
            <span class="">{{ item.receiver }}, {{ item.contact }}</span>
            <span class="">{{ item.fullLocation }} {{ item.address }}</span>
          </div>
          <van-button v-if="showbtn" type="primary" plain size="mini">修改</van-button>
        </div>
        <div class="address-div-bottom">
          <van-radio v-model="userAddresses[0].isDefault">默认</van-radio>
          <van-button type="primary" plain size="mini">修改</van-button>
        </div>
      </div>
    </div>


  </div>
</template>
<!-- 
  孙思凡	1602146078	13146684998	江苏省	无锡市	滨湖区	汉庭酒店东绛新东国际广场店
  张雪梅	1561025729	18726514186	江苏省	苏州市	虎丘区	101乡道南200
  唐绍英	1541753064	18469177925	云南省	昆明市	五华区	龙泉路408号云南财经职业学院

钱仁新	1541748526	13951611560	江苏省	南京市	白下区	仁寿里30号302室
丁嘉辉	1601969747	13132235729	浙江省	杭州市	西湖区	三墩镇金地自在城鹭影轩18幢2004
张远强	1587881828	18780105402	四川省	成都市	龙泉驿区	龙泉街道龙泉街道驿都大道337号恩德恒鼎世纪2号楼10楼F-C -->

<script>
export default {
  data() {
    return {
      fromPath: '',
      showbtn: true,
      userAddresses: [
        { "id": "1662992398390661122", "receiver": "钱仁新", "contact": "13951611560", "provinceCode": "110000", "cityCode": "110100", "countyCode": "110101", "address": "仁寿里30号302室", "isDefault": 0, "fullLocation": "江苏省	南京市	白下区", "postalCode": null, "addressTags": null },
        { "id": "1662992386013270018", "receiver": "丁嘉辉", "contact": "13132235729", "provinceCode": "220000", "cityCode": "220100", "countyCode": "220101", "address": "三墩镇金地自在城鹭影轩18幢2004", "isDefault": 0, "fullLocation": "浙江省	杭州市	西湖区", "postalCode": null, "addressTags": null },
        { "id": "1661901764321873922", "receiver": "张远强", "contact": "18780105402", "provinceCode": "330000", "cityCode": "330100", "countyCode": "330101", "address": "龙泉街道龙泉街道驿都大道337号恩德恒鼎世纪2号楼10楼F", "isDefault": 0, "fullLocation": "四川省	成都市	龙泉驿区", "postalCode": null, "addressTags": null },
      ],
    }
  },
  methods: {
    onBackPage(){
      console.log('点击返回')
    // console.log("-------------this.$bus", this.$bus)
    // console.log("-------------this.$bus.$on", this.$bus.$on)
    // console.log("-------------this.$bus.$on('from-path')", this.$bus.$on('from-path'))
    //   console.log("-----this.fromPath", this.fromPath)
    //   // console.log("this.fromPath??'/layout/my'", this.fromPath??'/layout/my')
    //   // this.$router.push(this.fromPath??'/layout/my');
    //   this.$bus.$on('from-path', params => {
    //     console.log("+++++++++++params", params)
    //   this.fromPath = params;
    //   console.log("-------------this.fromPath", this.fromPath)
      // console.log("this.fromPath??'/layout/my'", this.fromPath??'/layout/my')
    })

    },
    
    closebtn() {
      console.log("this.showbtn", this.showbtn)
      this.showbtn = !this.showbtn
      console.log("this.showbtn", this.showbtn)
    }
  },
  created() {

    // 目前只有商品sku和我的 2个页面能到达此页

},

}
</script>

<style lang="less" scoped>
// 地址盒子
.address-div {
  font-size: 14px;
  box-shadow: 0px 0px 3px #333;
  margin: 10px 0;
  padding: 10px;

  // 盒子主要内容
  .address-div-content {

    button {
      color: #696969;
      border-color: #aaa;
      border-width: 0.5px;
      border-radius: 5px;
    }

    // 主要内容 文本
    .address-div-text {
      display: flex;
      align-items: center;
      margin: 10px 0 15px;

      &>div {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 5px;
        line-height: 20px;
      }

      >button {
        width: 50px;
        height: 30px;
      }
    }

    .address-div-bottom {
      display: flex;
      justify-content: space-between;

      >button {
        width: 45px;
        height: 25px;
      }
    }
  }
}
</style>