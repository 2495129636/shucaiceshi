import Vue from 'vue'
import VueRouter from 'vue-router'

//路由拆分
/*首页模块*/
import dthome from '@/router/home'
/*底部模块*/
import dtdashboard from '@/router/dashboard'
/*登入模块*/
import dtlogin from '@/router/login'
/*我的模块*/
import dtmine from '@/router/mine'


//引入tabs
import Dashboard from '@/views/Dashboard/index'


Vue.use(VueRouter)

var router = new VueRouter({
	routes: [
		//路由底部tabbar
		{
			path: '/',
			redirect: '/dashboard'
		},
		{
			path: '/dashboard',
			name: "dashboard",
			component: Dashboard,
			children: [...dtdashboard]
		},
		{
			path: '/test',
			name: 'test',
			component: () => import('../views/test.vue')

		},
		...dthome,
		...dtlogin,
		...dtmine,
	]

})

// 路由守卫 
// router.beforeEach((to, from, next) => {
// 	const isLogin = localStorage.getItem("token")
// 	if (to.path === '/login' || to.path === '/register') {
// 		next()
// 	}
// 	else {
// 		//是否在登录状态下
// 		isLogin ? next() : next('/login')
// 	}
// })


export default router