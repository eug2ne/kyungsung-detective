<template>
  <div class="contents">
    <Answerarea :quiz_id="quiz_id" />
    <ul id="help">
    <!-- if this.accs, disable all click events -->
    <li id="hint" @click="accs ? null : showHints = !showHints">힌트</li>
      <ul v-if="showHints" id="hints">
        <li @click="accs ? null : this.emitter.emit('hint_first')">초성 힌트</li>
        <li @click="accs ? null : this.emitter.emit('hint_def')">뜻 힌트</li>
      </ul>
    <li id="rules" v-else><router-link :to="{ name: 'Rules' }">게임방법</router-link></li>
    </ul>
    <QuizArea :quiz_id="quiz_id" />
  </div>

  <div class="sources">
    <div>
      Icons made by
      <a
        href="https://www.flaticon.com/authors/andy-horvath"
        title="Andy Horvath"
        >Andy Horvath</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
    <div>
      Icons made by
      <a
        href="https://www.flaticon.com/authors/jesus-chavarria"
        title="Jesus Chavarria"
        >Jesus Chavarria</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
    <div>
      Icons made by
      <a href="https://www.flaticon.com/authors/bayu015" title="bayu015"
        >bayu015</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
  </div>
</template>

<script>
import Answerarea from '../components/Answerarea.vue'
import QuizArea from '../components/QuizArea.vue'
import AccsModal from '../components/AccsModal.vue'

export default {
  name: 'Quiz',
  components: { QuizArea, Answerarea, AccsModal },
  props: ['quiz_id'],
  data() {
    return {
      showHints: false,
      accs: false
    }
  }
}
</script>

<style>
.contents {
  position: relative;
}

#controls {
  width: 935px;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ffe2b3;
  padding: 15px;
}

#help {
  width: 150px;
  position: absolute;
  top: 0%;
  right: 0%;
  float: right;
  margin: 0 10px;
}

#hint {
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

#hints li {
  background-color: #b0eeff;
  height: 55px;
  line-height: 55px;
  padding: 0;
  display: block;
  text-align: center;
  border-bottom: 0.5px solid #15333b;
  font-size: 25px;
}

.icon {
  display: inline;
  width: 45px;
  height: 45px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0 15px;
}

table {
  display: table;
  width: 885px;
  background-color: rgba(0, 0, 0, 0.8);
  border-spacing: 2px;
  box-shadow: 0 0 0 4px #ffe2b3, 0 0 0 calc(4px + 6px) rgba(0, 0, 0, 0.8),
    0 0 0 calc(4px + 6px + 15px) #ffe2b3;
  margin: 15px 25px 35px 25px;
}

table:after {
  content: "";
  z-index: -1;
  position: absolute;
  top: 217px;
  bottom: -28px;
  left: -3px;
  right: -3px;
  border-style: solid;
  border-width: 4px;
  border-color: #000;
  border-image-slice: 2;
  border-image-width: 1;
  border-image-outset: 0;
  border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><path d='M0 2h2v2H0zM2 0h2v2H2zM4 2h2v2H4zM2 4h2v2H2z' fill='%23000' /></svg>");
}

.sources {
  line-height: 110%;
}

.sources a {
  text-decoration-line: underline;
}
</style>