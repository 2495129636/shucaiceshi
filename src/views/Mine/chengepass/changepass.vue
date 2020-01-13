<template>
  <div class="container">
    <nav-header @btnClick="backBtn" :backShow="true" shopSkeleton title="修改支付密码"></nav-header>

    <div class="login-input">
      <div class="login-frame flex flex_y_center">
        <input v-model="phone" placeholder="手机号" class="fs14" type="text" />

        <p
          v-if="getVerif"
          @click="yzmBtn()"
          style="font-size:12px;font-family:PingFang SC;font-weight:400;color:rgba(68,136,99,1);line-height:20px;"
        >获取验证码</p>
        <p v-else>{{v_second}}秒后获取</p>
      </div>
      <div class="login-frame flex flex_y_center">
        <input class="fs14" v-model="yzhma" placeholder="验证码" />
      </div>
      <div class="login-frame flex flex_y_center">
        <input class="fs14" v-model="password" placeholder="支付密码" />
      </div>

      <div class="login-frame flex flex_y_center">
        <input class="fs14" v-model="password2" placeholder="确认支付密码" />
      </div>
      <button @click="footerBtn" class="login-btn fs15 c_fff fw_400">确认</button>
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
      phone: "",
      yzhma: "",
      password: "",
      password2: "",
      v_second: 60,
      getVerif: true
    };
  },

  methods: {
    footerBtn() {
      if (this.password2 !== this.password) {
        toast({
          text: "两次密码输入的不一致",
          time: 1000
        });
      } else {
        if (!/^\d{6}$/.test(this.password)) {
          toast({
            text: "支付密码必须设置6位数的数字",
            time: 1000
          });
        } else if (!/^[1][3456789]\d{9}$/.test(this.phone)) {
          toast({
            text: "请输入正确的手机号",
            time: 1000
          });
          return false;
        } else {
          this.PayPass();
        }
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
    //设置支付密码接口
    async PayPass() {
      let PayPass = await this.service.my.SetPayPass({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        phone: this.phone,
        yzm: this.yzhma,
        paycode: this.password
      });
      console.log(PayPass);
      if (PayPass.state !== 10001) {
        toast({
          text: PayPass.msg,
          time: 1000
        });
      } else {
        this.$router.go(-1);
      }
    },
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
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  padding-top: 60px;
  .login-input {
    padding: 0 20px;
    .login-frame {
      height: 50px;
      border-bottom: 1px solid #f6f6f6;
      input {
        flex: 1;
        padding-left: 15px;
        box-sizing: border-box;
      }
      .login-glasses {
        width: 22px;
        height: 15px;
      }
    }
    .login-btn {
      width: 100%;
      height: 45px;
      background: rgba(68, 136, 99, 1);
      border-radius: 8px;
      margin-top: 40px;
    }
    .login-footer {
      padding: 0 46px;
      margin-top: 10px;
    }
  }
}
</style>