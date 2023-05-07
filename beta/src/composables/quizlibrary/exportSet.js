import { auth, db } from "../../firestoreDB"
import { collection, doc, arrayUnion, updateDoc } from "firebase/firestore"

const exportSet = async (quizinstance) => {
    // get current user
    const user = auth.currentUser

    const UsersRef = collection(db, 'BetaUsers')
    const userRef = doc(UsersRef, user.uid)

    const QuizsRef = collection(userRef, 'Quizs')
    const quizRef = doc(QuizsRef, quizinstance.id)

    await updateDoc(quizRef, {
        quizletterset: quizinstance.quizletterset,
        reverse: quizinstance.reverse,
        max_chosen: quizinstance.max_chosen,
        accomplish: quizinstance.accomplish
    })

    for (let c in quizinstance.chosen) {
        await updateDoc(quizRef, {
            chosen: arrayUnion(quizinstance.chosen[c])
        })
    }

    for (let b in quizinstance.backset) {
        await updateDoc(quizRef, {
            backset: arrayUnion(quizinstance.backset[b])
        })
    }

    for (let f in quizinstance.forwardset) {
        await updateDoc(quizRef, {
            forwardset: arrayUnion(quizinstance.forwardset[f])
        })
    }
}

export default exportSet