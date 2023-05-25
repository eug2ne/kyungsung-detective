import Phaser from 'phaser'
import { auth, db } from '../firestoreDB.js'
import {
	setDoc,
	doc,
	getDoc,
	collection
} from 'firebase/firestore'
import { arrayUnion } from 'firebase/firestore'
import Item from './GameObjects/Item'

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin
{
	private readonly firestore: any // error: cannot use Firestore as type
	private readonly auth: any

	constructor(manager: Phaser.Plugins.PluginManager)
	{
		super(manager)

		this.firestore = db
		this.auth = auth
	}

	destroy()
	{
		// map data: map.key, npc.talking_data, player.coord
		// inventory data
		// hint data
		super.destroy()
	}

	async saveGameData(player_config: any, inventory: [ Item ])
	{
		const uid = this.auth.currentUser.uid

    const SceneRef = collection(this.firestore, 'Users/Scene/Scene')
    const user_SceneRef = doc(SceneRef, uid)

		await setDoc(user_SceneRef, player_config) // update player config
		for (let index in inventory) {
			console.log(inventory[index])
			await setDoc(user_SceneRef, {
				inventory: arrayUnion(inventory[index])
			})
		} // update inventory
	}

	async loadGameData()
	{
		// get current user.uid
		const uid = this.auth.currentUser.uid
    // load user scene-data from /Users/Scene
    const SceneRef = collection(this.firestore, 'Users/Scene/Scene')
    const user_SceneRef = doc(SceneRef, uid)
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
					{'npc': {'test1npc-0':'pre_c_repeat', 'test1npc-1':'clue'},
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
					{'npc': {'test1npc-0':'pre_c_repeat', 'test1npc-1':'clue'},
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