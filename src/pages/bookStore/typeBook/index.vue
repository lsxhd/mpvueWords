<template>
  <div class="full">
    <!-- <van-nav-bar title="书籍分类列表" left-text="返回" left-arrow>
      <view slot="right">
        <van-icon color="blue" name="search" />
      </view>
    </van-nav-bar> -->
    <topSearch />

    <div class="type-book-content full">
      
        <van-sidebar :active-key="activeKey" @change="bookTypeChange">
          <van-sidebar-item title="英语考试" />
          <van-sidebar-item title="大学英语四六级" />
          <van-sidebar-item title="英语读物" />
          <van-sidebar-item title="英语工具书" />
          <van-sidebar-item title="少儿英语" />
        </van-sidebar>
      
      <div  style="height: 608px">
        <bookCardList :bookList="bookList"></bookCardList>
      </div>
    </div>
  </div>
</template>
<script>
import { getBookListByType } from "@/dao/modules/book";
import topSearch from "@/components/bookCard/topSearch.vue";
import bookCardList from "@/components/bookCard/bookCardList.vue";
export default {
  components: { bookCardList },
  data() {
    return {
      activeKey: 3,
      bookList: [],
      isAllchecked: 2
    };
  },
  mounted() {
    this.getInitialData();
  },
  methods: {
    getInitialData(bookTypeId = 1) {
      getBookListByType({ bookTypeId: bookTypeId }).then(res => {
        console.log(res.data.data);
        this.bookList = res.data.data;
      });
    },
    bookTypeChange(event) {
      console.log("event", event);
      this.getInitialData(event.mp.detail + 1);
    }
  },
  onShow() {
    // wx.setNavigationBarTitle({ title: "书籍分类" });
  },
  onLoad: function(options) {
    console.log("options", options);
    this.activeKey = options.bookTypeId;
  }
};
</script>
<style scoped>
.type-book-content {
  display: flex;
}
</style>
