import Phaser from 'phaser'
import { auth, db } from '../firestoreDB.js'
import {
	updateDoc,
	doc,
	getDoc,
	collection
} from 'firebase/firestore'
import { arrayUnion } from 'firebase/firestore'
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

	async saveGameData(player_config: any, inventory: [ Item ])
	{
		const uid = this.auth.currentUser.uid

    const UsersRef = collection(this.firestore, 'Users')
    const user_UsersRef = doc(UsersRef, uid)

		await updateDoc(user_UsersRef, {
			Stage: {

			}
		}) // update player config
		for (let index in inventory) {
			console.log(inventory[index])
			await updateDoc(user_UsersRef, {
				inventory: arrayUnion(inventory[index])
			})
		} // update inventory
	}

	async loadGameData(stage: Stage)
	{
		// get current user.uid
		const uid = this.auth.currentUser.uid
    // load user scene-data from /Users
    const UsersRef = collection(this.firestore, 'Users')
    const user_UsersRef = doc(UsersRef, uid)
    const user_UsersSnap = await getDoc(user_UsersRef)

		stage.player_config = user_UsersSnap.data().Stage

    if (user_UsersSnap.data().Stage.key == stage.key) {
      // if user stage-data already exist, load data from db
      return user_UsersSnap.data().Stage
    } else {
      // else, create new scene-data for user
      updateDoc(user_UsersRef, {
				Stage: {
					item_carry: [],
					key: stage.key,
					p_scene: stage.default_config.p_scene,
					scenes: stage.default_config.scenes
				},
      }) // default player_config

      return stage.default_config
    }
	}
}