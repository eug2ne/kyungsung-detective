import Phaser from 'phaser'

export default class Item extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    texture: string
  ) {
    console.log('item construct')

    const item_texture = scene.textures.get(texture)
    const item_Image = new Phaser.GameObjects.Sprite(scene, x, y, item_texture)
    super(scene, x, y, [ item_Image ])
    this.name = name
    scene.add.existing(this).setScale(0.1)
    scene.physics.add.existing(this, true)
  }

  destroy() {
    super.destroy()
  }
}
