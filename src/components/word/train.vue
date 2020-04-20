<template>
  <div class="train">
    <div class="train-day">
      <div class="train-day-circle">
        {{ dayNumber }} <span style="font-size: 0.5rem;">天</span>
      </div>
    </div>
    <div class="train-content">
      <div class="train-plan">
        <div class="train-plan-title">
          <span>学习计划</span>
          <div class="train-plan-Btn">
            修改
          </div>
        </div>
        <div class="train-plan-list">
          <span>四级考纲词汇派生词</span>
          <div style="padding-left: 3.2rem;">10 个/日</div>
          <span>2091 /2091</span>
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
export default {
  data() {
    return {
      dayNumber: 210
    };
  },
  methods: {
    modifyPlan() {},
    gotoRemberWord() {
      wx.navigateTo({ url: "/pages/englishWords/remberWord/main" });
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
