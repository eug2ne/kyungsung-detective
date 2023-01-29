import _ from 'lodash'
import Phaser from 'phaser'
import { useGameStore } from '../game.js'
import SceneLoadPlugin from '../SceneLoadPlugin.js'
import Dialogue from './Dialogue'

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  public readonly id: string
  public sceneload: SceneLoadPlugin
  private sprite_key: string
  private anim_config: any
  public readonly dialogue: any
  private _dialogueKey: string
  public readonly question: any
  public readonly clue: any
  private readonly answer: any
  private readonly check: any

  constructor(
    scene: Phaser.Scene,
    sceneload: SceneLoadPlugin,
    key: string,
    spritesheet_key: string,
    scale: number,
    anim_config: any,
    x: number,
    y: number,
    dialogue: any,
    question: any,
    clue: any,
    answer: any,
    check: any
  ) {
    const spritesheet = scene.textures.get(spritesheet_key)
    super(scene, x, y, spritesheet)
    scene.add.existing(this).setScale(0.16*scale).setDepth(8)
    scene.physics.add.existing(this, true)
    
    this.id = key
    this.sceneload = sceneload
    this.sprite_key = spritesheet_key
    this.anim_config = anim_config
    this.dialogue = dialogue
    this.question = question
    this.clue = clue
    this.answer = answer
    this.check = check
  }

  destroy() {
    super.destroy()
  }

  public set dialogueKey(key: string) {
    if (this.check&&(key=='pre_c_repeat'||key=='post_c_repeat')) {
      // check player.item_carry (from gameStore)
      const check = (key=='pre_c_repeat') ? this.check.pre_c_check : this.check.pre_a_check
      if (useGameStore().carry_item.find((ele: any) => ele?.id == check)) {
        // delete item from inventery + carry_item
        const removed = _.remove(useGameStore().inventory, (ele:any) => {ele.id == check})
        useGameStore().inventory = removed
        useGameStore().carry_item = []
        this._dialogueKey = (key=='pre_c_repeat') ? 'clue' : 'answer'
      }
      else { this._dialogueKey = key }
    } else {
      this._dialogueKey = key
    }
  }

  public get dialogueKey() {
    return this._dialogueKey
  }

  create() {
    this.debugShowBody = true
    this.debugShowVelocity = true
    this.debugBodyColor = 0x0033ff // debug option

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
    this.on('start-talking', (key: string, cameraX: number, cameraY: number) => {
      if (!this.dialogue||!this.dialogue[key]) return // dialogue do not exist >> pass

      // create dialogue
      const zoom = this.scene.cameras.main.zoom
      const _dialogue = this.dialogue[key]
      const dialogue = new Dialogue(this.scene, cameraX, cameraY, zoom, _dialogue, this.question)
      dialogue.create()

      // pause npc anim
      const current_anim = this.anims.currentAnim
      current_anim.pause()
      this.scene.events.emit('start-talking', this) // emit talking event to scene
    })

    // end-talking event
    this.scene.events.on('end-talking', () => {
      // resume npc anims
      const current_anim = this.anims.currentAnim
      current_anim.resume()

      // if dialogueKey == clue|answer, update user_config
      if (this.dialogueKey == 'clue') {
        this.scene.events.emit('update-userconfig', this.id, 'post_c_repeat', this.clue)
      } else if (this.dialogueKey == 'answer') {
        this.scene.events.emit('update-userconfig', this.id, 'post_a_repeat', this.answer)
      }
    })
  }

  update() {
    // if default_anim exist, play default_anim
    const default_anim = this.anims.get(this.anim_config.default)

    if (this.anim_config.auto_start) {
      this.anims.play(default_anim.key, true)
    }
  }
}