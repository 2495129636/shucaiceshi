<template>
  <div class="container">
    <nav-header @btnClick="backBtn" :backShow="true" title="订单管理"></nav-header>

    <van-tabs @change="onTopLable" style="padding-top:40px;" v-model="active">
      <van-tab v-for="(i,index) in topLabelList" :title="i.title" :key="index"></van-tab>
    </van-tabs>
    <div
      v-for="(i,index) in orderList"
      :key="index"
      style="margin:10px 10px 0 10px;background-color:#FFFFFF;"
    >
      <div style="margin-left:20px;float:left;">
        <br />
        订单号：{{i.order_number}}
      </div>
      <div style="text-align:right;margin-right:20px;color:rgba(68, 136, 99, 1)">
        <br />
        <span>{{i.o_status}}</span>
      </div>
      <van-card
        v-for="(item,index) in i.goods"
        :key="index"
        :price="item.price"
        :num="item.number"
        :desc="item.goods_content"
        :title="item.goods_name"
        :thumb="item.goods_img"
      >
        <div slot="footer" style="float:left;padding-top:20px">
          <label>共{{i.number}}件商品 合计:￥{{i.x_money}}</label>
        </div>
        <div
          slot="footer"
          style="font-family:PingFang SC;font-weight:400;color:rgba(30,30,30,1);padding-top:20px"
        >
          <label v-if="i.o_status=='待收货'" @click="confirmget(i.id)">确认收货</label>
          <label v-if="i.o_status=='待付款'" @click="cardInfo(i.id,i.o_status)">立即付款</label>
          <label v-if="i.o_status=='待发货'"  @click="cardInfo(i.id,i.o_status)">查看详情</label>
          <label v-if="i.o_status=='已完成'" @click="cardInfo(i.id,i.o_status)">查看详情</label>
        </div>
      </van-card>
    </div>
    <div v-if="dialogShow" class="dialog">
      <div class="tips">
        <div class="tips_title flex_center fs16">是否确认收货</div>
        <div class="flex tips_state">
          <div @click="confirm" class="cancel flex_1 flex_center fs15">确定</div>
          <div @click="cancel" class="Determine flex_1 flex_center fs15">取消</div>
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
      active: 0,
      money: 0,
      number: 0,
      title: "标题",
      topLabelList: [
        {
          index: 0,
          title: "全部"
        },
        {
          index: 1,
          title: "待付款"
        },
        {
          index: 2,
          title: "代发货"
        },
        {
          index: 3,
          title: "待收货"
        },
        {
          index: 4,
          title: "已完成"
        }
      ],
      orderList: "",
      dialogShow: false,
      order_id: ""
    };
  },
  methods: {
    //打开确认收货
    confirmget(e) {
      this.dialogShow = true;
      this.order_id = e;
    },
    confirm() {
      this.dialogShow = false;
      this.getGoodsDetails();
    },
    cancel() {
      this.dialogShow = false;
      this.order_id = "";
    },
    //去订单详情
    cardInfo(e,f) {
      this.$router.push({
        path: "/tradeOrder/tradeOrderInfo",
        query: {
          order_id : e,
        state:f
          }
      });
    },
    backBtn() {
      this.$router.push("/dashboard/mine");
    },
    onTopLable(index) {
      // console.log("菜单切换" + index);
      this.$router.push({ path: "/tradeOrder", query: { index: index } });
      this.PayList();
    },
    init() {
      this.active = this.$route.query.index;
    },
    //
    async PayList() {
      let PayList = await this.service.order.PayList({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        order_status: this.$route.query.index
      });
      console.log(PayList);
      if (PayList.state === 10001) {
        this.orderList = PayList.data;
        console.log(this.orderList);
      } else {
        this.orderList = [];
      }
    },
    //待收货确认
    async getGoodsDetails() {
      let getGoodsDetails = await this.service.order.getGoodsDetails({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        order_id: this.order_id
      });
      console.log(getGoodsDetails);
    },
   
  },
  created() {
    this.PayList();
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  width: 100%;
  background: #f6f6f6;
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
.van-card {
  background: #ffffff;
}
.van-card__title {
  margin-top: 20px;
}
//确认收货 提示框
.dialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  position: fixed;
  .tips {
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    width: 250px;
    .tips_title {
      height: 80px;
      color: #23252f;
      border-bottom: 1px solid #dddee3;
    }
    .tips_state {
      height: 44px;
      .cancel {
        color: #0a60ff;
        border-right: 1px solid #dddee3;
      }
      .Determine {
        color: #0a60ff;
      }
    }
  }
}
</style>