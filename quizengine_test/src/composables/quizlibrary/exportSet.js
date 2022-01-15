import { db } from "../../firestoreDB"

const exportSet = async (instance, user_id) => {
    const user_quizstatusRef = db.collection('Users').doc('quizstatus')
        .collection('quizstatus').doc(user_id)

    await user_quizstatusRef.update(instance)
}

export default exportSet