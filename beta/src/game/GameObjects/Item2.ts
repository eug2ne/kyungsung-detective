import Phaser from 'phaser'
import SceneLoadPlugin from '../plugin/SceneLoadPlugin'
import Player from './Player.js'
import { useGameStore } from '../game.js'

type depthConfig = {
  constant: boolean,
  default: number
}

type bodyConfig = {
  width: number,
  height: number,
  offSet: { x: number, y: number }
}

export default class Item2 extends Phaser.Physics.Arcade.Sprite {
  public readonly id: string
  public readonly name: string
  public readonly scale: number
  public readonly descript: string
  private readonly depth_config: depthConfig
  private readonly body_config: bodyConfig|null
  public sceneload: SceneLoadPlugin
  public interact: boolean
  private readonly interact_data: any
  private _interactKey: string
  private _options_data: any

  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number,
    y: number,
    name: string,
    scale: number,
    depth_config: depthConfig,
    body_config: bodyConfig|null,
    texture: string,
    interact: any
  ) {
    const item_texture = scene.textures.exists(texture) ? scene.textures.get(texture) : scene.textures.get('item_sparkle')
    super(scene, x, y, item_texture)
    this.name = name
    this.id = id
    this.scale = scale
    this.interact = interact ? true : false
    this.interact_data = interact
    this.depth_config = depth_config
    this.body_config = body_config
  }

  destroy() {
    super.destroy()
  }

  public set dialogueKey(key: string) {
    this._interactKey = key
  }

  public get dialogueKey() {
    return this._interactKey
  }

  public get dialogueData() {
    return this.interact_data
  }

  public set optionsData(options: [string]|undefined) {
    this._options_data = [] // reset options-data
    options?.forEach((key: string) => {
      this._options_data.push(this.interact_data[this.dialogueKey].options_config[key])
    })
  }

  public get optionsData() {
    return this._options_data
  }

  public default_depth() {
    return this.depth_config.default
  }

  create() {
    this.setInteractive() // enable interaction
    if (this.body_config) {
      // set body-size, offset
      this.body?.setSize(this.body_config.width, this.body_config.height)
      this.body?.setOffset(this.body_config.offSet.x, this.body_config.offSet.y)
    }

    if (this.texture.key === 'item_sparkle') {
      // create animation
      this.anims.create({
        key: 'default',
        frames: this.anims.generateFrameNumbers('item_sparkle', { start: 0, end: 7 }),
        frameRate: 7,
        repeat: -1
      })
    }

    this.on('start-talking', (interactionKey: string) => {
      const interaction = this.interact_data[interactionKey]
      if (interaction.type === 'get') {
        // after talking, remove item from scene + remove from scene-config
        this.scene.events.once('end-talking', () => {
          useGameStore().$patch((state: any) => {
            delete state.stage.scenes_config['Village'].item[this.id]
          })
          this.scene.children.remove(this)
          this.disableBody()
        })
      }
    })
  }

  update(player: Player) {
    if (!this.depth_config.constant) {
      // depth calculation
      this.depth = player.y > this.y ? 5 : 10
    }

    if (this.texture.key === 'item_sparkle') {
      // play animation
      this.anims.play('default', true)
    }
  }
}