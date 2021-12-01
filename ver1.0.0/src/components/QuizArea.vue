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
        :isWord="value.isWord"
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
        if (this.$refs.table.querySelector('td.choice,td.chosen')&&this.quizletterset[data.row][data.col].isTarget) {
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

        if (mergelist.valid[`${l1}`].includes(`${l2}`)) {
          this.quizletterset[arr[0].row][Math.min(arr[0].col, arr[1].col)].letter = this.mergelist.merge[`${l1},${l2}`]
          this.quizletterset[arr[0].row][Math.max(arr[0].col, arr[1].col)].letter = ''
        } else {
            console.log('mergeImpossible')
        }

        // reset()
        for (let r=0;r<6;r++) {
          for (let c=0;c<15;c++) {
              this.quizletterset[r][c].isTarget = false
              this.quizletterset[r][c].isChoice = false
              this.quizletterset[r][c].isChosen = false
          }
        }
      },
      word(arr) {
        let wordspace = {'0,0':null, '1,0':null, '0,1':null, '1,1':null, '0,2':null, '1,2':null}

        for (let n=0;n<arr.length;n++) {
          
          if (this.quizletterset[arr[n].row][arr[n].col] == '') {
            wordspace[`${arr[n].col-arr[0].col},${arr[n].row-arr[0].row}`] = null
          } else {
            wordspace[`${arr[n].col-arr[0].col},${arr[n].row-arr[0].row}`] = this.quizletterset[arr[n].row][arr[n].col].letter
          }
        }

        let index = Object.values(this.wordlist).findIndex(element => this.compare_obj(element, wordspace))
        if (index != -1) {
          this.quizletterset[arr[0].row][arr[0].col].letter = Object.keys(this.wordlist)[index]
          this.quizletterset[arr[0].row][arr[0].col].isWord = true

          delete this.quizletterset[arr[0].row][arr[0].col+1]
          delete this.quizletterset[arr[0].row+1][arr[0].col]
          delete this.quizletterset[arr[0].row+1][arr[0].col+1]
          delete this.quizletterset[arr[0].row+2][arr[0].col]
          delete this.quizletterset[arr[0].row+2][arr[0].col+1]
        } else {
          console.log('wordimpossible')
        }

        // reset()
        for (let r=0;r<6;r++) {
          for (let c=0;c<15;c++) {
              this.quizletterset[r][c].isTarget = false
              this.quizletterset[r][c].isChoice = false
              this.quizletterset[r][c].isChosen = false
          }
        }
      },
      compare_obj(a, b) {
        // compare 2 objects
        // if identical, return true
        // else, return false

        let n = 0;
        let compare = true;
        while (compare && n < 6) {
          if (Object.values(a)[n] === Object.values(b)[n])
            n = n + 1;
          else
            compare = false;
        }

        return compare;
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