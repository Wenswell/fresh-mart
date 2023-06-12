<template>
  <van-sku class="sku-div" v-model="skuShow" :sku="sku" :goods="goods" :goods-id="sku.collection_id" :quota="0"
    :quota-used="0" :hide-stock="sku.hide_stock">
    <!-- @sku-prop-selected="changeSelectedSku" @sku-selected="changeSelectedSku"
    @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked" -->
    <template #sku-body-top>
      <ShowAddressCard :showAddressList="showAddressList" :chosenAddressId="chosenAddressId"></ShowAddressCard>
    </template>
  </van-sku>
</template>

<script>
import ShowAddressCard from '../../../ShowAddressCard.vue'
export default {
  name: 'MainSku',
  components:{
    ShowAddressCard,
  },
  props: {
    selectSku: Object,
  },
  data() {
    return {
      skuShow: false,
      
      showAddressList: [],  // 收货信息地址，只用于展示
      chosenAddressId: 0,  // 接收选择的地址id
      // sku: 【主要】 result过滤后的 商品sku及数量 
      sku: {"tree": [ { "k": "颜色", "k_s": "颜色", "v": [ { "id": "2条装（麻米+碳灰）", "name": "2条装（麻米+碳灰）", "imgUrl": "https://yanxuan-item.nosdn.127.net/4926d8593043e0a6f715af0acdaba73e.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/4926d8593043e0a6f715af0acdaba73e.png" }, { "id": "雾蓝", "name": "雾蓝", "imgUrl": "https://yanxuan-item.nosdn.127.net/110e5ba9741b88972091306d7bdc952d.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/110e5ba9741b88972091306d7bdc952d.png" }, { "id": "浅灰", "name": "浅灰", "imgUrl": "https://yanxuan-item.nosdn.127.net/3d51163133a5ad104a5c79fe48fb3da7.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/3d51163133a5ad104a5c79fe48fb3da7.png" }, { "id": "樱花粉", "name": "樱花粉", "imgUrl": "https://yanxuan-item.nosdn.127.net/a4091e952b8827fc9c3f28f98621c7ce.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/a4091e952b8827fc9c3f28f98621c7ce.png" }, { "id": "薄荷绿", "name": "薄荷绿", "imgUrl": "https://yanxuan-item.nosdn.127.net/3f76ce1ef67eb64189e0474c5b88121f.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/3f76ce1ef67eb64189e0474c5b88121f.png" }, { "id": "2条装（雾蓝+浅灰）", "name": "2条装（雾蓝+浅灰）", "imgUrl": "https://yanxuan-item.nosdn.127.net/31f251c9c4da2b357dcae8079d8e3ca5.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/31f251c9c4da2b357dcae8079d8e3ca5.png" }, { "id": "2条装（樱花粉+薄荷绿）", "name": "2条装（樱花粉+薄荷绿）", "imgUrl": "https://yanxuan-item.nosdn.127.net/bd628251d3cac2ad66f7b539d4e0e842.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/bd628251d3cac2ad66f7b539d4e0e842.png" }, { "id": "麻米", "name": "麻米", "imgUrl": "https://yanxuan-item.nosdn.127.net/b87f8c16628587edc36364e228535910.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/b87f8c16628587edc36364e228535910.png" }, { "id": "棕色", "name": "棕色", "imgUrl": "https://yanxuan-item.nosdn.127.net/f5053b4d9a5cc017c071c8bd0112ce01.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/f5053b4d9a5cc017c071c8bd0112ce01.png" }, { "id": "超值4条装（薄荷绿+樱花粉+浅灰+棕色）", "name": "超值4条装（薄荷绿+樱花粉+浅灰+棕色）", "imgUrl": "https://yanxuan-item.nosdn.127.net/1bd1f7ef3262cea91a72c63fc1248589.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/1bd1f7ef3262cea91a72c63fc1248589.png" }, { "id": "2条装（麻米+薄荷绿）", "name": "2条装（麻米+薄荷绿）", "imgUrl": "https://yanxuan-item.nosdn.127.net/001db03178f4248b4afcf6369d5a6c3e.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/001db03178f4248b4afcf6369d5a6c3e.png" }, { "id": "2条装（棕色+浅灰）", "name": "2条装（棕色+浅灰）", "imgUrl": "https://yanxuan-item.nosdn.127.net/83f76adaf287496796002d44f638a2f9.png", "previewImgUrl": "https://yanxuan-item.nosdn.127.net/83f76adaf287496796002d44f638a2f9.png" } ] } ], "list": [ { "id": "300022070", "price": 5900, "stock_num": 7191, "颜色": "2条装（麻米+碳灰）" }, { "id": "300067067", "price": 3200, "stock_num": 2639, "颜色": "麻米" }, { "id": "300067068", "price": 3190, "stock_num": 4473, "颜色": "棕色" }, { "id": "300068108", "price": 3200, "stock_num": 1155, "颜色": "樱花粉" }, { "id": "300068109", "price": 3200, "stock_num": 7515, "颜色": "薄荷绿" }, { "id": "300068110", "price": 3200, "stock_num": 5912, "颜色": "雾蓝" }, { "id": "300068111", "price": 3200, "stock_num": 3897, "颜色": "浅灰" }, { "id": "300185826", "price": 5900, "stock_num": 6780, "颜色": "2条装（雾蓝+浅灰）" }, { "id": "300185827", "price": 5900, "stock_num": 4805, "颜色": "2条装（樱花粉+薄荷绿）" }, { "id": "300187527", "price": 5900, "stock_num": 9818, "颜色": "2条装（麻米+薄荷绿）" }, { "id": "300187528", "price": 5900, "stock_num": 5805, "颜色": "2条装（棕色+浅灰）" }, { "id": "300366941", "price": 10900, "stock_num": 4896, "颜色": "超值4条装（薄荷绿+樱花粉+浅灰+棕色）" } ], "collection_id": "1006051", "stock_num": 1103181, "price": "31.90", "none_sku": false, "messages": [], "hide_stock": false },
      goods: { // 默认商品 sku 缩略图
        "picture": "https://yanxuan-item.nosdn.127.net/2a16452169f9d2e8841ddef76fdd684a.png"
      },
    }
  },
}
</script>

<style lang="less" scoped></style>