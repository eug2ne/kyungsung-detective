<template>
  <Answerarea :id="quiz_id"/>
  <ul id="help">
    <li id="hint" @click="showHints = !showHints">힌트</li>
      <ul v-if="showHints" id="hints">
        <li @click="this.emitter.emit('hint_first')">초성 힌트</li>
        <li @click="this.emitter.emit('hint_def')">뜻 힌트</li>
      </ul>
    <li id="rules"><router-link :to="{ name: 'Rules' }">게임방법</router-link></li>
  </ul>
  <QuizArea :id="quiz_id" user_id="admin"/>
  <OptionsMenu/>

  <div>Icons made by <a href="https://www.flaticon.com/authors/andy-horvath" title="Andy Horvath">Andy Horvath</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  <div>Icons made by <a href="https://www.flaticon.com/authors/jesus-chavarria" title="Jesus Chavarria">Jesus Chavarria</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  <div>Icons made by <a href="https://www.flaticon.com/authors/bayu015" title="bayu015">bayu015</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</template>

<script>
import Answerarea from '../components/Answerarea.vue'
import QuizArea from '../components/QuizArea.vue'
import OptionsMenu from '../components/OptionsMenu.vue'

export default {
  name: 'Quiz',
  components: { QuizArea, Answerarea, OptionsMenu },
  props: ['quiz_id'],
  data() {
    return {
      showHints: false
    }
  }
}
</script>

<style>
#controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #84C0D5;
  margin-bottom: 10px;
}

#help {
  align-self: center;
  width: 932px;
  background-color: #84C0D5;
}

#hints {
  background-color: #B0EEFF;
}

button {
  display: relative;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 20px 20px;
}

img {
  display: inherit;
  width: inherit;
  height: inherit;
}

table {
  display: table;
  table-layout: auto;
  width: auto;
  height: auto;
  background-color: #914D44;
}
</style>
