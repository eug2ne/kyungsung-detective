import Phaser from 'phaser'

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  private id: string
  private dynamic: boolean
  private logtexture: Phaser.Textures.Texture
  private lines: {}

  constructor(
    scene: Phaser.Scene,
    key: string,
    type: string,
    lines: {},
    texture: Phaser.Textures.Texture,
    logtexture: Phaser.Textures.Texture,
    x: number,
    y: number
  ) {
    console.log('npc construct')

    super(scene, x, y, texture)
    scene.add.existing(this).setScale(0.32)
    scene.physics.add.existing(this, true)

    this.id = key
    this.logtexture = logtexture
    this.lines = lines

    if (type == 'static') {
      this.dynamic = false
    } else {
      this.dynamic = true
    }
  }

  destroy() {
    super.destroy()
  }

  create() {
    console.log('npc create')

    // create animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(`${this.id}_scenetexture`, { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
        key: 'back',
        frames: this.anims.generateFrameNumbers(`${this.id}_scenetexture`, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: 'front',
        frames: this.anims.generateFrameNumbers(`${this.id}_scenetexture`, { start: 9, end: 12 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(`${this.id}_scenetexture`, { start: 13, end: 16 }),
        frameRate: 10,
        repeat: -1
    })
  }

  update() {
    this.anims.play('front', true)
  }
}