import Vue from 'vue';
import App from './App';

import router from './router';

import ElementUI from 'element-ui';
import './assets/css/element-#089593/index.css';

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

import './assets/css/public.css'

Vue.use(ElementUI);
Vue.use(Mint);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})