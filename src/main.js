import Vue from 'vue'
import App from './App.vue'

import "@/assets/styles/ico.css"

import router from '@/router'

import { Image as VanImage } from 'vant';
import { Tab, Tabs } from 'vant';
import { Form,Field } from 'vant';
import { Icon } from 'vant';
import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Col, Row } from 'vant';
import { Grid, GridItem } from 'vant';


Vue.use(Cell);
Vue.use(CellGroup);

Vue.use(Button);
Vue.use(Icon);

Vue.use(VanImage);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Form);
Vue.use(Field);

Vue.use(Col);
Vue.use(Row);

Vue.use(Grid);
Vue.use(GridItem);




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
