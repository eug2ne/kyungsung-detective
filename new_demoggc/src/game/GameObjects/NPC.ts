import Phaser from 'phaser'

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  public readonly id: string
  private sprite_key: string
  private sprite_func: any
  private readonly _dialogue: any
  private _dialogue_show: any
  private readonly _hint: any|null
  private readonly _answer: any|null

  constructor(
    scene: Phaser.Scene,
    key: string,
    spritesheet_key: string,
    sprite_func: any,
    x: number,
    y: number,
    dialogue: any,
    hint: any,
    answer: any
  ) {
    const spritesheet = scene.textures.get(spritesheet_key)
    super(scene, x, y, spritesheet)
    scene.add.existing(this).setScale(0.32).setDepth(10)
    scene.physics.add.existing(this, true)
    
    this.id = key
    this.sprite_key = spritesheet_key
    this._dialogue = dialogue
    this.sprite_func = sprite_func
    this._hint = hint
    this._answer = answer
  }

  public set dialogue(key: string) {
    if (key == 'hint') {
      // check requirement
      this._dialogue_show = this._dialogue.hint
    } else if (key == 'answer') {
      this._dialogue_show = this._answer.answer
    } else {
      this._dialogue_show = this._dialogue[key]
    }
  }

  public get dialogue() {
    return this._dialogue_show
  }

  public get keys() {
    return Object.keys(this._dialogue)
  }

  private get hint() {
    if (this._hint.require) {
      return false
    } else {
      return this._hint
    }
  }

  private get answer() {
    if (this._answer.require) {
      return false
    } else {
      return this._answer
    }
  }

  destroy() {
    super.destroy()
  }

  create() {
    this.debugShowBody = true
    this.debugShowVelocity = true
    this.debugBodyColor = 0x0033ff // debug option

    // create animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(this.sprite_key, { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
        key: 'back',
        frames: this.anims.generateFrameNumbers(this.sprite_key, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: 'front',
        frames: this.anims.generateFrameNumbers(this.sprite_key, { start: 9, end: 12 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(this.sprite_key, { start: 13, end: 16 }),
        frameRate: 10,
        repeat: -1
    })
  }

  update() {
    this.anims.play('front')
  }
}