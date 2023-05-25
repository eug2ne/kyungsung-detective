import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  public interact_area: Phaser.Types.Physics.Arcade.ImageWithStaticBody

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: Phaser.Textures.Texture,
    scale?: number
  ) {
    super(scene, x, y, texture)
    scene.add.existing(this).setScale(scale ? scale : 1.5).setDepth(8)
    scene.physics.add.existing(this).setSize(40,62)
  }

  destroy() {
		super.destroy()
	}

  create() {
    this.debugShowBody = true
    this.debugShowVelocity = true
    this.debugBodyColor = 0x0033ff // debug option
    this.scene.cameras.main.startFollow(this, false, 0.2, 0.2)

    // create animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('sami', { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
        key: 'back',
        frames: this.anims.generateFrameNumbers('sami', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: 'front',
        frames: this.anims.generateFrameNumbers('sami', { start: 9, end: 12 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('sami', { start: 13, end: 16 }),
        frameRate: 10,
        repeat: -1
    })

    // create interaction area
    const box = this.scene.add.rectangle(this.x, this.y, 40, 40)
    this.scene.physics.add.existing(box)
    this.interact_area = box as unknown as Phaser.Types.Physics.Arcade.ImageWithStaticBody
  }

  update(event: string) {
    // controls
    switch (event) {
      case 'up':
        // up
        this.setVelocityY(-160*4)
        this.anims.play('back', true)
        break

      case 'down':
        // down
        this.setVelocityY(160*4)
        this.anims.play('front', true)
        break

      case 'left':
        // left
        this.setVelocityX(-160*4)
        this.anims.play('left', true)
        break

      case 'right':
        // right
        this.setVelocityX(160*4)
        this.anims.play('right', true)
        break

      default:
        this.anims.stop()
    }

    this.body!.velocity.normalize().scale(50*4)

    // update area coord
    const boxX = this.x+this.body!.velocity.x*0.35, boxY = this.y+this.body!.velocity.y*0.45
    this.interact_area.setPosition(boxX, boxY)
  }
}