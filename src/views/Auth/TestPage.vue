<template>
  <div>
    this is test page
    <!-- <van-cell-group>
      <van-cell class="address-div" center :is-link="true" icon="location-o" size="large">
        <template #title>
          <div v-for="item in getAddressList()" :key="item">{{ item }}</div>
        </template>
      </van-cell>

    </van-cell-group> -->

    <!-- {{ getAddressList() }} -->

    <!-- {{ res.result.userAddresses[0].receiver }},{{ res.result.userAddresses[0].contact }},{{
      res.result.userAddresses[0].fullLocation }}
    {{ res.result.userAddresses[0].address }}
    {{ res.result.userAddresses[0] }} -->

    <van-button @click="test1" type="large" class="submit-btn">{{ $route.name }}1</van-button>
    <van-button @click="test2" type="large" class="submit-btn">{{ $route.name }}22</van-button>
  </div>
</template>

<script>
// import store from '@/store'
import { mapMutations } from 'vuex'
import request from '@/utils/require'
// import { toPayViaAliPayApi } from "@/api/user";



export default {

  data() {
    return {
      res: {
        "code": "1",
        "msg": "操作成功",
        "result": {
          "id": "3998535",
          "name": "学步更自如，婴幼童机能学步鞋4-6码",
          "spuCode": "3998535",
          "desc": "宝宝的第一双鞋，成长不将就",
          "price": "109.00",
          "oldPrice": "109.00",
          "discount": 1,
          "inventory": 3133825,
          "brand": {
            "id": "spider99999999999",
            "name": "传智自有品牌",
            "nameEn": "chuanzhi",
            "logo": "https://yanxuan-item.nosdn.127.net/f6ddd429632de6170900dc2fbc541fd8.png?type=webp&imageView&thumbnail=78x78&quality=95",
            "picture": "https://yanxuan-item.nosdn.127.net/f6ddd429632de6170900dc2fbc541fd8.png?type=webp&imageView&thumbnail=78x78&quality=95",
            "type": null,
            "desc": null,
            "place": null
          },
          "salesCount": 769,
          "commentCount": 0,
          "collectCount": 0,
          "mainVideos": [],
          "videoScale": 1,
          "mainPictures": [],
          "specs": [],
          "skus": [],
          "categories": [],
          "details": {},
          "isPreSale": false,
          "isCollect": false,
          "recommends": null,
          "userAddresses": [
            {
              "id": "1662992398390661122",
              "receiver": "fdsg",
              "contact": "13445234556",
              "provinceCode": "110000",
              "cityCode": "110100",
              "countyCode": "110101",
              "address": "通风管道回到法国",
              "isDefault": 0,
              "fullLocation": "北京市 北京市 东城区",
              "postalCode": null,
              "addressTags": null
            },
            {
              "id": "1662992386013270018",
              "receiver": "fdsg",
              "contact": "13445234556",
              "provinceCode": "110000",
              "cityCode": "110100",
              "countyCode": "110101",
              "address": "通风管道回到法国",
              "isDefault": 0,
              "fullLocation": "北京市 北京市 东城区",
              "postalCode": null,
              "addressTags": null
            },
            {
              "id": "1661901764321873922",
              "receiver": "zh",
              "contact": "13444000000",
              "provinceCode": "130000",
              "cityCode": "130100",
              "countyCode": "130105",
              "address": "lalalalalal",
              "isDefault": 1,
              "fullLocation": "河北省 石家庄市 新华区",
              "postalCode": null,
              "addressTags": null
            }
          ],
          "similarProducts": [],
          "hotByDay": [],
          "evaluationInfo": null
        }
      }
    }
  },

  methods: {
    ...mapMutations('user', ['setUser']),

    getAddressList() {
      const { receiver, contact, fullLocation, address } = this.res.result.userAddresses.find(address => address.isDefault !== 0) ?? this.res.result.userAddresses[0];
      return [`${receiver}, ${contact}, ${fullLocation}`, address];
    },

    test1() {
      console.group('---test1---')

      request(
        '/member/browseHistory',
        'GET',
        {
          page: 1,
          pagSize: 10,
        }
      )
      // 更新收藏
      // this.$store.dispatch('user/updateCollectApi',1)

      // this.$store.dispatch('user/addToCollect',["1124015","1124015","1124015","1135080","1135080","1135080","1471002","1471002","1471002","1494003","1494003","1494003","1505052","1505052","1505052","1652031","1652031","1652031","1666023","1666023","1666023","3394027","3394027","3394027","3486000","3486000","3486000","3993694","3993694","3993694",])

      // console.groupEnd()
    },
    test2() {
      console.group('---test22---')
      // 更新收藏
      // this.$store.dispatch('user/updateCollectApi',1)

      this.$store.dispatch('cart/updateCollect')

      console.groupEnd()

    }
  },

}
</script>

<style lang="less" scoped>
.address-div {
  outline: solid;

  //左侧图标大小
  >i {
    margin: 8px;
    font-size: 22px;
  }
}
</style>