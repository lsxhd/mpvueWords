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
		  <br/>
          <p>
            <van-tag mark type="warning">{{ bookInfo.publish }}</van-tag>
          </p>
		  <br/>
          <p>{{ bookInfo.detail }}</p>
        </view>
      </van-card>
    </div>
    <div>
      <van-panel title="相关系列好书" status="热卖">
        <view>内容</view>
      </van-panel>
    </div>
    <div>
      <van-goods-action safe-area-inset-bottom>
        <van-goods-action-icon
          icon="wap-home-o"
          url="pages/index/main"
          text="首页"
          dot
        />
        <van-goods-action-icon
          icon="cart-o"
          url="pages/index/main"
          text="购物车"
          info="5"
        />
        <van-goods-action-button text="加入购物车" type="warning" />
        <van-goods-action-button text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import { getBookById } from "@/dao/modules/book";
export default {
  components: {},
  data() {
    return {
      bookInfo: {}
    };
  },
  methods: {},
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
