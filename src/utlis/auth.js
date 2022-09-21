//存储本地token
const TOKEN = 'token'
const USER_INFO = 'userInfo'
export const setToken = (token) => {
    localStorage.setItem(TOKEN, token)
}
//获取本地token
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

//设置本地用户信息
export const setuserInfo = (userinfo) => {
localStorage.setItem(USER_INFO,JSON.stringify(userinfo))
}

//获取本地用户信息d

export const getUserInfo=()=>{
  return JSON.parse(localStorage.getItem(USER_INFO) || '{}')
}
