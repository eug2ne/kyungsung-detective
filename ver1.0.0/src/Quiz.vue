<template>
  <header>
    <Navbar/>
  </header>
  <Answerarea/>
  <button @click="refreshQuiz" id="refreshQuiz">
    <img src="./assets/refresh-page-option.png" alt="재배열">
  </button>
  <table ref="table" id="Quiz area">
    <tr v-for="(item, index) in quizletterset" :key="index" :aria-rowindex="index">
      <Letter :rowIndex="index" v-for="(value, name) in item" :key="name.id" :colIndex="name" :letter="value"/>
    </tr>
  </table>
  <OptionsMenu v-if="show"/>

  <div>Icons made by <a href="https://www.flaticon.com/authors/andy-horvath" title="Andy Horvath">Andy Horvath</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Answerarea from './components/Answerarea.vue'
import Letter from './components/Letter.vue'
import OptionsMenu from './components/OptionsMenu.vue'
import quizletterset from './assets/quizletterset.json'

export default {
  name: 'Quiz',
  components: { Letter, Navbar, Answerarea, OptionsMenu },
  data() {
    return {
      quizletterset: quizletterset,
      show: false,
      targetLetter: null
    }
  },
  methods: {
    refreshQuiz() {
      // refresh quiz
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  width: 100%;
  padding: 15px;
}

button {
  display: inline;
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
  margin: 20px;
  padding: 5px;
  align-self: center;
  background-color: #914D44;
}
</style>
