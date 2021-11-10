<template>
  <table ref="table" id="Quiz-area">
    <tr v-for="(item, index) in quizletterset" :key="index" :aria-rowindex="index">
      <Letter :rowIndex="index" v-for="(value, name) in item" :key="name.id" :colIndex="name" :letter="value"/>
    </tr>
  </table>
  <OptionsMenu/>
</template>

<script>
import Letter from './Letter.vue'
import OptionsMenu from './OptionsMenu.vue'
import quizletterset from '../assets/quizletterset.json'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu },
    data() {
      return {
        quizletterset: quizletterset
      }
    }
}
</script>