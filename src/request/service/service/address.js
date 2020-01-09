
import {
    POST,
} from '@/request/axios/index'

export const services = {
    //地址列表
    address: (params) => {
        return POST("Address/address", params);
    },
    //添加地址
    add: (params) => {
        return POST('Address/add', params)
    },
    //地址修改(数据遍历)
    edit_list: (params) => {
        return POST('Address/edit_list', params)
    },
    //修改地址
    edit: (params) => {
        return POST('Address/edit', params)
    },
    //地址修改
    del: (params) => {
        return POST('Address/del', params)
    }
};
export default services;