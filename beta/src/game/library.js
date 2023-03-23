// function library for useGameStore().cluenote update events
  // add clue + add subclue + add timeline

import { useGameStore } from "./game";
import { auth, db } from '../firestoreDB.js'
import { collection, doc, updateDoc } from "firebase/firestore";

export const addClue = (clue, index) => {
  // add clue to designated index
  useGameStore().$patch((state) => {
    state.cluenote[index] = clue
  })

  // if subclue included, add subclue quiz-accomplishment to user.quiz_accs
  if (clue.subClues.length == 0) return
  
  const uid = auth.currentUser.uid
  const UsersRef = collection(db, 'Users')
  const user_UsersRef = doc(UsersRef, uid)
  Object.values(clue.subClues).forEach((subclue_group) => {
    subclue_group.forEach((subClue) => {
      if (!subClue.quiz_id) return

      const data = {}
      data[subClue.quiz_id] = false
      updateDoc(user_UsersRef, {
        'quiz_accs': data
      }) // async operation
    })
  })
}

export const addSubClue = (subclue, index, s_index) => {
  // add subclue to clue of designated index
  console.log(index, useGameStore().cluenote[index])
  useGameStore().$patch((state) => {
    state.cluenote[index].subClues[s_index].push(subclue)
  })

  // add subclue quiz-accomplishment to user.quiz_accs
  if (!subclue.quiz_id) return

  const uid = auth.currentUser.uid
  const UsersRef = collection(db, 'Users')
  const user_UsersRef = doc(UsersRef, uid)
  const data = {}
  data[subClue.quiz_id] = false
  updateDoc(user_UsersRef, {
    'quiz_accs': data
  }) // async operation
}

export const addTimeline = (timeline, index, t_index) => {
  // add timeline to clue of designated index as designated timeline-index
  useGameStore().$patch((state) => {
    state.cluenote[index].timeline[t_index] = timeline
  })
}