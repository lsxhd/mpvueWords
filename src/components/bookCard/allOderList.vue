<template>
  <div class="card margin-top full margin-bottom">
    <div class="cardContainer">
      <allBookList :bookNumber="bookNumber" :bookList="bookList"></allBookList>
      <div class="right">
        <p>实付：{{ order.totalPrice }}</p>
      </div>
      <div class="right">
        <van-button plain size="small" hairline type="primary">
          删除订单
        </van-button>
        <van-button
          v-if="order.orderStatus != 1"
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
        >
          付款
        </van-button>

        <van-button
          v-if="order.orderStatus == 2"
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
        path: "pages/result/result?nu=4305264931509&com=yunda&querysource=third_xcx",
      });
      //  wx.navigateTo({
      //   url: "/pages/result/result?nu=4305264931509&com=&querysource=third_xcx" + this.order.courierNumber
      // });
    }
  },
  onLoad() {
    this.getBookByIds();
  }
};
</script>
<style lang="scss" scoped></style>
