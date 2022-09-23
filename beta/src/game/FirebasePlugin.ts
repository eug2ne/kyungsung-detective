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

	async saveGameData(
		stage: {
			key: string,
			item_carry: [ Item? ],
			player_config: any,
			scenes_config: any
		},
		inventory: [ Item ]|[],
		game_key: string,
		clue?: any /* Clue */
	) {
		const uid = this.auth.currentUser.uid

    const UsersRef = collection(this.firestore, 'Users')
    const user_UsersRef = doc(UsersRef, uid)

		if (clue) {
			const data: any = {}
			data[clue.story] = arrayUnion({
				'title': clue.title,
				'description': clue.description,
				'subClues': clue.subClues
			})
			await updateDoc(user_UsersRef, {
				'Clues': data
			})

			// add subclue quiz-accomplishment to user.quiz_accs
			clue.subClues.forEach(async (subClue: any) => {
				if (!subClue.quiz_id) return

				const data: any = {}
				data[subClue.quiz_id] = false
				await updateDoc(user_UsersRef, {
					'quiz_accs': data
				})
			})
		} // upload clue to user db

		const data: any = {}
		data[game_key] = {
			'key': stage.key,
			'player_config': stage.player_config,
			'scenes_config': stage.scenes_config,
			'item_carry': arrayUnion('item0')
		}
		await updateDoc(user_UsersRef, { Stages: data }) // update player config
		
		if (inventory.length != 0) {
			inventory.forEach( async (item: Item) => {
				await updateDoc(user_UsersRef.Inventory, arrayUnion(item))
			}) // update inventory
		}
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

			// new game/stage started >> add new stage-data
			const data: any = {}
			data[game.key] = {
				item_carry: [],
				key: game.stage.key,
				player_config: game.stage.player_config,
				scenes_config: game.stage.scenes_config
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
					player_config: game.stage.default_config.player_config,
					scenes_config: game.stage.default_config.scenes_config
				}
				updateDoc(user_UsersRef, {
					Stages: data
				}) // default_config
			}
		}
	}
}