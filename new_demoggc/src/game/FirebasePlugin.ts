import Phaser from 'phaser'
import firebase from '../firestoreDB.js'
import {
	setDoc,
	doc,
	getDoc,
	collection
} from 'firebase/firestore'

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin
{
	private readonly firestore: any // error: cannot use Firestore as type

	constructor(manager: Phaser.Plugins.PluginManager)
	{
		super(manager)

		this.firestore = firebase.firestore()
	}

	destroy()
	{
		// map data: map.key, npc.talking_data, player.coord
		// inventory data
		// hint data
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
    // load user scene-data from /Users/Scene
    const SceneRef = collection(doc(this.firestore, 'Users', 'Scene'), 'Scene')
    const user_SceneRef = doc(SceneRef, userId)
    const user_SceneSnap = await getDoc(user_SceneRef)

    if (user_SceneSnap.exists()) {
      // if user scene-data already exist, load data from db
      return user_SceneSnap.data()
    } else {
      // else, create new scene-data for user
			console.log('create user data')
      setDoc(user_SceneRef, {
        p_scene: {'sceneKey': 'Test1_Scene', x: 600, y: 900}, /* present scene */
				scenes: {
					'Test1_Scene':
					{'npc': {'test1npc-0':'pre_h_repeat', 'test1npc-1':'hint'},
					'item': ['test1-0', 'test1-1', 'test1-2']},
					'Village_Scene':
					{'npc': null,
					'item': []}
				}, /* connected scenes (default config) */
				item_carry: []
      }) // default player_config

      return {
        p_scene: {'sceneKey': 'Test1_Scene', x: 600, y: 900}, /* present scene */
				scenes: {
					'Test1_Scene':
					{'npc': {'test1npc-0':'pre_h_repeat', 'test1npc-1':'hint'},
					'item': ['test1-0', 'test1-1', 'test1-2']},
					'Village_Scene':
					{'npc': null,
					'item': []}
				}, /* connected scenes (default config) */
				item_carry: []
      }
    }
	}
}