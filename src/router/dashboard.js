//首页
import Home from "@/views/Home/index";
//我的
import Mine from "@/views/Mine/index";
//商城
import Shoping from "@/views/Shoping/index";
//购物车
import Shopcart from "@/views/Shopcart/index";
//常备清单
import Recommend from "@/views/Recommend/index";


export const routes = [{
		path: '/dashboard',
		redirect: '/dashboard/home'
	},
	{
		path: 'home',
		name: "home",
		component: Home,
		meta: {
			index: 0
		},
	},
	{
		path: 'mine',
		name: "mine",
		component: Mine,
		meta: {
			index: 0
		},
	},
	{
		path: 'shoping',
		name: "shoping",
		component: Shoping,
		meta: {
			index: 0
		},
	},
	{
		path: 'shopcart',
		name: "shopcart",
		component: Shopcart,
		meta: {
			index: 0
		},
	},
	{
		path: 'recommend',
		name: "recommend",
		component: Recommend,
		meta: {
			index: 0
		},
	},
	
];

export default routes;