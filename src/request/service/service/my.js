 
import {
    POST,
    FILE
} from '@/request/axios/index'

export const services = {
    //我的信息
    myinfo:(params)=>{
        return POST("my/my",params);
    },
    // 钱包
    myYue:(params)=>{
        return POST("my/yue",params);
    },
    //账号明细
    mycount:(params)=>{
        return POST('my/zhanghu',params)
    },
    //个人设置（数据）
    mySetting:(params)=>{
        return POST('my/geren',params)
    },
    // 头像修改
    myTouxiang:(params)=>{
        return FILE('my/touxiang',params)
    },
    //用户名或性别修改
    mySex:(params)=>{
        return POST('my/edit',params)
    },
    //帮助中心
    myHope:(params)=>{
       return POST('question/question',params)
    },
    //问题反馈
    myQuestion:(params)=>{
        return POST('question/question',params)
    },
    //会员中心
    VipInfo:(params)=>{
        return POST('my/user',params)
    },
    // 设置支付密码
    SetPayPass:(params)=>{
        return POST('my/set_code',params)
    },
};
export default services;