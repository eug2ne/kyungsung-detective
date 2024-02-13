import _ from 'lodash'
import Phaser from 'phaser'
import { useGameStore } from '../game.js'
import SceneLoadPlugin from '../plugin/SceneLoadPlugin'
import Item2 from './Item2.js'
import Player from './Player.js'

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  public readonly id: string
  public sceneload: SceneLoadPlugin
  private sprite_key: string
  private anim_config: any
  private readonly dialogue: any
  private _dialogueKey: string|undefined
  private readonly options_config: any
  private _options_data: any

  constructor(
    scene: Phaser.Scene,
    sceneload: SceneLoadPlugin,
    id: string,
    spritesheet_key: string,
    scale: number,
    anim_config: any,
    x: number,
    y: number,
    dialogue: any,
    options_config: any
  ) {
    const spritesheet = scene.textures.get(spritesheet_key)
    super(scene, x, y, spritesheet)
    scene.add.existing(this).setScale(0.16*scale).setDepth(10)
    scene.physics.add.existing(this, true)
    
    this.id = id
    this.sceneload = sceneload
    this.sprite_key = spritesheet_key
    this.anim_config = anim_config
    this.dialogue = dialogue
    this.options_config = options_config
  }

  destroy() {
    super.destroy()
  }

  public set dialogueKey(key: string|undefined) {
    if ((key === 'clue'||key === 'answer')&&this.dialogue[key].check) {
      // check player.item_carry (from gameStore)
      const item_id = this.dialogue[key].check
      if (useGameStore().carry_item.find((ele: Item2|undefined) => ele?.id == item_id)) {
        // delete item from inventery + carry_item
        const removed = _.remove(useGameStore().inventory, (ele:Item2|undefined) => {ele?.id == item_id})
        useGameStore().$patch({
          inventory: removed,
          carry_item: []
        })

        // update dialogueKey
        this._dialogueKey = key
      } else {
        // do not update dialogueKey
        this._dialogueKey = (key === 'answer') ? 'post_c_repeat' : 'pre_c_repeat'
      }
    } else {
      this._dialogueKey = key
    }
  }

  public get dialogueKey() {
    return this._dialogueKey
  }

  public get dialogueData() {
    if (!this.dialogueKey||!this.dialogue[this.dialogueKey]) return undefined
    return this.dialogue
  }

  public set optionsData(options: [string]|undefined) {
    this._options_data = [] // reset options-data
    options?.forEach((key: string) => {
      if (!this.options_config[key]) return
      this._options_data.push(this.options_config[key])
    })
  }

  public get optionsData() {
    return this._options_data
  }

  create() {
    this.debugShowBody = true
    this.debugShowVelocity = true
    this.debugBodyColor = 0x0033ff // debug option
    this.setInteractive() // enable interaction
    this.setBodySize(40,62) // set body-size

    // create animation for each frame
    Object.entries(this.anim_config.frames).forEach((entry: any) => {
      const [frame, key] = entry

      this.anims.create({
        key: key,
        frames: this.anims.generateFrameNumbers(this.sprite_key, { start: parseInt(frame.split(',')[0]), end: parseInt(frame.split(',')[1]) }),
        frameRate: 5,
        repeat: this.anim_config.repeat[key]
      })
    })

    // start-talking event
    this.on('start-talking', () => {
      // pause npc anim
      const current_anim = this.anims.currentAnim
      current_anim!.pause()
      this.scene.events.emit('start-talking', this) // emit talking event to scene
    })

    // end-talking event
    this.scene.events.on('end-talking', () => {
      // resume npc anims
      const current_anim = this.anims.currentAnim
      current_anim!.resume()
    })
  }

  update(player: Player) {
    // depth calculation
    this.depth = player.y-this.y > 0 ? 5 : 10
    // if default_anim exist, play default_anim
    const default_anim = this.anims.get(this.anim_config.default)

    if (this.anim_config.auto_start) {
      this.anims.play(default_anim.key, true)
    }
  }
}