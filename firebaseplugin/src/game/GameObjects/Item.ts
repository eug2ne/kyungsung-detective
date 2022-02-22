import Phaser from 'phaser'

export default class Item extends Phaser.GameObjects.Container {
  private showText: Phaser.GameObjects.Text // show when interaction

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

    this.showText = new Phaser.GameObjects.Text(scene, 0, 0, '스페이스를 눌러 아이템을 얻으시오', {
      fontFamily: 'NeoDunggeunmo',
      fontSize: '35px',
      stroke: '#000',
      strokeThickness: 6,
      color: '#fff',
    })
    this.showText.visible = false
    scene.add.existing(this.showText).setDepth(15)
  }

  destroy() {
    super.destroy()
  }

  update(textX: number|undefined, textY: number|undefined, visible: boolean) {
    // item overlap/collide
    if (textX||textY) {
      this.showText.setPosition(textX, textY)
    } else {
      this.showText.visible = visible
    }
  }
}
