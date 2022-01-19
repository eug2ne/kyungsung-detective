<template>
  <slot>
  <ul id="help">
      <li id="hint" @click="showHints = !showHints" class="pixel-borders--1">
        힌트
      </li>
      <ul v-if="showHints" id="hints">
        <li @click="this.emitter.emit('hint_first')">초성 힌트</li>
        <li @click="this.emitter.emit('hint_def')">뜻 힌트</li>
      </ul>
  </ul>
  <div id="controls">
      <button @click="refreshQuiz" id="refreshQuiz" class="icon">
        <img src="../assets/refresh-page-option.png" alt="초기화" />
    </button>
    <ul>
        <button @click="back" id="backQuiz" class="icon">
          <img src="../assets/return.png" alt="뒤로가기" />
      </button>
        <button @click="forward" id="forwardQuiz" class="icon">
          <img src="../assets/next.png" alt="앞으로가기" />
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
  </slot>
  <OptionsMenu @clickOption="showChoice"/>
</template>

<script>
import { ref } from 'vue'
import _ from 'lodash'
import Letter from './Letter.vue'
import OptionsMenu from './OptionsMenu.vue'
import ErrorPopup from './QuizError/ErrorPopup.vue'
import quiz_1 from '../assets/quizset/quiz_1.json'
import quiz_2 from '../assets/quizset/quiz_2.json'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu, ErrorPopup },
    props: [ 'id' ],
    data() {
      return {
        quizletterset: ref([]),
        defaultSet: [],
        pastSet: [],
        forwardSet: [],
        wordlist: ref([]),
        mergelist: ref([]),
        chosen: ref([]),
        maxChosen: ref(Number),
        showHints: false
      }
    },
    created() {
      // import quizset
      if (this.id == 'quiz_1') {
        this.quizletterset = quiz_1
      } else if (this.id == 'quiz_2') {
        this.quizletterset = quiz_2
      } else {
        console.log('unauthorized route')
      }

      // deepclone quizletterset >> defaultset
      // used in refreshQuiz()
      this.defaultSet = _.cloneDeep(this.quizletterset)
    },
    beforeMount() {
      // fetch wordlist, mergelist
      fetch('http://localhost:3000/mergelist')
        .then(response => response.json())
        .then(data => this.mergelist = data)
        .catch(error => console.log(error.message))

      fetch('http://localhost:3000/wordlist')
        .then(response => response.json())
        .then(data => this.wordlist = data)
        .catch(error => console.log(error.message))
    },
    methods: {
      updateTarget(data) {
        if (this.$refs.table.querySelector('td.choice,td.chosen')&&this.quizletterset[data.row][data.col].isTarget) {
          // forceword()
          this.word(this.chosen)
        } else {
          // toggle target
          this.quizletterset[data.row][data.col].isTarget = !this.quizletterset[data.row][data.col].isTarget
          this.emitter.emit('toggleShow', {'show':this.quizletterset[data.row][data.col].isTarget, 'x':data.x, 'y':data.y})

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

          switch (target.col) {
            case 0:
              this.quizletterset[target.row][target.col+1].isChoice = true
              break

            case 14:
              this.quizletterset[target.row][target.col-1].isChoice = true
              break

            default:
              this.quizletterset[target.row][target.col-1].isChoice = true
              this.quizletterset[target.row][target.col+1].isChoice = true
          }
        } else if (data == 'word') {
          this.maxChosen = 6

          try {
            this.quizletterset[target.row][target.col+1].isChoice = true
            this.quizletterset[target.row+1][target.col].isChoice = true
            this.quizletterset[target.row+1][target.col+1].isChoice = true
            this.quizletterset[target.row+2][target.col].isChoice = true
            this.quizletterset[target.row+2][target.col+1].isChoice = true
          } catch (TypeError) {
            // show error popup
            this.emitter.emit('showPopup', 'wordspace')
          }
        } else {
          // data === null
          let wordspace = {'0,0':null, '1,0':null, '0,1':null, '1,1':null, '0,2':null, '1,2':null}

          try {
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
          } catch (TypeError) {
            // show error popup
            this.emitter.emit('showPopup', 'wordspace')
          }
        }
      },
      updatepastSet() {
        const beforeupdate = _.cloneDeep(this.quizletterset)

        // pastSet max_length == 5
        if (this.pastSet.length == 5) {
          console.log('maximum length')
        } else {
          this.pastSet.push(beforeupdate)
        }
      },
      regression(max_col, row) {
        if (this.quizletterset[row][max_col+1] == undefined||
          this.quizletterset[row][max_col+1].isWord) {
          this.quizletterset[row][max_col].letter = ''
        } else {
          this.quizletterset[row][max_col].letter = this.quizletterset[row][max_col+1].letter
          this.regression(max_col+1, row)
        }
      },
      merge(arr) {
        const l1 = this.quizletterset[arr[0].row][arr[0].col].letter
        const l2 = this.quizletterset[arr[1].row][arr[1].col].letter

        if (this.mergelist.valid[`${l1}`].includes(`${l2}`)) {
          // update pastSet
          this.updatepastSet()


          this.quizletterset[arr[0].row][Math.min(arr[0].col, arr[1].col)].letter = this.mergelist.merge[`${l1},${l2}`]
          this.quizletterset[arr[0].row][Math.max(arr[0].col, arr[1].col)].letter = ''

          // regression()
          this.regression(Math.max(arr[0].col, arr[1].col), arr[0].row)
        } else {
          // show error popup
          this.emitter.emit('showPopup', 'merge')
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
          // update pastSet
          this.updatepastSet()

          this.quizletterset[arr[0].row][arr[0].col].letter = Object.keys(this.wordlist)[index]
          this.quizletterset[arr[0].row][arr[0].col].isWord = true

          delete this.quizletterset[arr[0].row][arr[0].col+1]
          delete this.quizletterset[arr[0].row+1][arr[0].col]
          delete this.quizletterset[arr[0].row+1][arr[0].col+1]
          delete this.quizletterset[arr[0].row+2][arr[0].col]
          delete this.quizletterset[arr[0].row+2][arr[0].col+1]
        } else {
          // show error popup
          this.emitter.emit('showPopup', 'word')
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
        const target = this.chosen[0]

        if (wordspace in Object.values(this.wordlist)) {
          // show error popup
          this.emitter.emit('showPopup', 'space')
        } else {
          // update pastSet
          this.updatepastSet()


          for (let coord in wordspace) {
            let x = parseInt(coord.split(',')[0])
            let y = parseInt(coord.split(',')[1])

            this.quizletterset[target.row+y][target.col+x].letter = ''
          }
        }
      },
      refreshQuiz() {
        this.quizletterset = this.defaultSet
      },
      back() {
        try {
          const afterupdate = _.cloneDeep(this.quizletterset)
          // forwardSet max_length == 5
          if (this.forwardSet.length == 5) {
            console.log('maximum length of forwardSet is 5')
          } else {
            this.forwardSet.push(afterupdate)
          }

          if (this.pastSet.length == 0) {
            throw Error('out of range')
          } else {
            this.quizletterset = this.pastSet.pop()
          }
        } catch (Error) {
          console.log(Error.message)
        }
      },
      forward() {
        try {
          this.updatepastSet()

          if (this.forwardSet.length == 0) {
            throw Error('out of range')
          } else {
            this.quizletterset = this.forwardSet.pop()
          }
        } catch (Error) {
          console.log(Error.message)
        }
      }
  }
}
</script>