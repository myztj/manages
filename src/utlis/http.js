import axios from 'axios'
import { Message } from 'element-ui'
const customCode = {
   200: '成功',
   1000: '用户名错误',
   3000: '测试错误提示'
}
const http = axios.create({
   baseURL: process.env.VUE_APP_BASES_API,
   timeout: 5000
})

http.interceptors.request.use(config => {
   config.headers.token = window.localStorage.getItem('token')
   return config
}, error => {
   return Promise.reject(error)
})

http.interceptors.response.use(res => {
   // _CostomHint(3000,'用户名错误')
   if (res.status == 200) {
      _CostomHint(res.status, res.data.msg)
      return res
   }
   if (res.status == 401) {
      _CostomHint(res.status, res.data.msg)
      return  //这里处理token过期
   }
   _CostomHint(res.status, res.data.msg)
}, error => {
   return Promise.reject(error)
})


const request = (options) => {
   options.method = options.method || "get"
   if (options.method.toLowerCase() === "get") {
      options.params = options.data || options.params
      delete options.data
   }

   return http(options)
}
const _CostomHint = (errorCode, msg) => {
   let title = customCode[errorCode] || msg || '发生位置错误'
   Message.error(title)
}


export default request