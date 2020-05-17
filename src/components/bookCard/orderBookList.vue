<template>
  <div>
    <scroll-view>
      <view
        v-for="(shopCarBook, key) in bookList"
        :key="key"
        :shopCarBook="shopCarBook.shopCar"
        :name="shopCarBook.shopCarId"
        checked-color="red"
      >
        <van-card
          :price="shopCarBook.price"
          :title="shopCarBook.title"
          :thumb="shopCarBook.imgUrl"
          num="2"
        >
        </van-card>
      </view>
    </scroll-view>
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
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style lang="scss" scoped></style>
