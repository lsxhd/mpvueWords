<template>
  <div>
    <div v-for="(book, key) in bookList" :key="key">
      <van-card
        :price="book.price"
        :title="book.title"
        :thumb="book.imgUrl"
        @click.stop="gotoDetail(book.bookId)"
      >
        <view slot="desc">
          <p>
            <van-tag mark type="success">{{ book.author }}</van-tag>
          </p>
          <p>
            <van-tag mark type="warning">{{ book.publish }}</van-tag>
          </p>
          <!-- <p>{{ book.detail }}</p> -->
        </view>
      </van-card>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bookList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    gotoDetail(bookId) {
      wx.navigateTo({ url: "/pages/bookStore/bookDetail/main?bookId=" + bookId });
    }
  }
};
</script>
<style lang="scss" scoped></style>
