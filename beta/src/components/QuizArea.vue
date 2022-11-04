<template>
  <ErrorPopup :type="showPopup" @ErrorPopupVanish="refreshSet"/>
  <div class="contents">
    <AccsModal />
    <div class="popup" id="accomplishedSign" v-if="this.q_instance.accomplish">
      <h2>해 결!</h2>
    </div>
    <div id="controls">
    <!-- if this.accs, disable click-event -->
    <button v-on="this.q_instance.accomplish ? {} : { click: refreshQuiz }" id="refreshQuiz" class="icon">
      <img src="../assets/refresh-page-option.png" alt="초기화" title="초기화"/>
    </button>
    <button ref="reverseButton" v-on="this.q_instance.accomplish ? {} : { click: reverseQuiz }" class="icon" id="reverseQuiz">
      <img v-if="this.q_instance.reverse" class="animate__animated animate__flip animate__slow" src="../assets/noun-slider-774733.png" alt="반전">
      <img v-else class="animate__animated animate__flip animate__slow" src="../assets/noun-slider-774765.png" alt="반전">
    </button>
    <ul>
        <button v-on="this.q_instance.accomplish ? {} : { click: back }" id="backQuiz" class="icon">
          <img src="../assets/return.png" alt="뒤로가기" title="실행취소"/>
        </button>
        <button v-on="this.q_instance.accomplish ? {} : { click: forward }" id="forwardQuiz" class="icon">
          <img src="../assets/next.png" alt="앞으로가기" title="되돌리기"/>
        </button>
    </ul>
    </div>
    <OptionsMenu v-if="!this.q_instance.accomplish ? showOption : false" :x="hint_x" :y="hint_y"
      @clickOption="show" />
    <div v-if="showDefault" id="default_page">
      <h2>아직 추리 중인 단서가 없습니다!</h2>
      <h3>맵을 돌아다니며 단서를 얻거나 단서 노트에서 추리하고 싶은 단서를 선택해주세요!</h3>
    </div>
    <table v-else ref="table" id="Quiz-area">
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
import AccsModal from './AccsModal.vue'
import button_soundeffect from '../assets/button-soundeffect1.mp3'
import quiz from '../composables/quiz'
import importSet from '../composables/quizlibrary/importSet'
import exportSet from '../composables/quizlibrary/exportSet'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu, ErrorPopup, AccsModal },
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
      const showDefault = ref(false)
      const answerset = ref({})

      if (props.set) {
        // if set imported, quizletterset = set
        d_Set.value = props.set
        quizletterset.value = props.set
        q_instance.value = {
          'id':props.quiz_id,
          'quizletterset': d_Set.value,
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
          try {
            const {
              defaultSet,
              quizinstance,
              answerSet
            } = await importSet(quizid)

            d_Set.value = defaultSet
            q_instance.value = quizinstance
            quizletterset.value = quizinstance.quizletterset
            answerset.value = answerSet
          } catch (err) {
            showDefault.value = true
          }
        }
        
        // load data from db
        load(props.quiz_id)
      }

      return {
        d_Set,
        q_instance,
        quizletterset,
        showDefault,
        answerset
      }
    },
    methods: {
      updateTarget(data) {
        if (this.$refs.table.querySelector('td.choice,td.chosen')&&this.quizletterset[data.row][data.col].isTarget) {
          // word()
          try {
            quiz({'event':'Word'}, this.q_instance, this.answerset)
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
  updated() {
    if (this.q_instance.accomplish) return

    try {
      // check quiz-accomplishment during play
      const accomplish = Object.keys(this.answerset.word).every((coord) => {
        const [ x, y ] = coord.split(',')
        const word = this.answerset.word[coord]

        if (this.quizletterset[x][y].letter == word) {
          return true
        } else {
          return false
        }
      })

      if (accomplish) {
        this.q_instance.accomplish = true // set q_instance.accomplish to true
        exportSet(this.q_instance) // update user-status on db

        setTimeout(() => {
          this.emitter.emit('quizAccomplish', { story: this.q_instance.story, id: this.q_instance.id }) // emit quiz-accomplish event
        }, 3000)
      }

      // check answer match in answerset.letter
      for (const coord in this.answerset.letter) {
        const [ x, y ] = coord.split(',')
        const letter = this.answerset.letter[coord]

        try {
          if (this.q_instance.quizletterset[x][y].letter == letter) {
            this.q_instance.quizletterset[x][y].isAnswer = true
          }
        } catch (err) {
          // this.quizletterset[x][y] not exist (deleted wordspace)
          // pass
        }
      }
    } catch (err) {
      // no user-q_instance imported (show default page)
      // pass
    }
  },
  unmounted() {
    // update db when component destroyed
    exportSet(this.q_instance)
  }
}
</script>

<style>
.popup {
  width: 935px;
  min-height: 100px;
  position: absolute;
  display: block;
  top: 160px;
  z-index: 1000;
  align-self: center;
}

#accomplishedSign {
  text-align: center;
  text-shadow: 2px 2px 0 #ffff, -2px -2px 0 #ffff;
  font-size: 40px;
  background-color: rgba(244, 63, 63, 0.6);
  padding: 50px;
}

#accomplishedSign h2 {
  margin-top: 12px;
}

#default_page {
  display: block;
  width: 885px;
  height: 400px;
  text-align: center;
  text-shadow: 4px 2px #f5f1f0;
  font-size: 25px;
  background-color: #ffcf87;
  border-spacing: 2px;
  box-shadow: 0 0 0 4px #ffe2b3, 0 0 0 calc(4px + 6px) rgba(0, 0, 0, 0.8),
    0 0 0 calc(4px + 6px + 15px) #ffe2b3;
  margin: 15px 25px 35px 25px;
  padding: 50px;
}

#default_page h2 {
  margin: 20px;
}
</style>