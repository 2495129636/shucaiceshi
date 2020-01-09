<template>
	<div class="container">
		<nav-header @btnClick="backBtn" shopSkeleton title='提现'></nav-header>
		<div class="content">
			<div class="fs15 fw_500 c_1E">提现金额：</div>
			<div class="number flex flex_y_center">
				<span>￥</span>
				<input type="number" />
			</div>
			<div style="margin-top: 15px;" class="fw_500 fs15 c_64">可提现金额50.00元</div>
			<div class="flex" style="margin-top: 15px;">
				<div class="checkwx">
					<label class="flex flex_y_center">
					<input name="raido" style="margin-left: 5px;" id="wx" type="radio" />
					<label class="checklabel" for="wx"></label><span style="margin-left: 10px;" class="fs15 c_1E fw_500">提到微信</span>
					</label>
				</div>
				<div class="checkzfb">
					<label class="flex flex_y_center">
					<input name="raido" style="margin-left: 5px;" id="zfb" type="radio" />
					<label class="checklabel" for="zfb"></label><span style="margin-left: 10px;" class="fs15 c_1E fw_500">提到支付宝</span>
					</label>
				</div>
			</div>
			<button class="footer-btn fs15 c_fff fw_500">预计两小时内到账，确认提现</button>
			<div style="margin-top: 10px;" class="fs14 c_1E fw_500">提现说明：</div>
			<div style="margin-top: 5px;" class="c_64 fs13 fw_400">1.公户余额不可提现</div>
			<div style="margin-top: 5px;" class="c_64 fs13 fw_400">2.提款后两小时内到账 拷贝</div>
		</div>
	</div>
</template>

<script>
	import navHeader from '@/components/header'
	export default {
		components: {
			navHeader
		},
		methods: {
			backBtn() {
				this.$router.push('/balance')
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.container {
		padding-top: 54px;
		.content {
			padding: 20px 15px 0 15px;
			.number {
				border-bottom: 1px solid #F6F6F6;
				margin-top: 20px;
				padding-bottom: 5px;
				span {
					font-size: 24px;
					color: #FF6D00;
				}
				input {
					font-size: 24px;
				}
			}
			.checkwx {
				.checklabel {
					width: 17px;
					height: 17px;
					border: 1px solid #FFAA00;
					display: inline-block;
					vertical-align: top;
					box-sizing: border-box;
				}
				input {
					display: none;
				}
				input:checked+label {
					text-align: center;
					line-height: 20px;
					background-image: url(../../../assets/mine/children/dui.png);
					background-size: 15px 15px;
					background-position: center;
					background-repeat: no-repeat;
					/*这里可以加设计好的对勾图片，以背景的方式加上去  下面的伪类样式就可以不用加了*/
				}
				input:checked+label::after {
					content: "";
				}
			}
			.checkzfb {
				margin-left: 50px;
				.checklabel {
					width: 17px;
					height: 17px;
					border: 1px solid #FFAA00;
					display: inline-block;
					vertical-align: top;
					box-sizing: border-box;
				}
				input {
					display: none;
				}
				input:checked+label {
					text-align: center;
					line-height: 20px;
					background-image: url(../../../assets/mine/children/dui.png);
					background-size: 15px 15px;
					background-position: center;
					background-repeat: no-repeat;
					/*这里可以加设计好的对勾图片，以背景的方式加上去  下面的伪类样式就可以不用加了*/
				}
				input:checked+label::after {
					content: "";
				}
			}
			.footer-btn{
				width:100%;
				height:45px;
				background:rgba(255,109,0,1);
				border-radius:5px;
				margin-top: 60px;
			}
		}
	}
</style>