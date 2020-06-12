<template>
  <div class="full top-space-between">
    <div class="remberWord" v-if="!isSuccess">
      <div class="top">
        <div class="word" @click.stop="play">
          <p>{{ wordList[wordCount].word || "无数据" }}</p>
          <p>
            {{ wordList[wordCount].phonetic || "无数据"
            }}<i-icon type="systemprompt" />
          </p>
        </div>
        <div class="translt" @click.stop="showTranslt">
          <div class="cover-translt" v-if="!isTranslt">
            点击此处显示翻译
          </div>
          <div class="" v-if="isTranslt">
            <div class="background-grey">翻译&短语</div>
            <div class="show-translt">
              <div v-for="(tran, key) in wordList[wordCount].trans" :key="key">
                <p>
                  <span>{{ tran }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="choose-btn">
        <i-button
          @click="konwWord"
          :inline="true"
          type="success"
          shape="circle"
          size="small"
          >认识</i-button
        >
        <i-button @click="unKonwWord" :inline="true" shape="circle" size="small"
          >不认识</i-button
        >
      </div>
    </div>
    <div v-else style="height: 90%" class="center-1">
      暂无复习内容
    </div>
    <!-- <van-progress :percentage="percentage" /> -->
    <div></div>
  </div>
</template>

<script>
import { reviewWord } from "@/dao/modules/word";
import { saveStudyWord } from "@/dao/modules/study";

import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isTranslt: false,
      wordCount: 0,
      word: {},
      wordList: [
        {
          word: "无数据",
          phonetic: "无数据",
          trans: "无数据 <br> 无数据"
        }
      ],
      innerAudioContext: "",
      isSuccess: false
    };
  },
  computed: {
    ...mapState("plan", {
      plan: state => state.plan,
      tag: state => state.tag
    }),
    percentage() {
      return Math.round(((this.wordCount + 1) / this.wordList.length) * 100);
    }
    // isSuccess() {
    //   let wordList = [
    //     {
    //       word: "无数据",
    //       phonetic: "无数据",
    //       trans: "无数据 <br> 无数据"
    //     }
    //   ]
    //   if(this.wordList.length == wordCount || this.wordList == wordList ) {
    //     return true
    //   } else {
    //     return false
    //   }

    // }
  },
  mounted() {
    this.getWordList();
  },
  watch: {
    wordCount(newWo) {
      this.setSpeakUrl(newWo);
    }
  },
  methods: {
    getWordList() {
      this.isTranslt = false;
      reviewWord().then(res => {
        res.data.data.forEach(element => {
          element.trans = element.trans.split("<br>");
        });
        if (res.data.data.length == 0) {
          this.isSuccess = true;
        } else {
          this.wordList = res.data.data;
          this.wordCount = 0;
          this.setSpeakUrl(this.wordCount);
          this.isSuccess = false;
        }
      });
    },
    showTranslt() {
      this.isTranslt = !this.isTranslt;
    },
    setSpeakUrl(i) {
      this.innerAudioContext = wx.createInnerAudioContext();
      if (this.wordList.length > 0) {
        this.innerAudioContext.src =
          "http://dict.youdao.com/dictvoice?audio=" + this.wordList[i].word;
      }

      console.log(this.innerAudioContext.src);
      this.play();
      //音频的数据链接，用于直接播放。支持云文件ID（2.2.3起）。
    },
    //点击播放,(如果要一进来就播放放到onload即可)
    play() {
      this.innerAudioContext.play();
    },
    //点击 停止
    stop() {
      this.innerAudioContext.pause();
    },
    computeWordCount(study) {
      saveStudyWord(study).then(res => {
        console.log(res.data.data);

        if (this.wordCount < this.wordList.length - 1) {
          this.wordCount++;
        } else {
          this.isSuccess = true;
        }
        this.isTranslt = false;
      });
    },
    konwWord() {
      let study = {
        wordId: this.wordList[this.wordCount].wordId,
        isReview: 0
      };
      this.computeWordCount(study);
    },
    unKonwWord() {
      let study = {
        wordId: this.wordList[this.wordCount].wordId,
        isReview: 1
      };
      this.computeWordCount(study);
    }
  }
};
</script>

<style lang="scss" scoped>
.remberWord {
  width: 100%;
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    .word {
      height: calc(100% -10%);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .translt {
      height: 70%;
      margin-top: 10%;

      .cover-translt {
        height: 100%;
        display: flex;
        justify-content: center;
      }
      .show-translt {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  .choose-btn {
    height: 10%;
    padding: 0 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.background-grey {
  width: 100%;
  background: rgba(237, 243, 248, 0.952);
}
</style>
