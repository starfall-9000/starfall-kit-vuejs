import Vue from 'vue'
import '@/common/globalComponent.ts'
import './service'
import router from './routes'
import App from './App.vue'
import 'normalize.css'
import '@/styles/first.scss'
import '@/styles/base.scss'
import 'vant/lib/index.css'

import { NavBar } from 'vant'
Vue.use(NavBar)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
