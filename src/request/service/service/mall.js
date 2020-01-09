 
import {
    POST
} from '@/request/axios/index'

export const services = {
    //一级分类
    classOne:(params)=>{
        return POST("Goods/class1",params)
    },
    // 二级分类
    classTwo:(params)=>{
        return POST('Goods/class2',params)
    },
    //商品列表
    GoodsList:(params)=>{
        return POST('Goods/goods',params)
    }

   
};
export default services;