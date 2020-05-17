<template>
  <div class="recode">
    <div class="word-background" style="margin-top: 16px">
      <van-cell title="、" size="large" />
      <van-panel>
        <view class="girder-yinying">
          <van-grid clickable column-num="2" gutter="10">
            <van-grid-item
              link-type="navigateTo"
              text="打卡日历"
              @click.stop="openCalendar"
            >
              <div slot="icon">
                <van-icon name="sign" color="#00b081" />
              </div>
            </van-grid-item>
            <van-grid-item
              icon="search"
              link-type="reLaunch"
              url="/pages/dashboard/index"
              text="学习统计"
            />
          </van-grid>
        </view>
      </van-panel>
    </div>
    <!-- <i-divider content="生词复习"></i-divider>
    <view class="girder-yinying">
      <van-grid clickable column-num="2" gutter="10">
        <van-grid-item
          icon="sign"
          link-type="navigateTo"
          url="/pages/dashboard/index"
          text="听音辨意"
        />
        <van-grid-item
          icon="search"
          link-type="reLaunch"
          url="/pages/dashboard/index"
          text="看意识字"
        /> </van-grid
    ></view> -->

    <i-divider content="熟词复习"></i-divider>\
    <view class="girder-yinying">
      <van-grid clickable column-num="2" gutter="10">
        <van-grid-item
          link-type="navigateTo"
          url="/pages/englishWords/test/main"
          text="识字辨意"
        >
          <div slot="icon">
            <van-icon name="description" color="#00b081" />
          </div>
        </van-grid-item>
        <van-grid-item
          link-type="navigateTo"
          url=""
          text="测试功能"
        >
          <div slot="icon">
            <van-icon name="edit"/>
          </div>
        </van-grid-item>
      </van-grid>
    </view>
    <daKaCalendar :show="show" @close="closeCalendar"></daKaCalendar>
  </div>
</template>

<script>
import daKaCalendar from "@/components/public/daKaCalendar.vue";
import { getPlan } from "@/dao/modules/plan";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    daKaCalendar
  },

  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState("plan", {
      plan: state => state.plan,
      tag: state => state.tag
    }),
    ...mapState("user", {
      isLogin: state => state.isLogin
    })
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations("plan", ["setPlan", "setTag"]),
    openCalendar() {
      this.show = true;
    },
    closeCalendar() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.fd {
  background: gray;
}
</style>
