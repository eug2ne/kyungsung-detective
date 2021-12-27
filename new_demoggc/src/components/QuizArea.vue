<template>
  <ul id="help">
    <li id="hint" @click="showHints = !showHints">힌트</li>
      <ul v-if="showHints" id="hints">
        <li @click="this.emitter.emit('hint_first')">초성 힌트</li>
        <li @click="this.emitter.emit('hint_def')">뜻 힌트</li>
      </ul>
  </ul>
  <div id="controls">
    <button @click="refreshQuiz" id="refreshQuiz">
      <img src="../assets/refresh-page-option.png" alt="초기화">
    </button>
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
    <tr v-for="(item, index) in this.quizletterset"
      :key="item.id"
      :aria-rowindex="index">
      <Letter
      @clickOnLetter="updateTarget"
      @toggleChoice="ppChoice"
        :rowIndex="index"
        v-for="(value, name) in item"
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
  <OptionsMenu @clickOption="showChoice"/>
</template>

<script>
import { ref, watch, watchEffect } from 'vue'
import _ from 'lodash'
import Letter from './Letter.vue'
import OptionsMenu from './OptionsMenu.vue'
import ErrorPopup from './QuizError/ErrorPopup.vue'
import quizengine from '../composables/quizengine'
import reversengine from '../composables/reversengine'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu, ErrorPopup },
    props: [ 'id' ],
    data() {
      return {
        reverse: false,
        showHints: false
      }
    },
    setup() {
      // import engine
      // (default) normal engine
      const reverse = ref(false)
      const {
        pastSet,
        forwardSet,
        back,
        forward,
        chosen,
        max_chosen,
        ppChoice,
        useshowMerge,
        useshowWord,
        useMerge,
        useWord,
        useSpace
      } = quizengine()

      watch(reverse.value, (reverse) => {
        if (reverse) {
          // reverse-engine
          const {
            pastSet,
            forwardSet,
            back,
            forward,
            chosen,
            max_chosen,
            ppChoice,
            useshowMerge,
            useshowWord,
            useMerge,
            useWord,
            useSpace
          } = reversengine()
        } else {
          // normal-engine
          const {
            pastSet,
            forwardSet,
            back,
            forward,
            chosen,
            max_chosen,
            ppChoice,
            useshowMerge,
            useshowWord,
            useMerge,
            useWord,
            useSpace
          } = quizengine()
        }
      })

      return {
        pastSet,
        forwardSet,
        back,
        forward,
        chosen,
        max_chosen,
        ppChoice,
        useshowMerge,
        useshowWord,
        useMerge,
        useWord,
        useSpace
      }
    },
    methods: {
      updateTarget(data) {
        if (this.$refs.table.querySelector('td.choice,td.chosen')&&this.quizletterset[data.row][data.col].isTarget) {
          // word()
          this.useWord(this.chosen, this.quizletterset)
        } else {
          // toggle target
          this.quizletterset[data.row][data.col].isTarget = !this.quizletterset[data.row][data.col].isTarget
          this.emitter.emit('toggleShow', {'show':this.quizletterset[data.row][data.col].isTarget, 'x':data.x, 'y':data.y})

          if (this.quizletterset[data.row][data.col].isTarget) {
            this.chosen.value.length = 0
            this.chosen.value.push({'row': data.row, 'col': data.col, 'letter': data.letter})

            // reset any other target in quizletterset
            this.quizletterset.forEach(row => {
              for (let i=0;i<15;i++) {
                if (this.quizletterset.indexof(row)==data.row&&i==data.col) {
                  // pass
                } else {
                  row[i].isTarget = false
                  row[i].isChoice = false
                  row[i].isChosen = false
                }
              }
            })
          }
        }
      },
      refreshQuiz() {
        this.quizletterset = this.defaultSet
      },
      reverse() {
        // switch engine
        this.reverse.value = !this.reverse.value
      }
  }
}
</script>