<template>
  <div class="container">
    <nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="会员中心"></nav-header>

    <div style="background: #F6F6F6;padding-top:56px">
      <!--  -->
      <van-swipe @change="ChangeSwiper" :show-indicators="false" >
        <van-swipe-item  >
          <VipSwiper :vip_show='vip_show' :vipMyinfo='vipMyinfo' :vip_level="vip_level" :percentage1="percentage1"/>
        </van-swipe-item>
        <van-swipe-item>
          <VipSwiper :vip_show='vip_show' :vipMyinfo='vipMyinfo' :vip_level="vip_level" :percentage2="percentage2"/>
        </van-swipe-item>
        <van-swipe-item>
          <VipSwiper :vip_show='vip_show' :vipMyinfo='vipMyinfo' :vip_level="vip_level" :percentage3="percentage3"/>
        </van-swipe-item>
        <van-swipe-item>
          <VipSwiper :vip_show='vip_show' :vipMyinfo='vipMyinfo' :vip_level="vip_level" :percentage4="percentage4"/>
        </van-swipe-item>
      </van-swipe>
      <!--  -->
      <div class="cardMenu">
        <label style="color:rgba(30, 30, 30, 1);margin-left:20px">我的权益</label>
        <van-tabbar
          :border="false"
          v-model="active"
          @change="onChange"
          :fixed="false"
          style="margin-top:10px"
        >
          <van-tabbar-item>
            <span>优先配送</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? menu1_icon.active : menu1_icon.inactive"
            />
          </van-tabbar-item>
          <van-tabbar-item>
            <span>优先发货</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? menu2_icon.active : menu2_icon.inactive"
            />
          </van-tabbar-item>
          <van-tabbar-item>
            <span>购物积分</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? menu3_icon.active : menu3_icon.inactive"
            />
          </van-tabbar-item>
          <van-tabbar-item>
            <span>专享礼券</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? menu4_icon.active : menu4_icon.inactive"
            />
          </van-tabbar-item>
        </van-tabbar>
      </div>

      <div style="width: 100%; height: 15px; background: #F6F6F6;"></div>

      <div class="mine-list">
        <div style="border-bottom: 1px solid #F6F6F6;line-height:60px;text-align:center">
          <b>会员等级规则</b>
        </div>
        <div v-for="(i,index) in mineListArray" :key="index" class="list-item flex">
          <div
            class="list-item-center fs15 flex flex_y_center"
            style="width:50%"
          >{{i.name}}{{i.vip_name}}</div>
          <div class="list-item-right flex_center flex flex_x_left">{{i.score}}{{i.czz}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navHeader from "@/components/header";
import VipSwiper from "./../../../components/vip_swiper";
export default {
  components: {
    navHeader,
    VipSwiper,
  },
  data() {
    return {
      active: "",
      score: 0,
      menu1_icon: {
        active: require("../../../assets/vip/vdistribution.png"),
        inactive: require("../../../assets/vip/vdistribution.png")
      },
      menu2_icon: {
        active: require("../../../assets/vip/vdelivery.png"),
        inactive: require("../../../assets/vip/vdelivery.png")
      },
      menu3_icon: {
        active: require("../../../assets/vip/vcart.png"),
        inactive: require("../../../assets/vip/vcart.png")
      },
      menu4_icon: {
        active: require("../../../assets/vip/vritual.png"),
        inactive: require("../../../assets/vip/vritual.png")
      },
      mineListArray: [
        {
          name: "等级",
          score: "成长值"
        }
      ],
      vip_show:0,
      vipMyinfo:{},
      vip_level:[
            {
             index:0,
             level:'当前'
            },
             {
             index:1,
             level:'未解锁'
            },
             {
             index:2,
             level:'未解锁'
            },
             {
             index:3,
             level:'未解锁'
            },
        ],
        percentage1:0,
        percentage2:0,
        percentage3:0,
        percentage4:0,
    };
  },
  methods: {
    ChangeSwiper(index) {
      console.log('轮播图'+index)
      this.vip_show=index
    },
    backBtn() {
      this.$router.push("/dashboard/mine");
    },
    onChange(index) {
      console.log(index + "页面暂无");
      // this.$router.push({path:'/tradeOrder',query:{index:index}});
    },
    //会员中心接口
    async VipInfo() {
      let VipInfo = await this.service.my.VipInfo({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token")
      });
      console.log(VipInfo);
      if (VipInfo.state === 10001) {
        VipInfo.data.fen.forEach(value => {
          this.mineListArray.push(value);
        });
        this.vipMyinfo= VipInfo.data.zong
        console.log(this.vipMyinfo)
        if(this.vipMyinfo.vip_level>1){
          this.vip_level[1].level="当前"
          this.percentage1=100;
          this.percentage2=this.vipMyinfo.vip_num/3000*100
          if(this.vipMyinfo.vip_level>2){
            this.vip_level[2].level="当前"
            this.percentage2=100;
            this.percentage3=this.vipMyinfo.vip_num/20000*100
            if(this.vipMyinfo.vip_level>3){
              this.vip_level[3].level="当前"
              this.percentage3=100;
              this.percentage3=this.vipMyinfo.vip_num/30000*100
            }
          }
        }
        else{
          this.percentage1=this.vipMyinfo.vip_num/200*100
        }
      }
    }
  },
  created() {
    this.VipInfo();
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  width: 100%;
  height: 100%;
  .mine-list {
    background: rgb(255, 255, 255);
    margin-left: 10px;
    width: 95%;
    border-radius: 10px;
    .list-item {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #f6f6f6;
      padding-left: 13px;
      box-sizing: border-box;
      .list-item-left {
        img {
          width: 20px;
          height: 20px;
        }
      }
      .list-item-center {
        margin-left: 10px;
        color: #1e1e1e;
      }
      .list-item-right {
        margin-right: 15px;
        img {
          width: 8px;
          height: 15px;
        }
      }
    }
  }

  .cardMenu {
    margin: 15px 0 0 10px;
    padding: 15px 0 0 0;
    position: relative;
    width: 95%;
    height: 90px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }
}

</style>