import Phaser from 'phaser'

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  public readonly id: string
  private sprite_key: string
  public readonly dialogue: any
  public readonly clue: any
  private readonly answer: any|null

  constructor(
    scene: Phaser.Scene,
    key: string,
    spritesheet_key: string,
    x: number,
    y: number,
    dialogue: any,
    clue: any,
    answer: any
  ) {
    const spritesheet = scene.textures.get(spritesheet_key)
    super(scene, x, y, spritesheet)
    scene.add.existing(this).setScale(0.32).setDepth(10)
    scene.physics.add.existing(this, true)
    
    this.id = key
    this.sprite_key = spritesheet_key
    this.dialogue = dialogue
    this.clue = clue
    this.answer = answer
  }

  destroy() {
    super.destroy()
  }

  create() {
    console.log(this.id)
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