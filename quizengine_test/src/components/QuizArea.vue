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
import importSet from '../composables/quizlibrary/importSet'
import exportSet from '../composables/quizlibrary/exportSet'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu, ErrorPopup },
    props: [ 'id', 'set', 'user' ],
    setup(props) {
      console.log('setup')
      const d_Set = ref({})
      const u_id = ref()
      const q_instance = ref({})
      const quizletterset = ref({})

      // create async load func.
      const load = async (id, user) => {
          const {
            defaultSet,
            user_id,
            quizinstance
          } = await importSet(id, user)

          d_Set.value = defaultSet
          u_id.value = user_id
          q_instance.value = quizinstance
          quizletterset.value = q_instance.value.quizletterset
      }
      
      // load data from db
      load(props.id, props.user)

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
          quiz({'event':'Word'}, this.q_instance)
        } else {
          // toggle target
          quiz({'event':'toggleTarget', 'row':data.row, 'col':data.col, 'letter':data.letter},
            this.q_instance)
          this.emitter.emit('toggleShow', {'show':this.quizletterset[data.row][data.col].isTarget,
            'x':data.x, 'y':data.y, 'id':this.id})
        }
      },
      ppChoice(data) {
        quiz({'event':'ppChoice', 'action':data.action, 'choice':data.choice},
          this.q_instance)
      },
      refreshQuiz() {
        // set quizletterset to default
        this.quizletterset = _.cloneDeep(this.d_Set.value)
      },
      reverseQuiz() {
        // switch engine
        quiz({'event':'reverse'}, this.q_instance)
      }
  },
  mounted() {
    this.emitter.on('clickOption', (data) => {
      if (data.id == this.id) {
        // id check
        switch (data.option) {
          case ('merge'):
            quiz({'event':'showMerge'}, this.q_instance, this.quizletterset)
            break
          
          case('word'):
            quiz({'event':'showWord'}, this.q_instance, this.quizletterset)
            break

          default:
            quiz({'event':'Space'}, this.q_instance, this.quizletterset)
            break
        }
      } else {
        // pass
      }
    })
  },
  beforeUnmounted() {
    // update db when component destroyed
    // exportSet({ quizinstance }, this.user)
  }
}
</script>