import Vue from "vue";

import home from "./service/home";
import login from "./service/login";
import balance from "./service/balance";
import register from './service/register'
import my from './service/my'
import mall from './service/mall'
import address from './service/address'
import recommend from './service/recommend'
import order from './service/order'
Vue.prototype.service = {
    home:home,
    login:login,
    balance:balance,
    register:register,
    my:my,
    address:address,
    mall:mall,
    recommend:recommend,
    order:order
    
};
