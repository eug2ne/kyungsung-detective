<template>
  <button @click="refreshQuiz" id="refreshQuiz">
    <img src="../assets/refresh-page-option.png" alt="초기화">
  </button>
  <button @click="back" id="backQuiz">
    <img src="../assets/return.png" alt="뒤로가기">
  </button>
  <OptionsMenu @clickOption="showChoice"/>
  <table ref="table" id="Quiz-area">
    <tr v-for="(item, index) in quizletterset"
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
        />
    </tr>
  </table>
</template>

<script>
import { ref } from 'vue'
import Letter from './Letter.vue'
import OptionsMenu from './OptionsMenu.vue'
import quizletterset from '../assets/quizletterset.json'
import wordlist from '../assets/wordlist.json'
import mergelist from '../assets/valid_mergewordlist.json'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu },
    data() {
      return {
        quizletterset: quizletterset,
        wordlist: wordlist,
        mergelist: mergelist,
        chosen: ref([]),
        defaultSet: ref([]),
        pastSet: ref([]),
        maxChosen: ref(Number)
      }
    },
    beforeMount() {
      // used when quizreset()
      this.defaultSet = quizletterset
    },
    beforeUpdate() {
      // used when back()
      this.pastSet = quizletterset

    },
    methods: {
      updateTarget(data) {
        if (this.chosen.length == 6&&this.quizletterset[data.row][data.col].isTarget) {
          // forceword()
          this.word(this.chosen)
        } else {
          // toggle target
          this.quizletterset[data.row][data.col].isTarget = !this.quizletterset[data.row][data.col].isTarget
          this.emitter.emit('toggleShow', this.quizletterset[data.row][data.col].isTarget)

          if (this.quizletterset[data.row][data.col].isTarget) {
            this.chosen.length = 0
            this.chosen.push({'row': data.row, 'col': data.col})

            for (let r=0;r<6;r++) {
              for (let c=0;c<15;c++) {
                if (r != data.row||c != data.col) {
                  // reset
                  this.quizletterset[r][c].isTarget = false
                  this.quizletterset[r][c].isChoice = false
                  this.quizletterset[r][c].isChosen = false
                }
              }
            }
          }
        }
      },
      showChoice(data) {
        let target = this.chosen[0]

        if (data == 'merge') {
          this.maxChosen = 2

          this.quizletterset[target.row][target.col-1].isChoice = true
          this.quizletterset[target.row][target.col+1].isChoice = true
        } else if (data == 'word') {
          this.maxChosen = 6

          this.quizletterset[target.row][target.col+1].isChoice = true
          this.quizletterset[target.row+1][target.col].isChoice = true
          this.quizletterset[target.row+1][target.col+1].isChoice = true
          this.quizletterset[target.row+2][target.col].isChoice = true
          this.quizletterset[target.row+2][target.col+1].isChoice = true
        } else {
          // data === null
          let wordspace = {'0,0':null, '1,0':null, '0,1':null, '1,1':null, '0,2':null, '1,2':null}

          for (let coord in wordspace) {
            let x = parseInt(coord.split(',')[0])
            let y = parseInt(coord.split(',')[1])

            if (coord == '1,1'||this.quizletterset[target.row+y][target.col+x].letter) {
              wordspace[coord] = null
            } else {
              wordspace[coord] = this.quizletterset[target.row+y][target.col+x].letter
            }
          }

          this.space(wordspace)
        }
      },
      merge(arr) {
        const l1 = this.quizletterset[arr[0].row][arr[0].col].letter
        const l2 = this.quizletterset[arr[1].row][arr[1].col].letter

        console.log(this.mergelist.merge[`${l1},${l2}`])
        if (mergelist.valid[`${l1}`].includes(`${l2}`)) {
          this.quizletterset[arr[0].row][Math.min(arr[0].col, arr[1].col)].letter = this.mergelist.merge[`${l1},${l2}`]
          this.quizletterset[arr[0].row][Math.max(arr[0].col, arr[1].col)].letter = ''
        } else {
            console.log('mergeImpossible')
        }

        // reset()
      },
      word(arr) {
        
      },
      ppChoice(data) {
        if (data.action === 'push') {
          // toggle isChoice/isChosen
          this.quizletterset[data.choice.row][data.choice.col].isChosen = true
          this.quizletterset[data.choice.row][data.choice.col].isChoice = false

          this.chosen.push(data.choice)

          if (this.chosen.length == this.maxChosen) {
              // merge()
              this.merge(this.chosen)
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
      space(wordspace) {
        let target = this.chosen[0]

        if (wordspace in Object.values(this.wordlist)) {
          console.log('spaceimpossible')
        } else {
          for (let coord in wordspace) {
            let x = parseInt(coord.split(',')[0])
            let y = parseInt(coord.split(',')[1])

            this.quizletterset[target.row+y][target.col+x].letter = ''
          }
        }
      },
      refreshQuiz() {
      }
  }
}
</script>