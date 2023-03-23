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
    const item_texture = scene.textures.exists(texture) ? scene.textures.get(texture) : scene.textures.get('dummy_item')
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

    this.on('item-interact', (key: { interactionKey: string, options: string }, cameraX: number, cameraY: number) => {
      const { interactionKey, options } = key

      let dialogue: Dialogue|null = null
      const zoom = this.scene.cameras.main.zoom
      
      const interaction = this.interact[interactionKey]
      switch (interaction.type) {
        case 'get':
          // add to inventory (update db)
          this.scene.events.emit('update-userconfig', this.id, 'update-inventory',  { type: "item", id: this.id, name: this.name, descript: this.descript, texture: this.texture })
        break
        
        case 'question':
          dialogue = new Dialogue(this.scene, cameraX, cameraY, zoom, undefined, interaction.dialogue, interaction.options_config[options])
          dialogue.create(undefined)
          this.scene.events.emit('start-talking')
        break

        case 'read':
          dialogue = new Dialogue(this.scene, cameraX, cameraY, zoom, interactionKey, this.interact)
          dialogue.create(interactionKey)
          this.scene.events.emit('start-talking')
        
        break
      }
    })
  }

  destroy() {
    super.destroy()
  }
}