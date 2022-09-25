import axios from 'axios'
import { Message} from 'element-ui'
const customCode = {
   200: '成功',
   400: '密码错误',
   1000: '用户名错误',
   3000: '测试错误提示'
}

const http = axios.create({
   // baseURL: process.env.VUE_APP_BASES_API,
   timeout: 5000
})

import store from "../store"

http.interceptors.request.use(config => {
   const token = store.getters.vuexToken
   if(token) config.headers.authorization = "Bearer " + token
   return config
}, error => {
   return Promise.reject(error)
})

http.interceptors.response.use(res => {
   if (res.status == 200) {
      // _CostomHints(res.status,res.msg)
      return res
   }
}, error => {
   console.log(error);
   if (error.response.status >= 400) {
      _CostomHint(error.response.data.errorCode, error.response.data.msg)
      return error
   }
   return Promise.reject(error)
})


const request = (options) => {
     options.method = options.method || "get"
   if (options.method.toLowerCase() === "get") {
      options.params = options.data || options.params
      delete options.data
   }
   http.defaults.baseURL = options.proxy || process.env.VUE_APP_BASES_API
   return http(options)
}
const _CostomHint = (errorCode, msg) => {
   let title = customCode[errorCode] || msg || '发生位置错误'
   Message.error(title)
}
const _CostomHints = (rescode, msg) => {
   let title = customCode[rescode] || msg || '成功'
   Message.success(title)
}


export default request