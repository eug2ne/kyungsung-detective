import Phaser from 'phaser'
import { useGameStore } from '../game.js'

export default class Item extends Phaser.GameObjects.Image {
  public readonly id: string
  public readonly name: string
  public readonly descript: string
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
    const item_texture = scene.textures.exists(texture) ? scene.textures.get(texture) : scene.textures.get('dummy_item')
    super(scene, x, y, item_texture)
    this.name = name
    this.id = id
    this.interact_data = interact
    scene.add.existing(this).setScale(scale).setDepth(depth)
    scene.physics.add.existing(this, true)
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
    // this.on('item-touch', (cameraX: number, cameraY: number, item_text: Phaser.GameObjects.Text) => {
    //   console.log('item touch')
    //   // if (this.interact_data.type != 'get') return

    //   // show item_text if user overlap with item + item.interact.type == get
    //   item_text.setPosition(cameraX + 260, cameraY + 200)
    //   item_text.visible = true
    // })
    this.setInteractive() // enable interaction

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

  destroy() {
    super.destroy()
  }
}