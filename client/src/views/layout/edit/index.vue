<template>
  <div>
    <van-nav-bar
      title="修改信息"
      left-text="返回"
      left-arrow
      @click-left="$router.push('/layout/my')"
    />

    <van-field name="uploader" label="文件上传">
      <template #input>
        <van-uploader v-model="uploader" :max-count="1"/>
      </template>
    </van-field>
    <van-form @submit="onSubmit">
      <van-field
        v-model="profile.account"
        name="account"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="profile.nickname"
        name="nickname"
        label="昵称"
        placeholder="昵称"
      />
      <van-field
        v-model="profile.profession"
        name="profession"
        label="职业"
        placeholder="职业"
      />
      <van-field name="gender" label="性别">
        <template #input>
          <van-radio-group v-model="profile.gender" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
            <van-radio name="未知">保密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="calendar"
        :value="profile.birthday"
        label="生日"
        :placeholder="profile.birthday"
        @click="showCalendar = true"
      />
      <van-calendar v-model="showCalendar" @confirm="onConfirm" />

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>

    </van-form>

</div>
</template>

<script>

export default {
  name:'EditProfile',
  data() {
    return {
      uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      showCalendar: false,

      profile:{
        avatar:"http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png",
        account:'',
        nickname:'',
        gender:'',
        birthday:'',
        profession:'',
      }
    };
  },
  methods: {
    onConfirm(date) {
      console.log("date", date)
      this.profile.birthday = `${date.getYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      this.showCalendar = false;
    },

    onSubmit(values) {
      console.log('submit', values);
      this.$store.dispatch('user/updateProfile', values).then(res =>{
        if(res==1){
          this.profile = {...this.$store.getters['user/getUserInfo'] }
          this.$toast('修改成功')
        }
      })
    },
  },
  created(){
    this.profile = {...this.$store.getters['user/getUserInfo'] }
  },
  watch:{
    profile:{
      deep: true,
    handler(newProfile) {
      console.log("newProfile", newProfile)
     }, 
    },
    uploader(newDate){
      console.log("uploader", newDate)
    },
  },
}
</script>

<style></style>