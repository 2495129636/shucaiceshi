
//限时热卖
import Time from '@/views/Home/children/time';
//订单确认
import Orders from '@/views/Home/children/orders';
//商品详情
import ShopInfo from '@/views/Home/children/shopInfo';
const dthome = [
	{
		path: '/shopinfo',
		name: "shopinfo",
		component: ShopInfo,
		meta: {
			index: 3
		},
	},
	
	{
		path: '/classfyList',
		name: "classfyList",
		component: ()=>import('./../views/Home/children/classfyList.vue'),
		meta: {
			index: 1
		},
	},
	{
		path: '/time',
		name: "time",
		component: Time,
		meta: {
			index: 1
		},
	},
	{
		path: '/orders',
		name: "orders",
		component: Orders,
		meta: {
			index: 2
		},
	},
	{
		path: '/searchResult',
		name: "searchResult",
		component: ()=>(import('../views/Home/children/searchResult.vue')),
		meta: {
			index: 2
		},
	},
	{
		path: '/newsListDetal',
		name: "newsListDetal",
		component: ()=>(import('../views/Home/children/newsListDetal.vue')),
		meta: {
			index: 2
		},
	},
]

export default dthome;