import { Component, Prop, Vue } from 'vue-property-decorator'
import { Dialog, Toast, NavBar } from 'vant'
import Step from '@home/components/Step'
import Footer from '@home/components/Footer'
import * as utils from '@/utils'

Vue.use(NavBar)
Vue.use(Dialog)
Vue.use(Toast)

interface UserInterface {
  mobile?: string
  otpCode?: string
}

@Component({
  components: {
    Step,
    Footer
  }
})
export default class extends Vue {
  public userInfo: UserInterface = { mobile: '', otpCode: '' }
  private invitationCode: string = ''

  private code: string = '+84'
  private resendMessage: string = `Gửi OTP`

  private isLoading: boolean = false
  private sendDisabled: boolean = false
  private codeDisabled: boolean = false
  private cleanMobileShow: boolean = false
  private cleanOtpcodeShow: boolean = false
  private mobileElement: HTMLElement | null = null
  private mobileFocus: boolean = false
  private otpFocus: boolean = false

  private timer: number = 60
  private runErrorCount: NodeJS.Timeout = {
    ref: () => {},
    refresh: () => {},
    unref: () => {}
  }

  private get disabled() {
    return this.userInfo.mobile && this.userInfo.otpCode && !this.isLoading
      ? false
      : true
  }

  private get oneTimeShow() {
    return this.timer !== 60 ? true : false
  }

  private mounted() {
    const userInfo =
      this.$user && this.$user.getInfo() ? this.$user.getInfo() : {}
    this.codeDisabled = userInfo.invitationCode ? true : false
    this.invitationCode = userInfo.invitationCode ? userInfo.invitationCode : ''
    this.mobileElement = document.getElementById('mobile')
  }

  private goBack() {
    this.$router.back()
  }

  private goDownload() {
    const deepLink = 'https://test.onelink.me/L8x/deeplink'
    window.location.href = deepLink
  }

  // mobile field action
  private mobileChange() {
    if (this.userInfo.mobile) {
      this.cleanMobileShow = this.userInfo.mobile.length > 0 ? true : false

      const value = this.userInfo.mobile
      this.userInfo.mobile = value.replace(/\D/g, '')
    }
  }

  private focusMobile() {
    if (this.mobileElement) this.mobileElement.focus()
    this.mobileFocus = true
    if (this.userInfo.mobile) {
      this.cleanMobileShow = this.userInfo.mobile.length > 0 ? true : false
    }
  }

  private blurMobile() {
    this.mobileFocus = false
    this.cleanMobileShow = false
  }

  private cleanMobileFunc() {
    this.userInfo.mobile = ''
  }

  // otp field action
  private otpcodeChange() {
    if (this.userInfo.otpCode) {
      this.cleanOtpcodeShow = this.userInfo.otpCode.length > 0 ? true : false

      const value = this.userInfo.otpCode
      this.userInfo.otpCode = value.replace(/\D/g, '')
    }
  }

  private focusOtpcode() {
    this.otpFocus = true
    if (this.userInfo.otpCode) {
      this.cleanOtpcodeShow = this.userInfo.otpCode.length > 0 ? true : false
    }
  }

  private blurOtpcode() {
    this.otpFocus = false
    this.cleanOtpcodeShow = false
  }

  private cleanOtpcodeFunc() {
    this.userInfo.otpCode = ''
  }

  // call api send otp
  private resendFunc() {
    if (this.mobileElement) this.mobileElement.blur()
    if (this.userInfo.mobile === '') {
      Toast('Vui lòng điền số điện thoại di động.')
    } else {
      this.isLoading = true
      this.$API
        .otpcode({ mobile: this.userInfo.mobile, type: 0 })
        .then((resp: any) => {
          // request api success
          this.isLoading = false
          this.handleOTPResponse(resp)
        })
        .catch(err => {
          // request api failed
          this.isLoading = false
          console.log('Error when get otp: ' + err)
          Toast('Đã xảy ra lỗi mạng, vui lòng thử lại sau')
        })
    }
  }

  private handleOTPResponse(resp: any) {
    if (resp.data.errorCode === 111) {
      // phone number already register
      Dialog.confirm({
        message: 'Số điện thoại di động bạn đã nhập đã được đăng ký.',
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      })
        .then(() => console.log('confirm'))
        .catch(() => console.log('cancel'))
    } else if (resp.data.errorCode !== 0) {
      // other error
      const msg = resp.data.msg ? resp.data.msg : resp.data.message
      Toast(msg)
    } else {
      // success
      this.sendDisabled = true
      this.countResendOTPTime()
    }
  }

  private countResendOTPTime() {
    this.runErrorCount = setInterval(() => {
      if (this.timer > 0 && this.timer <= 60 && this.sendDisabled) {
        this.timer--
        this.resendMessage = `Gửi lại sau ${this.timer}s`
      } else {
        this.resendMessage = `Gửi lại<br>OTP`
        this.sendDisabled = false
        clearInterval(this.runErrorCount)
        this.timer = 60
      }
    }, 1000)
  }

  // call api valid otp
  private go() {
    if (!this.userInfo.otpCode || !/^\d{6}$/.test(this.userInfo.otpCode)) {
      Toast('Mã OTP phải có 6 chữ số.')
    } else {
      this.isLoading = true
      this.$API
        .signupCode(this.userInfo)
        .then((resp: any) => {
          // request api success
          this.isLoading = false
          this.handleSignupResponse(resp)
        })
        .catch(err => {
          // request api failed
          this.isLoading = false
          console.log('Error when get signup: ' + err)
          Toast('Đã xảy ra lỗi mạng, vui lòng thử lại sau')
        })
    }
  }

  private handleSignupResponse(resp: any) {
    if (resp.data.errorCode !== 0) {
      Toast(resp.data.msg)
    } else {
      this.$user.updateInfo(this.userInfo)
      this.$router.push('/createuser')
    }
  }
}
