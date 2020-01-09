<template>
  <div class="container" v-cloak>
    <nav-header style="color:rgba(68, 136, 99, 1)" title="推荐商品"></nav-header>

    <form action="/" style="padding-top:50px">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <van-tabs @change="onTopLable">
      <van-tab v-for="(i,index) in topLabelList" :title="i.title" :key="index"  ></van-tab>
    </van-tabs>
    <div v-for="(i,index) in itemGoodsList" :key="index" class="goodlist">
      <div class="goods_img">
        <img :src="i.goods_img" alt />
      </div>

      <div class="goods_right">
        <div class="goods_title">
          <span>{{i.goods_name}}</span>
        </div>
        <div class="goods_content">
          <p>{{i.goods_content}}</p>
        </div>
        <div class="goods_bottom">
          <span>￥{{i.goods_price}}</span>
          <button>选规格</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toast from "@/utils/toast";
import navHeader from "@/components/header";
export default {
  components: {
    navHeader
  },
  data() {
    return {
      searchValue: "",
      topLabelList: [
        {
          index: 0,
          title: "我的清单"
        },
        {
          index: 1,
          title: "城市热卖"
        }
      ],
      leftLabelList: [],
      activeKey: 0,
      itemGoodsList: ""
    };
  },
  methods: {
    onSearch() {},
    onCancel() {},
    onTopLable(index) {
      if(index===0){
        this.myOrder()
      }
      else{
        this.cityHot()
      }
    },
    //我的清单接口
    async myOrder() {
      let myOrder = await this.service.recommend.myOrder({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token")
      });
      console.log(myOrder);
      if ((myOrder.state = 10001)) {
        this.itemGoodsList = myOrder.data;
        console.log(this.itemGoodsList)
      }
    },
    async cityHot() {
      let cityHot = await this.service.recommend.cityHot({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token")
      });
       console.log(cityHot)
       if(cityHot.state===10001){
         this.itemGoodsList=cityHot.data
       }
    }
   
  },
  created() {
    this.myOrder();
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  width: 100%;
  background: rgb(254, 254, 254);
  padding-bottom: 100px;
}
.buttonshop {
  width: 70px;
  height: 25px;
  background: rgba(68, 136, 99, 1);
  border-radius: 20px;
  font-size: 1px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 10px;
}
//
.goodlist {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 80px;
  padding: 20px 0;
  border-bottom: 1px solid #f6f6f6ff;
  .goods_img {
    img {
      width: 75px;
      height: 80px;
    }
  }
  .goods_right {
    width: 248px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .goods_title {
      span {
        font-size: 15px;
        font-weight: 400;
        color: rgba(30, 30, 30, 1);
        margin-right: 5px;
      }
    }
    .goods_content {
      font-size: 12px;
      font-weight: 400;
      color: rgba(100, 100, 100, 1);
    }
    .goods_bottom {
      font-size: 14px;
      font-weight: 400;
      color: rgba(68, 136, 99, 1);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      button {
        width: 55px;
        height: 20px;
        border-radius: 20px;
        background-color: #448863ff;
        color: #ffffffff;
        font-size: 12px;
      }
    }
  }
}
</style>