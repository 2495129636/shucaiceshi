<template>
  <div class="container">
    <!--  -->
    <van-calendar v-model="show" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate" />
    <!--  -->
    <nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="账户明细"></nav-header>

    <div class="title_dropdown">
      <div>
        <van-dropdown-menu :overlay="false">
          <van-dropdown-item
            v-model="menu1"
            :options="option1"
            :title="title1"
            @change="changeT1(menu1)"
          />
          <van-dropdown-item v-model="menu2" :title="title2" @open="show = true" />
        </van-dropdown-menu>
      </div>
      <div>
        <button>搜索</button>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-show="visible">Slide Down</div>
    </transition>

    <div v-for="(item,index) in record" class="record" :key="index">
      <div class>{{item.create_time}}</div>
      <div class>{{item.title}}</div>
      <div class>
        <span v-if="item.status===4">+</span>
        <span v-else>-</span>
        {{item.price}}
      </div>
    </div>
	<!-- <van-loading size="24px" vertical>加载中...</van-loading> -->
  </div>
</template>

<script>
import navHeader from "@/components/header";
import axios from "axios";
export default {
  data() {
    return {
      visible: false,
      menu1: 0,
      menu2: 0,
      record: "",
      title1: "资金流向",
      title2: "时间",
      option1: [{ text: "充值", value: 0 }, { text: "消费", value: 1 }],
      date: "",
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2030, 0, 31)
    };
  },
  watch: {},
  components: {
    navHeader
  },
  methods: {
    menuClose() {
      this.visible = false;
    },
    menuOpen() {
      this.visible = true;
    },
    backBtn() {
      this.$router.push("/balance");
    },
    changeT1(e) {
      this.title1 = this.option1[e].text;
      if (e === 0) {
        axios
          .post("https://zm.h9e.net/api/my/zhanghu", {
            user_id: localStorage.getItem("user_id"),
            token: localStorage.getItem("token"),
            zjdx: 1
          })
          .then(response => {
            console.log(response);
            if (response.status === 200) {
              console.log(response.data.data.fen);
              this.record = response.data.data.fen;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axios
          .post("https://zm.h9e.net/api/my/zhanghu", {
            user_id: localStorage.getItem("user_id"),
            token: localStorage.getItem("token"),
            zjdx: 4
          })
          .then(response => {
            console.log(response);
            if (response.status === 200) {
              console.log(response.data.data.fen);
              this.record = response.data.data.fen;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    getTime(date) {
      let year = date.getFullYear();
      let month = ("00" + (date.getMonth() + 1)).slice(-2);
      let day = ("00" + date.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.getTime(date);
      this.title2 = this.date;
      axios
        .post("https://zm.h9e.net/api/my/zhanghu", {
          user_id: localStorage.getItem("user_id"),
          token: localStorage.getItem("token"),
          time: this.date
        })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log(response.data.data.fen);
            this.record = response.data.data.fen;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    axios
      .post("https://zm.h9e.net/api/my/zhanghu", {
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token")
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          console.log(response.data.data.fen);
          this.record = response.data.data.fen;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  padding-left: 15px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 54px;
  .slide-fade-enter-active {
    transition: all 0.3s linear;
  }
  .slide-fade-leave-active {
    transition: all 0.3s linear;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .record {
    width: 345px;
    background-color: #ffffffff;
    display: flex;
    flex-direction: row;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
  }
}
// 修改样式
.title_dropdown {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  div {
    button {
      width: 60px;
      background: none;
      cursor: pointer;
      font-size: 15px;
    }
  }
}
.van-dropdown-menu {
  width: 240px;
}
</style>