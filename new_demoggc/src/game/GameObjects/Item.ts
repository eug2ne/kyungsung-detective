import Phaser from 'phaser'

export default class Item extends Phaser.GameObjects.Image {
  public readonly id: string
  public readonly name: string
  public readonly descript: string

  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number,
    y: number,
    name: string,
    texture: string
  ) {
    const item_texture = scene.textures.get(texture)
    super(scene, x, y, item_texture)
    this.name = name
    this.id = id
    scene.add.existing(this).setScale(0.1)
    scene.physics.add.existing(this, true)
  }

  destroy() {
    super.destroy()
  }
}