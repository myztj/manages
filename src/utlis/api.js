import request from "./http";
//登录
export async function onlogin({username,password}){
let {data} = await request({
    url:`/login`,
    method:"post",
    data:{
        username,
        password
    }
})
return data
}
//获取用户信息
export async function getIonfo(){
    let {data} = await request({
        url:'http://vue.mengxuegu.com/pro-api/user/info/admin',
        method:'GET'
    })
    return data
}

//退出登录 
export async function loginOut(){
    let {data} = await request({
        url:"http://vue.mengxuegu.com/pro-api/user/logout",
        method:"post"
    })
    return data
}
