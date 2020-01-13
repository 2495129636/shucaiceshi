<template>
  <div class="container" v-cloak>
    <nav-header style="color:rgba(68, 136, 99, 1)" title="商城"></nav-header>
    <van-tabs style="margin-top:50px" @change="onTopLable">
      <van-tab v-for="(i,index) in classTotal" :title="i.name" :key="index" @click="classTop(i.id)">
        <van-sidebar v-model="activeKey" style="float:left;">
          <div v-for="(i,index) in classList" :key="index">
            <van-sidebar-item :title="i.name" @click="onTapLeft(i.id)" />
          </div>
        </van-sidebar>
      </van-tab>
    </van-tabs>
    <div class="button">
      <button>综合</button>
      <button>
        销量
        <i
          class="angle_top"
          @click="count_bottom()"
          :class="{active:count_bottom_state}"
          :count_bottom_state="count_bottom_state"
        ></i>
        <i
          class="angle_bottom"
          @click="count_top()"
          :class="{active:count_top_state}"
          :count_top_state="count_top_state"
        ></i>
      </button>
      <button>
        价格
        <i
          class="angle_top"
          @click="price_bottom()"
          :class="{active:price_bottom_state}"
          :price_bottom_state="price_bottom_state"
        ></i>
        <i
          class="angle_bottom"
          @click="price_top()"
          :class="{active:price_top_state}"
          :price_top_state="price_top_state"
        ></i>
      </button>
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
          <p>{{i.goods_content}}</p>
        </div>
        <div class="goods_bottom">
          <span>￥{{i.goods_price}}</span>
          <button @click="ToDetail(i.id)">选规格</button>
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
      classList: [],
      activeKey: 0,
      classTotal: "",
      id1: "",
      id2: "",
      itemGoodsList: "",
      count_bottom_state: false,
      count_top_state: false,
      price_top_state: false,
      price_bottom_state: false
    };
  },
  methods: {
    ToDetail(e) {
      this.$router.push({
        path: "/shopinfo",
        query: {
          id: e
        }
      });
    },
    async onTopLable(index) {
      this.id1 = this.classTotal[index].id;
      await this.classTwo();
      this.activeKey=0
      this.goodsList();

    },
    onLeftLable(index) {
      console.log("---" + index);
    },
    onTapLeft(e) {
      this.id2 = e;
      this.goodsList();
    },
    onShopInfo(index) {
      this.$router.push({
        path: "/shopinfo",
        query: {
          index: index,
          backPath: "dashboard/shoping"
        }
      });
    },
    count_top() {
      if (this.count_top_state == false) {
        this.count_top_state = true;
        this.count_bottom_state = false;
      }
    },
    count_bottom() {
      if (this.count_bottom_state == false) {
        this.count_bottom_state = true;
        this.count_top_state = false;
      }
    },
    price_top() {
      if (this.price_top_state == false) {
        this.price_top_state = true;
        this.price_bottom_state = false;
      }
    },
    price_bottom() {
      if (this.price_bottom_state == false) {
        this.price_bottom_state = true;
        this.price_top_state = false;
      }
    },

    //商城一级分类接口
    async classOne() {
      let classOne = await this.service.mall.classOne({});
      console.log(classOne);
      this.classTotal = classOne.data;
      this.id1 = classOne.data[0].id;
      console.log(this.id1);
    },
    //商城二级分类接口
    async classTwo() {
      let classTwo = await this.service.mall.classTwo({
        id: this.id1
      });
      console.log(classTwo);
      this.classList = classTwo.data;
      this.id2 = classTwo.data[0].id;
    },
    //商品列表
    async goodsList() {
      let goodsList = await this.service.mall.GoodsList({
        id: this.id2
      });
      console.log(goodsList);
      if (goodsList.state === 10001) {
        this.itemGoodsList = goodsList.data;
      } else {
        this.itemGoodsList = "";
      }
    },
    getData() {
      return new Promise((resolve, rej) => {
        resolve(this.classOne());
      })
        .then(result => {
          return new Promise((resolve, reject) => {
            resolve(this.classTwo());
          });
        })
        .then(result => {
          return new Promise((res, rej) => {
            res(this.goodsList());
          });
        });
    }
  },
  created() {
    this.getData();
  },
  mounted() {}
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
.button {
  // width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 10px 0;
  button {
    width: 80px;
    height: 30px;
    border: 1px solid #999999ff;
    border-radius: 30px;
    background: none;
    cursor: pointer;
    position: relative;
  }
}
//
// 商品列表
.goodlist {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 80px;
  padding: 20px 0;
  border-bottom: 1px solid #f6f6f6ff;
  margin-left: 90px;
  .goods_img {
    img {
      width: 75px;
      height: 80px;
    }
  }
  .goods_right {
    width: 168px;
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
    }
    .goods_bottom {
      font-size: 14px;
      font-weight: 400;
      color: rgba(68, 136, 99, 1);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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
//
.angle_top {
  content: "";
  width: 0;
  height: 0;
  display: block;
  border-style: solid;
  border-width: 0 6px 6px;
  border-color: transparent transparent #5e5e5e;
  position: absolute;
  transform: rotate(180deg);
  bottom: 5px;
  right: 8px;
}

.angle_bottom {
  content: "";
  width: 0;
  height: 0;
  display: block;
  border-style: solid;
  border-width: 0 6px 6px;
  border-color: transparent transparent #5e5e5e;
  position: absolute;
  top: 8px;
  right: 8px;
}
.active {
  border-color: transparent transparent red !important;
}
</style>