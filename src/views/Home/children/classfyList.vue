<template>
  <div class="container">
    <nav-header @btnClick="backBtn" :backShow="true" shopSkeleton :title="title"></nav-header>

    <div>
      <img src alt />
    </div>
    <!--  -->
    <van-tabs v-model="active" swipeable @change="changeTab">
      <van-tab v-for="(item,index) in classList" :title="item.name"  :key="index"  ></van-tab>
    </van-tabs>

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
import navHeader from "@/components/header";
export default {
  components: {
    navHeader
  },
  data() {
    return {
      imgList: [],
      title: "",
      classList: "",
      id:'',
      itemGoodsList:""
    };
  },
  methods: {
    backBtn() {
      this.$router.go(-1);
    },
    ToDetail(e){
       this.$router.push({
        path: "/shopinfo",
        query: {
		  id: e,
        }
      });
    },

    changeTab(index){
      this.id=this.classList[index].id
      this.productList()
    },
    //分类列表数据渲染
    async List() {
      let List = await this.service.home.shopList({
        class_id: this.$route.query.id
      });
      console.log(List);
      if (List.state === 10001) {
        this.classList = List.data.fen;
        this.id=List.data.fen[0].id
      }
    },
    //商品列表数据渲染
    async productList(){
      let productList=await this.service.home.ProductList({
        id:this.id
      })
      console.log(productList)
      if(productList.state==10001){
       this.itemGoodsList=productList.data
       
      }
      else{
        this.itemGoodsList=''
      }
    },
    //开始触发数据
    async getData(){
       return new Promise((resolve, rej) => {
        resolve(this.List());
      })
        .then(result => {
          return new Promise((resolve, reject) => {
            resolve(this.productList());
          });
      })
    }

  },
  created() {
    this.title = this.$route.query.title;
    this.getData()
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  padding-top: 54px;
  box-sizing: border-box;
  width: 100%;
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
//
.goodlist {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 80px;
  padding: 20px 0;
  border-bottom: 1px solid #f6f6f6ff;
  .goods_img {
    img {
      width: 75px;
      height: 80px;
    }
  }
  .goods_right {
    width: 248px;
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
</style>