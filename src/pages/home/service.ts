import Vue from 'vue'
import axios from 'axios'
import * as API from './api'
import ApiList from './api/ApiList'

axios.defaults.timeout = 50000

declare module 'vue/types/vue' {
  interface Vue {
    $API: ApiList
  }
}

Object.defineProperty(Vue.prototype, `$API`, {
  get() {
    return API
  }
})

Object.defineProperty(Vue.prototype, `$BaseUrl`, {
  get() {
    return 'https://api.dev.vn'
  }
})

if (process.env.VUE_APP_API_URI === 'dev') {
  axios.defaults.baseURL = 'https://api.dev.vn/'
} else if (process.env.VUE_APP_API_URI === 'stage') {
  axios.defaults.baseURL = 'https://api.staging-service.vn'
} else if (process.env.VUE_APP_API_URI === 'prod') {
  axios.defaults.baseURL = 'https://api.prod.vn/'
} else {
  axios.defaults.baseURL = 'https://api.dev.vn/'
}
