<template>
  <div>
    this is test page
    <van-cell-group>
      <van-cell class="address-div" center :is-link="true" icon="location-o" size="large">
        <template #title>
          <div v-for="item in getAddressList()" :key="item">{{ item }}</div>
        </template>
      </van-cell>

    </van-cell-group>

    {{ getAddressList() }}

    <!-- {{ res.result.userAddresses[0].receiver }},{{ res.result.userAddresses[0].contact }},{{
      res.result.userAddresses[0].fullLocation }}
    {{ res.result.userAddresses[0].address }}
    {{ res.result.userAddresses[0] }} -->

    <van-button @click="test1" type="large" class="submit-btn">{{ $route.name }}</van-button>
  </div>
</template>

<script>
// import store from '@/store'
import { mapMutations } from 'vuex'
// import request from '@/utils/require'
import { toPayViaAliPayApi } from "@/api/user";



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
    // getAddressList() {
    //   const defaultAdr = this.res.result.userAddresses.find(address => address.isDefault !== 0)
    //     ?? this.res.result.userAddresses[0];

    //   let addressList = []

    //   addressList.push(defaultAdr.receiver + ', ' + defaultAdr.contact + ', ' + defaultAdr.fullLocation)
    //   addressList.push(defaultAdr.address)

    //   return addressList
    // },

    test1() {
      console.log('---test0---')

      const res = toPayViaAliPayApi('1666040402085416961')
      console.log("toPayViaAliPayApi [][][]res", res)

      // return request(`/member/address/1665310987344941057`, 'DELETE', {id:1665310987344941057} )
      // return request(`/member/profile`, 'put', { 
      //   nickname:'技通武林玉面君子',
      //   gender:'男',
      //   birthday:'1357-02-04',
      //   provinceCode:'320000',
      //   cityCode:'320500',
      //   countyCode:'320508',
      //   profession:'南・慕・容',
      // })
      




      // 注册账号⬇️
      // request('/register', 'post', { 
      //   'account':'慕容复',
      //   'mobile': '13951611560',
      //   'code': '123456',
      //   'password': '123456',
      //   'type': 'app',
      //  })
      // 注册账号⬆️
        

      // let res = this.$store.commit('cart/selectedList')
      // console.log("------------res", res)
      //       let res2 = mergeLocalCartApi([
      //   {
      //     "id": "1369155859933827074",
      //     "skuId": "1369155866451775490",
      //     "name": "钻石陶瓷涂层多用锅18cm 小奶锅",
      //     "attrsText": "颜色:蓝色 产地:中国 尺寸:30cm ",
      //     "specs": [],
      //     "picture": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-05/6fdcac19-dd44-442c-9212-f7ec3cf3ed18.jpg",
      //     "price": "128.00",
      //     "nowPrice": "128.00",
      //     "nowOriginalPrice": "128.00",
      //     "selected": false,
      //     "stock": 99957,
      //     "count": 9,
      //     "isEffective": true,
      //     "discount": null,
      //     "isCollect": false,
      //     "postFee": 0
      //   }
      // ])
      // console.log(res2)
      // this.setUser({id: '11111111111111111123',avatar: 'http://example.com/avatar.jpg',nickname: 'John Doe',account: 'johndoe',mobile: '123456789',token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJuYW1lXCI6XCLnlKjmiLc4ODhcIixcImlkXCI6XCIxNjYxMjU4MjYzMzAxMTk3ODI2XCIsXCJ1c2VybmFtZVwiOlwi55So5oi3MTM4ODg4ODg4ODhcIn0iLCJpYXQiOjE2ODU0MTg2NDksImV4cCI6MTY4NTY3Nzg0OX0.12-1exNF3bXtPDC8H9uJuYCtcA43-j6hCNUREcqQHbA"})
      // console.log(this.$store.commit)
      // console.log('---test1---')
      // store.commit('user/setUser', {})
      // console.log(store.commit('user/setUser', {}))
      // console.log('---test2---')
      // this.$store.commit('user/setUser', {})
      // console.log(this.$store.commit('user/setUser', {}))
      // console.log('---test3---')
      // console.log(store.state)
      // console.log('---test4---')
      // console.log(this.setUser)
      // console.log('---test5---')
      // console.log(mapMutations)
      // let res1 = await mergeLocalCartApi([])
      // console.log(res1)
      // let res2 = await getCartListApi()
      // console.log(res2)

      // store.commit('user/setUser', {})
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