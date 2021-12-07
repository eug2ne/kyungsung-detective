<template>
  <Answerarea/>
  <QuizArea/>

  <div>Icons made by <a href="https://www.flaticon.com/authors/andy-horvath" title="Andy Horvath">Andy Horvath</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  <div>Icons made by <a href="https://www.flaticon.com/authors/jesus-chavarria" title="Jesus Chavarria">Jesus Chavarria</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  <div>Icons made by <a href="https://www.flaticon.com/authors/bayu015" title="bayu015">bayu015</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Answerarea from '../components/Answerarea.vue'
import QuizArea from '../components/QuizArea.vue'

export default {
  name: 'Quiz',
  components: { QuizArea, Navbar, Answerarea },
  props: ['quiz_id'],
  methods: {
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
