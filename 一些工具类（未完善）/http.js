/**
 * 封装请求
 */
import 'es6-promise/auto'
import axios from 'axios'
import diversion from './diversion'
import handleError from './error'
// import { API_SERVER } from '@/consts/config'

function defaults () {
  return {
    // baseURL: ``
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Token': window.localStorage.getItem('access_token')
    }
  }
}

function fetch () {
  let customOptions = [].pop.apply(arguments)
  let options = defaults()

  if (customOptions && customOptions.headers) {
    options.headers = customOptions.headers
  }

  let method = [].shift.apply(arguments)

  let res = diversion(() => {
    return axios[method](...arguments, options)
  })

  return new Promise((resolve, reject) => {
    res.then(resolve).catch((err) => {
      handleError(err)
      // reject(err)
      reject(err.response.data)
    })
  })
}

export const get = (url, options) => {
  return fetch('get', url, options)
}

export const post = (url, data, options) => {
  return fetch('post', url, data, options)
}

export const put = (url, data, options) => {
  return fetch('put', url, data, options)
}

export const del = (url, options) => {
  return fetch('delete', url, options)
}
