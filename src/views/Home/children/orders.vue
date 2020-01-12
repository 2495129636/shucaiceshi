<template>
  <div class="container">
    <nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="订单确认"></nav-header>

    <van-button
      :plain="btnShow"
      type="primary"
      class="buttonshop"
      color="#448863"
      @click="onSubmit(0)"
    >自提</van-button>
    <van-button
      :plain="!btnShow"
      type="primary"
      class="buttonshop"
      color="#448863"
      @click="onSubmit(1)"
    >送货上门</van-button>

    <div class="cardMenu" v-if="!btnShow">
      <label style="margin-left:20px;font-size:14px;">
        <b>自提地址</b>
      </label>
      <p style="margin-left:20px;">地址：内蒙古自治区赤峰市红山区站前街火车站 售票厅</p>
      <p style="margin-left:20px;">联系电话：18618339353</p>
    </div>
    <div class="cardMenu" v-else>
      <label style="margin-left:20px;font-size:14px;">
        <b>收货地址</b>
      </label>
      <span class="chengaddress" @click="chengeAdress(addressInfo.id)">
        更换地址
        <img src="./../../../assets/mine/children/right.png" alt />
      </span>
      <p style="margin-left:20px;">收货人：{{addressInfo.name}}</p>
      <p style="margin-left:20px;">联系电话：{{addressInfo.phone}}</p>
      <p style="margin-left:20px;">地址：{{addressInfo.address}}</p>
    </div>

    <div v-for="(i,index) in itemGoodsList" :key="index" class="goodlist">
      <div class="goods_img">
        <img :src="i.goods_img" alt />
      </div>

      <div class="goods_right">
        <div class="goods_title">
          <span>{{i.goods_name}}</span>
        </div>
        <div class="goods_content">
          <p>规格：{{i.value+i.inventory_unit}}</p>
        </div>
        <div class="goods_bottom">
          <span>单价：￥{{i.price}}</span>
        </div>
        <div class="goods_bottom" v-if="is_open_vip_price==1">
          <span>会员价：￥{{i.price}}</span>
        </div>
        <div class="goods_bottom" v-if="is_limited_time_purchase==1">
          <span>限时购价：￥{{i.price}}</span>
        </div>
      </div>
      <div class="goods_right_right">
        <span>数量：{{i.number}}</span>
      </div>
    </div>
    <!--  -->

    <div class="cardMenu3">
      <div class="list-item flex">
        <div class="list-item-center fs15 flex flex_y_center">商品金额</div>
        <div
          class="list-item-right flex_center flex flex_1 flex_x_right"
          style="margin-right:20px"
        >¥{{shopMoney}}</div>
      </div>
      <div class="list-item flex">
        <div class="list-item-center fs15 flex flex_y_center">配送费</div>
        <div
          class="list-item-right flex_center flex flex_1 flex_x_right"
          style="margin-right:20px"
        >¥{{courierMoney}}</div>
      </div>
      <div class="list-item flex">
        <van-cell-group>
          <van-field v-model="message" label="备注" type="text" maxlength="200" placeholder="请输入留言" />
        </van-cell-group>
      </div>
    </div>
    <div class="cardMenu3 cardMenu4">
      <div class="list-item flex">
        <div class="list-item-center fs15 flex flex_y_center">账户余额</div>
        <div
          class="list-item-right flex_center flex flex_1 flex_x_right"
          style="margin-right:20px"
        >¥{{balanceMoney}}</div>
      </div>

      <van-radio-group v-model="radio">
        <div class="list-item flex">
          <div class="list-item-left flex_center">
            <img src="../../../assets/code/code3.png" />
          </div>
          <div class="list-item-center fs15 flex flex_y_center">支付宝支付</div>
          <div
            class="list-item-right flex_center flex flex_1 flex_x_right"
            style="margin-right:20px"
          >
            <van-radio name="1" checked-color="#448863" @click="changeradio" />
          </div>
        </div>

        <div class="list-item flex">
          <div class="list-item-left flex_center">
            <img src="../../../assets/code/code2.png" />
          </div>
          <div class="list-item-center fs15 flex flex_y_center">微信支付</div>
          <div
            class="list-item-right flex_center flex flex_1 flex_x_right"
            style="margin-right:20px"
          >
            <van-radio name="2" checked-color="#448863" @click="changeradio" />
          </div>
        </div>

        <div class="list-item flex">
          <div class="list-item-left flex_center">
            <img src="../../../assets/code/code1.png" />
          </div>
          <div class="list-item-center fs15 flex flex_y_center">余额支付</div>
          <div
            class="list-item-right flex_center flex flex_1 flex_x_right"
            style="margin-right:20px"
          >
            <van-radio name="3" checked-color="#448863" @click="changeradio" />
          </div>
        </div>
      </van-radio-group>

      <van-submit-bar button-text="支付" @submit="onSubmitForm">
        <span>
          合计：
          <span class="span_qian">￥</span>
          <span class="span_price">{{Totalprice}}</span>
        </span>
      </van-submit-bar>
      <!--  -->
      <!-- 密码输入框 -->
      <van-password-input class="input_pass" v-if="input_passState"

        :value="InputPassvalue"
        info="密码为 6 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />

      <!-- 数字键盘 -->
      <van-number-keyboard
      v-if="input_passState"
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
      
      
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
      InputPassvalue: '',
      showKeyboard: true,
      // 
      Totalprice: 0,
      radio: "1",
      shopMoney: 0,
      courierMoney: 0,
      message: "",
      balanceMoney: 0,
      number: 0,
      btnShow: false,
      imgList: [],
      addressInfo: "",
      itemGoodsList: "",
      z_status: 2,
      input_passState:false,
      OrderCommitId:'',
      gw_id:''
    };
  },
  methods: {
    changeradio() {
      console.log(this.radio);
    },

    //订单支付
    onSubmitForm() {
      
      if (this.radio == 3) {
         this.OrderCommit();
      }
    },
    onSubmit(index) {
      if (index == 0) {
        this.btnShow = false;
        this.Totalprice = this.shopMoney;
        this.z_status = 2;
      } else {
        this.btnShow = true;
        this.Totalprice = this.shopMoney + this.courierMoney;
        this.z_status = 1;
      }
    },

    backBtn() {
      this.$router.push('/dashboard/shopcart')
    },
    //更换地址
    chengeAdress(e) {
      this.$router.push("/addressOrder");
    },
    //购物车结算
    async CartPay() {
       this.gw_id=JSON.parse(sessionStorage.getItem("pushId"))
      let CartPay = await this.service.order.CartPay({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        gw_id: this.gw_id
      });
      if (CartPay.state === 10001) {
        this.addressInfo = CartPay.data.address;
        this.balanceMoney = CartPay.data.zhye;
        this.shopMoney = CartPay.data.price;
        this.courierMoney = CartPay.data.psf;
        this.itemGoodsList = CartPay.data.goods;
       
      }
    },
    //提交订单 (余额结算)
    async OrderCommit() {
      let OrderCommit = await this.service.order.OrderCommit({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        gw_id: this.gw_id,
        z_status: this.z_status,
        address_id: this.addressInfo.id,
        remark: this.message
      });
      console.log(OrderCommit);
      if(OrderCommit.state===10001){
        this.OrderCommitId = OrderCommit.data
         this.input_passState=true
      }
    },
    //支付框密码验证
    async PayAndCommit(){
    let PayAndCommit=await this.service.order.PayAndCommit({
      user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        order_id:this.OrderCommitId,
        paycode:this.InputPassvalue,
    })
    console.log(PayAndCommit)
    console.log(this.OrderCommitId)
    },
    // 支付密码键盘输入
     onInput(key) {
      this.InputPassvalue = (this.InputPassvalue + key).slice(0, 6);
      if(this.InputPassvalue.length===6){
        this.PayAndCommit()
        this.input_passState=false
        
      }
    },
    onDelete() {
      this.InputPassvalue = this.InputPassvalue.slice(0, this.InputPassvalue.length - 1);
    }
  },
  async created() {
    await this.CartPay();
    this.onSubmit(0);
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  background: #f6f6f6;
  padding-top: 54px;
  box-sizing: border-box;
  width: 100%;
  .cardMenu {
    margin: 60px 0 0 10px;
    padding: 10px 0 0 0;
    position: relative;
    width: 95%;
    height: 90px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }
  .cardMenu3 {
    margin: 10px 0 0 10px;
    padding: 10px 0 0 0;
    position: relative;
    width: 95%;
    height: 190px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
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
    img {
      width: 28px;
      height: 28px;
    }
  }
}
.buttonshop {
  float: left;
  margin-left: 10px;
  width: 170px;
}
.chengaddress {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 13px;
  img {
    height: 20px;
    width: 20px;
  }
}
//
.goodlist {
  width: 360px;
  margin: 5px auto;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #ffffffff;
  height: 80px;
  padding: 20px 0;
  align-items: center;

  .goods_img {
    img {
      width: 75px;
      height: 80px;
    }
  }
  .goods_right {
    width: 180px;
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
      font-size: 14px;
      font-weight: 400;
      color: rgba(68, 136, 99, 1);
    }
    .goods_bottom {
      font-size: 14px;
      font-weight: 400;
      color: rgba(68, 136, 99, 1);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .goods_right_right {
    font-size: 14px;
    color: rgba(68, 136, 99, 1);
  }
}
.span_qian {
  color: red;
}

.span_price {
  font-size: 24px;
  color: red;
  margin-right: 10px;
}
//
.cardMenu4 {
  margin-bottom: 60px !important;
}
.input_pass{
  margin-bottom: 300px;
}
</style>