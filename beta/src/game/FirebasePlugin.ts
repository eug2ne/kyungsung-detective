import Phaser from 'phaser'
import _ from 'lodash'
import { auth, db } from '../firestoreDB.js'
import {
	updateDoc,
	doc,
	getDoc,
	collection,
	arrayUnion
} from 'firebase/firestore'
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

	async saveGameData(stage: any /* Stage */, inventory: [ Item? ], game_key: string)
	{
		const uid = this.auth.currentUser.uid

    const UsersRef = collection(this.firestore, 'Users')
    const user_UsersRef = doc(UsersRef, uid)

		await updateDoc(user_UsersRef.Stages[game_key], {
			key: stage.key,
			p_scene: stage.p_scene,
			scenes: stage.scenes_config
		}) // update player config
		
		inventory.forEach( async (item?: Item) => {
			await updateDoc(user_UsersRef.Stages[game_key], {
				Inventory: arrayUnion(item)
			})
		}) // update inventory
	}

	async loadGameData(game: any, update: boolean /* update flag */)
	{
		// get current user.uid
		const uid = this.auth.currentUser.uid
    // load user stage-data from /Users
    const UsersRef = collection(this.firestore, 'Users')
    const user_UsersRef = doc(UsersRef, uid)
    const user_UsersSnap = await getDoc(user_UsersRef)

		const user_Stages = user_UsersSnap.data().Stages
		if (update||!_.includes(Object.keys(user_Stages), game.key)) {
			game.stage.player_config = null // stage-data == stage.default_config

			// new game started >> add new game stage-data
			const data: any = {}
			data[game.key] = {
				item_carry: [],
				key: game.stage.key,
				p_scene: game.stage.default_config.p_scene,
				scenes: game.stage.default_config.scenes
			}
			updateDoc(user_UsersRef, {
				Stages: data
			})
		} else {
			// read stage-data from db
			const stage_class = game.stage_keys[user_Stages[game.key].key]
			game.stage = new stage_class(game.plugins)
			game.stage.player_config = user_Stages[game.key]
				// if stage-data already on user db, load stage-data from db
				// else, stage-data == stage.default_config

			if (!user_Stages[game.key]) {
				// if stage-data do not exist on db, add stage-data
				const data: any = {}
				data[game.key] = {
					item_carry: [],
					key: game.stage.key,
					p_scene: game.stage.default_config.p_scene,
					scenes: game.stage.default_config.scenes
				}
				updateDoc(user_UsersRef, {
					Stages: data,
				}) // default_config
			}
		}
	}
}