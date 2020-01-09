<template>
  <div class="container">
    <nav-header @btnClick="backBtn" :backShow="true" title="个人信息"></nav-header>

    <div class="data">
      <div class="data-item flex flex_y_center" style="height:100px;">
        <div class="data-item-left fs15 c_1E fw_500">
          <div class="item_bock" style="height:50px;float:left">
            <label>
              <img :src="imgSrc" />
              <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
            </label>
          </div>
          <div class="flex_x_center" style="float:left;margin-top:25%">修改店铺照</div>
        </div>

        <div class="data-item-center flex_1 flex flex_x_right" />
        <div class="data-item-right">
          <img src="../../../assets/mine/children/right.png" />
        </div>
      </div>

      <div @click="fousBtn" class="data-item flex flex_y_center">
        <div class="data-item-left fs15 c_1E fw_500">用户名</div>
        <div class="data-item-center flex_1 flex flex_x_right">
          <div class="age fs15 c_1E fw_500">{{name}}</div>
        </div>
        <div class="data-item-right">
          <img src="../../../assets/mine/children/right.png" />
        </div>
      </div>

      <div class="data-item flex flex_y_center" @click="ageBtn">
        <div class="data-item-left fs15 c_1E fw_500">性别</div>
        <div class="data-item-center flex flex_1 flex_x_right">
          <div class="age fs15 c_1E fw_500">{{sex}}</div>
        </div>
        <div class="data-item-right">
          <img src="../../../assets/mine/children/right.png" />
        </div>
      </div>

      <div @click="phoneBtn" class="data-item flex flex_y_center">
        <div class="data-item-left fs15 c_1E fw_500">手机号</div>
        <div class="data-item-center flex_1 flex flex_x_right">
          <div class="age fs15 c_1E fw_500">{{phone}}</div>
        </div>
        <div class="data-item-right">
          <img src="../../../assets/mine/children/right.png" />
        </div>
      </div>

      <div @click="passBtn" class="data-item flex flex_y_center">
        <div class="data-item-left fs15 c_1E fw_500">修改密码</div>
        <div class="data-item-center flex_1 flex flex_x_right">
          <div class="age fs15 c_1E fw_500">{{password}}</div>
        </div>
        <div class="data-item-right">
          <img src="../../../assets/mine/children/right.png" />
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="footerBtn" class="fs16 c_fff">退出登录</button>
    </div>
    <!--性别-->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!--生日-->
    <van-popup v-model="showPicker2" position="bottom">
      <van-datetime-picker
        @cancel="cancel"
        @confirm="confirmBtn"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <!--修改昵称-->
    <transition name="slide-fade">
      <div v-if="name_poshop" class="name_po">
        <div class="name_po_header flex flex_y_center">
          <div @click="name_poshop = false" class="flex_1 fs13 fw_500">取消</div>
          <div class="flex_2 flex flex_x_center fs15 fw_500">设置昵称</div>
          <div class="flex_1 flex flex_x_right">
            <van-button @click="nichengBtn" type="primary">完成</van-button>
          </div>
        </div>
        <div class="name_input">
          <input
            maxlength="8"
            @input="change"
            v-focus
            class="fw_500 fs15"
            type="text"
            v-model="names"
          />
          <img @click="cuoBtn" :src="imgSrc" />
        </div>
      </div>

      <div v-if="phone_poshop" class="name_po">
        <div class="name_po_header flex flex_y_center">
          <div @click="phone_poshop = false" class="flex_1 fs13 fw_500">取消</div>
          <div class="flex_2 flex flex_x_center fs15 fw_500">修改手机号</div>
          <div class="flex_1 flex flex_x_right">
            <van-button @click="phoneSubBtn" type="primary">完成</van-button>
          </div>
        </div>
        <div class="name_input">
          <input
            maxlength="8"
            @input="change"
            v-focus
            class="fw_500 fs15"
            type="text"
            v-model="phoneInput"
          />
          <img @click="cuoBtn" src="../../../assets/mine/children/cuo.png" />
        </div>
      </div>

      <div v-if="pass_poshop" class="name_po">
        <div class="name_po_header flex flex_y_center">
          <div @click="pass_poshop = false" class="flex_1 fs13 fw_500">取消</div>
          <div class="flex_2 flex flex_x_center fs15 fw_500">修改密码</div>
          <div class="flex_1 flex flex_x_right">
            <van-button @click="passSubBtn" type="primary">完成</van-button>
          </div>
        </div>
        <div class="name_input">
          <input
            maxlength="8"
            @input="change"
            v-focus
            class="fw_500 fs15"
            type="text"
            v-model="passwordInput"
          />
          <img @click="cuoBtn" src="../../../assets/mine/children/cuo.png" />
        </div>
      </div>
    </transition>

    <div v-if="dialogShow" class="dialog">
      <div class="tips">
        <div class="tips_title flex_center fs16">退出登陆</div>
        <div class="flex tips_state">
          <div @click="exit" class="cancel flex_1 flex_center fs15">确定</div>
          <div @click="DetermineBtn" class="Determine flex_1 flex_center fs15">取消</div>
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
      phoneInput: "",
      passwordInput: "",
      phone_poshop: false,
      pass_poshop: false,
      value: "", //男女
      showPicker: false, //遮罩层
      columns: ["男", "女"], //选项数组
      sex: "", //默认性别
      minDate: new Date(1950, 0, 1), //最小时间
      maxDate: new Date(), // 最大时间
      currentDate: new Date(2000, 0, 1),
      showPicker2: false, //生日遮罩层,
      name: "",
      names: "",
      name_poshop: false,
      dialogShow: false,
      phone: "",
      password: "",
      //
      imgSrc: ""
    };
  },
  methods: {
    passBtn() {
      this.pass_poshop = true;
    },
    passSubBtn() {
      if (this.passwordInput.length == 0) {
        alert("不能为空");
      } else {
        this.pass_poshop = false;
        this.password = this.passwordInput;
      }
    },
    phoneBtn() {
      this.phone_poshop = true;
    },
    phoneSubBtn() {
      if (this.phoneInput.length == 0) {
        alert("不能为空");
      } else {
        this.phone_poshop = false;
        this.phone = this.phoneInput;
      }
    },
    backBtn() {
      this.$router.push("/dashboard/mine");
    },
    uploadHeadImg: function() {
      this.$el.querySelector(".hiddenInput").click();
    },
    // 将头像显示
    async handleFile(e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      var reader = new FileReader();
      reader.onload = data => {
        let res = data.target || data.srcElement;
        this.imgSrc = res.result;
        //
        this.myImg(file);
      };
      await reader.readAsDataURL(file);
    },
    //修改性别 确定按钮
    onConfirm(value) {
      console.log(value);
      this.sex = value;
      this.showPicker = false;
      this.changeSex()
    },
    ageBtn() {
      this.showPicker = true;
    },
    confirmBtn(value) {
      var m = value.getMonth() + 1;
      var d = value.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = value.getFullYear() + "-" + m + "-" + d;
      console.log(timer);
      this.showPicker2 = false;
    },
    cancel() {
      this.showPicker2 = false;
    },
    cuoBtn() {
      this.names = this.name;
    },
    // 更改用户名 确认按钮
    nichengBtn() {
      if (this.names.length == 0) {
        alert("不能为空");
      } else {
        this.name_poshop = false;
        this.name = this.names;
        this.changeSex()
      }
    },
    fousBtn() {
      this.name_poshop = true;
      this.names=this.name
    },
    change() {
      if (this.names.length >= 8) {
        alert("超过最大输入上限");
      }
    },
    footerBtn() {
      this.dialogShow = true;
    },
    exit() {
      window.localStorage.clear();
      this.$router.push("/login");
    },
    DetermineBtn() {
      this.dialogShow = false;
    },
    //个人设置接口
    async mySetting() {
      let mysettingInfo = await this.service.my.mySetting({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token")
      });
      console.log(mysettingInfo);
      this.imgSrc = mysettingInfo.data.headimg;
      this.sex = mysettingInfo.data.sex;
      this.name = mysettingInfo.data.user_name;
      this.phone = mysettingInfo.data.phone;
    },
    //头像修改接口
    async myImg(file) {
      let params = new FormData();
      params.append("file", file);
      params.append("user_id", localStorage.getItem("user_id"));
      params.append("token", localStorage.getItem("token"));
      let myImg = await this.service.my.myTouxiang(params);
      console.log(myImg);
    },
    //用户名或性别修改
    async changeSex() {
      let changeSex = await this.service.my.mySex({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        user_name:this.name,
        sex:this.sex
      });
      console.log(changeSex)
    }
  },
  created() {
    this.mySetting();
  }
};
</script>

<style scoped="scoped" lang="scss">
.container {
  padding-top: 44px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgb(246, 246, 246);
  .item_bock {
    padding-top: 20px;
    padding-bottom: 25px;
    background: #fff;
    label {
      width: 60px;
      height: 60px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50px;
      }
      .hiddenInput {
        display: none;
      }
    }
    .item_bock-name {
      width: 100%;
      margin-top: 15px;
    }
  }
  .data {
    background: #fff;
    margin-top: 15px;
    .data-item {
      width: 100%;
      height: 50px;
      padding: 0 15px;
      box-sizing: border-box;
      .data-item-center {
        margin-right: 10px;
        .age {
          color: #999;
        }
      }
      .data-item-right {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .footer {
    padding: 0 20px;
    margin-top: 110px;
    button {
      width: 100%;
      height: 44px;
      background: rgba(68, 136, 99, 1);
      border-radius: 4px;
    }
  }
}

/deep/ .van-picker__cancel {
  color: #ff6d00 !important;
}

/deep/ .van-picker__confirm {
  color: #ff6d00 !important;
}

.name_po {
  width: 100%;
  height: 100%;
  background: rgb(237, 237, 237);
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  .name_po_header {
    width: 100%;
    height: 44px;
    padding: 0 15px;
    box-sizing: border-box;
    .van-button--normal {
      padding: 0 !important;
    }
    .van-button--primary {
      border: none !important;
    }
    .van-button {
      width: 50px;
      height: 30px;
      line-height: 30px !important;
    }
  }
  .name_input {
    width: 100%;
    height: 50px;
    position: relative;
    background: #fff;
    margin-top: 5px;
    input {
      width: 100%;
      height: 100%;
      padding-left: 10px;
      box-sizing: border-box;
    }
    img {
      position: absolute;
      width: 15px;
      height: 15px;
      right: 15px;
      top: 50%;
      margin-top: -10px;
    }
  }
}

.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */
 {
  transform: translateY(100%);
  opacity: 0;
}
.dialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  position: fixed;
  .tips {
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    width: 250px;
    .tips_title {
      height: 80px;
      color: #23252f;
      border-bottom: 1px solid #dddee3;
    }
    .tips_state {
      height: 44px;
      .cancel {
        color: #0a60ff;
        border-right: 1px solid #dddee3;
      }
      .Determine {
        color: #0a60ff;
      }
    }
  }
}
</style>