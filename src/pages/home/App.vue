<template>
  <div class="app">
    <router-view/>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'vant/lib/index.css'

@Component
export default class extends Vue {
  private mounted() {
    console.log(`App mounted`)
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900,900i");
</style> 

<style lang="scss">
.van-dialog {
  .van-dialog__footer {
    .van-dialog__confirm {
      .van-button__text {
        color: #000;
      }
    }
  }
}

* {
  font-family: "Roboto", sans-serif;
}
</style>
