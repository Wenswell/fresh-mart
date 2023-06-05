<template>
  <div class="address-page">
    <van-nav-bar class="top-bar" title="收货地址" left-arrow @click-left="$router.back()" />
    <!-- <van-nav-bar class="top-bar" title="收货地址" left-arrow @click-left="$router.push(fromPath)" /> -->
    <van-dialog class="address-edit-div" v-model="show" :title="Object.keys(defalutAddress).length === 0 ?'新增收货地址':'修改收货地址'" :showConfirmButton="false">
      <van-address-edit :is-saving="btnDisable" class="address-edit" :area-list="areaList" show-set-default :address-info="defalutAddress"
        :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" />
      <div class="btn-address-close" @click="onCloseEdit"><van-icon name="cross" /></div>
    </van-dialog>

    <van-radio-group v-model="selectDefault">
      <!-- 判断是否进入选择模式：是否来自商品详情页面 -->
      <div class="address-div" :class="{ 'chosen': fromPath !== '/layout/my' && index == chosen }"
        v-for="(item, index) in userAddresses" :key="item.id">
        <div class="address-div-content">
          <div class="address-div-text" @click="chosenThis(item.id)">
            <div>
              <span class="">{{ item.receiver }}, {{ item.contact }}</span>
              <span class="">{{ item.fullLocation }} {{ item.address }}</span>
            </div>
            <template v-if="fromPath !== '/layout/my'">
              <van-button v-show="index !== chosen" class="chosen-btn" type="primary" plain size="mini">使用</van-button>
              <div v-show="index == chosen" class="chosen-hook">✔</div>
            </template>
          </div>
          <div class="address-div-bottom">
            <van-radio class="chosen-defalut-radio" :name="index"></van-radio>
            <van-button @click="onEditAddress(index)" type="primary" plain size="mini">修改</van-button>
          </div>
        </div>
      </div>
    </van-radio-group>

    <van-button class="btn-add-address" @click="onAddAddress" type="primary" color="#5AD4EA" size="large"><van-icon
        size="14" name="add" /> 添加收货地址</van-button>


  </div>
</template>

<script>
// import { ref } from 'vue';
import { areaList } from '@vant/area-data';
import { addNewAddressApi, getAddressListApi, changeAddressApi } from '@/api/user'

export default {
  data() {
    return {

      areaList,
      show: false,
      defalutAddress: {},
      addressId: '',
      btnDisable: false,


      fromPath: '/layout/my',   // 目前只有商品sku和我的 2个页面能到达此页
      chosen: 0,  // 选择模式使用
      selectDefault: 0,
      userAddresses: [],
    }
  },
  methods: {

    updateNewAddressList(){
      getAddressListApi().then(res => {
      console.log('获取地址结果', res.result)
      this.userAddresses = res.result
      // 初始化默认地址选择
      this.selectDefault = this.userAddresses.findIndex(item => item.isDefault === 1)
    })
    },

    fromVanToApi(obj) {
      const {
        name: receiver,
        tel: contact,
        areaCode: countyCode,
        addressDetail: address,
        isDefault
      } = obj;
      const provinceCode = countyCode.substr(0, 2).padEnd(6, '0')
      const cityCode = countyCode.substr(0, 4).padEnd(6, '0')
      const fullLocation = [obj.province, obj.city, obj.county].join('\t')
      return { receiver, contact, address, fullLocation, postalCode: '', isDefault: Number(isDefault), provinceCode, cityCode, countyCode, addressTags: null }
    },
    fromApiToVan(index) {
      const waiting = this.userAddresses[index]
      const {
        receiver: name,
        contact: tel,
        countyCode: areaCode,
        address: addressDetail,
        isDefault
      } = waiting;
      const [province, city, county] = waiting.fullLocation.split('\t');
      return { name, tel, country: '', province, city, county, areaCode, postalCode: '', addressDetail, isDefault: !!isDefault }
    },

    onCloseEdit() {
      this.show = false
      this.btnDisable = false
    },
    onEditAddress(index) {
      console.log('index: ', index)
      this.defalutAddress = this.fromApiToVan(index)
      this.addressId = this.userAddresses[index].id
      console.log("this.defalutAddress", this.defalutAddress)
      this.show = true
    },
    onSave(content) {
      //先禁用按钮
      this.btnDisable = true
      // 保存修改 / 保存新增
      console.log('save')
      console.log("content", content)
      const addressObj = this.fromVanToApi(content)

      if (this.addressId) {
        console.log(`修改id=${this.addressId}的地址`)
        changeAddressApi(this.addressId, addressObj).then(res => {
          console.log('修改地址结果', res)
          console.log("res.code == 1", res.code == 1)
          if(res.code == 1){
            this.$toast('修改成功')
            // 修改本地结果
            this.updateNewAddressList()
            // 关闭弹窗
            this.onCloseEdit()
          }
        })
      } else {
        addNewAddressApi(addressObj).then(res => {
          console.log('新增地址结果', res)
          console.log("res.code == 1", res.code == 1)
          if(res.code == 1){
            this.$toast('添加成功')
            // 修改本地结果
            this.updateNewAddressList()
            // 关闭弹窗
            this.onCloseEdit()
          }
        })
      }
    },
    onAddAddress() {
      console.log('add new')
      this.defalutAddress = {}
      this.addressId = '',
        this.show = true
    },
    // 从商品详情页面来选择地址
    // 选择模式使用
    chosenThis(id) {
      this.chosen = id
      setTimeout(() => {
      // 防止 product->address->product->address
      this.$router.replace(this.fromPath)  
    }, 50)  
      console.log("chosenThis id", id)
    },
  },
  beforeDestroy() {
    this.$bus.$emit('chosen-address-id', this.chosen)
    this.$bus.$emit('open-sku', true)
    this.$bus.$off('from-path')
    this.$bus.$off('chosen-address-id')
  },
  created() {
    // 事件总线获取上个页面、
    // 目前只有商品sku和我的 2个页面能到达此页
    this.$bus.$on('from-path', (params) => {
      this.fromPath = params ?? '/layout/my';
      console.log("+params ?? '/layout/my'", params ?? '/layout/my')
    })
    this.$bus.$on('chosen-address-index', params => this.chosen = params)
    this.updateNewAddressList()
  },
  mounted() {
    // 从 我的 页面进入时不需要选择并返回地址
    if (this.fromPath === '/layout/my') this.chosenThis = () => { }
  },
  watch: {
    // 监视默认地址选择并更新默认地址
    selectDefault(newVal) {
      console.log("newVal", newVal)
      console.log("this.userAddresses[newVal].id", this.userAddresses[newVal].id)
      console.log("this.userAddresses[newVal]", this.userAddresses[newVal])
      changeAddressApi(this.userAddresses[newVal].id, this.userAddresses[newVal]).then(res => {
        console.log("更改默认地址结果 res", res)
        if(res.code == 1){
          // this.updateNewAddressList() // 直接更新会打乱顺序
          this.userAddresses.forEach((item, index) => {
            item.isDefault = index === newVal ? 1 : 0;
          })
            this.$toast('更新成功')
        }
      })

    }

  },

}
</script>

<style lang="less" scoped>
// 整个界面
.address-page {
  background: #F4F4F4;
  height: 100vh;
}

// 地址盒子
.address-div {
  background: white;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;

  &.chosen {
    background: #F7F7F7;
  }

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

      .chosen-btn {
        width: 50px;
        height: 30px;
      }

      .chosen-hook {
        flex: 0 0 20px;
        margin: 0 8px;
        font-weight: bold;
        color: #5AD4EA;
      }
    }

    .address-div-bottom {
      display: flex;
      justify-content: space-between;
      border-top: 0.5px solid #ddd;
      padding-top: 10px;

      >button {
        width: 45px;
        height: 25px;
      }
      // van-radio__icon van-radio__icon--round van-radio__icon--checked
      // van-radio__icon van-radio__icon--round
      .chosen-defalut-radio{
        &::after{
          content: '默认';
          font-size: 14px;
          margin: 0 5px 2px;
          color: #9C9C9C;
        }
        &[aria-checked="true"]::after{
          content: '已设默认';
          color: #5AD4EA;
        }
      }
    }
  }
}


// 修改地址弹窗
.address-edit-div {
  border-radius: 5px;
  width: 90vw;

  white-space: nowrap;
  overflow: visible;

  /deep/ button {
    border-radius: 5px;
    margin: 0 auto;
    width: 80vw;
    background-color: @blue;
    border: none;
  }

  .btn-address-close {
    position: absolute;
    right: -15px;
    top: -15px;
    background: #ddd;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /deep/ .address-edit>:first-child div {
    gap: 8px;
  }

  // /deep/ .address-edit > div > div:nth-child(4) > div > div > div:first-child {
  //   width: 10px;
  //   outline: solid;
  // }
}

//底部新增按钮
.btn-add-address {
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
  margin: 0 5%;
  width: 90%;
}
</style>