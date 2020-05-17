<template>
  <div>
    <div v-for="(book, key) in bookList" :key="key">
      <van-card
        :price="book.price"
        :title="book.title"
        :thumb="book.imgUrl"
        :num="bookNumber[key]"
      >
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
    },
    bookNumber: {
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
