<template>
  <div class="container">
    <nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="限时购"></nav-header>
    <van-swipe :autoplay="3000" class="banner">
      <van-swipe-item v-for="(i, index) in imgList" :key="index">
        <img :src="i.img" style="width: 100%;height: 35vh;" />
      </van-swipe-item>
    </van-swipe>

    <div v-for="(i,index) in itemGoodsList" :key="index" class="goodlist">
      <div class="goods_img">
        <img :src="i.goods_img" alt />
      </div>

      <div class="goods_right">
        <div class="goods_title">
          <span>{{i.goods_name}}</span>
          <span > 倒计时：<span class="second">{{i.timeformat}}</span></span>
        </div>
        <div class="goods_content">
          <p>{{i.goods_content}}</p>
        </div>
        <div class="goods_bottom">
          <span>
            ￥{{i.limited_time_purchase_price}}
            <span class="limitPrice">￥{{i.goods_price}}</span>
          </span>
          <button @click="ToDetail(i.id)">选规格</button>
        </div>
        <!-- <div class="goods_bottom">
          <span>{{i.limited_time_purchase_time}}</span>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import navHeader from "@/components/header";
export default {
  components: {
    navHeader
  },
  data() {
    return {
      imgList: [],
      itemGoodsList: "",
      time: "",
      Timer:''
    };
  },
  methods: {
    onTopLable(index) {
      console.log("====" + index);
    },
    backBtn() {
      this.$router.push("/dashboard/home");
    },
    ToDetail(e) {
      this.$router.push({
        path: "/shopinfo",
        query: {
          id: e
        }
      });
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
    async LimitTime() {
      let LimitTime = await this.service.mall.LimitTime({});
      console.log(LimitTime);
      this.itemGoodsList = LimitTime.data;
      this.time = LimitTime.data.time;
    },
    //时分秒
    formatSeconds(value) {
      var secondTime = parseInt(value); // 秒
      var minuteTime = 0; // 分
      var hourTime = 0; // 小时
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      var result = "" + parseInt(secondTime) + "秒";

      if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
      }
      if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
      }
      return result;
    }
  },
  async created() {
    // this.gethomeImg();
    await this.LimitTime();
    this.Timer= setInterval(() => {
      
      this.itemGoodsList.map((val)=>{
        if(val.time>0){
          val.time=val.time-1
         val.timeformat= this.formatSeconds(val.time);
        }
        else{
        
          val.timeformat='结束'
        }
        
      })
    }, 1000);
  },
  destroyed() {
    setInterval(this.Timer)
  },
};
</script>

<style scoped="scoped" lang="scss">
.container {
  padding-top: 54px;
  box-sizing: border-box;
  width: 100%;
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
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span {
        font-size: 15px;
        font-weight: 400;
        color: rgba(30, 30, 30, 1);
        margin-right: 5px;
        &:last-child{
          font-size: 10px;
          .second{
            color: red;
          }
        }
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
      span {
        .limitPrice {
          color: #b5b3b2ff;
          font-size: 12px;
          text-decoration: line-through;
        }
      }
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