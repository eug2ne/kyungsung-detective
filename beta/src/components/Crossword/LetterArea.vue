<template>
  <div id="letter-area" class="group pixel-borders--2">
    <div class="wrapper consonant pixel-borders--2">
      <h3 class="title">자음</h3>
      <Letter v-for="con in this.consonants" :key="con.id" :letter="con"/>
    </div>
    <div class="wrapper vowel pixel-borders--2">
      <h3 class="title">모음</h3>
      <Letter v-for="vow in this.vowels" :key="vow" :letter="vow" />
    </div>
    <div class="wrapper special pixel-borders--2">
      <h3 class="title">천지인</h3>
      <Letter v-for="special in this.specials" :key="special.id" :letter="special" />
    </div>
    <button @click="this.showExplanation = !this.showExplanation">
      <span class="help-icon">?</span>
      <p class="description">천지인 <br> 사용 방법</p>
    </button>
    <div v-show="this.showExplanation" class="group explanation">
      <p class="description">
        자음/모음과 천지인을 조합하여 새로운 글자를 만들 수 있습니다.
      </p>
      <p class="description example">
        ㅅ + . >> ㅊ ㅓ + | >> ㅔ <br>
        ㅅ + _ >> ㅈ ㅔ + . >> ㅖ
      </p>
      <p class="description">
        같은 자음끼리 합쳐 쌍자음을 만들 수도 있습니다.
      </p>
      <p class="description example">
        ㅅ + ㅅ >> ㅆ <br>
        ㅈ + ㅈ >> ㅉ
      </p>
    </div>
  </div>
</template>
<script>
import Letter from './Letter.vue'

export default {
  name: 'LetterArea',
  components: { Letter },
  data() {
    return {
      consonants: ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅅ", "ㅇ"],
      vowels: ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ"],
      specials: [".", "_", "|"],
      showExplanation: false
    }
  }
}
</script>
<style scoped>
#letter-area {
  position: absolute;
  top: 90px;
  left: 10px;
  height: 270px;
  padding: 10px;
  flex-wrap: wrap;
  background-color: #00ff9192;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.3) inset;
  border-radius: 12px;
  z-index: 10;
}

.wrapper {
  width: 560px;
  height: 70px;
  margin: 5px;
}

button {
  margin: 5px;
  font-family: "NeoDunggeunmo";
  cursor: pointer;
  border: none;
  border-radius: 10px;
}

.title {
  font-size: 25px;
  margin: 0;
  padding: 0;
  max-width: 80px;
  text-align: center;
  background-color: #ffff;
  border-radius: 10px;
}

.help-icon, .help-icon:focus {
  float: left;
}

.description {
  font-size: 15px;
  line-height: 100%;
  padding: 3px;
  margin: 3px;
}

.explanation {
  position: absolute;
  top: 18px;
  left: 18px;
  width: 553px;
  background-color: #fff700ee;
  z-index: 20;
}

.explanation .example {
  font-size: 20px;
}
</style>