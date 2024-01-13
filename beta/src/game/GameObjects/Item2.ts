import Phaser from 'phaser'
import SceneLoadPlugin from '../plugin/SceneLoadPlugin'
import Player from './Player.js'
import { useGameStore } from '../game.js'

export default class Item2 extends Phaser.Physics.Arcade.Sprite {
  public readonly id: string
  public readonly name: string
  public readonly descript: string
  public sceneload: SceneLoadPlugin
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
    depth: number,
    texture: string,
    interact: any
  ) {
    const item_texture = scene.textures.exists(texture) ? scene.textures.get(texture) : scene.textures.get('item_sparkle')
    super(scene, x, y, item_texture)
    this.name = name
    this.id = id
    this.interact_data = interact
    scene.add.existing(this).setScale(scale).setDepth(depth)
    scene.physics.add.existing(this, true)
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

  create() {
    this.setInteractive() // enable interaction

    if (this.texture.key === 'item_sparkle') {
      console.log('item sparkle')
      // create animation
      this.anims.create({
        key: 'default',
        frames: this.anims.generateFrameNumbers('item_sparkle', { start: 0, end: 8 }),
        frameRate: 7,
        repeat: -1
      })
    }

    this.on('start-talking', (interactionKey: string) => {
      const interaction = this.interact_data[interactionKey]
      if (interaction.type === 'get') {
        // after talking, destroy item from scene + remove from scene-config
        this.scene.events.on('end-talking', () => {
          useGameStore().$patch((state: any) => {
            state.inventory.push()
            delete state.scenes_config['Village'].item[this.id]
          })
          this.destroy()
        })
      }
    })
  }

  update(player: Player) {
    // depth calculation
    this.depth = player.y-this.y > 0 ? 5 : 10

    if (this.texture.key === 'item_sparkle') {
      // play animation
      this.anims.play('default', true)
    }
  }
}