import { useGameStore } from '../../game/game'
import { db } from '../../firestoreDB'
import { doc, setDoc, getDoc, collection } from 'firebase/firestore'

const importSet = async (quiz_id, path) => {
    // import set from quiz.path
    const LOAD_DOC = doc(db, path) // load from quiz.path
    const LOAD_SNAP = await getDoc(LOAD_DOC)
    const USER_QUIZS = collection(db, `BetaUsers/${useGameStore().UID}/Games/k_detective_beta/Slots/auto/Quizs`)
    const SAVE_DOC = doc(USER_QUIZS, quiz_id) // save to auto-doc

    // get defaultSet
    const DEFAULT_DOC = doc(db, `QuizSet/${quiz_id}`)
    const DEFAULT_SNAP = await getDoc(DEFAULT_DOC)
    const defaultSet = DEFAULT_SNAP.data()

    // get answerSet
    const ANSWER_DOC = doc(db, `AnswerSet/${quiz_id}`)
    const ANSWER_SNAP = await getDoc(ANSWER_DOC)
    const answerSet = ANSWER_SNAP.data().set

    if (LOAD_SNAP.exists()) {
        // if user has quizstatus, load quizstatus from quiz.path
        const quizinstance = LOAD_SNAP.data()

        return {
            defaultSet,
            quizinstance,
            answerSet
        }
    } else {
        // else, create new quizstatus in auto-doc/sets-collection
        await setDoc(SAVE_DOC, {
            id: quiz_id,
            quizletterset: defaultSet,
            chosen: [],
            reverse: false,
            max_chosen: 6,
            backset: [],
            forwardset: [],
            accomplish: false
        })

        const quizinstance = {
            id: quiz_id,
            quizletterset: defaultSet,
            chosen: [],
            reverse: false,
            max_chosen: 6,
            backset: [],
            forwardset: [],
            accomplish: false
        }

        return {
            defaultSet,
            quizinstance,
            answerSet
        }
    }
}

export default importSet