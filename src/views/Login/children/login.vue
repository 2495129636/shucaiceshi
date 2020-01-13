<template>
  <div class="container">
    <nav-header style="color:rgba(68, 136, 99, 1)" title="登录"></nav-header>
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
        <input v-model="code" placeholder="请输入验证码" class="fs14" type="text" />
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
        <input class="fs14" v-model="password" placeholder="密码" :type="type" />
        <div @click="glassesBtn" class="login-glasses">
          <img :src="glassesImg" />
        </div>
      </div>

      <button @click="nextBtn" class="login-btn fs15 c_fff fw_400">登录</button>
      <div class="login-footer flex flex_y_center">
        <div
          @click="registerBtn"
          class="fs13 c_999 fw_400 flex_1 flex flex_x_center footer-left"
        >立即注册</div>
        <div style="width: 1px; height: 10px; background: #999999;"></div>
        <div
          @click="forgetBtn"
          class="fs13 c_999 fw_400 flex_1 flex flex_x_center footer-right"
        >忘记密码</div>
      </div>
    </div>
  </div>
</template>

<script>
import navHeader from "@/components/header";
import glassesFales from "../../../assets/login/glasses_false.png";
import glassesTrue from "../../../assets/login/glasses_true.png";
import toast from "@/utils/toast";
import axios from "axios";
export default {
  components: {
    navHeader
  },
  data() {
    return {
      disabled: false,
      phone: "",
      password: "",
      code: "",
      type: "password", //密码框的类型
      glassesImg: glassesFales, //图片状态
      typeShow: false, //眼睛开关
      v_second: 60,
      getVerif: true
    };
  },
  methods: {
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
    registerBtn() {
      this.$router.push("/register");
    },
    forgetBtn() {
      this.$router.push("/forget");
    },
    glassesBtn() {
      this.typeShow = !this.typeShow;
      if (this.typeShow == true) {
        this.type = "text";
        this.glassesImg = glassesTrue;
      } else if (this.typeShow == false) {
        this.type = "password";
        this.glassesImg = glassesFales;
      }
    },
    nextBtn() {
      this.userInfoData();
    },
    // 登录验证接口
    async userInfoData() {
      let userInfoData = await this.service.login.getUserinfo({
        phone: this.phone,
        yzm: this.code,
        pwd: this.password
      });
      console.log(userInfoData);
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
        console.log(userInfoData.data);
        console.log(userInfoData.data.user_id);
        console.log(userInfoData.data.token);
        localStorage.setItem("user_id", userInfoData.data.user_id);
        localStorage.setItem("token", userInfoData.data.token);
         this.$router.push({ path: "/dashboard/home", query: { active: 0 } });
      }
    },
    //验证码接口
    async yzhm() {
      let userInfoData = await this.service.login.setInsertUser({
        phone: this.phone
      });
      console.log(userInfoData);
      if (userInfoData.state === 10001) {
        toast({
          text: userInfoData.msg,
          time: 1000
        });
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
      } else {
        toast({
          text: userInfoData.msg,
          time: 1000
        });
      }
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  padding-top: 104px;
  .logo {
    img {
      width: 61px;
      height: 61px;
    }
  }
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