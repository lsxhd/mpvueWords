<template>
  <div>
    <van-calendar
      title="打卡日历"
      :show="show"
      :round="false"
      :min-date="minDate"
      :max-date="maxDate"
      :punchWordList="punchWordList"
      position="right"
      @close="close"
    >
      <div slot="footer">
        <van-button
          type="danger"
          :disabled="btnDisabled"
          round
          size="large"
          @click.stop="punch"
        >
          {{ btnDisabled ? "今日已打卡" : "打卡" }}
        </van-button>
      </div>
    </van-calendar>
  </div>
</template>
<script>
import { getPunchWord, punch } from "@/dao/modules/punchWord";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      punchWordList: [],
      minDate: new Date(2020, 2, 1).getTime(),
      maxDate: new Date(2020, 7, 31).getTime()
    };
  },
  computed: {
    btnDisabled() {
      var today = new Date();

      if (this.punchWordList.length > 0) {
        let punchDate = new Date(
          this.punchWordList[this.punchWordList.length - 1].punchTime
        );
        return (
          today.getMonth() === punchDate.getMonth() &&
          today.getDate() === punchDate.getDate()
        );
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.getPunchWord();
  },
  methods: {
    getPunchWord() {
      getPunchWord().then(res => {
        this.punchWordList = res.data.data;
        console.log("punch", this.punchWordList);
      });
    },
    punch() {
      if (!this.btnDisabled) {
        punch().then(res => {
          console.log("打卡", res.data.data);
          if (res.data.data) {
            this.getPunchWord();
          }
        });
      }
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped></style>
