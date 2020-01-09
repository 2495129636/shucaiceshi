<template>
  <div>
    <div class="vipCard qingtong" v-if="vip_show===0">
      <van-button class="leftTopBtn" color="RGBA(223, 174, 116, 1)" size="mini">
        <font style="color:rgba(142, 94, 54, 1)">{{vip_level[vip_show].level}}</font>
      </van-button>

      <div class="vipTitle">
        <label class="levelVip">青铜会员</label>
        <label class="scoreVip">积分:{{vipMyinfo.vip_num}}</label>
      </div>

      <div class="vipBottom">
        <div class="vipLeftBottom">
          <label>会员成长值：200</label>
          <van-progress
            :show-pivot="false"
            color="rgba(142, 94, 54, 1)"
            stroke-width="6px"
            :percentage="percentage1"
            track-color="#FFFFFF"
          />

          <label class="scoreNumber">{{200/2}}</label>
          <label class="scoreNumber">200</label>
        </div>

        <van-button size="small" class="vipRightBottom" color="RGBA(223, 174, 116, 1)">去提升</van-button>
      </div>
    </div>
    <!--  -->
    <div class="vipCard" v-if="vip_show===1">
      <van-button class="leftTopBtn" color="RGBA(223, 174, 116, 1)" size="mini">
        <font style="color:rgba(142, 94, 54, 1)">{{vip_level[vip_show].level}}</font>
      </van-button>

      <div class="vipTitle">
        <label class="levelVip">黄金会员</label>
        <label class="scoreVip">积分:{{vipMyinfo.vip_num}}</label>
      </div>

      <div class="vipBottom">
        <div class="vipLeftBottom">
          <div v-if="vip_level[vip_show].level=='当前'">
            <label>会员成长值：200</label>
            <van-progress
              :show-pivot="false"
              color="rgba(142, 94, 54, 1)"
              stroke-width="6px"
              :percentage="percentage2"
              track-color="#FFFFFF"
            />

            <label class="scoreNumber">{{3000/2}}</label>
            <label class="scoreNumber">3000</label>
          </div>

          <div v-else>
            <span class="jiesuo">解锁需要200成长值，请继续努力</span>
          </div>
        </div>

        <van-button size="small" class="vipRightBottom" color="RGBA(223, 174, 116, 1)">去提升</van-button>
      </div>
    </div>
    <!--  -->
    <div class="vipCard vipBai" v-if="vip_show===2">
      <van-button class="leftTopBtn" color="RGBA(223, 174, 116, 1)" size="mini">
        <font style="color:rgba(142, 94, 54, 1)">{{vip_level[vip_show].level}}</font>
      </van-button>

      <div class="vipTitle">
        <label class="levelVip">铂金会员</label>
        <label class="scoreVip">积分:{{vipMyinfo.vip_num}}</label>
      </div>

      <div class="vipBottom">
        <div class="vipLeftBottom">
          <div v-if="vip_level[vip_show].level=='当前'">
            <label>会员成长值：3000</label>
            <van-progress
              :show-pivot="false"
              color="rgba(142, 94, 54, 1)"
              stroke-width="6px"
              :percentage="percentage3"
              track-color="#FFFFFF"
            />
            <label class="scoreNumber">{{20000/2}}</label>
            <label class="scoreNumber">20000</label>
          </div>

          <div v-else>
            <span class="jiesuo">解锁需要3000成长值，请继续努力</span>
          </div>
        </div>

        <van-button size="small" class="vipRightBottom" color="RGBA(223, 174, 116, 1)">去提升</van-button>
      </div>
    </div>
    <!--  -->
    <div class="vipCard zuanshi" v-if="vip_show===3">
      <van-button class="leftTopBtn" color="RGBA(223, 174, 116, 1)" size="mini">
        <font style="color:rgba(142, 94, 54, 1)">{{vip_level[vip_show].level}}</font>
      </van-button>

      <div class="vipTitle">
        <label class="levelVip">钻石会员</label>
        <label class="scoreVip">积分:{{vipMyinfo.vip_num}}</label>
      </div>

      <div class="vipBottom">
        <div class="vipLeftBottom">
          <div v-if="vip_level[vip_show].level=='当前'">
            <label>会员成长值：20000</label>
            <van-progress
              :show-pivot="false"
              color="rgba(142, 94, 54, 1)"
              stroke-width="6px"
              :percentage="percentage4"
              track-color="#FFFFFF"
            />

            <label class="scoreNumber">{{30000/2}}</label>
            <label class="scoreNumber">30000</label>
          </div>
           <div v-else>
                <span class="jiesuo">解锁需要20000成长值，请继续努力</span>
           </div>
        </div>

        <van-button size="small" class="vipRightBottom" color="RGBA(223, 174, 116, 1)">去提升</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vip_show: {
      type: Number,
      required: true
    },
    vipMyinfo: {
      type: Object,
      required: true
    },
    vip_level: {
      type: Array,
      required: true
    },
    percentage1:{
        type:Number,
        required:true
    },
    percentage2:{
        type:Number,
        required:true
    },
    percentage3:{
        type:Number,
        required:true
    },
    percentage4:{
        type:Number,
        required:true
    },
  },
  data() {
    return {
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.vipCard {
  background-image: url("../assets/vip/bronze.png");
  background-size: 100% 100%;
  margin: 0 0 0 10px;
  position: relative;
  width: 95%;
  height: 170px;
  // background:rgb(255, 255, 255);
  border-radius: 10px;
  .leftTopBtn {
    border-radius: 5px;
  }

  .vipTitle {
    padding: 5px 0 0 20px;
    .levelVip {
      font-size: 27px;
      font-family: PingFang SC;
      font-weight: 800;
      color: rgba(142, 94, 54, 1);
    }
    .scoreVip {
      margin-left: 20px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(142, 94, 54, 1);
    }
  }

  .vipBottom {
    margin: 40px 0 0 20px;
    .vipLeftBottom {
      float: left;
      width: 50%;
      label {
        line-height: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(142, 94, 54, 1);
      }
      .scoreNumber {
        padding-left: 35%;
      }
    }
    .vipRightBottom {
      float: right;
      margin: 20px 30px 0 0;
      border-radius: 25px;
    }
  }
}
.qingtong {
  background-image: url("../assets/vip/青铜.png");
}
.vipBai {
  background-image: url("../assets/vip/V.png");
  background-size: 100% 100%;
  margin: 0 0 0 10px;
  position: relative;
  width: 95%;
  height: 170px;
}
.zuanshi {
  background-image: url("../assets/vip/钻石.png");
  background-size: 100% 100%;
  margin: 0 0 0 10px;
  position: relative;
  width: 95%;
  height: 170px;
}
.jiesuo {
  color: #787a89ff;
  font-size: 15px;
}
</style>