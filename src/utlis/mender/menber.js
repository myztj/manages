import request from '../http'

//回获取会员列表数据
 export function getMemberList(Page,size,data){
    return request({
        url:`/list/search/${Page}/${size}`,
        method:'post',
        data,
        proxy:process.env.VUE_APP_BASES_V1
    })
 }

 //会员查询Api
 export function findMemberIitm(id){
    return request({
        url:`/member/${id}`,
        method:"GET",
        proxy:process.env.VUE_APP_BASES_V1
    })
 }

 //删除单个会员
export async function deleteMemderItem(id){
    let {data} = await request({
        url:`/member/${id}`,
        method:'DELETE',
        proxy:process.env.VUE_APP_BASES_V1
    })
    return data
}

//添加用户
export  function addMemItem(data){
   return request({
        url:'/member',
        method:"POST",
        data,
        proxy:process.env.VUE_APP_BASES_V1
    })
}

//编辑用户
export async function editMemItem(id){
    let {data} = await request({
        url:`/member/${id}`,
        method:"PUT",
        proxy:process.env.VUE_APP_BASES_V1
    })
    return data
}