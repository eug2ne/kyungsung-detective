import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const config = {
    apiKey: "AIzaSyAnZSZIc9CQqAx_ilFeyzWrzGHUn68r19k",
    authDomain: "kyunsung-detective-01.firebaseapp.com",
    projectId: "kyunsung-detective-01",
    storageBucket: "kyunsung-detective-01.appspot.com",
    messagingSenderId: "728982709103",
    appId: "1:728982709103:web:72e61ecb4610bf7a4a3e9a",
    measurementId: "G-SENBDZ1HQ4"
}

const app = firebase.initializeApp(config)

export const db = app.firestore()