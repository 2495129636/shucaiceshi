<template>
	<div class="container">
		<nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="付款" ></nav-header> 

		<div class="top-bgc">
			<div class="header flex flex_y_center">
				<!-- <div class="header-img flex_1">
					<img @click="backBtn" src="../../../assets/mine/children/left.png" />
				</div>
				<span class="flex_2 fs18 fw_b c_fff flex flex_x_center">余额</span>
				<div class="flex_1"></div> -->
			</div>
			<div class="header-bottom flex">
				<!-- <div class="header-bottom-left flex_1">
					<div class="flex flex_x_center fw_b c_fff">{{u_balance}}</div>
					<div class="flex flex_x_center fw_500 fs13 c_fff">账户总额(元)</div>
				</div> -->
				<div class="header-bottom-right flex_1">
					<div class="flex flex_x_center fw_b c_fff">{{u_balance}}</div>
					<div class="flex flex_x_center fw_500 fs13 c_fff">账户余额(元)</div>
				</div>
			</div>
<div class="cardMenu3">
 <van-radio-group v-model="radio">
			

				<div class="list-item flex" @click="radio = '1'">
					<div class="list-item-left flex_center">
						<img src="../../../assets/code/code3.png" />
					</div>
					<div class="list-item-center fs15 flex flex_y_center">支付宝支付</div>
					<div class="list-item-right flex_center flex flex_1 flex_x_right" style="margin-right:20px">
						<van-radio name="1" checked-color="#448863"/>
					</div>
				</div>


				<div class="list-item flex" @click="radio = '2'">
					<div class="list-item-left flex_center">
						<img src="../../../assets/code/code2.png" />
					</div>
					<div class="list-item-center fs15 flex flex_y_center">微信支付</div>
					<div class="list-item-right flex_center flex flex_1 flex_x_right" style="margin-right:20px">
						<van-radio name="2" checked-color="#448863"/>
					</div>
				</div>


				<div class="list-item flex" @click="radio = '3'">
					<div class="list-item-left flex_center">
						<img src="../../../assets/code/code1.png" />
					</div>
					<div class="list-item-center fs15 flex flex_y_center">余额支付</div>
					<div class="list-item-right flex_center flex flex_1 flex_x_right" style="margin-right:20px">
						<van-radio name="3" checked-color="#448863"/>
					</div>
				</div>


			</van-radio-group>
</div>

			<div class="cardMoney2" >
				<van-row type="flex" justify="center">
					<van-col span="22"><van-button type="primary" size="large" color="#448863" style="border-radius:8px;" @click="toSubmit">充值{{addMoneyList[ageNum].number}}元</van-button></van-col> 
				</van-row> 
			</div>



		</div>
	</div>
</template>
<script>
import toast from "@/utils/toast";
import navHeader from '@/components/header';
	export default {
		components: {
			navHeader
		},	
		data(){
			return{
				radio:"1",
				ageNum: 0,
				addMoneyList:[
					{
						number:10
					},
					{
						number:20
					},
					{
						number:30
					}
				],
				u_balance:0,
			}
		},

		methods: {
			toSubmit(){
				this.$router.push('/balance/recharge')
			},
			onDetail(){
				console.log("明细");
			},
			onSubmit(index){
				this.ageNum=index;
			},
			backBtn() {
				this.$router.push('/balance')
			},
		},
		created(){
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.container {
		background: #F6F6F6;
		.top-bgc {
			width: 100%;
			height: 210px;
			background: #448863;
			// background-image: url(../../../assets/mine/children/balance_bgc.png);
			background-size: 100% 100%;
			.header {
				padding-top: 30px;
				box-sizing: border-box;
				.header-img {
					img {
						width: 22px;
						height: 22px;
						margin-left: 10px;
					}
				}
			}
			.header-bottom {
				margin-top: 45px;
				.header-bottom-left {
					border-right: 1px solid #FFFFFF;
					div:nth-child(1) {
						font-family: DINPro;
						font-size: 30px;
					}
					div:nth-child(2) {
						margin-top: 5px;
					}
				}
				.header-bottom-right {
					div:nth-child(1) {
						font-family: DINPro;
						font-size: 30px;
					}
					div:nth-child(2) {
						margin-top: 5px;
					}
				}
			}
		}
		.footer {
			padding: 0 75px;
			margin-top: 120px;
			.toBtn {
				width: 100%;
				height: 44px;
				background: rgba(255, 109, 0, 1);
				border-radius: 5px;
			}
			.fromBtn {
				width: 100%;
				height: 44px;
				border: 1px solid #FF6D00;
				border-radius: 5px;
				margin-top: 25px;
				background: none;
				color: #FF6D00;
			}
		}
		.cardMoney{
			margin:80px 0 0 10px;
			padding: 10px 0 0 0;
			position: relative;
			width: 95%;
			height: 220px;
			background:rgb(255, 255, 255);
			border-radius:10px;
		}
		.cardMoney2{
			float: left;
			margin:80px 0 0 10px;
			padding: 10px 0 0 0;
			position: relative;
			width: 95%;
			height: 150px;  
		}
		.textTiShi{
			// margin:10px 0 0 50px;
			color:rgba(100,100,100,1);
			line-height:41px;
		}
		.buttonshop{
		
			background: #448863 !important;
			// border: none !important;
			color: #ffffff !important;
			border: none !important;
		}
		.cardMenu3{
			margin:80px 0 0 10px;
			padding: 10px 0 0 0;
			position: relative;
			width: 95%;
			height: 150px;
			background:rgb(255, 255, 255);
			border-radius:10px;
		}
}
</style>