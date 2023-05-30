<template>
  <div>
    this is test page

    <van-button @click="test1" type="large" class="submit-btn">{{ $route.name}}</van-button>
  </div>
</template>

<script>
import store from '@/store'
import { mapMutations } from 'vuex'
// import { mergeLocalCartApi,getCartListApi } from "@/api/user";
export default {
  methods: {
    ...mapMutations('user', ['setUser']),
    test1() {
      console.log('---test0---')
      // this.setUser({id: '11111111111111111123',avatar: 'http://example.com/avatar.jpg',nickname: 'John Doe',account: 'johndoe',mobile: '123456789',token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJuYW1lXCI6XCLnlKjmiLc4ODhcIixcImlkXCI6XCIxNjYxMjU4MjYzMzAxMTk3ODI2XCIsXCJ1c2VybmFtZVwiOlwi55So5oi3MTM4ODg4ODg4ODhcIn0iLCJpYXQiOjE2ODU0MTg2NDksImV4cCI6MTY4NTY3Nzg0OX0.12-1exNF3bXtPDC8H9uJuYCtcA43-j6hCNUREcqQHbA"})
      // console.log(this.$store.commit)
      // console.log('---test1---')
      // store.commit('user/setUser', {})
      console.log(store.commit('user/setUser', {}))
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
  }

}
</script>

<style>

</style>