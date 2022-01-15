import { db } from '../../firestoreDB'
import { ref } from 'vue'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const importSet = async (quiz_id, user) => {
    const defaultSet = ref({})

    // import set from db
    const userRef = db.collection('Users').where('user_name', '==', user)
    const setRef = doc(db, 'QuizSet', quiz_id)

    const userSnap = await (await userRef.get()).docs[0]
    const user_id = userSnap.id
    // get defaultSet
    const defaultSnap = await getDoc(setRef)
    defaultSet.value = defaultSnap.data()

    const user_quizstatusRef = db.collection('Users').doc('quizstatus')
        .collection('quizstatus').doc(user_id)
    const user_quizstatusSnap = await getDoc(user_quizstatusRef)
    if (user_quizstatusSnap.exists()) {
        // if quizstatus for user exist, import set from user info
        const quizinstance = user_quizstatusSnap.data()

        return {
            defaultSet,
            user_id,
            quizinstance
        }
    } else {
        // else, make new quizstatus subcollection for user
        await setDoc(user_quizstatusRef, {
            quizletterset: defaultSet.value,
            chosen: [],
            reverse: false,
            max_chosen: 6,
            backset: [],
            forwardset: []
        })

        const quizinstance = user_quizstatusSnap.data()

        return {
            defaultSet,
            user_id,
            quizinstance
        }
    }
}

export default importSet