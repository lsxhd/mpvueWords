<template>
  <div class="word">
    <i-card :title="cardTitle">
      <view slot="content">
        <i-cell-group>
          <i-cell :title="bookTitle" is-link>
            <view slot="footer">
              <i-button @click.stop="updateBook" shape="circle" size="small"
                >更换</i-button
              >
            </view>
          </i-cell>
          <i-cell
            :title="planTitle"
            is-link
            value="修改"
            @click="updatePlan"
          ></i-cell>
        </i-cell-group>
      </view>
    </i-card>
    <i-modal
      title="更换单词书"
      :visible="showBook"
      @ok="bookSumbit"
      @cancel="showBook = !showBook"
    >
      <i-radio-group :current="bookValue" @change="setBook">
        <i-radio
          v-for="(book, key) in bookList"
          position="right"
          :key="key"
          :value="book.name"
        >
        </i-radio>
      </i-radio-group>
    </i-modal>

    <i-modal
      title="修改计划表"
      :visible="showPlan"
      @ok="planSumbit"
      @cancel="showPlan = !showPlan"
    >
      <div class="contentRowCenter">
        <div>
          每天的单词数:
          <i-input-number
            :value="planNumber"
            min="20"
            max="100"
            step="5"
            @change="changePlanNumber"
          />
        </div>
        <div>
          天数:
          <div>
            <i-tag> 20 </i-tag>
          </div>
        </div>
      </div>
    </i-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardTitle: "经典单词书",
      bookTitle: "四级单词词汇（易）",
      planTitle: "10个/日 预计2021-10-22 完成",
      showBook: false,
      showPlan: false,
      planNumber: 20,
      bookValue: 1,
      bookList: [
        {
          name: "四级单词词汇（易）",
          tagId: 1
        },
        {
          name: "四级单词词汇（难）",
          tagId: 2
        }
      ],
      bookActionsList: [
        {
          name: "取消"
        },
        {
          name: "删除",
          color: "#ed3f14",
          loading: false
        }
      ]
    };
  },

  components: {},

  methods: {
    updateBook() {
      this.showBook = true;
    },
    setBook(detail) {
      console.log(detail);
      this.bookValue = detail.target.value;
    },
    bookSumbit() {
      console.log("提交", this.bookValue);
    },
    updatePlan() {
      this.showPlan = true;
    },
    planSumbit() {
      console.log("修改", this.bookValue);
    },
    changePlanNumber(mp) {
      this.planNumber = Math.round(mp.target.value / 5) * 5;
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
.contentRowCenter {
  display: flex;
}
</style>
