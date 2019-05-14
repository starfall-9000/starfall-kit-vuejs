import Vue from 'vue'
import axios from 'axios'
import CryptoJS from 'crypto-js'

function getSignQuery() {
  const timestamp = Math.floor(Date.now())
  let appkey = ''
  let appSecret = ''

  if (process.env.NODE_ENV === 'production') {
    appkey = 'yVMgqF'
    appSecret = 'nYCJZDh9t1n5lrgg95JkJAAtQ0KpqC'
  } else {
    appkey = 'fnAghF'
    appSecret = 'ZwBlEf1HBCJ6iMtY26kSKIZTkPlw'
  }

  const sha1 = CryptoJS.SHA1(appSecret + '.' + timestamp)
  const sign = CryptoJS.enc.Hex.stringify(sha1)

  return {
    timestamp,
    appkey,
    sign
  }
}

export async function request(configs: any) {
  const newQueries = configs && configs.params ? configs.params : {}
  const signQueries = getSignQuery()
  const query = {
    params: {
      ...newQueries,
      ...signQueries
    }
  }

  return await axios({
    headers: {
      agent: JSON.stringify({
        nation: 'Vietnam',
        version: '1.6.0.0'
      }),
      'accept-language': 'vi'
    },
    ...configs,
    ...query
  })
}

export async function login(body: any) {
  const response = await request({
    method: 'post',
    url: 'account/signin',
    data: body
  })
  return response
}
export async function otpcode(body: any) {
  const response = await request({
    method: 'post',
    url: 'account/otpcode',
    data: body
  })
  return response
}

export async function signupCode(body: any) {
  const response = await request({
    method: 'post',
    url: 'common/otp/validation',
    data: body
  })
  return response
}

export async function username(body: any) {
  const response = await request({
    method: 'post',
    url: 'account/signup',
    data: body
  })
  return response
}

export async function createUser(body: any) {
  const response = await request({
    method: 'post',
    url: '/account/signup',
    data: body
  })

  return response
}

export async function legal(body: any) {
  const response = await request({
    method: 'post',
    url: '/account/signup/agreement',
    data: body
  })
  return response
}
