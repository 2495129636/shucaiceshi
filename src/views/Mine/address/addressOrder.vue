<template>
  <div class="container">
    <nav-header
      @btnClick="backBtn"
      :backShow="true"
      shopSkeleton
      title="收货地址管理"
      @addClick="addAddress"
      :addShow="true"
      confirm="confirm"
    ></nav-header>

    <div class="content" v-for="(i,index) in addressList" :key="index">
      <div class="card">
        <b>{{i.name}}</b>
        <span>{{i.phone}}</span>
        <span v-if="i.moren===2" class="moren">默认地址</span>
        <br />
        <p>详细地址：{{i.address}}</p>
      </div>
      <div class="card2">
        <label @click="editAddress(i.id)">编辑</label>
        <br />
        <br />
        <label @click="delAddress(i.id)">删除</label>
      </div>
    </div>

    <van-dialog
      v-model="dialogShow"
      title="标题"
      message="是否删除?"
      show-cancel-button
      confirmButtonColor="#448863"
      cancelButtonColor="#448863"
      @confirm="confirm"
    ></van-dialog>
  </div>
</template>

<script>
import navHeader from "@/components/header";
import { Dialog } from "vant";
export default {
  components: {
    navHeader,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      dialogShow: false,
      addressList: "",
      id: ""
    };
  },
  methods: {
    confirm() {
      console.log("你点击了");
      console.log(this.id);
      this.addressDel();
      this.address()
    },

    backBtn() {
      this.$router.push("/orders");
    },
    addAddress() {
      this.$router.push("/address/addressAdd");
    },
    editAddress(e) {
      this.id = e;
      this.$router.push({
        path: "/addressOrderList",
        query: {
          id: e
        }
      });
    },
    delAddress(e) {
      this.id = e;
      this.dialogShow = true;
    },
    // 地址列表
    async address() {
      let addressList = await this.service.address.address({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token")
      });
      console.log(addressList);
      console.log(addressList.data);
      this.addressList = addressList.data;
    },
    // 删除地址
    async addressDel() {
      let addressDel = await this.service.address.del({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        id: this.id
      });
      console.log(addressDel);
    }
  },
  created() {
    this.address();
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  padding-left: 15px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 54px;
  .content {
    .card {
      padding: 10px 0 40px 0;
      width: 70%;
      float: left;
      span {
        padding-left: 15px;
        color: #999999;
      }
      p {
        padding-top: 10px;
      }
    }
    .card2 {
      float: right;
      padding: 20px 20px 0 0;
      label {
        color: #448863;
      }
    }
  }
}
.moren{
  color: red !important;
  font-size: 14px;
  font-weight: 800;
  margin-left: 20px;
}
</style>