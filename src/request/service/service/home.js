 
import {
    POST,
} from '@/request/axios/index'

export const services = {
    // 最新咨询
    Newest_info:(params)=>{
        return POST('Shouye/article',params)
    },
    //公告
    Notice:(params)=>{
        return POST('Shouye/gougao',params)
    },
    //轮播图banner
    banner:(params)=>{
        return POST('shouye/lunbo',params)
    },
    //分类图
    classList:(params)=>{
        return POST('shouye/qubu',params)
    },
    //推荐商品
    Recommend:(params)=>{
        return POST('shouye/tuijian',params)
    },
    //分类列表
    shopList:(params)=>{
        return POST('Goodslist/class_list',params)
    },
    //商品列表
    ProductList:(params)=>{
        return POST('Goodslist/goods',params)
    },
    //商品详情
    ProductDetail:(params)=>{
        return POST('Goods/details',params)
    },
    //商品详情 购物车和家常用判断
    Cartjudge:(params)=>{
        return POST('order/deta',params)
    },
    //加入购物车
    addCart:(params)=>{
        return POST('order/jiaru',params)
    },
    //加常用
    addUsed:(params)=>{
       return POST('Order/jcy',params)
    },
    //取消常用
    subUsed:(params)=>{
     return POST('Order/qxcy',params)
    },
    //购物车信息
    CartInfo:(params)=>{
        return POST('order/shop_list',params)
    },
    //购物车加一
    CartAdd:(params)=>{
     return POST('order/jia',params)
    },
    //购物车减一
    CartSub:(params)=>{
        return POST('order/jian',params)
    }

};
export default services;