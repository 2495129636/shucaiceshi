<template>
	<div class="container">
		<nav-header @btnClick="backBtn" :backShow="true"  title='订单管理'></nav-header>

		<van-tabs @change="onTopLable" style="padding-top:40px;" v-model="active">
			<van-tab v-for="(i,index) in topLabelList" :title="i.title" :key="index">


				<div v-for="(i,index) in 3" :key="index" style="margin:10px 10px 0 10px;background-color:#FFFFFF;">
                    <div style="margin-left:20px;float:left;">
                        <br>
                        订单号：1245698{{i.idCard}}
                    </div>
                    <div style="text-align:right;margin-right:20px;color:rgba(68, 136, 99, 1)">
                         <br>
                        {{status}}
                    </div>
					<van-card price="i.money" num="i.number" desc="i.message" title="i.title" thumb="https://img.yzcdn.cn/vant/t-thirt.jpg" @click="cardInfo(index)">
                       
                        <div slot="footer" style="float:left;padding-top:20px">
                            <label> 共一件商品  合计:0.00{{i.total}}</label>
                        </div>
                        <div slot="footer" style="font-family:PingFang SC;font-weight:400;color:rgba(30,30,30,1);padding-top:20px">
                            <label>查看详情</label>
                        </div>

					</van-card>
				</div>

                
			</van-tab>
			
		</van-tabs>
		
	</div>
</template>

<script>
import toast from "@/utils/toast";
import navHeader from '@/components/header';
	export default {
		components: {
			navHeader
		},
		data() {
			return {
                active:0,
                idCard:"订单号",
                money:0,
                number:0,
                message:'详细信息',
                title:'标题',
                total:0,
                status:'订单状态',
				searchValue:'',
				topLabelList:[
					{
						index:0,
						title:"全部"
					},
					{
						index:1,
						title:"待付款"
                    },
                    {
						index:2,
						title:"代发货"
                    },
                    {
						index:3,
						title:"待收货"
                    },
                    {
						index:4,
						title:"已完成"
					},
                    
				],
				leftLabelList:[
					{
						index:0,
						title:"叶生菜"
					},
					{
						index:1,
						title:"根茎类"
					},
					{
						index:2,
						title:"豆类"
					},
				],
				activeKey: 0
			}
		},
		methods: {
            cardInfo(index){
                this.$router.push({path:'/tradeOrder/tradeOrderInfo',query:{index:index}});
            },
            backBtn(){
				this.$router.push('/dashboard/mine')
			},
			onTopLable(index){
				console.log("菜单切换"+index)
            }, 
            init(){
                this.active=this.$route.query.index;
            }
        },
        created(){
            this.init();
        }
	}
</script>

<style scoped="scoped" lang="scss">
	.container {
		width: 100%;
		background: #F6F6F6;
		padding-bottom: 100px;
	}
	.buttonshop{
		width:70px;
		height:25px;
		background:rgba(68,136,99,1);
		border-radius:20px;
		font-size:1px;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:10px;
	}
	
</style>