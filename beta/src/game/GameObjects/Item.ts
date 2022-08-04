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
    this.on(`interact-item`, (cameraX: number, cameraY: number) => {
      switch (this.interact.type) {
        case 'get':
          // add to inventory when space-down
          this.scene.events.emit('show-item-text', this)
        
        case 'question'||'read':
          const pass = (this.interact.type == 'question')
            ? { 'question': this.interact.question }:{ 'dialogue': this.interact.content }

          const dialogue = new Dialogue(this.scene, cameraX, cameraY, pass)
          dialogue.create()

          this.scene.input.keyboard.on('keydown-SPACE', () => {
            dialogue.emit('update-line')
          })

        break
      }
    })
  }

  destroy() {
    super.destroy()
  }
}