<template>
  <div class="card margin-top full margin-bottom">
    <div class="cardContainer">
      <allBookList :bookNumber="bookNumber" :bookList="bookList"></allBookList>
      <div class="right">
        <p>实付：{{ price }} 元</p>
      </div>
      <div class="right">
        <van-button
          v-if="order.orderStatus == 2 ||order.orderStatus == 3 || order.orderStatus == 4"
          plain
          size="small"
          hairline
          type="primary"
          @click="getCourier"
        >
          查看物流
        </van-button>
        <van-button
          v-if="order.orderStatus == 1"
          plain
          size="small"
          hairline
          type="primary"
          @click.stop="pay"
        >
          付款
        </van-button>

        <van-button
          v-if="order.orderStatus == 3"
          plain
          size="small"
          hairline
          type="primary"
        >
          确认收货
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import allBookList from "@/components/bookCard/allBookList.vue";
import { getBookByIds } from "@/dao/modules/book";
import { repay } from "@/dao/modules/user";
import { saveOrUpdate } from "@/dao/modules/order";
a;

export default {
  components: { allBookList },
  props: {
    order: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      bookList: []
    };
  },
  computed: {
    bookNumber() {
      let bookNumber = this.order.bookNumbers.split(",");
      return bookNumber;
    },
    price() {
      return this.order.totalPrice / 100;
    }
  },
  watch: {},
  methods: {
    getBookByIds() {
      let bookIds = {
        searchValue: this.order.bookIds
      };
      getBookByIds(bookIds).then(res => {
        this.bookList = res.data.data;
        console.log("getBookByIds -> booklist", this.bookList);
      });
    },
    getCourier() {
      console.log("查看物流：");
      wx.navigateToMiniProgram({
        appId: "wx6885acbedba59c14",
        path:
          "pages/result/result?nu=4305264931509&com=yunda&querysource=third_xcx"
      });
      //  wx.navigateTo({
      //   url: "/pages/result/result?nu=4305264931509&com=&querysource=third_xcx" + this.order.courierNumber
      // });
    },
    pay() {
      let _this = this;
      repay({ searchValue: this.order.orderId }).then(res => {
        let _2this = _this;
        console.log("支付信息", res);
        let OBJECT = {
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.prepayId,
          signType: "MD5",
          paySign: res.data.data.paySign,
          success: function(res) {
            console.log("支付", res);
            _2this.order.orderStatus = 2;
            saveOrUpdate(_2this.order).then(res => {
              console.log("失败res", res);
              wx.navigateTo({ url: "/pages/bookStore/allOrder/main" });
            });
            // wx.navigateTo({ url: "/pages/bookStore/allOrder/main"});
          },
          fail: function(res) {
            _2this.order.orderId = orderId;
            _2this.order.orderStatus = 1;
            // saveOrUpdate(_2this.order).then(res=>{
            //   console.log("失败res", res)
            //    wx.navigateTo({ url: "/pages/bookStore/allOrder/main"});
            // })
          }
        };
        // OBJECT = Object.assign({}, OBJECT, payInfo);
        // console.log(OBJECT, payInfo);
        wx.requestPayment(OBJECT);
      });
    }
  },
  onLoad() {
    this.getBookByIds();
  }
};
</script>
<style lang="scss" scoped></style>
