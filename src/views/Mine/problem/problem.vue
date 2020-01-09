<template >
	<div class="container" > 
		<nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="反馈问题"></nav-header>

<!-- <div style="width:100px"> -->
	    <!-- <van-dropdown-menu label="dsfsdf" active-color="#ee0a24" style="width:100px" :overlay="false" >
            <van-dropdown-item  v-model="value" :options="option" style="width:100px" /> 
        </van-dropdown-menu> -->
<!-- </div> -->
<div style="background-color:#FFFFFF;padding:20px 0 0 20px">
    <label>选择类目</label>
    <van-cell-group style="margin:20px 20px 0 0">
            <van-field
                v-model="message"
                rows="6" 
                :clickable="true"
                :border="true"
                type="textarea"
                placeholder="请详细描述您的问题"
            />
        </van-cell-group>
</div>
         <van-row type="flex" justify="center" style="padding-top:100px;background-color:#FFFFFF">
                    <van-col span="22"><van-button type="primary" size="large" color="#448863" style="border-radius:8px;">提交</van-button></van-col> 
                </van-row> 
         

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
                message:'',
                value:'',
				 option: [
                    { text: '全部商品', value: 0 },
                    { text: '新款商品', value: 1 },
                    { text: '活动商品', value: 2 }
                ]
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
		background: #F6F6F6;
		padding-top: 54px;
		box-sizing: border-box;
		width: 100%;
	}
</style>