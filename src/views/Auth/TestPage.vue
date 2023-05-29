<template>
  <div>
    this is test page

    <van-button @click="test1" type="large" class="submit-btn">{{ $route.name}}</van-button>
  </div>
</template>

<script>

import requireTest from '@/utils/require'
export default {
  methods: {
    test1() {
      console.log('---test1---')
      requireTest('/member/profile', 'get', {a:10})
    }
  }

}
</script>

<style>

</style>