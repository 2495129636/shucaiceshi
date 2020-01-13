<template>
  <div class="container">
    <div style="background: #F6F6F6;">
      <div class="mine-bgc flex">
        <label class="settingIcon">
          <van-icon name="setting-o" color="#F6F6F6" size="30" @click="setting" />
        </label>
        <div class="header-touxiang">
          <img src="../../assets/mine/mine_header.png" />
        </div>

        <div class="header-xinxi">
          <p class="header-name c_fff fs18 fw_b" style="font-size:15px;">{{user_name}}</p>

          <p style="float:left" class="header-company c_fff fs14 fw_400" @click="vipBtn">
            <span>{{vip_level}}{{vip_num}}/{{consumption_amount}}＞</span>
          </p>

          <div class="wallet" @click="walletSubmit">
            <span>{{balance}}</span>
             <span>钱包</span>
          </div>
        </div>
      </div>

      <div class="cardMenu">
        <label style="color:#999999;margin-left:20px">我的订单</label>
        <van-tabbar
          :border="false"
          v-model="active"
          @change="onChange()"
          :fixed="false"
          style="margin-top:10px"
        >
          <van-tabbar-item>
            <span>全部</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? menu1_icon.active : menu1_icon.inactive"
            />
          </van-tabbar-item>
          <van-tabbar-item>
            <span>待付款</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? menu2_icon.active : menu2_icon.inactive"
            />
          </van-tabbar-item>
          <van-tabbar-item>
            <span>待发货</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? menu3_icon.active : menu3_icon.inactive"
            />
          </van-tabbar-item>
          <van-tabbar-item>
            <span>待收货</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? menu4_icon.active : menu4_icon.inactive"
            />
          </van-tabbar-item>
        </van-tabbar>
      </div>
      <div class="cardMoney">
        <label style="color:#999999;margin-left:20px">在线充值</label>
        <br />
        <div style="margin:10px 0 0 10px;">
          <van-button
            plain
            v-for="(i,index) in addMoneyList"
            :key="index"
            type="primary"
            :class="{buttonshop:ageNum==index}"
            @click="onSubmit(index)"
            style="height:80px;float:left;margin-left:10px;line-height:30px"
          >
            <p>{{i.number}}元</p>
            <p>充值金额</p>
          </van-button>
        </div>
        <!-- <van-button :plain="!btnShow" type="primary" class="buttonshop" color="#448863" @click="onSubmit(1)">送货上门</van-button> -->
        <van-button plain hairline type="primary" style="width:90%;margin:20px 0 0 20px">立即充值</van-button>
      </div>

      <div style="width: 100%; height: 5px; background: #F6F6F6;"></div>

      <div class="mine-list" style="padding-top:10px">
        <div
          style="color:#999999;margin-left:20px;border-bottom: 1px solid #F6F6F6;height:30px"
        >常用工具</div>

        <div
          v-for="(i,index) in mineListArray"
          :key="index"
          @click="listBtn(index)"
          class="list-item flex"
        >
          <div class="list-item-left flex_center">
            <img :src="i.images" />
          </div>
          <div class="list-item-center fw_b fs15 flex flex_y_center">{{i.name}}</div>
          <div class="list-item-right flex_center flex flex_1 flex_x_right">
            <img src="../../assets/mine/mine-right.png" />
          </div>
        </div>
        <div style="text-align:center;margin-top:20px;color:#999999;">版本号v1.0.0</div>
      </div>
    </div>
  </div>
</template>

<script>
import navHeader from "@/components/header";
import axios from "axios";
export default {
  components: {
    navHeader
  },
  data() {
    return {
      addMoneyList: [
        {
          number: 10
        },
        {
          number: 20
        },
        {
          number: 30
        }
      ],
      ageNum: 0,
      btnShow: false,
      money: "9.00",
      user_name: "",
      vip_level: "",
      balance: 0.0,
      vip_num: 0,
      consumption_amount: 0,
      active: "",
      menu1_icon: {
        active: require("../../assets/home/menu1.png"),
        inactive: require("../../assets/home/menu1.png")
      },
      menu2_icon: {
        active: require("../../assets/home/menu2.png"),
        inactive: require("../../assets/home/menu2.png")
      },
      menu3_icon: {
        active: require("../../assets/home/menu3.png"),
        inactive: require("../../assets/home/menu3.png")
      },
      menu4_icon: {
        active: require("../../assets/home/menu4.png"),
        inactive: require("../../assets/home/menu4.png")
      },
      mineListArray: [
        {
          name: "收获地址管理",
          images: require("../../assets/mine/yver.png")
        },
        {
          name: "支付密码",
          images: require("../../assets/mine/yver.png")
        },
        {
          name: "帮助中心",
          images: require("../../assets/mine/geren.png")
        },
        {
          name: "反馈问题",
          images: require("../../assets/mine/renlian.png")
        },
        {
          name: "联系客服",
          images: require("../../assets/mine/kefu.png")
        }
      ]
    };
  },
  methods: {
    vipBtn() {
      this.$router.push("/vipInfo");
    },
    walletSubmit() {
      this.$router.push("/balance");
    },
    onSubmit(index) {
      this.ageNum = index;
    },
    onChange() {
      console.log(this.active + "菜单");
      this.$router.push({ path: "/tradeOrder", query: { index:this.active  } });
    },
    setting() {
      this.$router.push("/setting");
    },
    listBtn(index) {
      switch (index) {
        case 0:
          this.$router.push("/address");
          break;
        case 1:
          this.$router.push("/chengepass");
          break;
        case 2:
          this.$router.push("/data");
          break;
        case 3:
          this.$router.push("/problem");
          break;
        case 4:
          this.$router.push("/jurisdiction");
          break;
        case 6:
          console.log(6);
          break;
      }
    },
    async myinfo() {
      let myinfo = await this.service.my.myinfo({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token")
      });
      console.log(myinfo);
      if (myinfo.state === 10001) {
        this.user_name = myinfo.data.user_name; //姓名
        this.vip_level = myinfo.data.vip_level; //会员等级
        this.balance = myinfo.data.balance; //余额
        this.vip_num = parseInt(myinfo.data.vip_num); //消费金额
        this.consumption_amount = myinfo.data.consumption_amount; //达标金额
      }
    }
  },
  created() {
    this.myinfo();
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  width: 100%;
  height: 100%;
  .mine-bgc {
    // float:left;
    width: 100%;

    height: 30vh; //如果有错位调这里

    background-image: url(../../assets/home/myback.png);
    background-size: 100%;
    // background-position: center;
    background-repeat: no-repeat;
    padding-top: 50px;
    padding-left: 35px;
    box-sizing: border-box;
    .settingIcon {
      position: absolute;
      top: 0;
      right: 0;
    }
    .header-touxiang {
      img {
        width: 80px;
        height: 80px;
      }
    }
    .header-xinxi {
      margin-left: 20px;
      .header-name {
        margin-top: 10px;
      }
      .header-company {
        height: 30px;
        margin-top: 10px;
        background: rgba(111, 182, 143, 1);
        border-radius: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 160px;
        span {
          margin-left: 10px;
          border-bottom: 2px solid;
          font-size:12px;
        }
       
      }
       .wallet {
          position: absolute;
          right: 15px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color:#FFFEFFFF;
        }
    }
  }

  .mine-list {
    background: rgb(255, 255, 255);
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
  .cardMoney {
    margin: 10px auto;

    padding: 10px 0 0 0;
    position: relative;
    width: 95%;
    height: 190px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }
  .cardMenu {
    margin: 0 auto;
    margin-top: -10px;
    padding: 10px 0 0 0;
    position: relative;
    width: 95%;
    height: 90px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }
  .buttonshop {
    background: #448863 !important;
    // border: none !important;
    color: #ffffff !important;
  }
}
.van-icon-setting-o{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>