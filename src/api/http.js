"use strict";

import axios from "axios";
import router from '@/router'
import qs from 'qs'
import ls from '@/utils/localStorage'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Accept'] = 'application/vnd.gin-blog.v1+json'
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + (tools.getStore(process.env.VUE_APP_JWT_KEY) || 'jwt-token to be insert')
axios.defaults.baseURL = process.env.VUE_APP_API + 'api/v1/'
console.log(process.env)
let config = {
  // baseURL: axios.defaults.domain+'doctor/',
  timeout: 7000, // Timeout 7s
  // withCredentials: true, // Check cross-site Access-Control
};
console.log(process.env.VUE_APP_JWT_KEY)
const _axios = axios.create(config);
_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // config.headers.Authorization = 'Bearer ' + (ls.getItem(process.env.VUE_APP_JWT_KEY) || 'jwt-token to be insert')
    config.headers.token = ls.getItem(process.env.VUE_APP_JWT_KEY) || 'jwt-token to be insert'
    config.data = qs.stringify(config.data)
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Do something with response error
    return handler(error)
  }
);

async function handler(error){
  let errorCodes = [400,401,403,404,405,406,414,415,422,426], pending = router.history.pending, redirect = '/'
  if(pending){
    redirect = pending.query.redirect || pending.fullPath // 跳转地址
  }
  // 未登录
  // if (401 === error.request.status && !error.request.responseURL.match(/^.*(login|register)$/gi)) {
  //   router.replace({
  //     path: '/login',
  //     query: {redirect}
  //   })
  // }
  // // 未实名认证
  // if (409 === error.request.status && !error.request.responseURL.match(/^.*(login|register|auth)$/gi)) {
  //   router.replace({
  //     path: '/auth',
  //     query: {redirect}
  //   })
  // }
  // if ( errorCodes.includes(error.request.status)) {
  //   let data = JSON.parse(error.request.responseText)
  //   // tools.toast({txt: data.message || '网络错误，请求失败', time: 1500})
  //   return Promise.reject(data);
  // }
  return Promise.reject(error)
}

export default _axios;

