<template>
	<div class="container"> 
         <van-cell-group>
            <van-field style="border:2px solid rgb(214, 213, 213);" rows="5" v-model="value" placeholder="请输入用户名" type="textarea" :clickable="true" @keyup.enter="onSubmit"/>
        </van-cell-group>
        <center><h3>{{list.length}}个</h3></center>
        <hr>
        <h5>
            <div v-for="(i,item) in list" :key="item" style="float:left;">
                <span v-if="item % 4==0&&item!=0" style="color:red">-</span> {{i}} 
            </div>
        </h5>
	</div>
</template>
<script>
import Vue from 'vue';
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);
import toast from "@/utils/toast";

	export default { 	
		data(){
			return{
                list:[],
                value:''
			}
        }, 
		methods: { 
            onSubmit(){ 
                this.list=[];
                for(let i in this.value){
                    if(parseInt(this.value[i])==1){
                        this.list.push(3)
                    }else if(parseInt(this.value[i])==2){
                        this.list.push(4)
                    }else if(parseInt(this.value[i])==4){
                        this.list.push(1)
                    }else if(parseInt(this.value[i])==5){
                        this.list.push(2)
                    }
                }
                this.value='';
            }
		}
	}
</script>

<style scoped="scoped" lang="scss">
.dsf{
    color: #2c2929;
}
	
</style>