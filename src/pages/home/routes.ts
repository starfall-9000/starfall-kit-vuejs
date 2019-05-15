import Vue from 'vue'
import './userInfo'
import Router from 'vue-router'
import Home from './components/Home'
import Signup from './components/Signup'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = Vue.prototype.$user
  const userInfo = user.getInfo() || {}

  if (to.path === '/createuser') {
    // check if /createuser not go from /signup
    if (!userInfo.otpCode) {
      next('/signup')
      return
    }
  }

  if (to.path === '/signup') {
    // save inviteCode to $user if exist
    if (to.query.inviteCode) {
      user.setInfo('invitationCode', to.query.inviteCode)
    }
  }

  next()
})

export default router
