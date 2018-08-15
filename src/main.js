import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'	//手动变红
import 'element-ui/lib/theme-chalk/index.css'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(ElementUI)
Vue.use(Mint);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
