import Vue from 'vue';
import App from './App';
import { router } from './router';
import httpRequest from '@/plugin/axios'
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法

