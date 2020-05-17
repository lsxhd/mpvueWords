<template>
  <div>
    <topSearch></topSearch>
    <scroll-view style="margin-bottom: 100rpx;">
      <shopCardList
        :isAllchecked="isAllchecked"
        :shopCarBookList="shopCarBookList"
        @getTotalPrice="getTotalPrice"
        @updataData="updataData"
        @getCheckBookList="getCheckBookList"
      ></shopCardList>
    </scroll-view>
    <van-submit-bar :price="price" button-text="结算" @submit="onSubmit">
      <!-- <van-checkbox
        :value="!isAllchecked"
        checked-color="red"
        @change="allCheckedChange"
        >全选</van-checkbox
      > -->
    </van-submit-bar>
  </div>
</template>
<script>
import topSearch from "@/components/bookCard/topSearch.vue";
import { getShopCar } from "@/dao/modules/shopCar";
import shopCardList from "@/components/bookCard/shopCardList.vue";
import { combineSydwCore } from "@/utils/common.js";
export default {
  components: { shopCardList, topSearch },
  data() {
    return {
      shopCarBookList: {},
      isAllchecked: 2,
      price: 0,
      checkedBookList: []
    };
  },
  mounted() {
    // this.getInitialData();
  },
  methods: {
    getInitialData() {
      getShopCar().then(res => {
        console.log(res.data.data);
        this.shopCarBookList = combineSydwCore(res.data.data);
      });
    },
    updataData() {
      this.getInitialData();
    },
    getTotalPrice(totalPrice) {
      this.price = totalPrice * 100;
    },
    getCheckBookList(checkedBookList) {
      this.checkedBookList = checkedBookList;
    },
    allCheckedChange() {
      this.isAllchecked = !this.isAllchecked;
    },
    onSubmit() {
      let order = {
        checkedBookList: this.checkedBookList,
        price: this.price
      }
      let tempOrder = JSON.stringify(order)
      wx.setStorageSync("tempOrder",tempOrder);
      wx.navigateTo({ url: "/pages/bookStore/order/main"});
    }
  },
  // onShow() {

  // },
  // onLoad: function(options) {
  //   getBookById({ bookId: options.bookId || 2 }).then(res => {
  //     console.log(res);
  //     this.bookInfo = res.data.data;
  //   });
  // }

  onShow() {
    wx.setNavigationBarTitle({ title: "购物车" });
    this.getInitialData();
  }
};
</script>
<style scoped></style>
