import Phaser from 'phaser'
import NPC from './NPC'

export default class Dialogue extends Phaser.GameObjects.GameObject {
  private line_box: Phaser.GameObjects.Rectangle
  private image_box: Phaser.GameObjects.Rectangle
  private line: Phaser.GameObjects.Text
  private image: Phaser.GameObjects.Image
  private npc: NPC
  private readonly dialogue: any
  private index: number = 0
  
  constructor(scene: Phaser.Scene,
    cameraX: number,
    cameraY: number,
    npc: any /* overlap-callback doesn't perceive type NPC */) {
      super(scene, 'Dialogue')
      this.scene.events.emit('talking', npc)
      this.dialogue = npc.dialogue
      this.npc = npc

      // create dialogue-box on screen
      const white = Phaser.Display.Color.GetColor32(255,255,255,0.1)
      this.line_box = this.scene.add.rectangle(cameraX+650, cameraY+600, 700, 200, white)
        .setDepth(20) // line-box
      this.image_box = this.scene.add.rectangle(cameraX+150, cameraY+600, 200, 200, white)
        .setDepth(20) // image-box

      this.image = new Phaser.GameObjects.Image(this.scene, cameraX+150, cameraY+600, this.texture)
        .setDepth(20)
        .setDisplaySize(200,200)
      this.scene.add.existing(this.image)
      this.line = new Phaser.GameObjects.Text(
        this.scene,
        cameraX+315,
        cameraY+510,
        this.line_text,
        {
          fontFamily: 'NeoDunggeunmo',
          fontSize: '30px',
          color: '#000',
          padding: {
            x: 5,
            y: 5
        }
      }).setWordWrapWidth(685)
      this.scene.add.existing(this.line).setDepth(20)
  }

  destroy() {
    this.line_box.destroy()
    this.image_box.destroy()
    this.line.destroy()
    this.image.destroy()
    super.destroy()
  }

  private get line_text() {
    if (this.index < this.dialogue.length) {
      return this.dialogue[this.index].line
    } else {
      // end of dialogue
      return false
    }
  }

  private get texture() {
    const key = this.dialogue[this.index].image
    return this.scene.textures.get(key)
  }

  create() {
    let writing = true
    this.on('update-line', () => {
      if (!writing) {
        // auto completion
        this.scene.time.removeAllEvents()
        this.line.text = this.line_text
        writing = true
      } else {
        // skip to next line
        this.index++
        if (this.line_text) {
          this.image.texture = this.texture // load image
          
          // typewriter effect
          writing = false
          const l = this.line_text.length
          let i = 0
          this.line.text = '' // reset line
          this.scene.time.addEvent({
            callback: () => {
              this.line.text += this.line_text[i]
              i++
            },
            repeat: l-1,
            delay: 100
          })
        } else {
          // end of dialogue
          this.scene.events.emit('end-talking', this, this.npc)
        }
      }
    }, this)
  }
}