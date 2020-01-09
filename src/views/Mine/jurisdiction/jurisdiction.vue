<template>
	<div class="container">
		<nav-header title='联系客服' :backShow='true' @btnClick="backBtn"></nav-header>
		0471-808080880
		<br>
		17528251532
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
			}
		},
		methods:{
			backBtn(){
				this.$router.push('/dashboard/mine')
			},
		 
		},
		created(){
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.container{
		padding-top: 54px;
	  
	}
</style>