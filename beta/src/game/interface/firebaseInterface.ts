import { db } from '@/firestoreDB.js'
import { collection, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { useGameStore } from '../game.js'

type DBInterface = {
  loadDoc: (UID: string, gameKey: string, story: string, slot: string|number) => Promise<void>;
  // load data from doc
  // if doc not exist, create doc with default value
  saveDoc: (UID: string, gameKey: string, story: string, slot: string|number) => Promise<void>;
  // save data to doc
  // if doc not exist, create doc with given data
}

export const firebaseInterface: DBInterface = {
  loadDoc: async (UID: string, gameKey: string, story: string, slot: string|number) => {
    const USER_SLOTS = collection(db, `BetaUsers/${UID}/Games/${gameKey}/Slots`)
    const SLOT_DOC = doc(USER_SLOTS, slot)
    const SLOT_SNAP = await getDoc(SLOT_DOC)

    if (!SLOT_SNAP.exists()) {
      // create doc with default-value from game-store
      const clue_data: any = {}
      clue_data[story] = { ...useGameStore().cluenote }
      await setDoc(SLOT_DOC, {
        Stage: useGameStore().stage,
        Clue: clue_data,
        Puzzle: useGameStore().puzzle,
        Inventory: useGameStore().inventory,
        lastUpdated: Timestamp.fromDate(new Date())
      })
    } else {
      // patch game-store with slot-data
      useGameStore().$patch({
        stage: SLOT_SNAP.data().Stage,
        cluenote: SLOT_SNAP.data().Clue[story],
        puzzle: { id: SLOT_SNAP.data().Puzzle.id, path: SLOT_SNAP.data().Puzzle.path, route: SLOT_SNAP.data().Puzzle.route }
      })
    }
  },
  saveDoc: async (UID: string, gameKey: string, story: string, slot: string|number) => {
    const USER_SLOTS = collection(db, `BetaUsers/${UID}/Games/${gameKey}/Slots`)
    const SLOT_DOC = doc(USER_SLOTS, slot)

    const clue_data: any = {}
    clue_data[story] = { ...useGameStore().cluenote }
    console.log(clue_data)
    await setDoc(SLOT_DOC, {
      Stage: useGameStore().stage,
      Clue: clue_data,
      Puzzle: useGameStore().puzzle,
      Inventory: useGameStore().inventory,
      lastUpdated: Timestamp.fromDate(new Date())
    })
  }
}