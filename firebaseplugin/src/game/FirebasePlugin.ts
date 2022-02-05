import Phaser from 'phaser'
import Test1_Scene from './scenes/Test1_Scene.js'
import db from '../firestoreDB.js'
import {
	getFirestore,
	Firestore,
	setDoc,
	doc,
	getDoc,
	collection
} from 'firebase/firestore'

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin
{
	private readonly firestore: Firestore

	constructor(manager: Phaser.Plugins.PluginManager)
	{
		super(manager)

		this.firestore = getFirestore(db)
	}

	destroy()
	{
		super.destroy()
	}

	async saveGameData(userId: string, data: Phaser.Scene)
	{
    const GamesRef = collection(doc(this.firestore, 'Users', 'Games'), 'Games')
    const user_GameRef = doc(GamesRef, userId)

		await setDoc(user_GameRef, data)
	}

	async loadGameData(userId: string)
	{
    // load user Game data from /Users/Games
    const GamesRef = collection(doc(this.firestore, 'Users', 'Games'), 'Games')
    const user_GameRef = doc(GamesRef, userId)
    const user_GameSnap = await getDoc(user_GameRef)

    if (user_GameSnap.exists()) {
      // if user_Game data already exist, load data from db

    } else {
      // else, create new doc for user
      console.log(Test1_Scene)
      setDoc(user_GameRef, Test1_Scene)
    }
	}
}