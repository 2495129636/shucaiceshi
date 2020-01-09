 
import {
    POST
} from '@/request/axios/index'

export const services = {
    //发送验证码
    setInsertUser:(params)=>{
        return POST("Login/yzmfs",params);
    },
    // 登录
    getUserinfo:(params)=>{
        return POST("Login/login",params);
    }
};
export default services;