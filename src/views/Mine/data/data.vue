<template>
  <div class="container">
    <nav-header @btnClick="backBtn" :backShow="true" title="帮助中心"></nav-header>
    <div class="center">
      <div v-for="(item,index) in Datahope" :key="index" class="content">
        <span>{{item.id}}、{{item.title}}</span>
        <div v-html="item.content">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import navHeader from "@/components/header";
export default {
  data() {
    return {
      Datahope: ""
    };
  },
  components: {
    navHeader
  },
  methods: {
    backBtn() {
      this.$router.go(-1);
    },
    async hopeData() {
      let hopeData = await this.service.my.myHope({});
      if (hopeData.state === 10001) {
        this.Datahope = hopeData.data;
        console.log(this.Datahope)
      }
    }
  },
  created() {
    this.hopeData();
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
  .center {
    background-color: #ffffffff;
    line-height: 18px;
    width: 100%;
    height: 100%;
    .content {
      width: 320px;
      margin: 0 auto;
      margin-bottom: 25px;
      margin-top: 5px;
      span {
        font-size: 14px;
        color: #1e1e1eff;
        font-weight: 800;
      }
    }
  }
}
</style>