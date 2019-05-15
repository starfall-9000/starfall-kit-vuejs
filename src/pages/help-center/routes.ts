import Vue from 'vue'
import Router from 'vue-router'
import HelpList from './components/HelpList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'index',
      component: HelpList
    },
    {
      path: '/help',
      name: 'help',
      component: HelpList
    }
  ]
})
