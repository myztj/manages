import request from "../http";

export const getStaffList=(currentPage,pageSize,data)=>{
    return request({
      url:`staff/list/search/${currentPage}/${pageSize}`,
      method:"post",
      data,
      proxy:process.env.VUE_APP_BASES_V1
    })
}

//员工管理单个查询

export const findStaff= (id)=>{
  return request({
    url:`/staff/${id}`,
    method:'GET',
    proxy:process.env.VUE_APP_BASES_V1
  })
}

//删除员工管理
export const deletStaff = (id)=>{
 return request({
  url:`/staff/${id}`,
  method:'DELETE',
  proxy:process.env.VUE_APP_BASES_V1
 })
}

//编辑
export const editStaff = (id,data)=>{
  return request({
   url:`/staff/${id}`,
   method:'put',
   data,
   proxy:process.env.VUE_APP_BASES_V1
  })
 }


 // 添加

 export const addStaff = (data)=>{
   return request({
    url:'/staff',
    method:'POST',
    data,
    proxy:process.env.VUE_APP_BASES_V1
   })
 }