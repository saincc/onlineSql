import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/index.js'

Vue.use(ElementUI);
Vue.config.productionTip = false
import instance_ from './api/index'
Vue.prototype.instance = instance_

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
