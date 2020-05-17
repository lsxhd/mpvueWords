<template>
  <div>
    <van-cell center is-link use-label-slot @click="link">
      <view slot="title">
        <view class="van-cell-text">
          <span>{{ address.name }}</span>
          <span class="margin-left">{{ address.phonNumber }}</span>
        </view>
      </view>
      <view slot="label">
        <p>{{ address.shopRegionName }}</p>
        <p>{{ address.detailInfo }}</p>
      </view>
    </van-cell>
    <van-divider dashed />
    <!-- <van-cell title="支付方式" center is-link use-label-slot>
      <view>
        <van-icon name="chat-o" color="#07c160" />
        微信支付
      </view>
    </van-cell> -->
    <van-divider dashed />
    <scroll-view style="margin-bottom: 100rpx;">
      <orderBookList :bookList="bookList"></orderBookList>
    </scroll-view>
    <!-- <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit">
    </van-submit-bar> -->
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import { getDefaultAddress, getAddressById } from "@/dao/modules/address";
import { saveOrUpdat, getOrderById } from "@/dao/modules/order";
import orderBookList from "@/components/bookCard/orderBookList.vue";
import { combineSydwCore } from "@/utils/common.js";
export default {
  components: { orderBookList },
  data() {
    return {
      bookList: [],
      price: 0,
      address: {},
      order: {
        bookIds: null,
        bookNumbers: null,
        totalPrice: null,
        /**
         * 1 待付款订单 2待发货订单  3待收款订单
         */
        orderStatus: null
      },
      webShow: false
    };
  },
  mounted() {
    // this.getInitialData();
  },
  computed: {},
  methods: {
    getInitialData() {},
    getOrderById(orderId) {
      
      getOrderById({ searchValue: orderId }).then(res => {
        console.log("getDefaultAddress -> res", res.data.data);
        this.order = res.data.data.order;
        this.bookList = res.data.data.books;
        this.getAddressById(res.data.data.order.addressId)
      });
    },
    getAddressById(addressId) {
      getAddressById({addressId: addressId}).then(res => {
        console.log("getDefaultAddress -> res", res.data.data);
        this.address = res.data.data;
      });
    },
    link() {
      wx.navigateTo({
        url: "/pages/bookStore/address/main?addressId=" + this.address.addressId
      });
    },
    resetOrder() {
      this.order = {
        bookIds: null,
        bookNumbers: null,
        totalPrice: null,
        orderStatus: null
      };
    }

  },

  onShow() {
    this.getInitialData();
    wx.setNavigationBarTitle({ title: "订单详情" });
  },
  onLoad(options) {
    console.log("onLoad -> options", "moren", typeof options, options );
    this.getOrderById(options.orderId);
  }
};
</script>
<style scoped></style>
