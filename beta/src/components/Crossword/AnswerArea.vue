<template>
  <div class="wrapper pixel-borders--1" style="padding-bottom: 10px; border-top: none; border-left: none; border-right: none;">
    <div id="answer-area" class="pixel-borders--2">
      <h2 v-if="showAbbr">{{ this.answerData.a_abbr }}</h2>
      <h2 v-else>{{ this.answerData.a_underbar }}</h2>
      <p class="description" v-if="showDef">{{ this.answerData.a_def }}</p>
    </div>

    <ul id="help" class="group">
      <li class="hint-button" @click="showHintList = !showHintList">힌트</li>
        <ul v-if="showHintList" class="hints group">
          <li @click="cwAccs ? null : this.showAbbr = true">초성 힌트</li>
          <li @click="cwAccs ? null : this.showDef = true">뜻 힌트</li>
        </ul>
    </ul>

    <div id="rule-area" class="group pixel-borders--2">
      <div class="group">
        <h3 class="title">게임 방법</h3>
        <p class="description">
          다음과 같이 풀어쓴 형태로 십자말풀이를 채우세요.
        </p>
        <p class="description example">
          (예시)<br>
          한국어 >> ㅎㅏㄴㄱㅜㄱㅇㅓ
        </p>
        <router-link v-if="this.$route.path==='/Game'" :to="{ name: 'Rules' }" class="hint-button rules">
          예시 문제 풀기
        </router-link>
      </div>
    </div>
  </div>
  <div class="wrapper sticky" v-show="this.showSticky">
    <div class="wrapper sticky-panel pixel-borders--1" v-if="showHint">
      <h2 v-if="showAbbr">{{ this.answerData.a_abbr }}</h2>
      <h2 v-else>{{ this.answerData.a_underbar }}</h2>
      <p class="description" v-if="showDef" style="margin: 0;">
        {{ this.answerData.a_def }}
      </p>
    </div>
    <div class="wrapper sticky-panel pixel-borders--1" v-if="showRules">
      <p class="description">
        다음과 같이 풀어쓴 형태로 십자말풀이를 채우세요.
      </p>
      <p class="description example">
        한국어 >> ㅎㅏㄴㄱㅜㄱㅇㅓ
      </p>
    </div>
    <ul class="wrapper">
      <li @click="clickHintButton" class="sticky-button pixel-borders--2">
        힌트
      </li>
        <ul v-if="showHintList" class="hints group">
          <li @click="cwAccs ? null : this.showHint = true; this.showAbbr = true; showRules = false">
            초성 힌트
          </li>
          <li @click="cwAccs ? null : this.showHint = true; this.showDef = true; showRules = false">
            뜻 힌트
          </li>
        </ul>
      <li @click="cwAccs ? null : this.showRules = !showRules; this.showHint = false" class="sticky-button pixel-borders--2">
        게임 방법
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'AnswerArea',
  props: [ 'answerData', 'cwAccs' ],
  data() {
    return {
      showAbbr: false,
      showDef: false,
      showHintList: false, // show hint options (abbreviation, definition)
      showHint: false, // show hint in sticky-panel
      showRules: false,
      showSticky: false
    }
  },
  created() {
    // add scroll event listener
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    // listen for crossword accomplish event
    this.emitter.on('cwAccomplish', () => {
      this.showAbbr = true
      this.showDef = true
    })
  },
  unmounted() {
    // remove scroll event listener
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.pageYOffset
      const threshold = 180

      // show sticky version when page scrolled
      this.showSticky = scrollPosition > threshold
    },
    clickHintButton() {
      if (this.showHintList) {
        if (this.showRules) {
          // open hint sticky-panel
          this.showHint = true
        } else {
          // close hint-list
          this.showHintList = false
        }
      } else if (!this.showHint) {
        if (!this.showAbbr||!this.showDef) {
          // open hint-list
          this.showHintList = true
        }
        // open hint sticky-panel
        this.showHint = true
      } else {
        if (!this.showAbbr||!this.showDef) {
          // open hint-list
          this.showHintList = true
        } else {
          // close hint sticky-panel
          this.showHint = false
        }
      }

      // close rules sticky-panel
      this.showRules = false
    }
  }
}
</script>

<style scoped>
h2 {
  display: block;
  margin: 10px;
  font-size: 30px;
}

#answer-area {
  width: 700px;
  height: 160px;
  justify-self: center;
  text-align: center;
  background-color: #4bafd3;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.3) inset;
  border-radius: 10px;
}

#rule-area {
  width: 420px;
  padding: 10px;
  background-color: #4bafd3;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.3) inset;
  border-radius: 12px;
  z-index: 10;
}

#help {
  width: 150px;
  margin: 0 10px;
}

.hint-button {
  background-color: white;
  height: 60px;
  line-height: 55px;
  color: white;
  text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
  padding: 0;
  display: block;
  text-align: center;
  box-shadow: 5px 5px 0 rgba(255, 255, 255, 0.4) inset,
    -5px -5px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 75px #4bafd3 inset;
  border-radius: 5px;
}

.hint-button.rules {
  font-size: 25px;
  background-color: #101935;
  box-shadow: 5px 5px 0 rgba(255, 255, 255, 0.4) inset,
    -5px -5px 0 rgba(0, 0, 0, 0.2) inset;
  border-radius: 0px;
}

.hints {
  background-color: white;
  height: 60px;
  line-height: 55px;
  color: white;
  text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
  padding: 0;
  display: block;
  text-align: center;
  border-color: #15333b;
  border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><path d='M0 2h2v2H0zM2 0h2v2H2zM4 2h2v2H4zM2 4h2v2H2z' fill='%2315333b' /></svg>");
  box-shadow: 5px 5px 0 rgba(255, 255, 255, 0.4) inset,
    -5px -5px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 75px #4bafd3 inset;
  border-radius: 5px;
}

.hints li {
  background-color: #b0eeff;
  height: 55px;
  line-height: 55px;
  padding: 0;
  display: block;
  text-align: center;
  border-bottom: 0.5px solid #15333b;
  font-size: 25px;
}

.title {
  width: fit-content;
  margin: 5px 0;
  padding: 10px;
  text-align: left;
  line-height: 30px;
  background-color: #ffff;
  border-radius: 10px;
}

.description {
  max-width: 600px;
  padding: 5px;
  line-height: 25px;
}

.example {
  background-color: #ffffff;
}

.sticky {
  position: sticky;
  top: 0;
  right: 0;
  float: right;
  height: 60px;
  z-index: 20;
}

.sticky-panel.pixel-borders--1 {
  width: 820px;
  height: 70px;
  justify-content: space-between;
  border-radius: 0 0 15px 15px;
  border-top: none;
  border-right: none;
  background-color: #b0eeffc1;
}

.sticky-button.pixel-borders--2 {
  margin: 0 10px;
  padding: 5px;
  border-radius: 0 0 15px 15px;
  border-top: none;
  background-color: #b0eeff;
}
</style>