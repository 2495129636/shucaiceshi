<template>
	<div>
		<div class="container">
			<!--<div class="tab_top"></div>-->
			<div class="tab_header flex flex_y_center">
				<div @click="$emit('btnClick')" class="tab_header_left flex_1 flex flex_y_center">
					<img v-show="backShow" src="../assets/tabber/return.png" />
				</div>

				<div class="tab_header_tit fs18 fw_500 flex_3 flex_center">
					{{title}}
				</div>
				<div class="tab_header_right flex_1 fs15 fw_500 flex flex_x_right">
					<span @click="$emit('btnClick2')" v-show="shopRight">{{title2}}</span>
					<van-icon name="add-o" size="30" @click="$emit('addClick')" v-show="addShow"/>
					<span @click="$emit('btnDetail')" v-show="detailShow">明细</span>
				</div>

			</div>
				<div v-show="shopSkeleton" style="width: 100%; height: 10px; background: #F6F6F6;"></div>
		</div>
		
	</div>
</template>

<script>
	export default {
		props: {
			detailShow:Boolean,
			addShow:Boolean,
			backShow:Boolean,
			title: String,
			title2: String,
			shopRight: Boolean,
			shopSkeleton: Boolean
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.container {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		.tab_top {
			width: 100%;
			height: 20px;
		}
		.tab_header {
			width: 100%;
			height: 44px;
			background: #fff;
			.tab_header_left {
				img {
					width: 22px;
					height: 22px;
					margin-left: 15px;
				}
			}
			.tab_header_tit {
				font-family: PingFang SC;
				color: rgba(68, 136, 99, 1);
			}
			.tab_header_right {
				span {
					color: #1E1E1E;
					margin-right: 15px;
				}
			}
		}
	}
</style>