import { auth, db } from '../../firestoreDB'
import { collection, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'

const importSet = async (_quiz_id) => {
    // get current user
    const user = auth.currentUser
    // import set from db
    const UsersRef = collection(db, 'Users')
    const user_Ref = doc(UsersRef, user.uid)

    const QuizsRef = collection(user_Ref, 'Quizs')
    let quiz_id = ''
    if (_quiz_id == 'default') {
        const user_Snap = await getDoc(user_Ref)
        quiz_id = user_Snap.data().present_id
    } else {
        quiz_id = _quiz_id
        await updateDoc(user_Ref, {
            present_id: quiz_id
        }) // user-config.present_id to quiz_id
    }
    const user_QuizRef = doc(QuizsRef, quiz_id)
    const user_QuizSnap = await getDoc(user_QuizRef)

    // get defaultSet
    const defaultQuizRef = collection(db, 'QuizSet')
    const defaultSetRef = doc(defaultQuizRef, quiz_id)
    const defaultSetSnap = await getDoc(defaultSetRef)
    const defaultSet = defaultSetSnap.data()

    // get answerSet
    const answerSetRef = collection(db, 'AnswerSet')
    const answerDocRef = doc(answerSetRef, quiz_id)
    const answerSnap = await getDoc(answerDocRef)
    const answerSet = answerSnap.data().set

    if (user_QuizSnap.exists()) {
        // if user has quizstatus, load quizstatus from db
        const quizinstance = user_QuizSnap.data()

        return {
            defaultSet,
            quizinstance,
            answerSet
        }
    } else {
        // else, create new quizstatus
        await setDoc(user_QuizRef, {
            id: quiz_id,
            quizletterset: defaultSet,
            chosen: [],
            reverse: false,
            max_chosen: 6,
            backset: [],
            forwardset: [],
            accomplish: false
        })

        const accs_set = {}
        accs_set[quiz_id] = false
        await updateDoc(user_Ref, {
            quiz_accs: accs_set
        }) // default setting

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
        console.log(quizinstance)

        return {
            defaultSet,
            quizinstance,
            answerSet
        }
    }
}

export default importSet