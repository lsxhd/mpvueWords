<template>
  <div>
    <van-sticky>
      <van-tabs sticky swipeable :active="active" @change="getAllOrder">
        <van-tab name="0" title="全部"> </van-tab>
        <van-tab name="1" title="待付款"></van-tab>
        <van-tab name="2" title="待收货"></van-tab>
        <van-tab name="3" title="已完成"></van-tab>
      </van-tabs>
    </van-sticky>
    <div class="cardContainer">
      <allOderList
        v-for="(order, key) in orderList"
        :key="key"
        :order="order"
      ></allOderList>
    </div>
  </div>
</template>
<script>
import allOderList from "@/components/bookCard/allOderList.vue";
import { getOrder } from "@/dao/modules/order";

export default {
  components: { allOderList },
  data() {
    return {
      active: "0",
      orderList: []
    };
  },
  methods: {
    getOrder(orderStatus) {
      getOrder({ orderStatus: orderStatus }).then(res => {
        this.orderList = res.data.data;
      });
    },
    getAllOrder(value) {
      this.orderList = [];
      this.getOrder(value.mp.detail.name);
    }
  },

  onShow() {
    wx.setNavigationBarTitle({ title: "订单信息" });
  },
  onLoad(options) {
    this.getOrder(0);
  }
};
</script>
<style scoped></style>
