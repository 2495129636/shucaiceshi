<template>
  <div class="container">
    <nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="订单管理"></nav-header>

    <div class="cardMenu">
      <p>
        <b>收货地址</b>
      </p>
      <p>
        收货人：{{dataList.address.name}}
        <label>联系电话：{{dataList.address.phone}}</label>
      </p>
      <p>地址：{{dataList.address.address}}</p>
      <van-card
        v-for="(item,index) in dataList.goods"
        :key="index"
        :price="item.money"
        :num="item.number"
        :desc="item.goods_content"
        style="background:rgb(255, 255, 255);"
        :title="item.goods_name"
        :thumb="item.goods_img"
      ></van-card>

      <div>
        <br />
        <p>订单编号：{{dataList.order_number}}</p>
        <p>下单时间：{{dataList.create_time}}</p>
        <p>订单金额：￥{{dataList.money}}</p>
        <p>取货方式：{{dataList.qfhs}}</p>
        <p>订单状态：{{dataList.o_status}}</p>
      </div>
    </div>

    <div class="cardMenu3" v-if="state">
      <div class="list-item flex">
        <div class="list-item-center fs15 flex flex_y_center">账户余额</div>
        <div
          class="list-item-right flex_center flex flex_1 flex_x_right"
          style="margin-right:20px"
        >¥{{balanceMoney}}</div>
      </div>

      <van-radio-group v-model="radioValue" class="radiogr">
        <div class="list-item flex" @click="changeradio">
          <div class="list-item-left flex_center">
            <img src="../../../assets/code/code3.png" />
          </div>
          <div class="list-item-center fs15 flex flex_y_center">支付宝支付</div>
          <div
            class="list-item-right flex_center flex flex_1 flex_x_right"
            style="margin-right:20px"
          >
            <van-radio checked-color="#448863" name="1" />
          </div>
        </div>

        <div class="list-item flex" @click="changeradio">
          <div class="list-item-left flex_center">
            <img src="../../../assets/code/code2.png" />
          </div>
          <div class="list-item-center fs15 flex flex_y_center">微信支付</div>
          <div
            class="list-item-right flex_center flex flex_1 flex_x_right"
            style="margin-right:20px"
          >
            <van-radio checked-color="#448863" name="2" />
          </div>
        </div>

        <div class="list-item flex" @click="changeradio">
          <div class="list-item-left flex_center">
            <img src="../../../assets/code/code1.png" />
          </div>
          <div class="list-item-center fs15 flex flex_y_center">余额支付</div>
          <div
            class="list-item-right flex_center flex flex_1 flex_x_right"
            style="margin-right:20px"
          >
            <van-radio checked-color="#448863" name="3" />
          </div>
        </div>
      </van-radio-group>

      <!--  -->
      <!-- 密码输入框 -->

      <div class="passdialog" v-if="input_passState">
        <van-password-input
          class="input_pass"
          :value="InputPassvalue"
          info="密码为 6 位数字"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
      </div>

      <!-- 数字键盘 -->
      <van-number-keyboard
        v-if="input_passState"
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
      <!--  -->

      <van-submit-bar button-text="支付" @submit="onSubmitForm">
        <span>
          合计：
          <span class="span_qian">￥</span>
          <span class="span_price">{{totalMoney}}</span>
        </span>
      </van-submit-bar>
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
      radioValue: 1,
      dataList: "",
      balanceMoney: "",
      totalMoney: "",
      input_passState: false,
      state: false,
      showKeyboard: true,
      InputPassvalue: ""
    };
  },
  methods: {
    //订单支付
    onSubmitForm() {
      if (this.radioValue == 3) {
        // this.orderDiaoq()
        this.input_passState = true;
      } else {
        toast({
          text: "暂时没有开通此功能",
          time: 1000
        });
      }
    },
    backBtn() {
      this.$router.push("/tradeOrder");
    },
    changeradio() {
      console.log(this.radioValue);
    },
    //订单详情
    async payDetails() {
      let payDetails = await this.service.order.payDetails({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        order_id: this.$route.query.order_id
      });
      console.log(payDetails);
      this.dataList = payDetails.data;
      console.log(this.dataList);
    },
    //待付款去支付
    // async orderDiaoq() {
    //   let orderDiaoq = await this.service.order.orderDiaoq({
    //     user_id: localStorage.getItem("user_id"),
    //     token: localStorage.getItem("token"),
    //     order_id: this.$route.query.order_id
    //   });
    //   console.log(orderDiaoq);
    //   this.dataList = orderDiaoq.data;
    //   console.log(this.orderDiaoq);
    //   this.balanceMoney = this.orderDiaoq.zhye;
    //   this.totalMoney = this.orderDiaoq.money;
    // },
    // 支付密码键盘输入
    onInput(key) {
      this.InputPassvalue = (this.InputPassvalue + key).slice(0, 6);
      if (this.InputPassvalue.length === 6) {
        this.PayAndCommit();
        this.input_passState = false;
      }
    },
    onDelete() {
      this.InputPassvalue = this.InputPassvalue.slice(
        0,
        this.InputPassvalue.length - 1
      );
    },
    //支付框密码验证
    async PayAndCommit() {
      let PayAndCommit = await this.service.order.PayAndCommit({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        order_id: this.$route.query.order_id,
        paycode: this.InputPassvalue
      });
      console.log(PayAndCommit);
      if (PayAndCommit.state === 10001) {
        toast({
          text: PayAndCommit.msg,
          time: 1000
        });
        this.$router.go(-1);
      } else {
        toast({
          text: PayAndCommit.msg,
          time: 1000
        });
        this.InputPassvalue=''
      }
    },
    //待付款去支付
    async awaitPay() {
      let awaitPay = await this.service.order.awaitPay({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        order_id: this.$route.query.order_id
      });
      console.log(awaitPay);
      this.dataList = awaitPay.data;
      console.log(this.dataList);
      this.balanceMoney = this.dataList.zhye;
      this.totalMoney = this.dataList.money;
    }
  },
  created() {
    if (this.$route.query.state == "待付款") {
      this.state = true;
      this.awaitPay();
    } else {
      this.payDetails();
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  width: 100%;
  background: #f6f6f6;
  .cardMenu {
    padding-top: 60px;
    margin-left: 10px;
    position: relative;
    width: 95%;
    height: 420px;
    background: rgb(255, 255, 255);
    text-align: left;
    p {
      color: rgba(30, 30, 30, 1);
      line-height: 30px;
      padding-left: 20px;
      label {
        margin-left: 30px;
      }
    }
  }
  .cardMenu3 {
    margin: 10px 0 0 10px;
    position: relative;
    width: 95%;
    height: 190px;
    background: rgb(255, 255, 255);
    // border-radius:10px;
  }
  .list-item {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #f6f6f6;
    padding-left: 13px;
    box-sizing: border-box;
    .list-item-center {
      margin-left: 10px;
      color: #1e1e1e;
    }
  }
}
.radiogr {
  margin-bottom: 120px;
}
//
.span_qian {
  color: red;
}

.span_price {
  font-size: 24px;
  color: red;
  margin-right: 10px;
}
//
.passdialog /deep/ {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 99;
  .input_pass {
    position: fixed;
    margin: 0 auto;
    width: 92%;
    top: 40%;
  }
  .van-password-input__info {
    position: fixed;
    top: 48%;
    left: 30%;
  }
}
.van-submit-bar {
  z-index: 60;
}
</style>