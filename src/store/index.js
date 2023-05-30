// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState  from "vuex-persistedstate"

Vue.use(Vuex);


import user from './modules/user'
import cart from './modules/cart' 


export default new Vuex.Store({
  modules: {
    user,
    cart,
  }, 
  plugins: [
    createPersistedState ({
      key: 'my-app-store',  
      paths: ['user.profile', 'cart'] 
    })
  ]
})