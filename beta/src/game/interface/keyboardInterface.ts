import Phaser from "phaser"
import SceneLoadPlugin from "../plugin/SceneLoadPlugin"
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

export default class keydoardInterface implements ScenePluginInterface {
  game: Phaser.Game
  sceneload: SceneLoadPlugin
  scene: Phaser.Scene
  public keyboard: Phaser.Input.Keyboard.KeyboardPlugin
  private control: {
    cursor: {
      up: Phaser.Input.Keyboard.Key,
      down: Phaser.Input.Keyboard.Key,
      left: Phaser.Input.Keyboard.Key,
      right: Phaser.Input.Keyboard.Key
    }|undefined,
    enter: Phaser.Input.Keyboard.Key|undefined,
    space: Phaser.Input.Keyboard.Key|undefined
  } = { cursor: undefined, enter: undefined, space: undefined }
  private talking: boolean = false

  constructor(Game: Phaser.Game, Scene: Phaser.Scene, SceneLoadPlugin: SceneLoadPlugin, KeyboardPlugin: Phaser.Input.Keyboard.KeyboardPlugin) {
    this.game = Game
    this.scene = Scene
    this.sceneload = SceneLoadPlugin
    this.keyboard = KeyboardPlugin
  }

  createKeys() {
    // create cursor + enter + space
    this.control.cursor = this.keyboard.createCursorKeys()
    this.control.enter = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER, true, false)
    this.control.space = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false)

    this.scene!.input.keyboard!.addCapture([this.control.cursor, 'ENTER', 'SPACE']) // prevent event propagation
  }

  keyDown() {
    // detect key pressed
    if (!this.talking&&
      (Phaser.Input.Keyboard.JustDown(this.control.enter!)||Phaser.Input.Keyboard.JustDown(this.control.space!))) {
      // NPC/item interaction event
    } else if (Phaser.Input.Keyboard.JustDown(this.control.space!)) {
      // dialogue skip event
    } else if (Phaser.Input.Keyboard.JustDown(this.control.enter!)) {
      // dialogue option-select event
    }
  }
  
  movePlayer() {
    if (this.talking) return

    // player move event
    if (this.control.cursor!.left.isDown) {
      this.sceneload.player.update('left')
    } else if (this.control.cursor!.right.isDown) {
      this.sceneload.player.update('right')
    } else if (this.control.cursor!.up.isDown) {
      this.sceneload.player.update('up')
    } else if (this.control.cursor!.down.isDown) {
      this.sceneload.player.update('down')
    } else {
      this.sceneload.player.anims.stop()
    }
  }

  interactWithNPCItem(gameObject: NPC|Item): boolean {
    if (this.talking) return false

    // NPC/item interaction event
    if (!gameObject.input) return false // interaction cool time
    if (Phaser.Input.Keyboard.JustDown(this.control.enter!)||Phaser.Input.Keyboard.JustDown(this.control.space!)) {
      this.control.enter!.isDown = false
      this.control.space!.isDown = false

      return true
    } else {
      return false
    }
  }

  interactWithDialogue(): string|void {
    if (!this.talking) return

    // dialogue event
    if (Phaser.Input.Keyboard.JustDown(this.control.cursor!.up)||Phaser.Input.Keyboard.JustDown(this.control.cursor!.left)) {
      this.control.cursor!.up.isDown = false
      this.control.cursor!.left.isDown = false

      // move option-pointer
      return 'option-up'
    } else if (Phaser.Input.Keyboard.JustDown(this.control.cursor!.down)||Phaser.Input.Keyboard.JustDown(this.control.cursor!.right)) {
      this.control.cursor!.down.isDown = false
      this.control.cursor!.right.isDown = false

      // move option-pointer
      return 'option-down'
    } else if (Phaser.Input.Keyboard.JustDown(this.control.enter!)||Phaser.Input.Keyboard.JustDown(this.control.space!)) {
      this.control.enter!.isDown = false
      this.control.space!.isDown = false

      // skip line|select option
      return 'click-keydown'
    }
  }

  startTalking(vertical: boolean = true) {
    // start-talking event
    this.control.cursor!.up.isDown = false
    this.control.cursor!.down.isDown = false
    this.control.cursor!.left.isDown = false
    this.control.cursor!.right.isDown = false // stop player

    // disable cursor (default: option-pointer vertical)
    if (vertical) {
      // if option-pointer is vertical, disable left+right cursor  
      this.control.cursor!.left.enabled = false
      this.control.cursor!.right.enabled = false
    } else {
      // if option-pointer is horizontal, disable up+down cursor
      this.control.cursor!.up.enabled = false
      this.control.cursor!.down.enabled = false
    }

    this.talking = true
  }

  endTalking() {
    // end-talking event
    this.control.cursor!.up.enabled = true
    this.control.cursor!.down.enabled = true
    this.control.cursor!.left.enabled = true
    this.control.cursor!.right.enabled = true // left, right cursor enable

    this.talking = false
  }
}