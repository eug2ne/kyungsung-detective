<template>
  <Header />
  <table>
    <tr v-for="row in rows" :key="row" aria-rowindex={{row}}>
      <Letter rowIndex={{row}} v-for="col in Object.keys(quizset[row])" :key="col" colIndex={{col}} letter={{quizset[row])[col]}}/>
    </tr>
  </table>
</template>

<script>
import Header from './components/Header.vue'
import * as quizset from './assets/quizletterset.json'
import Letter from './components/Letter.vue'

export default {
  name: 'Quiz',
  components: { Letter, Header },
  data() {
    return {
      rows: Object.keys(quizset),
      quizset: quizset
    }
  }
}
</script>

<style>
</style>
