import { auth, db } from '../../firestoreDB'
import { ref } from 'vue'
import { collection, doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore'

const importSet = async (quiz_id) => {
    const defaultSet = ref({})

    // get current user
    const user = auth.currentUser
    // import set from db
    const QuizRef = collection(db, 'Users/Quizs/Quizs')
    const user_QuizRef = doc(QuizRef, user.uid)
    const user_QuizSnap = await getDoc(user_QuizRef)

    // get defaultSet
    const defaultQuizRef = collection(db, 'QuizSet')
    const defaultSetRef = doc(defaultQuizRef, quiz_id)
    const defaultSetSnap = await getDoc(defaultSetRef)
    defaultSet.value = defaultSetSnap.data()

    if (user_QuizSnap.exists()) {
        // if user has quizstatus, load quizstatus from db
        const quizinstance = user_QuizSnap.data().sets[quiz_id]

        return {
            defaultSet,
            quizinstance
        }
    } else {
        // else, create new quizstatus
        const set = {}
        set[`${quiz_id}`] = {
            quizletterset: defaultSet.value,
            chosen: [],
            reverse: false,
            max_chosen: 6,
            backset: [],
            forwardset: [],
            accomplish: false
        }
        await setDoc(user_QuizRef, {
            present_id: quiz_id,
            quiz_ids: arrayUnion(quiz_id),
            sets: set
        }) // default setting

        const quizinstance = user_QuizSnap.data().sets[quiz_id]

        return {
            defaultSet,
            quizinstance
        }
    }
}

export default importSet