<template>
  <ErrorPopup :type="showPopup" @ErrorPopupVanish="refreshSet"/>
  <div class="contents">
    <div id="controls">
    <button @click="refreshQuiz" id="refreshQuiz" class="icon">
      <img src="../assets/refresh-page-option.png" alt="초기화" title="초기화"/>
    </button>
    <button ref="reverseButton" @click="reverseQuiz" class="icon" id="reverseQuiz">
      <img v-if="this.q_instance.reverse" class="animate__animated animate__flip animate__slow" src="../assets/noun-slider-774733.png" alt="반전">
      <img v-else class="animate__animated animate__flip animate__slow" src="../assets/noun-slider-774765.png" alt="반전">
    </button>
    <ul>
        <button @click="back" id="backQuiz" class="icon">
          <img src="../assets/return.png" alt="뒤로가기" title="실행취소"/>
        </button>
        <button @click="forward" id="forwardQuiz" class="icon">
          <img src="../assets/next.png" alt="앞으로가기" title="되돌리기"/>
        </button>
    </ul>
    </div>
    <OptionsMenu v-if="showOption" :x="hint_x" :y="hint_y"
      @clickOption="show"/>
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
import _ from 'lodash'
import Letter from './Letter.vue'
import OptionsMenu from './OptionsMenu.vue'
import ErrorPopup from './QuizError/ErrorPopup.vue'
import button_soundeffect from '../assets/button-soundeffect1.mp3'
import quiz from '../composables/quiz'
import importSet from '../composables/quizlibrary/importSet'
import exportSet from '../composables/quizlibrary/exportSet'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu, ErrorPopup },
    props: [ 'set', 'quiz_id' ],
    data() {
      return {
        showOption: false,
        hint_x: null,
        hint_y: null,
        showPopup: null
      }
    },
    setup(props) {
      const d_Set = ref({})
      const q_instance = ref({})
      const quizletterset = ref({})

      if (props.set) {
        // if set imported, quizletterset = set
        d_Set.value = props.set
        quizletterset.value = _.cloneDeep(d_Set.value)
        q_instance.value = {
          'id':props.quiz_id,
          'quizletterset': quizletterset.value,
          'chosen': [],
          'reverse': false,
          'max_chosen': 6,
          'backset': [],
          'forwardset': []
        }
      } else {
        // else, import set from db
        
        // create async load func.
        const load = async (quizid) => {
            const {
              defaultSet,
              quizinstance
            } = await importSet(quizid)

            d_Set.value = defaultSet.value
            q_instance.value = quizinstance
            quizletterset.value = q_instance.value.quizletterset
        }
        
        // load data from db
        load(props.quiz_id)
      }

      return {
        d_Set,
        q_instance,
        quizletterset
      }
    },
    methods: {
      updateTarget(data) {
        if (this.$refs.table.querySelector('td.choice,td.chosen')&&this.quizletterset[data.row][data.col].isTarget) {
          // word()
          try {
            quiz({'event':'Word'}, this.q_instance)
          } catch (error) {
            // WordError
            this.showPopup = 'word'
          }
        } else {
          // toggle target
          quiz({'event':'toggleTarget', 'row':data.row, 'col':data.col, 'letter':data.letter},
            this.q_instance)

          // toggle showHint
          this.showOption = this.quizletterset[data.row][data.col].isTarget
          this.hint_x = data.x
          this.hint_y = data.y
        }
      },
      ppChoice(data) {
        try {
          quiz({'event':'ppChoice', 'action':data.action, 'choice':data.choice},
          this.q_instance)
        } catch (error) {
          // MergeError
          this.showPopup = 'merge'
        }
      },
      show(data) {
        this.showOption = false
        switch (data.option) {
          case ('merge'):
            quiz({'event':'showMerge'}, this.q_instance)
            break
          
          case('word'):
            try {
              quiz({'event':'showWord'}, this.q_instance)
            } catch (error) {
              // WordSpaceError
              this.showPopup = 'wordspace'
            }
            break

          default:
            try {
              quiz({'event':'Space'}, this.q_instance)
            } catch (error) {
              if (error.message == 'WordspaceError') {
                // WordSpaceError
                this.showPopup = 'wordspace'
              } else {
                // SpaceError
                this.showPopup = 'space'
              }
            }
            break
        }
      },
      refreshQuiz() {
        // set quizletterset to default
        quiz({'event':'Refresh', 'defaultSet':this.d_Set}, this.q_instance)
        this.quizletterset = this.q_instance.quizletterset
      },
      reverseQuiz() {
        // switch engine
        const sound = new Audio(button_soundeffect)
        sound.play()
        this.q_instance.reverse = !this.q_instance.reverse
      },
      back() {
        // backquiz()
        try {
          quiz({'event':'backQuiz'}, this.q_instance)
          this.quizletterset = this.q_instance.quizletterset
        } catch (error) {
          // IndexError
        }
      },
      forward() {
        // forwardquiz()
        try {
          quiz({'event':'forwardQuiz'}, this.q_instance)
          this.quizletterset = this.q_instance.quizletterset
        } catch (error) {
          // IndexError
        }
      },
      refreshSet() {
        for (let r=0;r<6;r++) {
          for (let c=0;c<15;c++) {
            this.quizletterset[r][c].isTarget = false
            this.quizletterset[r][c].isChoice = false
            this.quizletterset[r][c].isChosen = false
          }
        }
      }
  },
  unmounted() {
    // update db when component destroyed
    exportSet(this.q_instance)
  }
}
</script>