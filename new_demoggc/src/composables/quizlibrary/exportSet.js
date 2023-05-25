import { auth, db } from "../../firestoreDB"
import { collection, doc, arrayUnion, updateDoc } from "firebase/firestore"

const exportSet = async (quizinstance) => {
    // get current user
    const user = auth.currentUser

    const QuizRef = collection(db, 'Users/Quizs/Quizs')
    const user_QuizRef = doc(QuizRef, user.uid)

    await updateDoc(user_QuizRef, {
        quizletterset: quizinstance.quizletterset,
        reverse: quizinstance.reverse,
        max_chosen: quizinstance.max_chosen,
        accomplish: quizinstance.accomplish
    })

    for (let c in quizinstance.chosen) {
        await updateDoc(user_QuizRef, {
            chosen: arrayUnion(quizinstance.chosen[c])
        })
    }

    for (let b in quizinstance.backset) {
        await updateDoc(user_QuizRef, {
            backset: arrayUnion(quizinstance.backset[b])
        })
    }

    for (let f in quizinstance.forwardset) {
        await updateDoc(user_QuizRef, {
            forwardset: arrayUnion(quizinstance.forwardset[f])
        })
    }
}

export default exportSet