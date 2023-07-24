<template>
  <div id="Answer-area" class="pixel-borders--2">
    <button class="icon help-icon" @click="this.clickHelp">?</button>
    <!-- if this.accs, show answer + def -->
    <h2 v-if="accs">{{ this.answerSet.answer }}</h2>
    <h2 v-if="accs ? false : showAbbr">{{ this.answerSet.abbr }}</h2>
    <h2 v-if="accs ? false : !showAbbr">{{ this.answerLength }}</h2>
    <p class="definition" v-if="accs ? true : showdef">{{ this.answerSet.definition }}</p>
  </div>
  <QuizHelp x="670" y="50" v-if="this.showHelp">
    <p>
        정답 단어를 만들어서 퀴즈를 해결하세요. 힌트에서 정답 단어의 초성과 뜻을 볼 수 있습니다.<br> (정답 단어를 만들 때 단어의 위치도 맞도록 유의하세요.)
    </p>
  </QuizHelp>
</template>

<script>
import { ref } from 'vue'
import { db } from '../firestoreDB'
import { doc, getDoc } from 'firebase/firestore'
import { useGameStore } from '../game/game'
import QuizHelp from './QuizHelp.vue'

export default {
    name: 'AnswerArea',
    components: { QuizHelp },
    data() {
        return {
            showdef: false,
            showAbbr: false,
            showHelp: false
        }
    },
    setup() {
        const accs = ref(false) // quiz accomplishment
        const answerSet = ref({})

        const load = async () => {
            const { id, path } = useGameStore().puzzle

            try {
                const ANSWER_DOC = doc(db, `AnswerSet/${id}`)
                const ANSWER_SNAP = await getDoc(ANSWER_DOC)
                // get quiz accomplishment from quiz-doc
                const QUIZ_DOC = doc(db, path)
                const QUIZ_SNAP = await getDoc(QUIZ_DOC)
                accs.value = QUIZ_SNAP.data() ? QUIZ_SNAP.data().accomplish : false

                answerSet.value = ANSWER_SNAP.data()
            } catch (err) {
                // if present_id do not exist in user-config, show default-page
                answerSet.value = {}
            }
        }

        load()

        return {
            answerSet,
            accs
        }
    },
    computed: {
        answerLength() {
            const abbr = this.answerSet.abbr

            if (!abbr) return

            let length = ''
            for (const l of abbr) {
                if (l == ' ') {
                    length += ' '
                } else {
                    length += '_ '
                }
            }

            return length
        }
    },
    methods: {
        clickHelp() {
            this.showHelp = !this.showHelp
        }
    },
    mounted() {
        this.emitter.on('hint_first', () => {
            this.showAbbr = true
        }),
        this.emitter.on('hint_def', () => {
            this.showdef = true
        }),
        this.emitter.on('quizAccomplish', () => {
            this.accs = true
        })
    }
}
</script>

<style scoped>
#Answer-area {
    width: 700px;
    height: 160px;
    justify-self: center;
    text-align: center;
    background-color: rgb(243, 234, 221);
    margin-bottom: 20px;
    padding: 20px;
    box-shadow: 4px 4px rgba(0, 0, 0, 0.3) inset;
    border-radius: 10px;
}

h2 {
    font-size: 30px;
    padding: 5px;
}

p.definition {
    font-size: 20px;
    padding: 10px;
}
</style>