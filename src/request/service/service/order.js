 
import {
    POST
} from '@/request/axios/index'

export const services = {
  
    //购物车去结算（订单员数据）
    CartPay:(params)=>{
        return POST("order/set_order",params)
    },
    //提交订单（余额）
    OrderCommit:(params)=>{
        return POST('Payment/yue',params)
    },
    //支付 密码验证
    PayAndCommit:(params)=>{
        return POST('Payment/yezf',params)
    },
    //订单列表
    PayList:(params)=>{
        return POST('orders/order',params)
    },
    //待付款页面订单详情
    awaitPay:(params)=>{
        return POST('orders/quzf',params)
    },
    //待付款页调起支付框
    awaitPayAndPay:(params)=>{
        return POST('orders/diaoq',params)
    },
    //其他状态订单详情
    payDetails:(params)=>{
        return POST("orders/details",params)
    },
    //待收货和确认收货
    getGoodsDetails:(params)=>{
        return POST('orders/queren',params)
    },
    //订单待付款页调取
    orderDiaoq:(params)=>{
        return POST('orders/diaoq',params)
    }
   
};
export default services;