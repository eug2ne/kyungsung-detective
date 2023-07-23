import Phaser from "phaser"
import SceneLoadPlugin from "../SceneLoadPlugin"
import Dialogue from "../GameObjects/Dialogue"
import keydoardInterface from "./keyboardInterface"
import NPC from "../GameObjects/NPC"
import Item from "../GameObjects/Item"

type PluginInterface = {
  game: Phaser.Game
}

interface ScenePluginInterface extends PluginInterface {
  game: Phaser.Game
  scene: Phaser.Scene
  sceneload: Phaser.Plugins.ScenePlugin
}

class OptionPointer {
  pointer: number = 0
  options: [ Phaser.GameObjects.Text? ]
  dialogue: dialogueInterface

  constructor(options: [ Phaser.GameObjects.Text? ], dialogue: dialogueInterface) {
    this.dialogue = dialogue
    this.options = options
    this.options[this.pointer]?.emit('pointerover') // show option-pointer
  }

  movePointer(direction: string) {
    // reset option selection
    this.options.forEach((option?: Phaser.GameObjects.Text) => {
      option?.emit('pointerout')
    })

    // move pointer to direction
    switch (direction) {
      case 'option-up':
        if (this.pointer === 0) {
          this.pointer = this.options.length - 1
        } else {
          this.pointer--
        }
        break

      case 'option-down':
        if (this.pointer === this.options.length - 1) {
          this.pointer = 0
        } else {
          this.pointer++
        }
        break
    }

    // show option selection
    this.options[this.pointer]?.emit('pointerover')
  }

  selectPointer() {
    // emit mouse click event
    this.options[this.pointer]?.emit('pointerdown')
    // destroy self
    this.dialogue.destroyOptionPointer()
  }
}

export default class dialogueInterface implements ScenePluginInterface {
  game: Phaser.Game
  scene: Phaser.Scene
  sceneload: SceneLoadPlugin
  keyboard: keydoardInterface
  public option_pointer?: OptionPointer
  public game_object?: NPC|Item
  private dialogue: Dialogue

  constructor(Game: Phaser.Game, Scene: Phaser.Scene, SceneLoadPlugin: SceneLoadPlugin, KeyboardInterface: keydoardInterface) {
    this.game = Game
    this.scene = Scene
    this.sceneload = SceneLoadPlugin
    this.keyboard = KeyboardInterface
  }

  createDialogue(
    cameraX: number,
    cameraY: number,
    zoom: number,
    dialogueKey: string,
    dialogueData: any,
    optionsData?: any,
    gameObject?: NPC|Item
  ) {
    if (this.game_object) this.game_object.setInteractive() // reset past game_object cool time
    this.game_object = gameObject

    // create dialogue on scene
    this.dialogue = new Dialogue(this.scene, cameraX, cameraY, zoom, dialogueKey, dialogueData, optionsData)
    this.dialogue.create(dialogueKey)

    // when question is created, create option-pointer
    if (this.dialogue.options.length != 0) {
      this.createOptionPointer(this.dialogue.options)
    }
  }

  destroyDialogue() {
    // destroy dialogue
    this.dialogue.destroy()
    // set cool time
    // this.game_object?.removeListener('start-talking')
    // setTimeout(() => {
    //   this.game_object?.setInteractive()
    // }, 3000)
  }

  createOptionPointer(options: [ Phaser.GameObjects.Text? ]) {
    // create option-pointer
    this.option_pointer = new OptionPointer(options, this)
  }

  destroyOptionPointer() {
    // destroy option-pointer
    this.option_pointer = undefined
  }

  skipLine() {
    // skip line on key press
    this.dialogue.emit('update-line')
  }
}