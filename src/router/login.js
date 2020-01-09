//登录
import Login from '@/views/Login/children/login'
//找回密码
import Forget from '@/views/Login/children/forget'
//注册
import Register from '@/views/Login/children/register'

const dtlogin = [
	{
		path: '/login',
		name: "login",
		component: Login,
		meta: {
			index: 1
		},
	},
	{
		path: '/forget',
		name: "forget",
		component: Forget,
		meta: {
			index: 2
		},
	},
	{
		path: '/register',
		name: "register",
		component: Register,
		meta: {
			index: 2
		},
	}
]

export default dtlogin;