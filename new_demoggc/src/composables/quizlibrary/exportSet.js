import { arrayUnion } from "firebase/firestore"
import { db } from "../../firestoreDB"

const exportSet = async (instance, user_id) => {
    const user_quizstatusRef = db.collection('Users').doc('quizstatus')
        .collection('quizstatus').doc(user_id)

    await user_quizstatusRef.update({
        quizletterset: instance.quizletterset,
        reverse: instance.reverse,
        max_chosen: instance.max_chosen
    })

    for (let c in Object.values(instance.chosen)) {
        console.log(c)
        await user_quizstatusRef.update({
            chosen: arrayUnion(c)
        })
    }

    for (let b in instance.backset) {
        await user_quizstatusRef.update({
            backset: arrayUnion(b)
        })
    }

    for (let f in instance.forwardset) {
        await user_quizstatusRef.update({
            forwardset: arrayUnion(f)
        })
    }
}

export default exportSet