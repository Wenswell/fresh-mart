import Vue from 'vue'
import App from './App.vue'

import "@/assets/styles/reset.css"
import "@/assets/styles/ico.css"
import "@/assets/styles/custome.less"

import "@/utils/import-vant"
import "@/utils/flexible"

import router from '@/router'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
