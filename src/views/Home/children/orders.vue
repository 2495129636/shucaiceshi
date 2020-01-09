/<template>
	<div class="container">
		<nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="订单确认"></nav-header>

		<van-button :plain="btnShow" type="primary" class="buttonshop" color="#448863" @click="onSubmit(0)">自提</van-button>
		<van-button :plain="!btnShow" type="primary" class="buttonshop" color="#448863" @click="onSubmit(1)">送货上门
		</van-button>


		<div class="cardMenu">

			<label style="margin-left:20px;">
				<b>自提地址</b>
			</label>
			<p style="margin-left:20px;">地址：内蒙古自治区赤峰市红山区站前街火车站 售票厅
			</p>
			<p style="margin-left:20px;">联系电话：18618339353</p>

		</div>


		<div class="cardMenu2" v-for="(i,index) in 2" :key="index">
			<van-card style="width:90%;background-color:#FFFFFF;" price="2.00" desc="描述信息" title="商品标题"
				thumb="https://img.yzcdn.cn/vant/t-thirt.jpg">
				<div slot="footer">
					<label style="color:#448863">数量:{{number}}份</label>
				</div>
			</van-card>
		</div>

		<div class="cardMenu3">
			<div class="list-item flex">
				<div class="list-item-center fs15 flex flex_y_center">商品金额</div>
				<div class="list-item-right flex_center flex flex_1 flex_x_right" style="margin-right:20px">
					¥{{shopMoney}}
				</div>
			</div>
			<div class="list-item flex">
				<div class="list-item-center fs15 flex flex_y_center">配送费</div>
				<div class="list-item-right flex_center flex flex_1 flex_x_right" style="margin-right:20px">
					¥{{courierMoney}}
				</div>
			</div>
			<div class="list-item flex">
				<van-cell-group>
					<van-field v-model="message" label="备注" type="text" maxlength="200" placeholder="请输入留言" show-word-limit />
				</van-cell-group>
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
						<van-radio name="1" checked-color="#448863" />
					</div>
				</div>


				<div class="list-item flex" @click="radio = '2'">
					<div class="list-item-left flex_center">
						<img src="../../../assets/code/code2.png" />
					</div>
					<div class="list-item-center fs15 flex flex_y_center">微信支付</div>
					<div class="list-item-right flex_center flex flex_1 flex_x_right" style="margin-right:20px">
						<van-radio name="2" checked-color="#448863" />
					</div>
				</div>


				<div class="list-item flex" @click="radio = '3'">
					<div class="list-item-left flex_center">
						<img src="../../../assets/code/code1.png" />
					</div>
					<div class="list-item-center fs15 flex flex_y_center">余额支付</div>
					<div class="list-item-right flex_center flex flex_1 flex_x_right" style="margin-right:20px">
						<van-radio name="3" checked-color="#448863" />
					</div>
				</div>


			</van-radio-group>

			<van-submit-bar :price="total" button-text="支付" @submit="onSubmitForm">
			</van-submit-bar>


		</div>

	</div>
</template>

<script>
	import navHeader from '@/components/header'
	export default {
		components: {
			navHeader
		},
		data() {
			return {
				total: 0,
				radio: "1",
				shopMoney: 0,
				courierMoney: 0,
				message: '',
				balanceMoney: 0,
				number: 0,
				btnShow: false,
				imgList: [],
				topLabelList: [
					{
						index: 0,
						title: "我的清单"
					},
					{
						index: 1,
						title: "城市热卖"
					},
				],
			}
		},
		methods: {
			onSubmitForm() {

			},
			onSubmit(index) {
				if (index == 0) {
					this.btnShow = false;
				} else {
					this.btnShow = true;
				}
			},
			onTopLable(index) {
				console.log("====" + index)
			},
			backBtn() {
				this.$router.push('/dashboard/shopcart')
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
				this.imgList = Dengs.data;
			},
		},
		created() {
			this.gethomeImg();
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.container {
		background: #F6F6F6;
		padding-top: 54px;
		box-sizing: border-box;
		width: 100%;

		.cardMenu {
			margin: 60px 0 0 10px;
			padding: 10px 0 0 0;
			position: relative;
			width: 95%;
			height: 90px;
			background: rgb(255, 255, 255);
			border-radius: 10px;
		}

		.cardMenu2 {
			margin: 10px 0 0 10px;
			padding: 10px 0 0 0;
			position: relative;
			width: 95%;
			height: 130px;
			background: rgb(255, 255, 255);
			border-radius: 10px;
		}

		.cardMenu3 {
			margin: 10px 0 0 10px;
			padding: 10px 0 0 0;
			position: relative;
			width: 95%;
			height: 190px;
			background: rgb(255, 255, 255);
			border-radius: 10px;
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

	.buttonshop {
		float: left;
		margin-left: 10px;
		width: 170px;

	}
</style>