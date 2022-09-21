import request from "./http";

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