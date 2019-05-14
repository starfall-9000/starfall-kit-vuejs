import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

export default class extends Vue {
  private year: number = new Date().getFullYear()
}
