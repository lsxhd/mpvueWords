<template>
  <div>
    <div style="display: flex;justify-content: center;align-items: center;">
      <view>
        <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          :src="bookInfo.imgUrl"
        />
      </view>
    </div>
    <div>
      <van-card
        :price="bookInfo.price"
        :title="bookInfo.title"
        @click.stop="gotoDetail(book.bookId)"
      >
        <view slot="desc">
          <p>
            <van-tag mark type="success">{{ bookInfo.author }}</van-tag>
          </p>
          <br />
          <p>
            <van-tag mark type="warning">{{ bookInfo.publish }}</van-tag>
          </p>
          <br />
          <p>{{ bookInfo.detail }}</p>
        </view>
      </van-card>
    </div>
    <div>
      <van-panel title="相关系列好书" status="热卖">
        <view>内容</view>
      </van-panel>
    </div>
    <div style="z-index: 10;">
      <van-goods-action safe-area-inset-bottom style="z-index: 10;">
        <van-goods-action-icon
          icon="wap-home-o"
          url="/pages/index/main"
          text="首页"
          dot
        />
        <van-goods-action-icon
          icon="cart-o"
          url="/pages/bookStore/shopCar/main"
          link-type="switchTab"
          text="购物车"
        />
        <van-goods-action-button
          text="加入购物车"
          @click.stop="openShop"
          type="warning"
        />
        <van-goods-action-button text="立即购买" />
      </van-goods-action>
    </div>
    <!-- 购买数量等信息 -->
    <div>
      <van-popup
        z-index="3"
        :show="showShopInfo"
        round
        position="bottom"
        custom-style="height: 50%"
        @close="onClose"
      >
        <div class="top-space-between full">
          <van-card
            :price="bookInfo.price"
            :title="bookInfo.title"
            :thumb="bookInfo.imgUrl"
          />
          <van-cell-group>
            <van-cell title="购买数量">
              <van-stepper
                :value="bookNumber"
                integer
                @change="bookNymberChange"
              />
            </van-cell>
          </van-cell-group>
          <van-button type="danger" round block @click.stop="addShopCar"
            >确定</van-button
          >
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { getBookById } from "@/dao/modules/book";
import { addShopCar } from "@/dao/modules/shopCar";

export default {
  components: {},
  data() {
    return {
      bookInfo: {},
      showShopInfo: false,
      bookNumber: 1
    };
  },
  methods: {
    openShop() {
      this.showShopInfo = true;
    },
    addShopCar() {
      addShopCar({
        bookId: this.bookInfo.bookId,
        bookNumber: this.bookNumber
      }).then(res => {
        if (res.data.data) {
          this.showShopInfo = false;
          this.$Notify({ type: "success", message: "添加成功" });
        }
      });
    },
    bookNymberChange(value) {
      this.bookNumber = value.mp.detail;
    },
    onClose() {
      this.showShopInfo = false;
    }
  },
  onShow() {
    wx.setNavigationBarTitle({ title: "书籍详情" });
  },
  onLoad: function(options) {
    getBookById({ bookId: options.bookId || 2 }).then(res => {
      console.log(res);
      this.bookInfo = res.data.data;
    });
  }
};
</script>
<style scoped></style>
