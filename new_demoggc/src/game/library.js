import { db, auth } from '../firestoreDB'
import { arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore'

export const checkClue = async (Clue) => {
  const user = auth.currentUser
  const QuizsRef = collection(db, 'Users/Quizs/Quizs')
  const userQuizsRef = doc(QuizsRef, user.uid)

  const userQuizSnap = await getDoc(userQuizsRef)
  if (userQuizSnap.exists()) {
    try {
      const userQuizdata = userQuizSnap.data()

      const quiz_ids = userQuizdata.quiz_ids
      const sets = userQuizdata.Sets

      if (sets[Clue.quiz_id].accomplished) {
        // clue acquired + quiz solved
        return 'answer'
      } else if (Clue.quiz_id in quiz_ids) {
        // clue acquired
        return 'post_c_repeat'
      } else {
        // clue not acquired
        return 'clue'
      }
    } catch {
      return 'clue'
    }
  } else {
    // clue not acquired
    return 'clue'
  }
}

export const addClue = async (Clue) => {
  const user = auth.currentUser
  const UsersRef = collection(db, 'Users')
  const userRef = doc(UsersRef, user.uid)
  const userSnap = await getDoc(userRef)

  // add clue to story
  try {
    const cluelist = userSnap.data().clues[Clue.story]
    const set = {}
    cluelist.append(Clue)
    set[Clue.story] = cluelist
    
    await updateDoc(userRef, {
      clues: set
    })
  } catch {
    // story not exist in user data
    const set = {}
    set[Clue.story] = [Clue]
    
    await updateDoc(userRef, {
      clues: set
    })
  }
}