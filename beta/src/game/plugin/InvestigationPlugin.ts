import Phaser from 'phaser'
import _ from 'lodash'
import { useGameStore } from '@/game/game.js'
import { subClue, event, Clue } from '../GameObjects/ClueDataStructure'
import dialogueInterface from '../interface/dialogueInterface'
import GameOver from '../scenes/GameOver_Scene.js'

export default class InvestigationPlugin extends Phaser.Plugins.ScenePlugin {
  private dialogue: dialogueInterface
  private readonly verificationStartDialogue: [ string|{ line: string, name: string, image: string } ]
  private readonly verificationEventDialogue: {
    [key: string]: {
      dialogue: {},
      options: [],
      answer: {},
      answer_event: [ string|{ line: string, name: string, image: string } ]
    }
  }
  
  constructor(scene: Phaser.Scene, manager: Phaser.Plugins.PluginManager, key: string) {
    super(scene, manager, key)
  }

  destroy() {
    // save scene data to this.game.active_scenes
    super.destroy()
  }

  createVerificationEvent(cameraX: number, cameraY: number, zoom: number, p_index: number) {
    const i_scope = useGameStore().cluenote[p_index].i_scope

    // create verification-event dialogue
    for (const key in Object.keys(this.verificationEventDialogue)) {
      const evidence = i_scope
        .find((ele: { scope: string, evidence: [(subClue|event|Clue)?] }) => ele.scope === key)
        .evidence
      this.dialogue.createDialogue(cameraX, cameraY, zoom, key, this.verificationEventDialogue)
      
      // create evidence-window
      const white = Phaser.Display.Color.GetColor32(255,255,255,0.1)
      const evidence_window = this.scene!.add.rectangle(cameraX, cameraY, 645/zoom, 200/zoom, white)

      // create option-pointer for evidence-window
      this.dialogue.createOptionPointer(evidence)
    }
  }
}