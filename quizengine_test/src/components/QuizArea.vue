<template>
  <div id="QuizArea-container">
    <div id="controls">
    <button @click="refreshQuiz" id="refreshQuiz">
      <img src="../assets/refresh-page-option.png" alt="초기화">
    </button>
    <button @click="reverseQuiz" id="reverse">reverse</button>
    <ul>
      <button @click="back" id="backQuiz">
        <img src="../assets/return.png" alt="뒤로가기">
      </button>
      <button @click="forward" id="forwardQuiz">
        <img src="../assets/next.png" alt="앞으로가기">
      </button>
    </ul>
    </div>
    <ErrorPopup/>
    <table ref="table" id="Quiz-area">
      <tr v-for="item in Object.keys(this.quizletterset)"
        :key="item.id"
        :aria-rowindex="item">
        <Letter
          @clickOnLetter="updateTarget"
          @toggleChoice="ppChoice"
          :rowIndex="item"
          v-for="(value, name) in this.quizletterset[item]"
          :key="name.id" :colIndex="name"
          :letter="value.letter"
          :isTarget="value.isTarget"
          :isChoice="value.isChoice"
          :isChosen="value.isChosen"
          :isAnswer="value.isAnswer"
          :isWord="value.isWord"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'
import { db } from '../firestoreDB'
import _ from 'lodash'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import Letter from './Letter.vue'
import OptionsMenu from './OptionsMenu.vue'
import ErrorPopup from './QuizError/ErrorPopup.vue'
import quiz from '../composables/quiz'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu, ErrorPopup },
    props: [ 'id', 'set', 'user' ],
    data() {
      return {
        quizletterset: {}
      }
    },
    methods: {
      async updateTarget(data) {
        if (this.$refs.table.querySelector('td.choice,td.chosen')&&this.quizletterset[data.row][data.col].isTarget) {
          // word()
          this.quizletterset = await quiz({'event':'Word'}, this.id, this.user)
        } else {
          // toggle target
          this.quizletterset = await quiz({'event':'toggleTarget', 'row':data.row, 'col':data.col}, this.id, this.user)
          this.emitter.emit('toggleShow', {'show':this.quizletterset[data.row][data.col].isTarget, 'x':data.x, 'y':data.y, 'id':this.id})
        }
      },
      async ppChoice(data) {
        if (data.action === 'push') {
          // toggle isChoice/isChosen
          this.quizletterset[data.choice.row][data.choice.col].isChosen = true
          this.quizletterset[data.choice.row][data.choice.col].isChoice = false

          this.chosen.push(data.choice)

          if (this.chosen.length == this.max_chosen) {
              // merge()
              this.quizletterset = await quiz({'event':'Merge'}, this.id, this.user)
          }
        } else {
          // data.type === 'pop'
          // toggle isChoice/isChosen
          this.quizletterset[data.choice.row][data.choice.col].isChosen = false
          this.quizletterset[data.choice.row][data.choice.col].isChoice = true

          const i = this.chosen.indexOf(data.choice)
          this.chosen.splice(i,1)
        }
      },
      async refreshQuiz() {
        this.quizletterset = await quiz({'event':'refreshQuiz'}, this.id, this.user)
      },
      async reverseQuiz() {
        // switch engine
        this.reverse = !this.reverse
      }
  },
  mounted() {
    this.emitter.on('clickOption', (data) => {
      if (data.id == this.id) {
        // id check
        const target = this.chosen[0]
        if (data.option == 'merge') {
          // merge()
          this.max_chosen = 2
          this.useshowMerge(this.quizletterset, target.row, target.col)
        } else if (data.option == 'word') {
          // word()
          this.max_chosen = 6
          this.useshowWord(this.quizletterset, target.row, target.col)
        } else {
          // data == null
          // space()
          this.useSpace()
        }
        } else {
          // pass
        }
    })
  }
}
</script>