<template>
  <div class="container ub-box ub-col">
    <topSearch
      :isJump="false"
      :defaultSearchValue="searchValue"
      @getSearchValue="getSearchValue"
    >
    </topSearch>
    <bookCardList :bookList="bookList"></bookCardList>
  </div>
</template>
<script>
import topSearch from "@/components/bookCard/topSearch.vue";
import bookCardList from "@/components/bookCard/bookCardList.vue";
import { getBookListBySearch } from "@/dao/modules/book";
export default {
  components: { bookCardList, topSearch },
  computed: {
    curCity() {
      return this.$store.state.curCity;
    }
  },
  data() {
    return {
      bookList: [],
      searchValue: ""
    };
  },
  methods: {
    getInitialData(searchValue = "") {
      getBookListBySearch({ searchValue: searchValue }).then(res => {
        this.bookList = res.data.data;
      });
    },
    getSearchValue(searchValue) {
      this.searchValue = searchValue;
      this.getInitialData(this.searchValue);
    }
  },
  mounted() {},
  onPullDownRefresh() {},
  onLoad: function(options) {
    console.log(options);
    this.searchValue = options.searchValue
    this.getInitialData(options.searchValue);
  }
};
</script>
<style scoped></style>
