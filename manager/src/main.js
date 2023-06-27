import Vue from 'vue'
import App from './App.vue'
import router from '@/router'


import "@/utils/import-element-ui"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
