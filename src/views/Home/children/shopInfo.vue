<template>
  <div class="container" v-cloak>
    <nav-header
      style="color:rgba(68, 136, 99, 1)"
      :backShow="true"
      @btnClick="backBtn"
      title="商品详情"
    ></nav-header>
    <van-swipe :autoplay="3000" class="banner" style="padding-top:50px">
      <van-swipe-item v-for="(i, index) in imgList" :key="index">
        <img :src="i.object_url" style="width: 100%;height: 35vh;" />
      </van-swipe-item>
    </van-swipe>

    <div class="headerCard">
      <label>{{DetailData.goods_name}}</label>
      <br />
      {{DetailData.goods_content}}
    </div>

    <div style="width: 100%; height: 15px; background: #F6F6F6;"></div>

    <div style="padding:15px 0 0 15px;">
      <label>商品规格</label>
      <div class="guige_total">
        <button
          v-for="(item,index) in guige"
          :key="index"
          class="guige"
          :class="{active:index==idx}"
          @click="changeIdx(index)"
        >
          <span>￥{{item.price}}/{{item.num}}{{item.inventory_unit}}</span>
        </button>
      </div>
    </div>

    <!--  -->
    <van-goods-action class="cart_bottom">
      <van-goods-action-icon icon="star-o" text="收藏" v-if="likeState==1" @click="changeState()" />
      <van-goods-action-icon icon="star" text="已收藏" v-else @click="changeState()" />
      <van-goods-action-icon icon="cart-o" text="购物车" :info="info" @click="ToCart()" />
      <van-goods-action-button text="加入购物车" type="primary" @click="addGoods()" />
    </van-goods-action>
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
      imgList: [],
      DetailData: "",
      likeState: 1,
      info: "",
      guige: "",
      idx: 0,
      goods_id: "",
      guige_id: ""
    };
  },
  methods: {
    backBtn() {
      this.$router.go(-1);
    },
    ToCart() {
      this.$router.push("dashboard/shopcart");
    },
    changeIdx(e) {
      this.idx = e;
      this.guige_id = this.guige[e].id;
    },
    addGoods() {
      
      this.addCart();
    },
    changeState() {
      if (this.likeState == 1) {
        
        this.addUsed();
      } else {
        this.subUsed()
      }
    },
    //商品详情接口数据
    async getDetail() {
      let getDetail = await this.service.home.ProductDetail({
        id: this.$route.query.id
      });
      console.log(getDetail);
      if (getDetail.state === 10001) {
        this.imgList = getDetail.data.images;
        this.DetailData = getDetail.data;
        this.guige = getDetail.data.guige;
      }
    },
    //商品详情 购物车和家常用判断
    async Cartjudge() {
      let Cartjudge = await this.service.home.Cartjudge({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        goods_id: this.$route.query.id
      });
      console.log(Cartjudge);
      if (Cartjudge.state === 10001) {
        this.info = Cartjudge.data.number;
        this.likeState = Cartjudge.data.cy;
      } else {
        // alert('你好请登录')
      }
    },
    //  加常用接口
    async addUsed() {
      let addUsed = await this.service.home.addUsed({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        goods_id: this.$route.query.id
      });
      if(addUsed.state===10001){
       this.likeState = 2;
      }
    },
    //取消常用接口
    async subUsed() {
      let subUsed = await this.service.home.subUsed({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        goods_id: this.$route.query.id
      });
      if(subUsed.state===10001){
        this.likeState=1
      }
    },
    //加入购物车接口
    async addCart() {
      let addCart = await this.service.home.addCart({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        goods_id: this.$route.query.id,
        guige_id: this.guige_id
      });
      if(addCart.state===10001){
        this.info=addCart.data
        toast({
          text:addCart.msg,
          time:500
        })
      }
      else{
        toast({
          text:addCart.msg,
          time:500
        })
      }
    }
  },
  async created() {
    await this.getDetail();
    this.changeIdx(0)
    this.Cartjudge();
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  width: 100%;
  background: rgb(254, 254, 254);
  padding-bottom: 100px;
  .headerCard {
    padding: 10px 5% 0 5%;
    line-height: 30px;
    .money {
      .label1 {
        font-size: 25px;
        font-family: SimHei;
        font-weight: 400;
        color: rgba(68, 136, 99, 1);
      }
      .label2 {
        text-decoration: line-through;
        font-family: SimHei;
        font-weight: 400;
        color: rgba(181, 179, 178, 1);
      }
    }
    label {
      font-weight: bold;
      font-family: PingFang SC;
      color: rgba(30, 30, 30, 1);
    }
    p {
      line-height: 25px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(100, 100, 100, 1);
    }
  }
}
.banner {
  height: 200px;
}

//
.cart_bottom {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
//
.guige_total {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .guige {
    width: 100px;
    height: 40px;
    background-color: none;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 10px;
    color: white;
    font-size: 13px;
  }
}
.active {
  background: #448863ff !important;
}
</style>