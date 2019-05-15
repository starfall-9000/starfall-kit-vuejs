import Vue from 'vue'

interface UserInfo {
  [key: string]: any
}

let userInfo = {} as UserInfo

export default class User {
  public getInfo(key?: any): UserInfo | any {}
  public setInfo(key: any, value: any) {}
  public updateInfo(obj: any) {}
}

declare module 'vue/types/vue' {
  interface Vue {
    $user: User
  }
}

Object.defineProperty(Vue.prototype, '$user', {
  get() {
    return {
      getInfo(key: any) {
        const userSession = sessionStorage.getItem('userInfo')
        if (!userSession || !JSON.parse(userSession)) return

        if (!key) {
          userInfo = JSON.parse(userSession)
          return userInfo
        } else {
          userInfo = JSON.parse(userSession)
          return userInfo[key]
        }
      },

      setInfo(key: any, value: any) {
        userInfo[key] = value
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        return userInfo
      },

      updateInfo(obj: any) {
        userInfo = Object.assign(userInfo, obj)
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        return userInfo
      }
    }
  }
})
