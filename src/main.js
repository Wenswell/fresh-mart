import Vue from 'vue'
import App from './App.vue'
import router from '@/router'


// 自定义CSS/less
import "@/assets/styles/ico.css"
import "@/assets/styles/custome.less"

// 专门导入vant
import "@/utils/import-vant"
import "@/utils/swiper"

// 导入swiper
// import { Swiper, SwiperSlide } from "@/utils/swiper"
// eslint-disable-next-line vue/multi-word-component-names
// Vue.component("Swiper", Swiper);
// Vue.component("SwiperSlide", SwiperSlide);

// 淘宝团队产品，未测试效果
import "@/utils/flexible"
import "@/assets/styles/reset.css"


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')