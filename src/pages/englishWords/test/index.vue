<template>
  <div class="full topAndBottom">
    <van-tabs
      swipeable
      sticky
      :active="active"
      @change="tabChange"
      color="bule"
    >
      <van-tab
        v-for="(wordTest, key) in wordTestList"
        :key="key"
        :title="title + (key + 1)"
        :name="key"
      >
        <div class="margin-top margin-bottom">
          <wordTest
            :isDisable="isSumbit"
            @getCuurValue="getCuurValue($event, key)"
            :wordTest="wordTest"
          >
          </wordTest>
        </div>
      </van-tab>
    </van-tabs>
    <div
      v-if="isSumbit"
      class="rightAndLeft margin-top  margin-left"
      style="width: 60%"
    >
      <div v-if="results[active]">
        <van-tag type="success">对</van-tag>
        <span></span>
      </div>
      <div v-else>
        <van-tag type="danger">错</van-tag>
        <div>
          <p>正确答案是：</p>
          <p v-for="(tran, key) in correctTran[active]" :key="key">
            {{ tran }}
          </p>
        </div>
      </div>
    </div>
    <div class="rightAndLeft margin-bottom" style="width: 60%">
      <van-button
        v-if="showLast"
        plain
        hairline
        type="primary"
        @click.stop="lastOne()"
      >
        上一题
      </van-button>
      <span v-else></span>
      <van-button
        v-if="showNext"
        plain
        hairline
        type="info"
        @click.stop="nextOne()"
      >
        下一题
      </van-button>
      <van-button
        v-else-if="!isSumbit"
        plain
        hairline
        type="info"
        @click.stop="sumbit()"
      >
        交卷
      </van-button>
      <span v-else></span>
    </div>
  </div>
</template>

<script>
import wordTest from "@/components/word/wordTest.vue";
import { getWordTestList } from "@/dao/modules/word";
import { mapState, mapMutations } from "vuex";
import { getNowFormatDate } from "@/utils/math";
export default {
  data() {
    return {
      active: 0,
      wordTestList: [],
      title: "题号",
      isSumbit: false,
      // 测试答案数组
      testAnswer: [],
      // 结果数组
      results: []
    };
  },

  components: { wordTest },
  computed: {
    showLast() {
      if (this.active === 0 || this.active === "0") {
        return false;
      } else {
        return true;
      }
    },
    showNext() {
      let number = this.wordTestList.length - 1;
      if (this.active === number || this.number === number.toString()) {
        return false;
      } else {
        return true;
      }
    },
    // 正确答案数组
    correctAnswer() {
      let temp = [];
      this.wordTestList.forEach(element => {
        temp.push(element.correctQuest);
      });
      return temp;
    },
    // 正确答案翻译
    correctTran() {
      let tempList = [];
      this.wordTestList.forEach(element => {
        let tempTran = [];
        element.answer.trans.split("<br>").forEach(tran => {
          // 如果存在 '.'  要此解释
          if (tran.indexOf(".") !== -1) {
            tempTran.push(tran);
          }
        });
        tempList.push(tempTran);
      });
      return tempList;
    }
  },
  watch: {},
  mounted() {
    Object.assign(this.$data, this.$options.data());
    this.getWordTestList();
  },
  methods: {
    tabChange(tab) {
      console.log("tab", tab);
      this.active = tab.mp.detail.name;
    },
    getWordTestList() {
      getWordTestList().then(res => {
        this.wordTestList = res.data.data;
      });
    },
    getCuurValue(curValue, key) {
      // curValue 答案   key 第几个
      this.testAnswer[key] = curValue + 1;
    },
    lastOne() {
      if (this.active <= 0) {
        this.active = 0;
      } else {
        this.active = this.active - 1;
      }
    },
    nextOne() {
      if (this.active >= this.wordTestList.length - 1) {
        this.active = this.wordTestList.length - 1;
      } else {
        this.active = this.active + 1;
      }
    },
    checkedTest() {
      for (let i = 0; i < this.correctAnswer.length; i++) {
        if (this.testAnswer[i] == null) {
          this.results[i] = false;
        } else {
          this.results[i] =
            this.correctAnswer[i].toString() === this.testAnswer[i].toString();
        }
      }
    },
    sumbit() {
      this.checkedTest();
      this.isSumbit = true;
      this.active = 0;
    }
  },

  created() {},
  onLoad() {
    Object.assign(this.$data, this.$options.data());
  }
};
</script>

<style lang="scss" scoped></style>
