import Phaser from 'phaser'
import { defineStore } from 'pinia'
import { collection, deleteDoc, doc, setDoc, getDocs, } from 'firebase/firestore'
import { auth, db } from '../firestoreDB'
import { firebaseInterface } from './interface/firebaseInterface'
import SceneLoadPlugin from './SceneLoadPlugin'

// import stages
import BreakfastStage from './stages/BreakfastStage'
import Test1Stage from './stages/Test1Stage'
import Test2Stage from './stages/Test2Stage'
import Test3Stage from './stages/Test3Stage'

const STAGE_DEFAULT_CONFIG = {
  'BreakfastStage': {
    key: 'BreakfastStage',
    player_config: { sceneKey: 'Breakfast' , x: 863, y: 472 },
    scenes_config: {
      'Breakfast': {
        npc: { 'breakfast_maid': { dialogueKey: 'prologue', options: ['option-end', 'option-default'] } },
        item: { 'breakfast_item0': { interactionKey: 'read' }, 'breakfast_item1': { interactionKey: 'eat', options: ['option-eat', 'option-skip'] } }
      }
    }
  },
  'Test1Stage': {
    key: 'Test1Stage',
    player_config: { 'sceneKey': 'Test1' , 'x': 570, 'y': 130 },
    scenes_config: {
      'Test1': {
        npc: { 'test1_inspector': { dialogueKey: 'clue' },
          'test1_newspaperstand': { dialogueKey: 'default' },
          'test1_applicant1': { dialogueKey: 'default' },
          'test1_applicant2': { dialogueKey: 'default' },
          'test1_applicant3': { dialogueKey: 'default' },
          'test1_applicant4': { dialogueKey: 'default' },
          'test1_applicant5': { dialogueKey: 'default' },
        },
        item: {}
      }
    }
  },
  'Test2Stage': {
    key: 'Test2Stage',
    player_config: { 'sceneKey': 'Test2' , 'x': 600, 'y': 500 },
    scenes_config: {
      'Test2': {
        npc: {
          'test2_suspect1': { dialogueKey: 'default-question', options: ['option-default'] },
          'test2_suspect2': { dialogueKey: 'default-question', options: ['option-default'] },
          'test2_suspect3': { dialogueKey: 'default-question', options: ['option-default'] } 
        },
        item: {
          'test2_item0': { interactionKey: 'read' },
          'test2_item1': { interactionKey: 'read' },
          'test2_item2': { interactionKey: 'read' },
          'test2_item3': { interactionKey: 'read' }
        }
      }
    }
  }
}

export const useGameStore = defineStore('game', {
  state: () => ({
    stage: {
      key: 'BreakfastStage',
      player_config: { sceneKey: 'Breakfast' , x: 863, y: 472 },
      scenes_config: {
        'Breakfast': {
          npc: { 'breakfast_maid': { dialogueKey: 'prologue', options: ['option-end', 'option-default'] } },
          item: { 'breakfast_item0': { interactionKey: 'read' }, 'breakfast_item1': { interactionKey: 'eat', options: ['option-eat', 'option-skip'] } }
        }
      } // default: BreakfastStage
    },
    cluenote: { 0:null, 1:null, 2:null },
    puzzle: { id: null, path: null, route: null },
    inventory: [],
    carry_item: [],
    progress: { id: null, message: null, route: null },
    booted: false,
    game_clear: false,
    UID: null
  }),
  actions: {
    async boot(gameKey, story) {
      // set UID from auth
      this.$patch({ UID: auth.currentUser.uid })
      // load stage-data from auto-slot
      firebaseInterface.loadDoc(this.UID, gameKey, story, 'auto')

      this.$patch({ booted: true })
    },
    async saveAuto(gameKey, story) {
      // save stage-data to auto-slot
      firebaseInterface.saveDoc(this.UID, gameKey, story, 'auto')
    },
    async saveSlot(gameKey, story, slotKey) {
      // save current stage-data to given slot
      firebaseInterface.saveDoc(this.UID, gameKey, story, slotKey)

      // copy quiz-data from auto-doc to slot-doc
      const USER_SLOTS = collection(db, `BetaUsers/${this.UID}/Games/${gameKey}/Slots`)
      const AUTO_DOC = doc(USER_SLOTS, 'auto')
      const SLOT_DOC = doc(USER_SLOTS, slotKey)

      const SLOT_QUERY = await getDocs(collection(SLOT_DOC, 'Quizs'))
      SLOT_QUERY.forEach((snap) => {
        deleteDoc(snap.ref)
      }) // reset quizs-collection of slot

      const AUTO_QUERY = await getDocs(collection(AUTO_DOC, 'Quizs'))
      AUTO_QUERY.forEach((snap) => {
        setDoc(doc(SLOT_DOC, `/Quizs/${snap.id}`), snap.data())
      })
    },
    async loadSlot(gameKey, story, slotKey) {
      // set puzzle path to slot-doc
      this.$patch({
        puzzle: { path: `BetaUsers/${this.UID}/Games/k_detective_beta/Slots/${slotKey}/Quizs/${this.puzzle.id}` }
      })

      // rollback to slot-data
      await firebaseInterface.loadDoc(this.UID, gameKey, story, slotKey)
    },
    async resetStage(gameKey, stageKey) {
      // delete clue+quiz-data from selected stage
      const USER_SLOTS = collection(db, `BetaUsers/${this.UID}/Games/${gameKey}/Slots`)
      const AUTO_DOC = doc(USER_SLOTS, 'auto')
      const USER_QUIZS = collection(AUTO_DOC, 'Quizs')

      switch (stageKey) {
        case 'Test1Stage':
          // delete clue from cluenote
          useGameStore().$patch({ cluenote: { 0: null } })
          // delete quiz-data
          await deleteDoc(doc(USER_QUIZS, 'cJ89EcZyF5EHwElEGRGZ'))          
          break

        case 'Test2Stage':
          // delete clue from cluenote
          useGameStore().$patch({ cluenote: { 1: null }})
          // delete quiz-data
          await deleteDoc(doc(USER_QUIZS, 'WIN3vIY76B5ZHa13x70c'))          
          await deleteDoc(doc(USER_QUIZS, 'tLJfpFrSVAq5O1sGNs8I'))
          await deleteDoc(doc(USER_QUIZS, 'YPnEQwKAwueWEzSmpRdF'))
          break
      }

      // reset stage-config+puzzle-data to default-config of selected stage
      useGameStore().$patch({
        stage: STAGE_DEFAULT_CONFIG[stageKey],
        puzzle: { id: null, path: null, route: null },
        progress: { id: null, message: null, route: null }
      })
    }
  },
  persist: { storage: sessionStorage }
})

const STAGE_KEYS = {'BreakfastStage':BreakfastStage, 'Test1Stage':Test1Stage, 'Test2Stage':Test2Stage, 'Test3Stage': Test3Stage}
export default class game extends Phaser.Game {
  constructor(containerId) {
    const config = {
      type: Phaser.AUTO,
      width: 1200,
      height: 610,
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
    this.story = '시작'
  }

  create() {
    // pass stage-data to game.stage
    const Stage = STAGE_KEYS[useGameStore().stage.key]
    this.stage = new Stage(this.plugins) // create game.stage
    this.stage.preload()
    this.stage.player_config = useGameStore().stage // pass player-config to game.stage

    const PlayScene_Key = this.stage.player_config.sceneKey // present sceneKey
    // set stage-data
    const config = {
      player_config: this.stage.player_config,
      scenes_config: this.stage.scenes_config
    }
    
    const startScene = (isProcessing) => {
      if (!isProcessing) {
        this.scene.start(PlayScene_Key, config) // pass stage-data to scene
      } else {
        setTimeout(() => {
          return startScene(this.scene.isProcessing)
        }, 1000)
      }
    }
    // start scene when stage scenes are all loaded
    startScene(this.scene.isProcessing)
  }

  progress(progress) {
    // pass outer-game progress
    this.stage.quizEvent(progress)
  }
}
