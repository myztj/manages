import axios from 'axios'

const http= axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
})

 http.interceptors.request.use(config=>{
    config.headers.token = window.localStorage.getItem('token')
    return config
 },error=>{
    return Promise.reject(error)
 })

 http.interceptors.response.use(res=>{
    return res
 },error=>{
   return Promise.reject(error)
 })

 export default http