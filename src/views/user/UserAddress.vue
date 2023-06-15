<template>
  <div class="address-page">

    <van-nav-bar class="top-bar" fixed title="收货地址" left-arrow @click-left="onBack" />
    <!-- <van-nav-bar class="top-bar" title="收货地址" left-arrow @click-left="$router.push(fromPath)" /> -->

    <van-dialog class="address-edit-div" v-model="show"
      :title="Object.keys(defalutAddress).length === 0 ? '新增收货地址' : '修改收货地址'" :showConfirmButton="false">
      <van-address-edit :is-saving="btnDisable" class="address-edit" :area-list="areaList" show-set-default
        :address-info="defalutAddress" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" />
      <div class="btn-address-close" @click="onCloseEdit"><van-icon name="cross" /></div>
    </van-dialog>

    <van-radio-group class="address-div-group" v-model="selectDefault">
      <!-- 判断是否进入选择模式：是否来自商品详情页面 -->
      <!-- <div class="address-div" :class="{ 'chosen': fromPath !== '/layout/my' && index == chosen }" -->
      <div class="address-div" :class="{ 'chosen': chosenMode && item.id == chosen }" v-for="item in userAddresses"
        :key="item.id">
        <div class="address-div-content">
          <div class="address-div-text" @click="chosenThis(item.id)">
            <div>
              <span class="">{{ item.receiver }}, {{ item.contact }}</span>
              <span class="">{{ item.fullLocation }} {{ item.address }}</span>
            </div>
            <!-- <template v-if="fromPath !== '/layout/my'"> -->
            <template v-if="chosenMode">
              <van-button v-show="item.id !== chosen" class="chosen-btn" type="primary" plain size="mini">使用</van-button>
              <div v-show="item.id == chosen" class="chosen-hook">✔</div>
            </template>
          </div>
          <div class="address-div-bottom">
            <van-radio class="chosen-defalut-radio" :name="item.id"></van-radio>
            <van-button @click="onEditAddress(item.id)" type="primary" plain size="mini">修改</van-button>
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
import { mapGetters } from 'vuex';

export default {
  name: 'UserAddress',
  props: {
    chosenMode: Boolean,
    chosenAddressId: String,
    // switchAddress: Function,
  },
  data() {
    return {

      areaList,
      show: false,
      defalutAddress: {},
      addressId: '',
      btnDisable: false,


      chosen: 0,  // 选中的地址id 选择模式使用
      userAddresses: [],  // 本地地址列表
    }
  },
  methods: {

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
    fromApiToVan(addressObj) {
      const {
        receiver: name,
        contact: tel,
        countyCode: areaCode,
        address: addressDetail,
        isDefault
      } = addressObj;
      const [province, city, county] = addressObj.fullLocation.split('\t');
      return { name, tel, country: '', province, city, county, areaCode, postalCode: '', addressDetail, isDefault: !!isDefault }
    },

    // 点击 添加新地址
    onAddAddress() {
      console.log('add new')
      this.defalutAddress = {}
      this.addressId = '',
        this.show = true
    },
    // 点击 编辑现有地址
    onEditAddress(id) {
      console.log('onEditAddress id: ', id)
      const addressObj = this.userAddresses.find(addr => addr.id === id)

      // 转为vant组件用格式
      this.defalutAddress = this.fromApiToVan(addressObj)

      // 因为API 【0 为是，1 为否】 故反转
      this.defalutAddress.isDefault = !this.defalutAddress.isDefault

      this.addressId = id
      this.show = true
    },
    // 点击 取消编辑/新增 直接返回
    onCloseEdit() {
      this.show = false
      this.btnDisable = false
    },

    // 点击 保存 现有/新地址
    onSave(content) {
      //先禁用按钮
      this.btnDisable = true
      // 保存修改 / 保存新增
      console.log('点击保存')
      console.log("要保存的地址内容", content)
      // 1. 转为API专用格式
      let addressObj = this.fromVanToApi(content)
      // 因为API 【0 为是，1 为否】 故反转
      addressObj.isDefault = 1 - addressObj.isDefault

      // 2.1 判断为修改现有地址
      if (this.addressId) {
        console.log(`修改id=${this.addressId}的地址`)
        console.log("this.$store.dispatch('user/editAddress'")
        // console.log(this.$store.dispatch('user/editAddress', [this.addressId, addressObj] ))
        this.$store.dispatch('user/editAddress', [this.addressId, addressObj]).then(() => {
          this.$toast('修改成功')
          // 关闭弹窗
          this.onCloseEdit()
        })
      } else {
        // 2.2 判断为添加新地址
        console.log('新增地址', addressObj)
        this.$store.dispatch('user/addNewAddress', addressObj).then(() => {
          this.$toast('添加成功')
          // 关闭弹窗
          this.onCloseEdit()
        })
      }
    },

    // 直接返回
    onBack(){
      this.$emit('change-address', this.chosen)
    },


    // [only]选择模式使用
    chosenThis(id) {
      this.chosen = id
      setTimeout(() => {
        this.$emit('change-address', id)
      }, 50)
      console.log("chosenThis id", id)
    },
  },

  // beforeCreate() { console.log('%c UserAddress - beforeCreate', 'color:#34f;') },
  // beforeMount() { console.log('%c UserAddress - beforeMount', 'color:#34f;') },
  // beforeUpdate() { console.log('%c UserAddress - beforeUpdate', 'color:#34f;') },
  // updated() { console.log('%c UserAddress - updated', 'color:#34f;') },
  // destroyed() { console.log('%c UserAddress - destroyed', 'color:#34f;') },

  created() {
    // console.log('%c UserAddress - created', 'color:#34f;')

    // 从props获取初始值存在本地data
    this.userAddresses = this.getAddressList;
    this.chosen = this.chosenAddressId

    // 非选择模式
    // 1. 禁用点击
    // 2. 返回路由
    if (!this.chosenMode) {
      this.chosenThis = () => {}
      this.onBack = () => this.$router.back()
    }
  },
  computed: {
    ...mapGetters('user', ['getAddressList', 'getDefaultAddress']),
    selectDefault: {
      get() {
        // this.$toast('默认地址更新成功')
        console.log("获取新默认地址")
        return this.getDefaultAddress
      },
      set(newId) {
        console.log("设置默认地址，id: ", newId)
        this.$store.dispatch('user/changeDefault', newId)
      }
    }


  },
  watch: {
    // 同步本地vuex中的地址列表
    getAddressList(newValue) {
      this.userAddresses = newValue
    },
  },

}
</script>

<style lang="less" scoped>
// 整个界面
.address-page {
  background: #F4F4F4;
  height: 100vh;
  z-index: 1000;
}

// 地址盒子群
.address-div-group {

  top: 0;
  margin-top: 5px;
  position: fixed;
  height: 100vh;
  overflow: scroll;
  background: aliceblue;
  // 防止 顶栏、添加地址按钮 遮挡
  padding-bottom: 60px;
  padding-top: 45px;
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
      .chosen-defalut-radio {
        &::after {
          content: '默认';
          font-size: 14px;
          margin: 0 5px 2px;
          color: #9C9C9C;
        }

        &[aria-checked="true"]::after {
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
  position: fixed;
  bottom: 10px;
  margin: 0 5%;
  width: 90%;
}
</style>