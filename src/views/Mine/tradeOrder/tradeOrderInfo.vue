<template>
	<div class="container">
		<nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title='订单管理'></nav-header>

        <div class="cardMenu">
            <p><b>收货地址</b></p>
            <p>收货人：周线<label>联系电话：18618339353</label></p>
            <p> 地址：内蒙古自治区赤峰市红山区站前街火车站</p>
            <van-card price="money" num="number" desc="message" style="background:rgb(255, 255, 255);" title="title" thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
            </van-card>

             <div >
                 <br>
                <p>订单编号：32485435435{{idCard}}</p>
                <p>下单时间：2019-12-13 10:00{{time}}</p>
                <p>订单金额：0:00{{money}}</p>
                <p>取货方式：配送{{distribution}}</p>
                <p>订单状态：待支付{{status}}</p>
             </div>
        </div>




        <div class="cardMenu3">

			<div class="list-item flex">
				<div class="list-item-center fs15 flex flex_y_center">账户余额</div>
				<div class="list-item-right flex_center flex flex_1 flex_x_right" style="margin-right:20px">
					¥{{balanceMoney}}
				</div>
			</div>


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

		<van-submit-bar text-align="left" :price="total" button-text="支付" button-type="primary" @submit="onSubmitForm">

		</van-submit-bar>


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
		data() {
			return {
                idCard:'',
                time:'',
                money:'',
                distribution:'',
                status:0,
                active:1,
                total:0,
                radio:"1",
                balanceMoney:0,
			}
		},
		methods: { 
            onSubmitForm(){
				console.log("支付方法")
			},
            backBtn(){
				this.$router.push('/tradeOrder')
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
        .cardMenu{
            padding-top: 60px;
			margin-left:10px;
			position: relative;
			width: 95%;
			height: 420px;
			background:rgb(255, 255, 255);
            text-align: left;
            p{   
                color:rgba(30,30,30,1);
                line-height:30px;
                padding-left:20px;
                label{
                     margin-left:30px;
                }
            }
		}
        .cardMenu3{
			margin:10px 0 0 10px;
			position: relative;
			width: 95%;
			height: 190px;
			background:rgb(255, 255, 255);
			// border-radius:10px;
		}
        .list-item {
				width: 100%;
				height: 50px;
				border-bottom: 1px solid #F6F6F6;
				padding-left: 13px;
				box-sizing: border-box;
				.list-item-center {
					margin-left: 10px;
					color: #1E1E1E;
				}
			}
	} 
</style>