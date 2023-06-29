import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import "@/utils/import-element-ui"
import '@/assets/style/reset.css'

import '@/mock'

import store from '@/store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu',router)
  },
}).$mount('#app')
