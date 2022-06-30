import { auth, db } from "../../firestoreDB"
import { collection, doc, arrayUnion, updateDoc } from "firebase/firestore"

const exportSet = async (quizinstance) => {
    // get current user
    const user = auth.currentUser
    console.log(quizinstance.quizletterset)

    const QuizRef = collection(db, 'Users/Quizs/Quizs')
    const user_QuizRef = doc(QuizRef, user.uid)

    await updateDoc(user_QuizRef, {
        quizletterset: quizinstance.quizletterset,
        reverse: quizinstance.reverse,
        max_chosen: quizinstance.max_chosen,
        accomplish: quizinstance.accomplish
    })

    for (let c in Object.values(quizinstance.chosen)) {
        await user_QuizRef.update({
            chosen: arrayUnion(c)
        })
    }

    for (let b in quizinstance.backset) {
        await user_QuizRef.update({
            backset: arrayUnion(b)
        })
    }

    for (let f in quizinstance.forwardset) {
        await user_QuizRef.update({
            forwardset: arrayUnion(f)
        })
    }
}

export default exportSet