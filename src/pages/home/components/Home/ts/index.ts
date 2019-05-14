import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Footer from '@home/components/Footer'

@Component({
  components: {
    Footer
  }
})
export default class extends Vue {
  private inviteCodePath: string = ''

  private mounted() {
    // get path of queries
    if (this.$route.fullPath.split('?inviteCode=')[1]) {
      this.inviteCodePath =
        '?inviteCode=' + this.$route.fullPath.split('?inviteCode=')[1]
    }
  }

  private signUp() {
    // push to sign up screen with queries
    this.$router.push('/signup' + this.inviteCodePath)
  }

  private moreHelp() {
    let url = ''
    if (process.env.NODE_ENV === 'development') {
      url = `http://localhost:8080/help-center#/`
    } else {
      url = 'https://test.prod.vn/help-center/#/'
    }
    window.location.href = url
  }
}
