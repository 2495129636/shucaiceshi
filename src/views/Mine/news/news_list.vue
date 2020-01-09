<template>
	<div class="container">
		<nav-header @btnClick="backBtn" shopSkeleton title='充值享优惠'></nav-header>
		<div class="list fs15 fw_400 c_64">{{message}}
			<!-- 优惠活动，数量有限，先到先得，满100送20. -->
		</div>
	</div>
</template>

<script>
	import navHeader from '@/components/header';
	import toast from "@/utils/toast";
	export default {
		components: {
			navHeader
		},
		data(){
			return{
				message:''
			}
		},
		methods:{
			backBtn(){
				this.$router.push('/news')
			},
			async getMessages(){
				let Dengs=await this.service.home.getMessages({
					user_id:localStorage.getItem("user_id"),
					token:localStorage.getItem("token"),
					news_id:this.$route.query.index
				})
				if (Dengs.state == -1) {
					toast({
					text: "暂无消息！！",
					time: 1000
					});
					return;
				}
				this.message=Dengs.data;
			}
		},
		created(){
			this.getMessages();
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.container{
		padding-top: 54px;
		.list{
			text-indent: 16px;
			margin-top: 20px;
		}
	}
</style>