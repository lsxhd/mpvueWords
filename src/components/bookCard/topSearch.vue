<template>
  <div>
    <div>
      <van-search
        :value="searchValue"
        use-action-slot
        @change="change"
        placeholder="请输入搜索关键词"
      >
        <view slot="action" @tap="search">搜索</view>
      </van-search>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  props: {
    isJump: {
      type: Boolean,
      default: true
    },
    defaultSearchValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchValue: this.defaultSearchValue
    };
  },
  computer: {},
  watch: {},
  methods: {
    change(searchValue) {
      console.log(searchValue);
      this.searchValue = searchValue.mp.detail;
    },
    search(searchValue) {
      console.log("fdsafd", searchValue, this.searchValue);
      if (this.isJump) {
        wx.navigateTo({
          url:
            "/pages/bookStore/searchBook/main?searchValue=" + this.searchValue
        });
      } else {
        this.$emit("getSearchValue", this.searchValue);
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
