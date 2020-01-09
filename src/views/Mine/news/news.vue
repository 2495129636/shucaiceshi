<template>
	<div class="container">
		<nav-header @btnClick="backBtn" shopSkeleton title='消息'></nav-header>
		<div class="news">
			<div v-for="(i,index) in dataList" :key="index" class="news_item flex" @click="newsBnt(i.id)">
				<div class="news_item_left flex flex_y_center">
					<img src="../../../assets/mine/children/xiaoxi.png"/>
				</div>
				<div class="news_item_right flex_1">
					<div class="news_item_right_top flex flex_x_bten flex_y_bottom">
						<div class="fs15 fw_500 c_1E">充值享优惠{{i.title}}</div>
						<div style="color: #B5B3B2;" class="fs12">今天 7:30{{i.addtime}}</div>
					</div>
					<div class="news_item_right_bottom over_1 c_64 fw_500 fs14">{{i.text}}优惠活动，数优惠活动，数量有限，先到先得，，先到先先到优惠活动，数量有限，先到先得，，先到先先到量有限，先到先得，，先到先先到...</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import navHeader from '@/components/header';
	import toast from "@/utils/toast";
	export default{
		components: {
			navHeader
		},
		data(){
			return{
				dataList:[],
			}
		},
		methods:{
			backBtn(){
				this.$router.push('/dashboard/mine')
			},
			newsBnt(index){
				// this.$router.push({
                //   name: 'SN',
                //   params: {
                //     data: '参数',
                //   },
                // });
				this.$router.push({path:'/news/list',query:{index:index}});
			},
			async getMessage(){
				let Dengs = await this.service.home.getMessage({
					user_id:localStorage.getItem("user_id"),
					token:localStorage.getItem("token")
				})
				if (Dengs.data=="") {
					toast({
						text: "暂无消息！！",
						time: 1000
					});
					return;
				}
				this.dataList=Dengs.data;
			}
		},
		created(){
			this.getMessage();
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.container{
		padding-top: 54px;
		.news{
			padding-left: 15px;
			.news_item{
				width: 100%;
				height: 77px;
				border-bottom: 1px solid #F6F6F6;
				.news_item_left{
					width: 33px;
					height: 100%;
					img{
						width: 20px;
						height: 20px;
					}
				}
				.news_item_right{
					padding-right: 15px;
					.news_item_right_top{
						margin-top: 15px;
					}
					.news_item_right_bottom{
						margin-top: 5px;
					}
				}
			}
		}
	}
</style>