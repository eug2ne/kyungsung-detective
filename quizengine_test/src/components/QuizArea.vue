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
import { ref, onMounted } from 'vue'
import { db } from '../firestoreDB'
import _ from 'lodash'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import Letter from './Letter.vue'
import OptionsMenu from './OptionsMenu.vue'
import ErrorPopup from './QuizError/ErrorPopup.vue'
import quizengine from '../composables/quizengine'

export default {
    name: 'QuizArea',
    components: { Letter, OptionsMenu, ErrorPopup },
    props: [ 'id', 'set', 'user_id' ],
    setup(props) {
      const reverse = ref(Boolean)
      const chosen = ref([])
      const max_chosen = ref(Number)

      // import quizletterset
      const defaultSet = ref({})
      const quizletterset = ref({})
      if (props.set) {
        // if set imported, quizletterset = set
        defaultSet.value = props.set
        quizletterset.value = _.deepClone(defaultSet.value)
      } else {
        // else, import set from db
        const setRef = doc(db, 'QuizSet', props.id)
        const userRef = doc(db, 'Users', props.user_id)
        
        onMounted(async () => {
          const setSnap = await getDoc(setRef)
          defaultSet.value = setSnap.data()

          const userSnap = await getDoc(userRef)
          if (userSnap.exists()) {
            // if user info exist, synchronize data with user info
            onSnapshot(userRef, (doc) => {
              const quizstatus = doc.data().quizstatus

              quizletterset.value = quizstatus.quizletterset
              reverse.value = quizstatus.reverse
              chosen.value = quizstatus.chosen
              max_chosen = quizstatus.max_chosen

              const {
                pastSet,
                forwardSet,
                back,
                forward,
                useshowMerge,
                useshowWord,
                useMerge,
                useWord,
                useSpace
              } = quizengine(reverse.value)

              pastSet.value = quizstatus.pastSet
              forwardSet.value = quizstatus.forwardSet

              return {
                defaultSet,
                quizletterset,
                pastSet,
                forwardSet,
                back,
                forward,
                useshowMerge,
                useshowWord,
                useMerge,
                useWord,
                useSpace
              }
            })
          } else {
            // else, add new user info
            quizletterset.value = defaultSet.value

            const {
              pastSet,
              forwardSet,
              back,
              forward,
              useshowMerge,
              useshowWord,
              useMerge,
              useWord,
              useSpace
            } = quizengine(false)

            setDoc(userRef, {
              quizstatus: {
                quizletterset: quizletterset.value,
                reverse: false,
                chosen: [],
                max_chosen: null,
                pastSet: pastSet.value,
                forwardSet: forwardSet.value
              }
            }) // set to default setting

            // synchronize data with user info
            onSnapshot(userRef, (doc) => {
              const quizstatus = doc.data().quizstatus

              quizletterset.value = quizstatus.quizletterset
              reverse.value = quizstatus.reverse
              chosen.value = quizstatus.chosen
              max_chosen.value = quizstatus.max_chosen

              const {
                pastSet,
                forwardSet,
                back,
                forward,
                useshowMerge,
                useshowWord,
                useMerge,
                useWord,
                useSpace
              } = quizengine(reverse.value)

              pastSet.value = quizstatus.pastSet
              forwardSet.value = quizstatus.forwardSet

              return {
                defaultSet,
                quizletterset,
                pastSet,
                forwardSet,
                back,
                forward,
                useshowMerge,
                useshowWord,
                useMerge,
                useWord,
                useSpace
              }
            })
          }
        })
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
          this.emitter.emit('toggleShow', {'show':this.quizletterset[data.row][data.col].isTarget, 'x':data.x, 'y':data.y, 'id':this.id})

          if (this.quizletterset[data.row][data.col].isTarget) {
            this.chosen.length = 0
            this.chosen.push({'row': data.row, 'col': data.col, 'letter': data.letter})

            // reset any other target in quizletterset
            for (let r=0;r<Object.keys(this.quizletterset).length;r++) {
              for (let c=0;c<Object.keys(this.quizletterset[r]).length;c++) {
                if (r==data.row&&c==data.col) {
                  // pass
                } else {
                  this.quizletterset[r][c].isTarget = false
                  this.quizletterset[r][c].isChoice = false
                  this.quizletterset[r][c].isChosen = false
                }
              }
            }
          }
        }
      },
      ppChoice(data) {
        if (data.action === 'push') {
          // toggle isChoice/isChosen
          this.quizletterset[data.choice.row][data.choice.col].isChosen = true
          this.quizletterset[data.choice.row][data.choice.col].isChoice = false

          this.chosen.push(data.choice)

          if (this.chosen.length == this.max_chosen) {
              // merge()
              this.useMerge(this.chosen, this.quizletterset)
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
      refreshQuiz() {
        this.quizletterset = this.defaultSet
      },
      reverseQuiz() {
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