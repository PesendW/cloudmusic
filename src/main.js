import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import ElementUI, {Loading} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
let loadingInstance = null

import moment from 'moment'

import axios from 'axios'
axios.defaults.baseURL = 'http://huangjiangjun.top:9000/'
// axios.defaults.baseURL = 'http://www.dongh5.com:9000/'
axios.interceptors.request.use(
    reqConfig => {
        loadingInstance = Loading.service({
            text: 'Now Loading......',
            spinner: 'el-icon-loading'
        })
        return reqConfig
    },
    err => {
        return Promise.reject(err)
    }
)
axios.interceptors.response.use(
    res => {
        loadingInstance.close()
        return res.data
    },
    err => {
        return Promise.reject(err)
    }
)
Vue.prototype.$axios = axios

import '@/assets/style/global.less'

Vue.config.productionTip = false

Vue.filter('formatCount', count => {
    if (count / 10000 > 10) {
        return parseInt(count / 10000) + '万'
    }
    else {
        return count
    }
})
Vue.filter('formatDate', (val, formatStr = 'YYYY-MM-DD') => {
    return moment(val).format(formatStr);
})
Vue.filter('formatDuration', duration => {
    // 转分
    let min = Math.ceil(duration / 1000 / 60)
    min = min < 10 ? '0' + min : min
    // 秒
    let sec = Math.ceil((duration / 1000) % 60)
    sec = sec < 10 ? '0' + sec : sec
    return min + ':' + sec
})

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
