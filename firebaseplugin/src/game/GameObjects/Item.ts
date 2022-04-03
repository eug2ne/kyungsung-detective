import Phaser from 'phaser'

export default class Item extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    texture: string
  ) {
    const item_texture = scene.textures.get(texture)
    // const item_Image = new Phaser.GameObjects.Image(scene, x, y, item_texture)
    super(scene, x, y, item_texture)
    this.name = name
    scene.add.existing(this).setScale(0.1)
    scene.physics.add.existing(this, true)
  }

  destroy() {
    super.destroy()
  }
}
