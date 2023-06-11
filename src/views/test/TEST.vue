<template>
  <div class="test-page">
    this is test page
    <p>$route.fullPath: {{$route.fullPath}}</p>
    <p>$route.name: {{$route.name}}</p>
    <p>$route.params.type: {{$route.params.type}}</p>
    <button class="test-btn" type="submit" @click="test1">test1</button>
    <button class="test-btn" type="submit" @click="test2">test2</button>
    <button class="test-btn" type="submit" @click="$destroy()">this.$destroy()</button>
  </div>
</template>

<script>
// import store from '@/store'
import { mapMutations } from 'vuex'
import request from '@/utils/require'
// import { toPayViaAliPayApi } from "@/api/user";

export default {
  name: 'TestPage',

// beforeCreate()  {console.log('%c 1.beforeCreate	  vue实例初始化之前调用', 'color:DarkCyan;font-weight: bold;')},
// created()       {console.log('%c 2.created	      vue实例初始化之后调用', 'color:DarkBlue;font-weight: bold;')},
// beforeMount()   {console.log('%c 3.beforeMount	  挂载到DOM树之前调用',   'color:DarkCyan;font-weight: bold;')},
// mounted()       {console.log('%c 4.mounted	      挂载到DOM树之后调用',   'color:DarkBlue;font-weight: bold;')},
// beforeUpdate()  {console.log('%c 5.beforeUpdate   数据更新之前调用',      'color:DarkCyan;font-weight: bold;')},
// updated()       {console.log('%c 6.updated        数据更新之后调用',      'color:DarkBlue;font-weight: bold;')},
// beforeDestroy() {console.log('%c 7.beforeDestroy  vue实例销毁之前调用',   'color:DarkCyan;font-weight: bold;')},
// destroyed()     {console.log('%c 8.destroyed      vue实例销毁之后调用',   'color:DarkBlue;font-weight: bold;')},
beforeCreate()  {console.log('%c 1.beforeCreate	  vue实例初始化之前调用', 'color:DarkCyan;font-weight: bold;')},
created()       {console.log('%c 2.created	      vue实例初始化之后调用', 'color:DarkBlue;font-weight: bold;')},
beforeMount()   {console.log('%c 3.beforeMount	  挂载到DOM树之前调用',   'color:DarkCyan;font-weight: bold;')},
mounted()       {console.log('%c 4.mounted	      挂载到DOM树之后调用',   'color:DarkBlue;font-weight: bold;')},
beforeUpdate()  {console.log('%c 5.beforeUpdate   数据更新之前调用',      'color:DarkCyan;font-weight: bold;')},
updated()       {console.log('%c 6.updated        数据更新之后调用',      'color:DarkBlue;font-weight: bold;')},
beforeDestroy() {console.log('%c 7.beforeDestroy  vue实例销毁之前调用',   'color:DarkCyan;font-weight: bold;')},
destroyed()     {console.log('%c 8.destroyed      vue实例销毁之后调用',   'color:DarkBlue;font-weight: bold;')},

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
      ).then(res =>{
        console.log(res,res)
      })
      
      // 更新收藏
      // this.$store.dispatch('user/updateCollectApi',1)

      console.groupEnd()
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
.test-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10vh auto;
  gap: 5vh;
}
.test-btn{
  font-size: 26px;
  padding: 10px;
}

</style>