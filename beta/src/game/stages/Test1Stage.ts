import Phaser from "phaser"
import { db, auth } from '../../firestoreDB.js'
import { collection, doc, getDoc, updateDoc } from "firebase/firestore"
import Stage from "./Stage.js"
import Test1 from '../scenes/Test1_Scene.js'
import { arrayUnion } from "firebase/firestore"
import _ from "lodash"

const default_config = {
  'p_scene': { 'sceneKey': 'Test1' , 'x': 700, 'y': 700 },
  'scenes': {
    'Test1': {
      'npc': { 'test1_inspector': 'clue', 'test1_newspaperstand': 'post_c_repeat' },
      'item': []
    }
  }
}

export default class Test1Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ Test1 ], default_config, 'Test1Stage', null)
  }

  event(scene: Phaser.Scene): void {
    // after talking to inspector
    // update player_config
    scene.events.on('update-userconfig', (id: string, to: string, clue: {story: string, title: string, description: string, subClues: any}) => {
      this.player_config.scene_config.npc[id] = to

      if (clue) {
        // upload clue to user db
        const save = async () => {
          const user = auth.currentUser // get current user

          const UsersRef = collection(db, 'Users')
          const userRef = doc(UsersRef, user.uid)

          const data: any = {}
          data[clue.story] = arrayUnion({
            'title': clue.title,
            'description': clue.description,
            'subClues': clue.subClues
          })
          await updateDoc(userRef, {
            'Clues': data
          })

          // add subclue quiz-accomplishment to user.quiz_accs
          clue.subClues.forEach(async (subClue: any) => {
            if (!subClue.quiz_id) return

            const data: any = {}
            data[subClue.quiz_id] = false
            await updateDoc(userRef, {
              'quiz_accs': data
            })
          })
        }

        save()
      }
    })
  }
}