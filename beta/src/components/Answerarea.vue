<template>
  <div id="Answer-area" class="pixel-borders--2">
      <h2 v-if="showAbbr">{{ this.answerSet.abbr }}</h2>
      <h2 v-else>{{ this.answerLength }}</h2>
      <p v-if="showdef">{{ this.answerSet.definition }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { db } from '../firestoreDB'
import { collection, doc, getDoc } from 'firebase/firestore'

export default {
    name: 'AnswerArea',
    props: [ 'quiz_id' ],
    data() {
        return {
            showdef: false,
            showAbbr: false
        }
    },
    setup(props) {
        const answerSet = ref({})

        const load = async () => {
            const AnswerSetRef = collection(db, 'AnswerSet')
            const AnswerRef = doc(AnswerSetRef, props.quiz_id)
            const AnswerSnap = await getDoc(AnswerRef)

            answerSet.value = AnswerSnap.data()
        }

        load()

        return {
            answerSet
        }
    },
    computed: {
        answerLength() {
            const abbr = this.answerSet.abbr

            if (abbr) {
                return '_ '.repeat(abbr.length)
            } else {
                // pass
            }
        }
    },
    mounted() {
        this.emitter.on('hint_first', () => {
            this.showAbbr = true
        }),
        this.emitter.on('hint_def', () => {
            this.showdef = true
        })
    }
}
</script>

<style scoped>
#Answer-area {
    width: 600px;
    height: 200px;
    justify-self: center;
    text-align: center;
    background-color: rgb(243, 234, 221);
    margin-bottom: 20px;
    padding: 35px;
    box-shadow: 4px 4px rgba(0, 0, 0, 0.3) inset;
    border-radius: 10px;
}

h2 {
    font-size: 45px;
    padding: 10px;
}

p {
    font-size: 25px;
    padding: 10px;
}
</style>