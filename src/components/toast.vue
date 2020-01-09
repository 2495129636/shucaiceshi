<template>
	<div @click="hideToast" v-show="isShow" class="toast">
		<div class="main">
			<div v-if="type" class="icon-box" flex="main:center cross:center">
				<i v-show="type==='succeed'" class="iconfont icon-ic_select_simple font30 orange2"></i>
			</div>
			<div class="title">
				提示
			</div>
			<div class="text">
				{{text}}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			text: {
				type: String
			},
			time: {
				type: Number
			},
			type: {
				type: String
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.isShow = true;
				this.timer = setTimeout(() => {
					this.hideToast();
				}, this.time)
			});
		},
		data() {
			return {
				isShow: false,
				timer: null,
			};
		},
		methods: {
			hideToast() {
				this.isShow = false;
				clearTimeout(this.timer);
				this.timer = null;
			},
			beforeLeave() {
				this.close();
			},
			afterLeave() {
				document.body.removeChild(this.$el);
			}
		}
	};
</script>
<style scoped lang="scss">
	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		z-index: 999999999999999999;
		.main {
			width: 100px;
			background: rgb(1, 1, 1);
			border-radius: 5px;
			color: #fff;
			padding: 10px;
			.icon-box {
				border-radius: 50%;
				overflow: hidden;
				background-color: #fff;
			}
			.title {
				font-size: 0.3rem;
				line-height: .45rem;
				color: #fff;
			}
			.text {
				font-size: 0.3rem;
				line-height: .45rem;
				color: #fff;
				margin-top: 5px;
			}
		}
	}
</style>