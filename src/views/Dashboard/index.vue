<template>
  <div class="container">
    <van-tabbar v-model="active" :inactive-color="textCode" :active-color="textCode_select">
      <van-tabbar-item replace to="/dashboard/home">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? home_icon.active : home_icon.normal"
        />
      </van-tabbar-item>

      <van-tabbar-item replace to="/dashboard/shoping">
        <span>商城</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? shoping_icon.active : shoping_icon.normal"
        />
      </van-tabbar-item>

      <van-tabbar-item replace to="/dashboard/recommend">
        <span>推荐</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? recommend_icon.active : recommend_icon.normal"
        />
      </van-tabbar-item>

      <van-tabbar-item replace to="/dashboard/shopcart">
        <span>购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? cart_icon.active : cart_icon.normal"
        />
      </van-tabbar-item>

      <van-tabbar-item replace to="/dashboard/mine">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? shop_icon.active : shop_icon.normal"
        />
      </van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      textCode: "#646464",
      textCode_select: "#448863",
      active: Number(sessionStorage.getItem("tabBarActiveIndex")) || 0,
      home_icon: {
        normal: require("@/assets/tabber/home.png"),
        active: require("@/assets/tabber/home_on.png")
      },
      shop_icon: {
        normal: require("@/assets/tabber/mine.png"),
        active: require("@/assets/tabber/mine_on.png")
      },
      shoping_icon: {
        normal: require("@/assets/tabber/shoping.png"),
        active: require("@/assets/tabber/shoping_on.png")
      },
      recommend_icon: {
        normal: require("@/assets/tabber/remm.png"),
        active: require("@/assets/tabber/remm_on.png")
      },
      cart_icon: {
        normal: require("@/assets/tabber/cart.png"),
        active: require("@/assets/tabber/cart_on.png")
      }
    };
  },
  watch: {
    active(value) {
      let tabBarActiveIndex = value > 0 ? value : 0;
      // 缓存到本地
      sessionStorage.setItem("tabBarActiveIndex", value);
    }
  },
  methods: {
    codeBtn() {
      this.$router.push("/dashboard/code");
    }
  },
  created() {
    this.active = this.$route.query.active;
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .tabbar_center {
    width: 50px;
    height: 50px;
    border: 1px solid #ebedf0;
    background: #fff;
    position: absolute;
    border-radius: 50%;
    left: 50%;
    margin-left: -25px;
    top: -17px;
    z-index: 99;
    .none_border {
      width: 60px;
      height: 50px;
      background: #fff;
      position: absolute;
      top: 17px;
    }
  }
  .tabbar-fabu {
    width: 40px;
    height: 40px;
    background: red;
    background: url(../../assets/tabber/sweep_code.png);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    z-index: 9;
  }
}

/deep/ .van-hairline--top-bottom {
  z-index: 9;
}

/deep/ .van-tabbar {
  height: 50px;
  .van-tabbar-item__icon {
    width: 20px;
    height: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .van-tabbar-item__text {
    font-size: 14px;
  }
}
.van-tabbar {
  padding: 0 8.25%;
  box-sizing: border-box;
}
</style>