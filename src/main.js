import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import RouteTransition from 'vue-route-transition'
Vue.use(RouteTransition)


import 'lib-flexible'

//vant组件
import './plugins/vant'
//获取服务端数据
import '@/request/service/index'
//公用css
import '@/style/public.css'
import '@/style/reset.css'

//自定义聚焦事件
import '@/utils/focus'

Vue.config.silent = true;
//去掉警告
Vue.config.productionTip = false


new Vue({
  router,
  store,
  RouteTransition,
  render: h => h(App)
}).$mount('#app')
