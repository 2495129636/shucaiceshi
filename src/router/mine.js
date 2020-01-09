//账单
import Balance from '@/views/Mine/balance/balance';
import Recharge from '@/views/Mine/balance/recharge';
import Record from '@/views/Mine/balance/record';
import Carry from '@/views/Mine/balance/carry';

//个人设置
import Data from '@/views/Mine/data/data';

//权限
import Jurisdiction from '@/views/Mine/jurisdiction/jurisdiction';

//消息
import News from '@/views/Mine/news/news';
import NewsList from '@/views/Mine/news/news_list';

//收货地址管理
// import Address from '@/views/Mine/address/';
//地址编辑
// import AddressEdit from '@/views/Mine/address/addlist';

//反馈问题
import Problem from '@/views/Mine/problem/problem';
//个人设置
import Setting from '@/views/Mine/setting/setting';
//订单管理
import TradeOrder from '@/views/Mine/tradeOrder/tradeOrder';
//订单管理详情
import TradeOrderInfo from '@/views/Mine/tradeOrder/tradeOrderInfo';
//会员信息
import VipInfo from '@/views/Mine/vipInfo/vipInfo';




const dtmine = [
	{
		path: '/balance',
		name: "balance",
		component: Balance,
		meta: {
			index: 1
		},
	},
	{
		path: '/balance/recharge',
		name: "recharge",
		component: Recharge,
		meta: {
			index: 2
		},
	},
	{
		path: '/balance/recharge/record',
		name: "record",
		component: Record,
		meta: {
			index: 3
		},
	},
	{
		path: '/balance/carry',
		name: "Carry",
		component: Carry,
		meta: {
			index: 2
		},
	},
	{
		path: '/data',
		name: "data",
		component: Data,
		meta: {
			index: 1
		},
	},
	{
		path: '/jurisdiction',
		name: "jurisdiction",
		component: Jurisdiction,
		meta: {
			index: 1
		},
	},
	{
		path: '/news',
		name: "news",
		component: News,
		meta: {
			index: 1
		},
	},
	{
		path: '/news/list',
		name: "newsList",
		component: NewsList,
		meta: {
			index: 2
		},
	},
	{
		path: '/address',
		name: "address",
		component: () => import('./../views/Mine/address/addresssList.vue'),
		meta: {
			index: 1
		},
	},
	{
		path: '/address/addressAdd',
		name: "addlist",
		component: () => import('./../views/Mine/address/addressAdd.vue'),
		meta: {
			index: 2
		},
	},
	{
		path: '/address/addressEdit',
		name: "addlist",
		component: () => import('./../views/Mine/address/addressEdit.vue'),
		meta: {
			index: 3
		},
	},
	{
		path: '/chengepass',
		name: "changepass",
		component: () => import('./../views/Mine/chengepass/changepass.vue'),
		meta: {
			index: 1
		},
	},
	{
		path: '/problem',
		name: "problem",
		component: Problem,
		meta: {
			index: 1
		},
	},
	{
		path: '/setting',
		name: "setting",
		component: Setting,
		meta: {
			index: 1
		},
	},
	{
		path: '/tradeOrder',
		name: "tradeOrder",
		component: TradeOrder,
		meta: {
			index: 2
		},
	},
	{
		path: '/tradeOrder/tradeOrderInfo',
		name: "tradeOrderInfo",
		component: TradeOrderInfo,
		meta: {
			index: 2
		},
	},
	{
		path: '/vipInfo',
		name: "vipInfo",
		component: VipInfo,
		meta: {
			index: 1
		},
	},
]
export default dtmine;




