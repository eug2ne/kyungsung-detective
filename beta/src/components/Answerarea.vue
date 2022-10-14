<template>
  <div id="Answer-area" class="pixel-borders--2">
    <!-- if this.accs, show answer + def -->
    <h2 v-if="accs">{{ this.answerSet.answer }}</h2>
    <h2 v-if="accs ? false : showAbbr">{{ this.answerSet.abbr }}</h2>
    <h2 v-if="accs ? false : !showAbbr">{{ this.answerLength }}</h2>
    <p v-if="accs ? true : showdef">{{ this.answerSet.definition }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth, db } from '../firestoreDB'
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
        const accs = ref(false) // quiz accomplishment
        const answerSet = ref({})

        const load = async () => {
            try {
                const AnswerSetRef = collection(db, 'AnswerSet')
                let quiz_id = ''
                // get current user
                const user = auth.currentUser
                // import user-config from db
                const UsersRef = collection(db, 'Users')
                const user_Ref = doc(UsersRef, user.uid)
                const user_Snap = await getDoc(user_Ref)
                if (props.quiz_id == 'default') {
                    quiz_id = user_Snap.data().present_id
                } else {
                    quiz_id = props.quiz_id
                }
                // get quiz accomplishment from user-config
                accs.value = user_Snap.data().quiz_accs[quiz_id]

                const AnswerRef = doc(AnswerSetRef, quiz_id)
                const AnswerSnap = await getDoc(AnswerRef)

                answerSet.value = AnswerSnap.data()
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