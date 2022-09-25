import request from "../http";

//获取供应商列表

export const getSupplierList = (currentPage,pageSize,data)=>{
    return request({
        url:`/supplier/list/search/${currentPage}/${pageSize}`,
        method:'GET',
        data,
        proxy:process.env.VUE_APP_BASES_V1
    })
}

//供应商查询列表

export const findSupplier = (id)=>{
    return request({
        url:`/supplier/${id}`,
        method:'GET',
        proxy:process.env.VUE_APP_BASES_V1
    })
}

//添加事件
export const addSupplierApi= (data)=>{
    return request({
        url:'/supplier',
        method:'post',
        data,
        proxy:process.env.VUE_APP_BASES_V1
    })
}

//编辑事件
export const editSupplierApi= (id,data)=>{
    return request({
        url:`/supplier/${id}`,
        method:'PUT',
        data,
        proxy:process.env.VUE_APP_BASES_V1
    })
}

//删除事件
 export const delSupplierApi = (id)=>{
    return request({
        url:`/supplier/${id}`,
        method:'DELETE',
        proxy:process.env.VUE_APP_BASES_V1
    })
 }