<template>
  <Answerarea :id="quiz_id"/>
  <QuizArea :id="quiz_id"/>

  <div>Icons made by <a href="https://www.flaticon.com/authors/andy-horvath" title="Andy Horvath">Andy Horvath</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  <div>Icons made by <a href="https://www.flaticon.com/authors/jesus-chavarria" title="Jesus Chavarria">Jesus Chavarria</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  <div>Icons made by <a href="https://www.flaticon.com/authors/bayu015" title="bayu015">bayu015</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</template>

<script>
import Answerarea from '../components/Answerarea.vue'
import QuizArea from '../components/QuizArea.vue'

export default {
  name: 'Quiz',
  components: { QuizArea, Answerarea },
  props: ['quiz_id']
}
</script>

<style>
#controls {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #84C0D5;
  margin-bottom: 10px;
}

#help {
  background-color: #84C0D5;
}

#hints {
  background-color: #B0EEFF;
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
  display: block;
  background-color: #914D44;
}
</style>
