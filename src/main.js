import Vue from 'vue'
import App from '@/App.vue'
Vue.config.productionTip = false
const Jquery = require('jquery');
Vue.prototype.$ = Jquery;
new Vue({
  render: h => h(App),
}).$mount('#app')

