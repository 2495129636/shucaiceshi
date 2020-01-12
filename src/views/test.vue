<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      theTime: 999999999999
    };
  },
  methods: {
    f1(){
      console.log(new Date(this.theTime))
    },
    f2(){
      console.log(new Date().getTime())
    }
  },
  created() {
    // this.f1()
    // sett
  },
};
</script>


