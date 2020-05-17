<template>
  <div>
    <addressList :addressList="addressList"></addressList>
  </div>
</template>
<script>
import addressList from "@/components/bookCard/addressLists.vue";
import { getAddress } from "@/dao/modules/address";

export default {
  components: { addressList },
  data() {
    return {
      addressList: []
    };
  },
  methods: {
    getAddress(){
      getAddress().then(res=>{
        this.addressList = res.data.data
      })
    }
    
  },

  onShow(options) {
    wx.setNavigationBarTitle({ title: "我的收货地址" });
    this.getAddress()
  },
  onLoad(options) {
    
  }
};
</script>
<style scoped></style>
