<template>
  <view class="word">
    <i-tabs :current="current" scroll @change="handleChange">
      <i-tab key="train" title="训练"> </i-tab>
      <i-tab key="record" title="记录"></i-tab>
    </i-tabs>
    <view v-show="current === 'train'">
      <train></train>
    </view>
    <view v-show="current === 'record'">
      <record></record>
    </view>
  </view>
</template>

<script>
import train from "@/components/word/train";
import record from "@/components/word/record";

export default {
  data() {
    return {
      current: "record"
    };
  },

  components: {
    train,
    record
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      // console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },

    handleChange(detail) {
      this.current = detail.mp.detail.key;
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
.word {
  height: 100%;
  // background: #41C594;
  #shadow-root {
    ._i-tabs {
      .i-tabs-scroll {
        background: #41c594;
      }
    }
  }
}
</style>
