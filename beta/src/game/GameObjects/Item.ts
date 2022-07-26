import Phaser from 'phaser'

export default class Item extends Phaser.GameObjects.Image {
  public readonly id: string
  public readonly name: string
  public readonly descript: string
  private readonly interact: any

  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number,
    y: number,
    name: string,
    texture: string,
    interact: any
  ) {
    const item_texture = scene.textures.get(texture)
    super(scene, x, y, item_texture)
    this.name = name
    this.id = id
    this.interact = interact
    scene.add.existing(this).setScale(0.1)
    scene.physics.add.existing(this, true)
  }

  create() {
    this.scene.events.on(`interact-${this.id}`, () => {
      switch (this.interact.type) {
        case 'get':
          // add to inventory when space-down
          this.scene.events.emit('show-item-text', this)
        
        case 'question':
          // show question + options
          this.scene.events.emit('create-dialogue', this.interact.question)

        case 'read':
          // show content
          this.scene.events.emit('create-dialogue', this.interact.content, this.interact.to)
      }
    })
  }

  destroy() {
    super.destroy()
  }
}