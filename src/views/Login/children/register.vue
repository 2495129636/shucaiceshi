<template>
  <div class="container">
    <nav-header title="注册" @btnClick="backBtn" :backShow="true"></nav-header>

    <div class="logo flex flex_x_center">
      <img src="../../../assets/login/login.png" />
    </div>

    <div class="login-input">
      <div class="login-frame flex">
        <div class="login-frame-img flex flex_y_center">
          <img src="../../../assets/login/phone.png" />
        </div>
        <input class="fs14" v-model="phone" placeholder="手机号" type="number" />
      </div>

      <div class="login-frame flex flex_y_center">
        <div class="login-frame-img flex flex_y_center">
          <img src="../../../assets/login/yzm.png" />
        </div>
        <input v-model="code" placeholder="验证码" class="fs14" type="text" />
        <p
          v-if="getVerif"
          @click="yzmBtn"
          style="font-size:12px;font-family:PingFang SC;font-weight:400;color:rgba(68,136,99,1);line-height:20px;"
        >获取验证码</p>
        <!--  -->
        <p v-else>{{v_second}}秒后获取</p>
      </div>

      <div class="login-frame flex flex_y_center">
        <div class="login-frame-img flex flex_y_center">
          <img src="../../../assets/login/yzm.png" />
        </div>
        <input class="fs14" v-model="password" placeholder="密码" />
      </div>

      <div class="login-frame flex flex_y_center">
        <div class="login-frame-img flex flex_y_center">
          <img src="../../../assets/login/rlock.png" />
        </div>
        <input class="fs14" v-model="password2" placeholder="确认密码" />
      </div>
      <button @click="footerBtn" class="login-btn fs15 c_fff fw_400">注册</button>
    </div>
  </div>
</template>

<script>
import navHeader from "@/components/header";
import axios from "axios";
//吐司
import toast from "@/utils/toast";
import { async } from "q";
export default {
  components: {
    navHeader
  },
  data() {
    return {
      phone: "",
      password: "",
      password2: "",
      code: "", //按钮内容
      getVerif: true,
      v_second: 60
    };
  },
  methods: {
    backBtn() {
      this.$router.go(-1);
    },
    yzmBtn() {
      if (!/^[1][3456789]\d{9}$/.test(this.phone)) {
        toast({
          text: "请输入正确的手机号",
          time: 1000
        });
        return false;
      }
      this.yzhm();
    },
    footerBtn() {
      if (this.password2 !== this.password) {
        toast({
          text: "两次密码输入的不一致",
          time: 1000
        });
      } else if(!/^[1][3456789]\d{9}$/.test(this.phone)){
         toast({
          text: "请输入正确的手机号",
          time: 1000
        });
      }
      else{
         this.register();
      }
    },
    //注册发送验证码接口
    async yzhm() {
      let userInfoData = await this.service.register.setInsertUser({
        phone: this.phone
      });
      console.log(userInfoData);
      this.getVerif = false;
      let fun = () => {
        if (this.v_second > 0) {
          this.v_second = this.v_second - 1;
        } else {
          this.getVerif = true;
          console.log("....");
          clearInterval(myVar);
          this.v_second = 60;
        }
      };
      let myVar = setInterval(() => {
        fun();
      }, 1000);
    },
    // 注册接口
    async register() {
      let userInfoData = await this.service.register.register({
        phone: this.phone,
        yzm: this.code,
        pwd: this.password
      });
      if (userInfoData.state === 10003) {
        toast({
          text: userInfoData.msg,
          time: 1000
        });
      } else if (userInfoData.state === 10001) {
        toast({
          text: userInfoData.msg,
          time: 1000
        });
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  padding-top: 104px;
  .login-input {
    padding: 0 30px;
    margin-top: 46px;
    .login-frame {
      height: 50px;
      border-bottom: 1px solid #f6f6f6;
      .login-frame-img {
        img {
          width: 21px;
          height: 21px;
        }
      }
      input {
        flex: 1;
        padding-left: 15px;
        box-sizing: border-box;
      }
      .login-glasses {
        width: 22px;
        height: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .login-btn {
      width: 100%;
      height: 40px;
      background: rgba(68, 136, 99, 1);
      border-radius: 38px;
      margin-top: 40px;
    }
    .login-footer {
      padding: 0 46px;
      margin-top: 10px;
    }
  }
}
</style>