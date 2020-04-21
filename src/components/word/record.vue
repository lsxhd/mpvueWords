<template>
  <div class="recode">
    <div class="" style="margin-top: 16px">
      <van-button block type="info">默认按钮</van-button>
      <i-card
        title="单词本"
        extra=">"
        thumb="https://i.loli.net/2017/08/21/599a521472424.jpg"
      >
        <view slot="content">
          <i-grid>
            <i-grid-item>
              <i-grid-icon>
                <i-icon type="customerservice" />
              </i-grid-icon>
              <i-grid-label>听音复习</i-grid-label>
            </i-grid-item>
            <i-grid-item>
              <i-grid-icon>
                <i-icon type="customerservice" />
              </i-grid-icon>
              <i-grid-label>听音复习</i-grid-label>
            </i-grid-item>
          </i-grid>
        </view>
      </i-card>
    </div>
    <i-divider content="生词复习"></i-divider>
    <div style="margin: 0 16px">
      <i-grid>
        <i-grid-item>
          <i-grid-icon>
            <i-icon type="customerservice" />
          </i-grid-icon>
          <i-grid-label>听音复习</i-grid-label>
        </i-grid-item>
        <i-grid-item>
          <i-grid-icon>
            <i-icon type="customerservice" />
          </i-grid-icon>
          <i-grid-label>听音复习</i-grid-label>
        </i-grid-item>
      </i-grid>
    </div>

    <i-divider content="熟词复习"></i-divider>\
    <div style="margin: 0 16px">
      <i-grid>
        <i-grid-item>
          <i-grid-icon>
            <i-icon type="customerservice" />
          </i-grid-icon>
          <i-grid-label>熟词巩固</i-grid-label>
        </i-grid-item>
      </i-grid>
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
    })
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations("plan", ["setPlan", "setTag"])
  }
};
</script>

<style lang="scss" scoped></style>
