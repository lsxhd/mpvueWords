<template>
  <div>
    <!-- <web-view :src="src" :bindload="bindload" :binderror="binderror"></web-view> -->
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    // this.getInitialData();
  },
  computed: {
    src() {
      // let url = `https://m.kuaidi100.com/app/query/?coname=opp&nu=${this.order.courierNumber}&com=&callbackurl=`
      let url = `https://m.kuaidi100.com/app/query/?coname=oppo&nu=4305264931509&com=yunda&callbackurl=https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=1479514186&lang=zh_CN`;

      return url;
    }
  },
  methods: {
    bindload(sdf) {
      console.log("bindload -> sdf", sdf);
    },
    binderror(data) {
      console.log("binderror -> data", data);
    }
  },

  onShow() {
    wx.setNavigationBarTitle({ title: "物流信息" });
  },
  onLoad(options) {
    console.log("onLoad -> options", options);
  }
};
</script>
<style scoped></style>
