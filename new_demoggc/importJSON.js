import word from "./files/wordlist.json"
import merge from "./files/valid_mergewordlist.json"
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import { arrayUnion } from "@firebase/firestore";

// Initialize Firebase
// Get your firebase credentials from 
// the firebase console for your project
firebase.initializeApp({
    apiKey: "AIzaSyAnZSZIc9CQqAx_ilFeyzWrzGHUn68r19k",
    authDomain: "kyunsung-detective-01.firebaseapp.com",
    projectId: "kyunsung-detective-01",
    storageBucket: "kyunsung-detective-01.appspot.com",
    messagingSenderId: "728982709103",
    appId: "1:728982709103:web:72e61ecb4610bf7a4a3e9a",
    measurementId: "G-SENBDZ1HQ4"
});

const db = firebase.firestore()
