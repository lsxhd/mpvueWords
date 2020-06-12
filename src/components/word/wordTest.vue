<template>
  <div class="full">
    <van-panel>
      <view slot="header" class="center-2 girder-yinying">
        <span>{{ wordTest.answer.word }}</span>
        <span>{{ wordTest.answer.phonetic }}</span>
      </view>
      <view class="margin-top">
        <p class="girder-yinying">选项：</p>
        <van-grid gutter="16" column-num="2" :border="falses">
          <van-radio-group :value="cuurValue" @change="radioChange">
            <van-grid-item
              v-for="(quest, key) in questList"
              :key="key"
              style="height: 200rpx"
              use-slot
            >
              <van-radio
                :name="key"
                :disabled="isDisable"
                style="height: 200rpx;overflow:scroll;"
              >
                <p v-for="tran in quest.trans" :key="tran">
                  {{ tran }}
                </p>
              </van-radio>
            </van-grid-item>
          </van-radio-group>
        </van-grid>
      </view>
    </van-panel>
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
  props: {
    wordTest: {
      type: Object,
      default: () => {}
    },
    isDisable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cuurValue: -1
    };
  },
  computed: {
    questList() {
      let questLists = [];
      this.wordTest.quest.forEach(quest => {
        let tempQuest = quest;
        let tempTrans = [];
        tempQuest.trans.split("<br>").forEach(tran => {
          // 如果存在 '.'  要此解释
          if (tran.indexOf(".") !== -1) {
            tempTrans.push(tran);
          }
        });
        tempQuest.trans = tempTrans;
        questLists.push(tempQuest);
      });

      return questLists;
    }
  },
  mounted() {},
  watch: {},
  methods: {
    radioChange(value) {
      console.log("value", value);
      this.cuurValue = value.mp.detail;
      this.$emit("getCuurValue", this.cuurValue);
    }
  }
};
</script>

<style lang="scss" scoped></style>
