import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';
import { jsonp } from 'vue-jsonp';

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.prototype.$jsonp = jsonp

new Vue({
  render: h => h(App),

}).$mount('#app')
