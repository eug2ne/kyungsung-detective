import Phaser from 'phaser'
import Dialogue from './Dialogue'

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
    scale: number,
    depth: number,
    texture: string,
    interact: any
  ) {
    const item_texture = scene.textures.get(texture)
    super(scene, x, y, item_texture)
    this.name = name
    this.id = id
    this.interact = interact
    scene.add.existing(this).setScale(scale).setDepth(depth)
    scene.physics.add.existing(this, true)
  }

  create() {
    // this.on('item-touch', (cameraX: number, cameraY: number, item_text: Phaser.GameObjects.Text) => {
    //   console.log('item touch')
    //   // if (this.interact.type != 'get') return

    //   // show item_text if user overlap with item + item.interact.type == get
    //   item_text.setPosition(cameraX + 260, cameraY + 200)
    //   item_text.visible = true
    // })

    this.on('item-interact', (cameraX: number, cameraY: number) => {
      let dialogue: Dialogue|null = null
      switch (this.interact.type) {
        case 'get':
          // add to inventory
          this.scene.events.emit('add-to-inventory', this)
        break
        
        case 'question':
          dialogue = new Dialogue(this.scene, cameraX, cameraY, [], this.interact.question)
          dialogue.create()
          this.scene.events.emit('start-talking')
        break

        case 'read':
          dialogue = new Dialogue(this.scene, cameraX, cameraY, this.interact.content, {})
          dialogue.create()
          this.scene.events.emit('start-talking')

          if (this.interact.to) {
            this.scene.events.on('end-talking', () => {
              this.scene.events.emit(`to-${this.interact.to}`)
            })
          }
        break
      }
    })
  }

  destroy() {
    super.destroy()
  }
}