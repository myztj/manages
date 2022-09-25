import request from "../http";

export const getGoodsList=(currentPage,pageSize,data)=>{
    return request({
        url:`/goods/list/search/${currentPage}/${pageSize}`,
        method:'post',
        data,
        proxy:process.env.VUE_APP_BASES_V1
    })
}

//查询单个商品
export const findGoodsApi= (id)=>{
    return request({
        url:`/goods/${id}`,
        method:"get",
        proxy:process.env.VUE_APP_BASES_V1
    })
}

//删除商品接口

export const deletGoodsApi= (id)=>{
    return request({
        url:`/goods/${id}`,
        method:'DELETE',
        proxy:process.env.VUE_APP_BASES_V1
    })
}

//编辑商品 
export const editGoosdApi = (id,data)=>{
    return request({
        url:`/goods/${id}`,
        method:'put',
        data,
        proxy:process.env.VUE_APP_BASES_V1
    })
}

//添加商品
export const addGoodsApi=(data)=>{
    return request({
        url:"/goods",
        method:"post",
        data,
        proxy:process.env.VUE_APP_BASES_V1
    })
}