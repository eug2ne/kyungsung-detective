import Phaser from 'phaser'
import { auth, db } from '../firestoreDB.js'
import {
	updateDoc,
	doc,
	getDoc,
	collection,
	arrayUnion
} from 'firebase/firestore'
import Item from './GameObjects/Item'
import Stage from './stages/Stage'

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

	async saveGameData(stage: Stage, inventory: [ Item? ])
	{
		const uid = this.auth.currentUser.uid

    const UsersRef = collection(this.firestore, 'Users')
    const user_UsersRef = doc(UsersRef, uid)

		await updateDoc(user_UsersRef, {
			Stage: {
				key: stage.key,
				p_scene: stage.p_scene,
				scenes: stage.scenes_config
			}
		}) // update player config
		
		// inventory.forEach( async (item?: Item) => {
		// 	await updateDoc(user_UsersRef, {
		// 		Inventory: arrayUnion(item)
		// 	})
		// }) // update inventory
	}

	async loadGameData(stage: Stage)
	{
		// get current user.uid
		const uid = this.auth.currentUser.uid
    // load user stage-data from /Users
    const UsersRef = collection(this.firestore, 'Users')
    const user_UsersRef = doc(UsersRef, uid)
    const user_UsersSnap = await getDoc(user_UsersRef)

		stage.player_config = user_UsersSnap.data().Stage
			// if stage-data already on user db, load stage-data from db
			// else, stage-data == stage.default_config

    if (user_UsersSnap.data().Stage.key == stage.key) {
      // if stage-date do not exist on db, update user-info
      updateDoc(user_UsersRef, {
				Stage: {
					item_carry: [],
					key: stage.key,
					p_scene: stage.default_config.p_scene,
					scenes: stage.default_config.scenes
				},
      }) // default_config
    }
	}
}