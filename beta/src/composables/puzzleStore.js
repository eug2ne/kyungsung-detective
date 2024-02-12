import { useGameStore } from '../game/game'
import { db } from '../firestoreDB'
import { doc, setDoc, getDoc, collection } from 'firebase/firestore'

export const importSet = async (cw_id, path) => {
  // import instance from path
  const LOAD_DOC = doc(db, path) // load from path
  const LOAD_SNAP = await getDoc(LOAD_DOC)
  const USER_CWS = collection(db, `BetaUsers/${useGameStore().UID}/Games/k_detective_beta/Slots/auto/Crosswords`)
  const SAVE_DOC = doc(USER_CWS, cw_id) // save to auto-doc

  // get default_instance
  const DEFAULT_DOC = doc(db, `CrosswordSet/${cw_id}`)
  const DEFAULT_SNAP = await getDoc(DEFAULT_DOC)
  const default_cw_instance = DEFAULT_SNAP.data()

  // get answer_config
  const ANSWER_DOC = doc(db, `AnswerSet/${cw_id}`)
  const ANSWER_SNAP = await getDoc(ANSWER_DOC)
  const answer_config = ANSWER_SNAP.data()

  let cw_instance = null
  if (LOAD_SNAP.exists()) {
    // if user has cw_instance, load cw_instance from path
    cw_instance = LOAD_SNAP.data()

    return { cw_instance, answer_config }
  } else {
    // else, create new cw_instance in auto-doc/sets-collection
    await setDoc(SAVE_DOC, default_cw_instance)
    cw_instance = default_cw_instance

    return { cw_instance, answer_config }
  }
}

export const exportSet = async (cw_instance) => {
  if (!cw_instance) return

  // save cw_instance to auto-doc/sets-collection
  const USER_CWS = collection(db, `BetaUsers/${useGameStore().UID}/Games/k_detective_beta/Slots/auto/Crosswords`)
  const SAVE_DOC = doc(USER_CWS, cw_instance.id)

  await updateDoc(SAVE_DOC, cw_instance)

  // update stage timestamp
  useGameStore().$patch({
    stage: { timestamp: new Date() }
  })

  const slot_regex = /\/slot-[0-9]\//
  if (!slot_regex.test(usePuzzleStore().config.path)) return
  // if config.path set to slot-doc, change to auto-doc
  usePuzzleStore().$patch({
    config: { path: QUIZ_DOC.path }
  })
}