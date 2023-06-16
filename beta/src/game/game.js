import Phaser from 'phaser'
import { defineStore } from 'pinia'
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firestoreDB'
import SceneLoadPlugin from './SceneLoadPlugin'

// import stages
import BreakfastStage from './stages/BreakfastStage'
import Test1Stage from './stages/Test1Stage'
import Test2Stage from './stages/Test2Stage'
import Test3Stage from './stages/Test3Stage'

export const useGameStore = defineStore('game', {
  state: () => ({
    stage: {
      key: 'BreakfastStage',
      player_config: { sceneKey: 'Breakfast' , x: 663, y: 472 },
      scenes_config: {
        'Breakfast': {
          npc: { 'breakfast_maid': { dialogueKey: 'default-question', options: ['option-end', 'option-default'] } },
          item: { 'breakfast_item0': { interactionKey: 'read' }, 'breakfast_item1': { interactionKey: 'eat', options: ['option-eat', 'option-skip'] } }
        }
      } // default: BreakfastStage
    },
    cluenote: { 0:null, 1:null, 2:null },
    carry_item: [],
    inventory: [],
    quiz: { id: null, route: null },
    progress: null,
    booted: false,
    game_clear: false
  }),
  actions: {
    async boot(gameKey, story) {
      // load stage-data + present_id from db
      const uid = auth.currentUser.uid
      const UsersRef = collection(db, 'BetaUsers')
      const user_UsersRef = doc(UsersRef, uid)
      const user_UsersSnap = await getDoc(user_UsersRef)

      // load inventory from db
      this.$patch({ inventory: user_UsersSnap.data().Inventory })

      // set quiz_id to present_id in db
      this.$patch({ quiz: { id: user_UsersSnap.data().present_id } })

      const user_Stages = user_UsersSnap.data().Stages
      if (!_.includes(Object.keys(user_Stages), gameKey)||!user_Stages[gameKey]) {
        // stage-data == stage.default_config
        // new game/stage started >> add new stage-data to db
        const stageData = {}
        stageData[gameKey] = {
          key: this.stage.key,
          player_config: this.stage.player_config,
          scenes_config: this.stage.scenes_config
        }
        const clueData = {}
        clueData[story] = this.cluenote
        await updateDoc(user_UsersRef, {
          Stages: stageData,
          Clues: clueData
        })
      } else {
        // read stage-data from db
        this.$patch({ stage: user_Stages[gameKey] })
        // load cluenote for this game from db
        if (user_UsersSnap.data().Clues[story]) {
          this.$patch({ cluenote: user_UsersSnap.data().Clues[story] })
        }
      }
      this.booted = true
    },
    async saveGame(gameKey, story) {
      // save stage-config to db
      const uid = auth.currentUser.uid
      const UsersRef = collection(db, 'BetaUsers')
      const user_UsersRef = doc(UsersRef, uid)

      let data = {}
      data[gameKey] = {
        key: this.stage.key,
        player_config: this.stage.player_config,
        scenes_config: this.stage.scenes_config
      }
      await updateDoc(user_UsersRef, { Stages: data }) // update player config

      // save cluenote to db
      data = {}
			data[story] = this.cluenote
			await updateDoc(user_UsersRef, { Clues: data })

      // save inventory to db
      await updateDoc(user_UsersRef, {
				Inventory: this.inventory
			})
    },
    async resetGame(gameKey, story) {
      // delete all document from Quizs collection
      const uid = auth.currentUser.uid
      const UsersRef = collection(db, 'BetaUsers')
      const user_UsersRef = doc(UsersRef, uid)
      const QuizsRef = collection(user_UsersRef, 'Quizs')

      const querySnapshot = await getDocs(QuizsRef)
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      })

      // reset + save stage-config
      this.$reset()
      await this.saveGame(gameKey, story)
    }
  },
  persist: { storage: sessionStorage }
})

export default class game extends Phaser.Game {
  constructor(containerId) {
    const config = {
      type: Phaser.AUTO,
      width: 2800/3,
      height: 1981/3,
      parent: containerId,
      // pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      plugins: {
        scene: [
          {
            key: 'SceneLoadPlugin',
            plugin: SceneLoadPlugin,
            start: true,
            mapping: 'sceneload'
          }
        ]
      }
    }

    super(config)
    this.key = 'k_detective_beta'
    this.stage_keys = {'BreakfastStage':BreakfastStage, 'Test1Stage':Test1Stage, 'Test2Stage':Test2Stage, 'Test3Stage': Test3Stage}
    this.story = '시작'
  }

  create() {
    // pass stage-data to game.stage
    const stage_class = this.stage_keys[useGameStore().stage.key]
    this.stage = new stage_class(this.plugins) // create game.stage
    this.stage.player_config = useGameStore().stage // pass player-config to game.stage
    this.stage.preload()
    
    const PlayScene_Key = this.stage.player_config.sceneKey // present sceneKey
    // set stage-data
    const config = {
      player_config: this.stage.player_config,
      scenes_config: this.stage.scenes_config
    }
    this.scene.start(PlayScene_Key, config) // pass stage-data to scene
  }

  progress(progress) {
    // pass outer-game progress
    this.stage.quizEvent(progress)
  }
}
