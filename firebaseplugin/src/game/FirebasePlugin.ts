import Phaser from 'phaser'
import firebase from '../firestoreDB.js'
import {
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

		this.firestore = firebase.firestore()
	}

	destroy()
	{
		super.destroy()
	}

	async saveGameData(userId: string, data: Object)
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
      return user_GameSnap.data()
    } else {
      // else, create new doc for user
      setDoc(user_GameRef, {
        sceneKey: 'Test1_Scene',
        x: 600,
        y: 900
      })

      return 'Test1_Scene'
    }
	}
}