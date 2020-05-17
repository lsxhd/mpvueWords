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
    <van-cell title="支付方式" center is-link use-label-slot>
      <view>
        <van-icon name="chat-o" color="#07c160" />
        微信支付
      </view>
    </van-cell>
    <van-divider dashed />
    <scroll-view style="margin-bottom: 100rpx;">
      <orderBookList :bookList="bookList"></orderBookList>
    </scroll-view>
    <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit">
    </van-submit-bar>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import topSearch from "@/components/bookCard/topSearch.vue";
import { getDefaultAddress, getAddressById } from "@/dao/modules/address";
import { saveOrUpdate } from "@/dao/modules/order";
import orderBookList from "@/components/bookCard/orderBookList.vue";
import { combineSydwCore } from "@/utils/common.js";
export default {
  components: { orderBookList, topSearch },
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
      }
    };
  },
  mounted() {
    // this.getInitialData();
  },
  computed: {},
  methods: {
    getInitialData() {},
    getDefaultAddress() {
      getDefaultAddress().then(res => {
        if (res.data.data == null) {
          this.address.addressId = 0;
          this.address.name = "请选择地址";
        } else {
          this.address = res.data.data;
        }
      });
    },
    getAddressById(addressId) {
      getAddressById({ addressId: addressId }).then(res => {
        console.log("getDefaultAddress -> res", res.data.data);
        if (res.data.data == null) {
          this.address.addressId = 0;
          this.address.name = "请选择地址";
        } else {
          this.address = res.data.data;
        }
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
        orderStatus: null,
        addressId: null
      };
    },
    setOrder() {
      let bookIds = [];
      let bookNumbers = [];
      this.bookList.forEach(element => {
        bookIds.push(element.bookId);
        bookNumbers.push(element.bookNumber);
      });
      this.order.bookIds = bookIds.toString();
      this.order.bookNumbers = bookNumbers.toString();
      this.order.totalPrice = this.price;
      this.order.addressId = this.address.addressId;
    },
    onSubmit() {
      this.setOrder();
      // let OBJECT ={
      //   timeStamp: '',
      //   nonceStr: '',
      //   package: '',
      //   signType: '',
      //   paySign: '',
      //   success: function(res){
      //     console.log("支付",res)
      //   },
      //   fail: function(res){
      //     console.log("支付",res)
      //   }
      // }
      // wx.requestPayment(OBJECT)
      this.$Dialog
        .confirm({
          title: "微信支付",
          message: "支付内容",
          asyncClose: true
        })
        .then(() => {
          this.order.orderStatus = 2;
          saveOrUpdate(this.order).then(res => {
            this.$Dialog.close();
            wx.navigateTo({
              url:
                "/pages/bookStore/orderDetail/main?orderId=" +
                res.data.data.orderId
            });
          });
        })
        .catch(() => {
          this.order.orderStatus = 1;
          saveOrUpdate(this.order).then(res => {
            this.$Dialog.close();
            wx.navigateTo({
              url:
                "/pages/bookStore/orderDetail/main?orderId=" +
                res.data.data.orderId
            });
          });
        });
    }
  },

  onShow() {
    this.getInitialData();
    wx.setNavigationBarTitle({ title: "提交订单" });
  },
  onLoad(options) {
    console.log("onLoad -> options", options);
    if (options.addressId > 0) {
      console.log("onLoad -> options", "diaoyong", options.addressId);
      this.getAddressById(options.addressId);
    } else {
      console.log("onLoad -> options", "moren", typeof options.addressId);
      this.getDefaultAddress();
    }
    let tempOrder = JSON.parse(wx.getStorageSync("tempOrder"));
    this.bookList = tempOrder.checkedBookList;
    this.price = tempOrder.price;
  }
};
</script>
<style scoped></style>
