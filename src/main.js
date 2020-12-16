import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import axios from 'axios'
axios.defaults.baseURL = 'http://huangjiangjun.top:9000/'
// axios.defaults.baseURL = 'http://www.dongh5.com:9000/'
axios.interceptors.response.use(
  res => {
    return  res.data
  },
  err => {
    return Promise.reject(err)
  }
)
Vue.prototype.$axios = axios

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '@/assets/style/global.less'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
