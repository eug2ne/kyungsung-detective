import Phaser from 'phaser'
import { initializeApp } from 'firebase/app'
import {
	getFirestore,
	Firestore,
	setDoc,
	doc,
	getDoc,
	collection
} from 'firebase/firestore'

const config = {
  apiKey: "AIzaSyAnZSZIc9CQqAx_ilFeyzWrzGHUn68r19k",
  authDomain: "kyunsung-detective-01.firebaseapp.com",
  projectId: "kyunsung-detective-01",
  storageBucket: "kyunsung-detective-01.appspot.com",
  messagingSenderId: "728982709103",
  appId: "1:728982709103:web:72e61ecb4610bf7a4a3e9a",
  measurementId: "G-SENBDZ1HQ4"
}


export default class FirebasePlugin extends Phaser.Plugins.BasePlugin
{
	private readonly db: Firestore

	constructor(manager: Phaser.Plugins.PluginManager)
	{
		super(manager)

		const app = initializeApp(config)
		this.db = getFirestore(app)
	}

	destroy()
	{
		super.destroy()
	}

	async saveGameData(userId: string, data: {})
	{
    const GamesRef = collection(doc(this.db, 'Users', 'Games'), 'Games')
    const user_GameRef = doc(GamesRef, userId)

		await setDoc(user_GameRef, data)
	}

	async loadGameData(userId: string)
	{
    // load user Game data from /Users/Games
    const GamesRef = collection(doc(this.db, 'Users', 'Games'), 'Games')
    const user_GameRef = doc(GamesRef, userId)
    const user_GameSnap = await getDoc(user_GameRef)

    if (user_GameSnap.exists()) {
      // if user_Game data already exist, load data from db

    } else {
      // else, create new doc for user
      setDoc(user_GameRef, {
        test: 'example_data'
      })
    }
	}
}