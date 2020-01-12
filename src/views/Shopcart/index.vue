<template>
  <div class="container" v-cloak>
    <nav-header style="color:rgba(68, 136, 99, 1)" :backShow="false" title="购物车"></nav-header>

    <div v-if="shopList.length<1" class="Cart">
      <img src="../../assets/home/cartnull.png" />
      <p>购物车还没有商品，快去添加吧！</p>
      <button @click="Choose()">去挑选</button>
    </div>
    <div v-else class="shopTotal">
      <div v-for="(i,index) in shopList" :key="index" class="goodlist">
        <div class="goods_img">
          <div>
            <van-checkbox icon-size="14px" v-model="i.ischecked" @click="danxuan(index)"></van-checkbox>
          </div>
          <div>
            <img :src="i.goods_img" alt />
          </div>
        </div>

        <div class="goods_right">
          <div class="goods_title">
            <span>{{i.goods_name}}</span>
          </div>
          <div class="goods_content">
            <p>{{i.goods_content}}</p>
          </div>
          <div class="goods_bottom">
            <span>￥{{i.price+'/'+i.value+i.inventory_unit}}</span>
            <span>
              <van-stepper v-model="i.number" integer min="0" disable-input @plus="plus(i.id)" @minus="minus(i.id)" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- <van-divider dashed>您可能还需要</van-divider> -->
    <van-submit-bar style="margin:0 0px 45px 0px;width:100%" button-text="提交订单" @submit="onSubmit">

      <van-checkbox v-model="isCheckAll" @click="checkAll">全选</van-checkbox>
      <span>合计：<span class="span_qian">￥</span><span class="span_price">{{Totalprice}}</span></span>
    </van-submit-bar>
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
        Totalprice: 0,
        result: [],
        isChecked: true,
        isCheckAll: false,
        cartId: "",
        money: 0,
        pushId: [],
        shopList: [],
        topLabelList: [
          {
            index: 0,
            title: "我的清单"
          },
          {
            index: 1,
            title: "城市热卖"
          }
        ]
      };
    },
    watch: {},
    methods: {
      onSubmit() {
        if (this.Totalprice !== 0) {

          this.pushId = []
          this.shopList.map((val) => {
            if (val.ischecked === true) {
              this.pushId.push(val.id)
            }
          })
          console.log(this.pushId)
          
          sessionStorage.setItem('pushId',JSON.stringify(this.pushId))
          this.$router.push('/orders')
          
        }
      },
      Choose() {
        this.$router.push("shoping");
      },
      //获取价格
      getPrice() {
        this.Totalprice = 0
        this.shopList.map(i => {
          if (i.ischecked == true) {
            this.Totalprice = this.Totalprice + i.price * i.number;
          }
        });
        return this.Totalprice;
      },
      //全选
      checkAll(e) {
        if (!this.isCheckAll) {
          this.shopList.map(i => {
            i.ischecked = true;
          });
        } else {
          this.shopList.map(i => {
            i.ischecked = false;
          });
        }
        this.getPrice()
      },
      // 单选
      danxuan(e) {
        this.shopList[e].ischecked = !this.shopList[e].ischecked;
        if (
          this.shopList.every(val => {
            return val.ischecked === true;
          })
        ) {
          this.isCheckAll = true;
        } else if (
          this.shopList.some(val => {
            return val.ischecked == false;
          })
        ) {
          this.isCheckAll = false;
        }
        this.getPrice()
        console.log(this.Totalprice)
      },
      //增加按钮触发
      async plus(e) {
        this.cartId = e;
        await this.CartAdd();
        this.getPrice()
      },
      async minus(e) {
        this.cartId = e;
        await this.CartSub();
        this.getPrice()
      },

      //购物车信息接口
      async CartInfo() {
        let CartInfo = await this.service.home.CartInfo({
          user_id: localStorage.getItem("user_id"),
          token: localStorage.getItem("token")
        });
        console.log(CartInfo);
        if (CartInfo.state === 10001) {
          this.shopList = CartInfo.data;
          console.log(this.shopList);
        }
      },
      //购物车加一
      async CartAdd() {
        let CartAdd = await this.service.home.CartAdd({
          user_id: localStorage.getItem("user_id"),
          token: localStorage.getItem("token"),
          id: this.cartId
        });
      },
      //购物车减一
      async CartSub() {
        let CartSub = await this.service.home.CartSub({
          user_id: localStorage.getItem("user_id"),
          token: localStorage.getItem("token"),
          id: this.cartId
        });
        if (CartSub.state === 10003) {
          this.CartInfo();
        }
      }
    },
    created() {
      this.CartInfo();
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

  .Cart {
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 140px;
      height: 140px;
    }

    p {
      font-size: 15px;
      font-weight: 400;
      color: rgba(30, 30, 30, 1);
      margin: 10px 0;
    }

    button {
      width: 150px;
      height: 35px;
      border: 2px solid rgba(68, 136, 99, 1);
      border-radius: 35px;
      color: #448863ff;
      background: none;
    }
  }

  //
  .shopTotal {
    width: 100%;
    background-color: #f6f6f6ff;
    margin-top: 50px;
    border-top: 1px solid #f6f6f6ff;
  }

  .goodlist {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 80px;
    padding: 20px 0;
    background-color: #ffffffff;
    margin: 10px 0;

    .goods_img {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 80px;
      width: 100px;
      justify-content: space-between;

      div {
        img {
          width: 75px;
          height: 80px;
        }
      }
    }

    .goods_right {
      width: 220px;
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
        max-height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
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
  }

  //
  .van-submit-bar__bar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .span_qian {
    color: red;
  }

  .span_price {
    font-size: 24px;
    color: red;
  }
</style>