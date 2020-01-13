<template>
  <div class="container" v-cloak>
    <nav-header style="color:rgba(68, 136, 99, 1)" title="首页"></nav-header>

    <form action="/" style="padding-top:40px">
      <van-search v-model="searchValue" placeholder="请输入搜索关键词" @search="onSearch" />
    </form>

    <van-swipe :autoplay="3000" class="banner">
      <van-swipe-item v-for="(i, index) in imgList" :key="index">
        <img :src="i.images" style="width: 100%;height: 35vh;" @click="activitySubmit" />
      </van-swipe-item>
    </van-swipe>

    <van-swipe :width="90" :show-indicators="false">
      <van-swipe-item v-for="(i,index) in menuList" :key="index" @click="clickItem(i.id,i.title)" class="itemList">
        <div>
          <img :src="i.img" />
        </div>
        <div>{{i.title}}</div>
      </van-swipe-item>
    </van-swipe>

    <div class="content">
      <!-- 新鲜果蔬 -->
      <div class="banners" v-if="listToal">
        <img :src="listToal[4].img" @click="clickItem(listToal[4].id,listToal[4].title)" />
      </div>

      <!-- 限时购 -->
      <div style="float:left">
        <img src="../../assets/home/d1.png" @click="timeSubmit" />
      </div>

      <!-- 精品粮油、爆款牛肉 -->
      <div class="rightImg" v-if="listToal">
        <img :src="listToal[5].img" @click="clickItem(listToal[5].id,listToal[5].title)" />
        <img :src="listToal[6].img" @click="clickItem(listToal[6].id,listToal[6].title)" />
      </div>

      <!-- 新鲜猪肉 -->
      <div class="bottoms" v-if="listToal">
        <img :src="listToal[7].img" @click="clickItem(listToal[7].id,listToal[7].title)" />
      </div>

      <van-swipe :width="180" :show-indicators="false">
        <van-swipe-item v-for="(i,index) in goodList" :key="index" @click="clickgoods(i.id)" class="goodList">
          <div>
            <img :src="i.goods_img" />
          </div>
          <div>{{i.goods_name}}</div>
          <div>￥{{i.goods_price}}/斤</div>
        </van-swipe-item>
      </van-swipe>

      <!-- 优质蔬菜 -->
      <div class="banners" v-if="listToal">
        <img :src="listToal[8].img" @click="clickItem(listToal[8].id,listToal[8].title)" />
      </div>

      <!-- 粮油专区、根茎蔬菜、进口水果 -->
      <div class="jinkou" v-if="listToal">
        <img :src="listToal[9].img" @click="clickItem(listToal[9].id,listToal[9].title)" />
        <img :src="listToal[10].img" @click="clickItem(listToal[10].id,listToal[10].title)" />
        <img :src="listToal[11].img" @click="clickItem(listToal[11].id,listToal[11].title)" />
      </div>

      <!--最新资讯-->
      <div style="margin-top:170px">
        <label style="font-size:17px;font-weight:bold;">最新资讯</label>
      </div>
      <div class="content-item flex" v-for="(item,index) in Newest_list" :key="index" @click="TonewsList(item.id)">
        <div class="content-item-right">
          <p class="c_1e fs15 fw_400">{{item.title}}</p>
          <span class="fs12 fw_500 c_999 flex flex_x_right">{{item.number}}阅读</span>
        </div>
        <div class="content-item-left">
          <img :src="item.img" alt />
        </div>
      </div>

      <!--广告位置-->
      <div class="inputBottom">
        <label style="font-size:17px;font-weight:bold;">最新公告</label>
        <div class="inputBottoms">
          <br />
          <br />
          <p style="margin:0 10px 0 10px">{{NoticeList}}</p>
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
        NoticeList: "",
        loadingShow: true,
        searchValue: "",
        imgList: [],
        articleList: [],
        menuList: [],
        Newest_list: "",
        goodList: "",
        listToal: ''
      };
    },
    methods: {
      timeSubmit() {
        this.$router.push("/time");
      },
      meatSubmit() {
        this.$router.push("/meat");
      },
      activitySubmit() {
        // this.$router.push('/activity')
      },
      hotSubmit() {
        this.$router.push("/selling");
      },
      onSearch() {
        this.$router.push({
          path: '/searchResult',
          query: {
            search: this.searchValue
          }
        })
      },
      clickgoods(e) {
        this.$router.push({
          path: '/shopinfo',
          query: {
            id: e
          }
        })
      },
      onCancel() { },
      //最新资讯
      async Newest_info() {
        let Newest_info = await this.service.home.Newest_info({});
        console.log(Newest_info);
        console.log(Newest_info.data);
        this.Newest_list = Newest_info.data;
      },
      // 公告
      async Notice() {
        let Notice = await this.service.home.Notice({});
        console.log(Notice);
        console.log(Notice.data.content);
        this.NoticeList = Notice.data.content;
      },
      //轮播图
      async banner() {
        let banner = await this.service.home.banner({});
        console.log(banner);
        this.imgList = banner.data;
      },
      //分类列表
      async classList() {
        let classList = await this.service.home.classList({});
        console.log(classList.data);
        this.listToal = classList.data
        this.menuList = classList.data.slice(0, 4);
      },
      async RecommendGoods() {
        let RecommendGoods = await this.service.home.Recommend({});
        console.log(RecommendGoods);
        console.log(RecommendGoods.data);
        this.goodList = RecommendGoods.data;
      },
      //分类点击
      clickItem(e, f) {
        this.$router.push({
          path: "/classfyList",
          query: {
            id: e,
            title: f
          }
        });
      },
      //跳转到资讯详情
      TonewsList(e) {
        this.$router.push({
          path: "/newsListDetal",
          query: {
            id: e
          }
        });
      },
      //
    },
    created() {
      this.loadingShow = true;
      // this.gethomeImg();
      // this.getArticle();
      this.loadingShow = false;
      //
      this.Newest_info();
      this.Notice();
      this.banner();
      this.classList();
      this.RecommendGoods();
    }
  };
</script>

<style scoped="scoped" lang="scss">
  [v-cloak] {
    display: none !important;
  }

  .container {
    width: 100%;
    background: rgb(254, 254, 254);
    padding-bottom: 100px;

    .banner {
      width: 100%;
      height: 160px;
      // background-image: url(../../assets/home/home_banner.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      box-sizing: border-box;
    }

    .content {
      padding: 0 15px;
      padding-bottom: 80px;

      .content-item {
        box-sizing: border-box;
        margin-top: 22px;

        .content-item-left {
          img {
            width: 130px;
            height: 90px;
          }
        }

        .content-item-right {
          margin-left: 15px;
          flex: 1;

          p:nth-child(1) {
            line-height: 25px;
          }

          p:nth-child(2) {
            margin-top: 25px;
          }
        }
      }

      .content-item:nth-child(1) {
        border-top: 1px solid #f6f6f6;
        padding-top: 20px;
      }
    }

    .banners {
      margin-top: 20px;

      img {
        width: 100%;
        height: 100px;
      }
    }

    .rightImg {
      margin-left: 45%;

      img {
        width: 190px;
        height: 80px;
      }
    }

    .bottoms {
      margin-top: 20px;

      img {
        width: 100%;
        height: 80px;
      }
    }

    .jinkou {
      margin-top: 5%;
      float: left;

      img {
        margin-right: 3%;
        width: 30%;
        height: 130px;
      }
    }

    .inputBottom {
      margin-top: 20px;

      .inputBottoms {
        background-image: url(../../assets/home/zx1.png);
        width: 100%;
        height: 90px;
        // background-image: url(../../assets/home/home_banner.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
      }
    }

    .menuEgg {
      // width:100px;
      margin-top: 15px;
    }
  }

  .itemList {
    margin-top: 20px;
    width: 25%;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;

      img {
        width: 48px;
        height: 48px;
      }
    }
  }

  .goodList {
    margin-top: 20px;
    width: 180px;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;

      img {
        width: 120px;
        height: 80px;
      }
    }
  }
</style>