<template>
  <div class="train">
    <div class="train-day">
      <div v-show="isLogin" class="train-day-circle">
        {{ dayNumber }} <span style="font-size: 0.5rem;">天</span>
      </div>
    </div>

    <div class="train-content">
      <div class="train-plan">
        <div class="train-plan-title">
          <span>学习计划</span>
          <div @click="upadatePlan" class="train-plan-Btn">
            修改
          </div>
        </div>
        <div class="train-plan-list">
          <span>{{ tag.name }}</span>
          <div style="padding-left: 3.2rem;">{{ plan.numberDay }} 个/日</div>
          <span>2091 /{{ plan.totalNumber }}</span>
        </div>
      </div>
    </div>
    <div class="train-btn">
      <div class="train-btn-Btn" @click="gotoRemberWord">
        开始学习
      </div>
    </div>
  </div>
</template>

<script>
import { getPlan } from "@/dao/modules/plan";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("plan", {
      plan: state => state.plan,
      tag: state => state.tag
    }),
    ...mapState("user", {
      isLogin: state => state.isLogin
    }),
    dayNumber() {
      return Math.floor(this.plan.totalNumber / this.plan.numberDay);
    }
  },
  mounted() {
    this.getPlanAndTag();
  },
  watch: {
    isLogin(isLogin) {
      this.getPlanAndTag();
    }
  },
  methods: {
    ...mapMutations("plan", ["setPlan", "setTag"]),
    modifyPlan() {},
    // 获取
    getPlanAndTag() {
      console.log("fsd", this.isLogin);
      if (this.isLogin) {
        getPlan().then(res => {
          console.log(res);
          console.log("res.data.data.tag", res.data.data.tag);
          this.setPlan(res.data.data.plan);
          this.setTag(res.data.data.tag);
        });
      }
    },
    gotoRemberWord() {
      wx.navigateTo({ url: "/pages/englishWords/remberWord/main" });
    },
    upadatePlan() {
      wx.navigateTo({ url: "/pages/englishWords/updatePlan/main" });
    }
  }
};
</script>

<style lang="scss" scoped>
$background: #00b081 !important;
$circleData: 3rem;
.train {
  height: 100%;
  background: white;
  .train-day {
    padding-top: 0.2rem;
    height: 3rem;
    background: $background;
    display: flex;
    justify-content: center;
    align-items: center;
    .train-day-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid white;
      color: white;
      font-size: 0.6rem;
      width: $circleData;
      height: $circleData;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
    }
  }
  // .train-content{
  //   border: 1px solid red;
  //   width: 150%;
  //   height: 3rem;
  //   background: $background;
  //   display: flex;
  //   // flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  // }
  .train-plan {
    height: 3rem;
    width: 100%;
    background: $background;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    padding-top: 0.2rem;
    border-bottom-left-radius: 40%;
    border-bottom-right-radius: 40%;
    .train-plan-title {
      border-bottom: 0.5px solid white;
      width: 90%;
      height: 0.6rem;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      background: $background;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .train-plan-Btn {
        width: 1rem;
        height: 0.4rem;
        font-size: 12px;
        -moz-border-radius: 0;
        -webkit-border-radius: 0.2rem;
        border-radius: 0.2rem;
        border: 1px solid white;
        text-align: center;
        vertical-align: middle;
      }
    }
    .train-plan-list {
      width: 90%;
      height: 0.6rem;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      background: $background;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }
  }
  .train-btn {
    background: white;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .train-btn-Btn {
      background: $background;
      width: 100%;
      height: 0.8rem;
      font-size: 12px;
      -moz-border-radius: 0;
      -webkit-border-radius: 0.2rem;
      border-radius: 0.2rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
