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
    <ErrorPopup :type="showPopup"/>
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
import { db } from '../firestoreDB'
import _ from 'lodash'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import Letter from './Letter.vue'
import OptionsMenu from './OptionsMenu.vue'
import ErrorPopup from './QuizError/ErrorPopup.vue'
import quiz from '../composables/quiz'
import importSet from '../composables/quizlibrary/importSet'
import exportSet from '../composables/quizlibrary/exportSet'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu, ErrorPopup },
    props: [ 'id', 'set', 'user' ],
    data() {
      return {
        showOption: false,
        hint_x: null,
        hint_y: null,
        showPopup: null
      }
    },
    setup(props) {
      console.log('setup')
      const d_Set = ref({})
      const u_id = ref()
      const q_instance = ref({})
      const quizletterset = ref({})

      if (props.set) {
        // if set imported, quizletterset = set
        d_Set.value = props.set
        quizletterset.value = _.cloneDeep(d_Set.value)
        q_instance.value = {
          'id':props.id,
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
        const load = async (id, user) => {
            const {
              defaultSet,
              user_id,
              quizinstance
            } = await importSet(id, user)

            d_Set.value = defaultSet.value
            u_id.value = user_id
            q_instance.value = quizinstance
            quizletterset.value = q_instance.value.quizletterset
        }
        
        // load data from db
        load(props.id, props.user)
      }

      return {
        d_Set,
        u_id,
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
            console.log(error.message)
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
          console.log(error.message)
          this.showPopup = 'merge'
        }
      },
      show(data) {
        this.showOption = false
        switch (data.option) {
          case ('merge'):
            quiz({'event':'showMerge'}, this.q_instance, this.quizletterset)
            break
          
          case('word'):
            try {
              quiz({'event':'showWord'}, this.q_instance, this.quizletterset)
            } catch (error) {
              // WordSpaceError
              this.showPopup = 'wordspace'
            }
            break

          default:
            try {
              quiz({'event':'Space'}, this.q_instance, this.quizletterset)
            } catch (error) {
              console.log(error.message)
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
        this.quizletterset = _.cloneDeep(this.d_Set)
      },
      reverseQuiz() {
        // switch engine
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
      }
  },
  beforeUnmounted() {
    // update db when component destroyed
    // exportSet({ quizinstance }, this.user)
  }
}
</script>