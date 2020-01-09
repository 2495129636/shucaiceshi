<template>
  <div class="container">
    <nav-header
      @btnClick="backBtn"
      :backShow="true"
      shopSkeleton
      title="钱包"
      :detailShow="true"
      @btnDetail="onDetail"
    ></nav-header>

    <div class="top-bgc">
      <div class="header flex flex_y_center"></div>
      <div class="header-bottom flex">
        <div class="header-bottom-right flex_1">
          <div class="flex flex_x_center fw_b c_fff">{{balance}}</div>
          <div class="flex flex_x_center fw_500 fs13 c_fff">账户总额(元)</div>
        </div>
      </div>

      <div class="cardMoney">
        <label style="color:#999999;margin-left:20px">在线充值</label>
        <br />
        <div style="margin:10px 0 0 10px;">
          <van-button
            plain
            color="#646464"
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

        <div style="margin:110px 0 0 10px;">
          <p class="textTiShi">1.支付方式为：支付宝、微信、余额;</p>
          <p class="textTiShi">2.充值记录可能延时,仅供参考,请以实际余额</p>
        </div>
      </div>

      <div class="cardMoney2">
        <van-row type="flex" justify="center">
          <van-col span="22">
            <van-button
              type="primary"
              size="large"
              color="#448863"
              style="border-radius:8px;"
              @click="toSubmit"
            >充值{{addMoneyList[ageNum].number}}元</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import toast from "@/utils/toast";
import navHeader from "@/components/header";
import axios from "axios";
export default {
  components: {
    navHeader
  },
  data() {
    return {
      ageNum: 0,
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
      balance: "",
      e_balance: ""
    };
  },

  methods: {
    toSubmit() {
      this.$router.push("/balance/recharge");
    },
    onDetail() {
      this.$router.push("/balance/recharge/record");
    },
    onSubmit(index) {
      this.ageNum = index;
    },
    backBtn() {
      this.$router.push("/dashboard/mine");
    },
    async myYue() {
      let myYue = await this.service.my.myYue({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token")
      });
       console.log(myYue);
        if (myYue.state === 10001) {
          this.balance = myYue.data.balance; //余额
        }
    }
  },
  created() {
   this.myYue()
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  background: #f6f6f6;
  .top-bgc {
    width: 100%;
    height: 210px;
    background: #448863;
    // background-image: url(../../../assets/mine/children/balance_bgc.png);
    background-size: 100% 100%;
    .header {
      padding-top: 30px;
      box-sizing: border-box;
      .header-img {
        img {
          width: 22px;
          height: 22px;
          margin-left: 10px;
        }
      }
    }
    .header-bottom {
      margin-top: 45px;
      .header-bottom-left {
        border-right: 1px solid #ffffff;
        div:nth-child(1) {
          font-family: DINPro;
          font-size: 30px;
        }
        div:nth-child(2) {
          margin-top: 5px;
        }
      }
      .header-bottom-right {
        div:nth-child(1) {
          font-family: DINPro;
          font-size: 30px;
        }
        div:nth-child(2) {
          margin-top: 5px;
        }
      }
    }
  }
  .footer {
    padding: 0 75px;
    margin-top: 120px;
    .toBtn {
      width: 100%;
      height: 44px;
      background: rgba(255, 109, 0, 1);
      border-radius: 5px;
    }
    .fromBtn {
      width: 100%;
      height: 44px;
      border: 1px solid #ff6d00;
      border-radius: 5px;
      margin-top: 25px;
      background: none;
      color: #ff6d00;
    }
  }
  .cardMoney {
    margin: 0 auto;
    margin-top: 80px;
    padding: 10px 0 0 0;
    position: relative;
    width: 95%;
    height: 220px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }
  .cardMoney2 {
    float: left;
    margin: 80px 0 0 10px;
    padding: 10px 0 0 0;
    position: relative;
    width: 95%;
    height: 150px;
  }
  .textTiShi {
    // margin:10px 0 0 50px;
    color: rgba(100, 100, 100, 1);
    line-height: 41px;
  }
  .buttonshop {
    background: #448863 !important;
    // border: none !important;
    color: #ffffff !important;
    border: none !important;
  }
}
</style>