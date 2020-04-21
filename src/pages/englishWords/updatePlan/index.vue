<template>
  <div class="word">
    <i-card :title="cardTitle">
      <view slot="content">
        <i-cell-group>
          <i-cell :title="tag.name" is-link>
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
      @cancel="
        showPlan = !showPlan;
        bookValue = '';
      "
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
          <div>
            总单词数:
            <i-tag>{{ plan.totalNumber }}</i-tag>
          </div>
          <div>
            天数:
            <i-tag>{{ dayCount }}</i-tag>
          </div>
        </div>
      </div>
    </i-modal>
  </div>
</template>

<script>
import { updatePlan } from "@/dao/modules/plan";
import { getTagList } from "@/dao/modules/tag";
import { mapState, mapMutations } from "vuex";
import { getNowFormatDate } from "@/utils/math";
export default {
  data() {
    return {
      cardTitle: "经典单词书",
      bookTitle: "四级单词词汇（易）",
      showBook: false,
      showPlan: false,
      planNumber: 20,
      bookValue: "",
      bookList: [],
      bookActionsList: [
        {
          name: "取消"
        },
        {
          name: "删除",
          color: "#ed3f14",
          loading: false
        }
      ],
      tempList: {
        tag: {}
      }
    };
  },

  components: {},
  computed: {
    ...mapState("plan", {
      plan: state => state.plan,
      tag: state => state.tag
    }),
    ...mapState("user", {
      isLogin: state => state.isLogin
    }),
    planTitle() {
      return `${this.plan.numberDay} 个 / 日 预计 ${getNowFormatDate(
        Math.floor(this.plan.totalNumber / this.plan.numberDay)
      )} 完成`;
    },
    dayCount() {
      return Math.floor(this.plan.totalNumber / this.planNumber);
    }
  },
  watch: {},
  mounted() {
    this.planNumber = this.plan.numberDay;
  },
  methods: {
    ...mapMutations("plan", ["setPlan", "setTag"]),
    updateBook() {
      getTagList().then(res => {
        console.log(res);
        this.bookValue = this.tag.name;
        this.bookList = res.data.data;
        this.showBook = true;

        console.log("res.data.data", res.data.data);
      });
    },
    setBook(detail) {
      console.log(detail);
      this.bookValue = detail.target.value;
    },
    bookSumbit() {
      this.bookList.forEach(element => {
        if (element.name === this.bookValue) {
          this.tempList.tag = element;
        }
      });
      let tempPlan = Object.assign({}, this.plan, {
        tagId: this.tempList.tag.tagId
      });
      updatePlan(tempPlan).then(res => {
        console.log("genx plan:;", res);
        this.setPlan(res.data.data.plan);
        this.setTag(res.data.data.tag);
        this.showBook = false;
      });
    },
    updatePlan() {
      this.showPlan = true;
    },
    planSumbit() {
      console.log("修改", this.bookValue);
      let tempPlan = Object.assign({}, this.plan, {
        numberDay: this.planNumber
      });
      updatePlan(tempPlan).then(res => {
        this.setPlan(res.data.data.plan);
        this.setTag(res.data.data.tag);
        this.showPlan = false;
      });
    },
    changePlanNumber(mp) {
      console.log("mp.target.value", mp.target.value);
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
