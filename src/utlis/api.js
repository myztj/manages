import http from "./http";

export async function onlogin(params){
let {data} = await http.post('/login',params)
return data
}