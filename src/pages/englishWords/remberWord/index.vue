<template>
  <div class="remberWord">
    <div class="top">
      <div class="word" @click.stop="play">
        <p>{{ wordList[wordCount].word }}</p>
        <p>{{ wordList[wordCount].phonetic }}<i-icon type="systemprompt" /></p>
      </div>
      <div class="translt">
        <div class="cover-translt" v-if="!isTranslt" @click.stop="showTranslt">
          点击屏幕显示翻译
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
</template>

<script>
export default {
  data() {
    return {
      speakUrl: "http://dict.youdao.com/dictvoice?audio=",
      current: "train",
      isTranslt: false,
      wordCount: 0,
      wordList: [
        {
          word: "abandon",
          trans: "n. 狂热；放任 <br>vt. 遗弃；放弃 <br>abandon: 放弃|确认期权失效|委付 <br>Call abandon: 呼叫中途挂机 <br>abandon  v: 放弃".split(
            "<br>"
          ),
          phonetic: "[ə'bændən]",
          tag_id: 1
        },
        {
          word: "ability",
          trans: "n. 能力，能耐；才能 <br>Ability: 力|能力|本领 <br>encapsulating ability: 包被抑制性 <br>limited ability: 有限能力".split(
            "<br>"
          ),
          phonetic: "[ə'biliti]",
          tag_id: 1
        },
        {
          word: "able",
          trans: "adj. 能；[经管] 有能力的；能干的 <br>able: 有才干的|可······的|有能力的 <br>able leader: 能干的领导人 <br>able trend: 明显趋势".split(
            "<br>"
          ),
          phonetic: "['eibl]",
          tag_id: 1
        }
      ],
      innerAudioContext: ""
    };
  },
  mounted() {
    this.setSpeakUrl();
  },
  watch: {
    wordCount(newWo) {
      console.log("wordCount变化", newWo);
    }
  },
  methods: {
    showTranslt() {
      this.isTranslt = !this.isTranslt;
    },
    setSpeakUrl() {
      this.innerAudioContext = wx.createInnerAudioContext();
      this.innerAudioContext.src =
        this.speakUrl + this.wordList[wordCount].word;
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
    konwWord() {
      this.wordCount++;
    },
    unKonwWord() {
      this.wordCount++;
    }
  }
};
</script>

<style lang="scss" scoped>
.remberWord {
  width: 100%;
  height: 95%;

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
    display: flex;
    justify-content: center;
  }
}
.background-grey {
  width: 100%;
  background: rgba(237, 243, 248, 0.952);
}
</style>
