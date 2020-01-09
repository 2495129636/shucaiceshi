 
import {
    POST
} from '@/request/axios/index'

export const services = {
    //发送验证码
    setInsertUser:(params)=>{
        return POST("zhuce/yzm",params);
    },
    // 注册
    register:(params)=>{
        return POST("zhuce/zhuce",params);
    },
    //找回密码
    reset:(params)=>{
        return POST("zhuce/reset",params)
    }
};
export default services;