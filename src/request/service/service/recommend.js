 
import {
    POST
} from '@/request/axios/index'

export const services = {
   //我的清单
   myOrder:(params)=>{
       return POST('tuijian/wod',params)
   },
   //城市热卖
   cityHot:(params)=>{
       return POST('tuijian/csrm',params)
   }
};
export default services;