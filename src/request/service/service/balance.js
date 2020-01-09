 
import {
    POST
} from '@/request/axios/index'

export const services = {
    getBalance:(params)=>{
        return POST("My/balance",params);
    }
};
export default services;