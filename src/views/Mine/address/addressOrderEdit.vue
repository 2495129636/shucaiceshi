<template>
  <div class="container">
    <nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="收货地址管理"></nav-header>

    <van-field v-model="name" label-width="100px" label="收货人姓名:" placeholder="请输入收货人姓名" />
    <van-field v-model="phone" label-width="100px" label="收货人电话:" placeholder="请输入收货人电话" />
    <van-field v-model="address" label-width="100px" label="收货地址:" placeholder="请输入收货地址" />

    <div class="switchs">
      <label>设为默认地址</label>
      <van-switch
        class="switchRight"
        v-model="checked"
        active-color="#07c160"
        @click="changeCheck()"
      />
    </div>

    <van-row type="flex" justify="center" style="margin-top:100px;">
      <van-col span="22">
        <van-button type="primary" size="large" color="#448863" style="border-radius:8px;" @click="commit()">提交</van-button>
      </van-col>
    </van-row>
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
      name: "",
      phone: "",
      address: "",
      checked: false,
      moren: 1
    };
  },
  methods: {
    changeCheck() {
      if (this.checked === true) {
        this.moren = 1;
      } else {
        this.moren = 2;
      }
      console.log(this.moren);
    },

    backBtn() {
      this.$router.go(-1)
    },
    commit(){ 
         this.changeAddress()
    },
    //编辑地址
    async editAddress() {
      let addinfo = await this.service.address.edit_list({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        id:this.$route.query.id,
      });
      console.log(addinfo);
      if (addinfo.state === 10001) {
        this.name=addinfo.data.name
        this.phone=addinfo.data.phone
        this.address=addinfo.data.address
      }
    },
    //修改地址
    async changeAddress() {
      let addinfo = await this.service.address.edit({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        id:this.$route.query.id,
        name: this.name,
        phone: this.phone,
        address: this.address,
        moren: this.moren
      });
      console.log(addinfo);
      if (addinfo.state === 10001) {
        this.$router.push("/addressOrder");
      }
    },

  },
  created() {
      this.editAddress()
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  padding-left: 15px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 54px;
  .switchs {
    margin: 20px 0 0 15px;
    .switchRight {
      margin-right: 20px;
      float: right;
    }
  }
}
</style>