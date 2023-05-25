import { initializeApp } from 'firebase/app'
import { getAuth,
    signInWithEmailAndPassword,
    signInAnonymously,
    createUserWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    GoogleAuthProvider,
    signInWithPopup } from 'firebase/auth'
import { getFirestore,
    doc,
    setDoc, 
    collection } from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAnZSZIc9CQqAx_ilFeyzWrzGHUn68r19k",
    authDomain: "kyunsung-detective-01.firebaseapp.com",
    projectId: "kyunsung-detective-01",
    storageBucket: "kyunsung-detective-01.appspot.com",
    messagingSenderId: "728982709103",
    appId: "1:728982709103:web:72e61ecb4610bf7a4a3e9a",
    measurementId: "G-SENBDZ1HQ4"
}

const firebaseApp = initializeApp(config) 
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

const addData = async (userCredential) => {
    const user = userCredential.user.toJSON()
    const collectionRef = collection(db, 'BetaUsers')

    await setDoc(doc(collectionRef, user.uid), {
        uid: user.uid,
        apiKey: user.apiKey,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        stsTokenManager: user.stsTokenManager,
        userLog: [],
        Stages: {},
        Inventory: [],
        Clues: {},
        quiz_accs: {},
        present_quizID: ''
    })
    .catch((error) => {
        console.log(error)
    })
}

// anonymous signup func.
export const anonySignup = async () => {
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            signInAnonymously(auth)
                .then( async (userCredential) => {
                    await addData(userCredential)
                })
                .catch((error) => {
                    alert('다음과 같은 이유로 실패했습니다: ' + error.message)
                })
        })
}

// email login func.
// export const emailLogin = async (loginEmail, loginPassword) => {
//     // set auth persistence to SESSION
//     setPersistence(auth, browserSessionPersistence)
//         .then(() => {
//             signInWithEmailAndPassword(auth, loginEmail, loginPassword)
//                 .then((userCredential) => {
//                     // login success
//                 })
//                 .catch((error) => {
//                     // login fail
//                     alert('로그인 실패: ' + error.message)  
//                 })
//         })
// }

// google login func.
// export const googleLogin = async () => {
//     const provider = new GoogleAuthProvider()
//     // set auth persistence to SESSION
//     setPersistence(auth, browserSessionPersistence)
//         .then(() => {
//             signInWithPopup(auth, provider)
//                 .then((userCredential) => {
//                     // login success
//                     addData(userCredential)
//                 })
//                 .catch((error) => {
//                     // login fail
//                     alert('로그인 실패: ' + error.message)
//                 })
//         })
// }

// email signup func.
// export const emailSignup = async (loginEmail, loginPassword) => {
//     setPersistence(auth, browserSessionPersistence)
//         .then(() => {
//             createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
//                 .then( async (userCredential) => {
//                     // automatically login as new user
//                     await addData(userCredential)
//                 })
//                 .catch((error) => {
//                     alert('회원가입 실패: ' + error.message)
//                 })
//         })
// }