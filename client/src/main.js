import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/index'

// 自定义CSS/less
import "@/assets/styles/ico.css"
import "@/assets/styles/custome.less"

// 专门导入vant
import "@/utils/import-vant"
import "@/utils/swiper"

// 导入自定义组件
import RoundBox from '@/components/round-box';
Vue.component('RoundBox', RoundBox);
// 导入swiper
// import { Swiper, SwiperSlide } from "@/utils/swiper"
// eslint-disable-next-line vue/multi-word-component-names
// Vue.component("Swiper", Swiper);
// Vue.component("SwiperSlide", SwiperSlide);

// 淘宝团队产品，未测试效果
import "@/utils/flexible"
import "@/assets/styles/reset.css"

// 事件总线

Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})