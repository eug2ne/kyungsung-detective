<template>
  <header>
    <Navbar>
      <li><router-link :to="{ name: 'Inventory' }">인벤토리</router-link></li>
      <li><router-link :to="{ name: 'Cluenote' }">단서노트</router-link></li>
      <nav v-if="showHintDropdown" id="hint-dropdown">
        <ul>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
        </ul>
      </nav>
    </Navbar>
  </header>
  <Answerarea/>
  <button @click="refreshQuiz" id="refreshQuiz">
    <img src="../assets/refresh-page-option.png" alt="재배열">
  </button>
  <QuizArea/>

  <div>Icons made by <a href="https://www.flaticon.com/authors/andy-horvath" title="Andy Horvath">Andy Horvath</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Answerarea from '../components/Answerarea.vue'
import QuizArea from '../components/QuizArea.vue'

export default {
  name: 'Quiz',
  components: { QuizArea, Navbar, Answerarea },
  methods: {
    refreshQuiz() {
      this.$forceUpdate()
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
