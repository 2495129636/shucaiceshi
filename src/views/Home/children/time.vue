<template>
	<div class="container">
		<nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="限时购"></nav-header>
        <van-swipe :autoplay="3000" class="banner">
			<van-swipe-item v-for="(i, index) in imgList" :key="index">
				<img :src="i.img" style="width: 100%;height: 35vh;">
			</van-swipe-item>
		</van-swipe>


		<van-tabs @change="onTopLable" >
			<van-tab v-for="(i,index) in topLabelList" :title="i.title" :key="index">
				<div v-for="(i,index) in 3" :key="index" >
					<van-card price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/t-thirt.jpg" >
					<div slot="footer">
						<van-button size="mini" class="buttonshop">选规格</van-button>
					</div>
					</van-card>
				</div>
			</van-tab>
			
		</van-tabs>
  
	</div>
</template>

<script>
	import navHeader from '@/components/header'
	export default {
		components: {
			navHeader
        },
        data(){
            return{
				imgList:[],
				topLabelList:[
					{
						index:0,
						title:"我的清单"
					},
					{
						index:1,
						title:"城市热卖"
					},
				], 
            }
        },
		methods:{
			onTopLable(index){
				console.log("===="+index)
			}, 
			backBtn(){
				this.$router.push('/dashboard/home')
            },
            async gethomeImg() {
				let Dengs = await this.service.home.gethomeImg();
				if (Dengs.state == -1) {
					toast({
					text: "暂无权限！！",
					time: 1000
					});
					return;
				}
				this.imgList=Dengs.data;
			},
        },
        created(){
            this.gethomeImg();
        }
	}
</script>

<style scoped="scoped" lang="scss">
	.container{
		padding-top: 54px;
		box-sizing: border-box;
		width: 100%;
		 
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