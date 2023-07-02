import { db } from "../../firestoreDB"
import { useGameStore } from "../../game/game"
import { collection, doc, arrayUnion, updateDoc } from "firebase/firestore"

const exportSet = async (quizinstance) => {
    // save quizinstance to auto-doc/sets-collection
    const USER_QUIZS = collection(db, `BetaUsers/${useGameStore().UID}/Games/k_detective_beta/Slots/auto/Quizs`)
    const QUIZ_DOC = doc(USER_QUIZS, quizinstance.id)

    await updateDoc(QUIZ_DOC, {
        quizletterset: quizinstance.quizletterset,
        reverse: quizinstance.reverse,
        max_chosen: quizinstance.max_chosen,
        accomplish: quizinstance.accomplish
    })

    for (let c in quizinstance.chosen) {
        await updateDoc(QUIZ_DOC, {
            chosen: arrayUnion(quizinstance.chosen[c])
        })
    }

    for (let b in quizinstance.backset) {
        await updateDoc(QUIZ_DOC, {
            backset: arrayUnion(quizinstance.backset[b])
        })
    }

    for (let f in quizinstance.forwardset) {
        await updateDoc(QUIZ_DOC, {
            forwardset: arrayUnion(quizinstance.forwardset[f])
        })
    }

    // update stage timestamp
    useGameStore().$patch({
        stage: { timestamp: new Date() }
    })

    const slot_regex = /\/slot-[0-9]\//
    if (!slot_regex.test(useGameStore().puzzle.path)) return
    // if quiz.path set to slot-doc, change to auto-doc
    useGameStore().$patch({
        quiz: { path: QUIZ_DOC.path }
    })
}

export default exportSet