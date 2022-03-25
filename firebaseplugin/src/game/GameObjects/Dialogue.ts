import Phaser from 'phaser'
import NPC from './NPC'

export default class Dialogue extends Phaser.GameObjects.GameObject {
  private line: Phaser.GameObjects.Text
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
      this.scene.add.rectangle(cameraX+650, cameraY+600, 700, 200, white)
        .setDepth(20) // line-box
      this.scene.add.rectangle(cameraX+150, cameraY+600, 200, 200, white)
        .setDepth(20) // image-box

      this.line = new Phaser.GameObjects.Text(
        this.scene,
        cameraX+650,
        cameraY+600,
        'loading...',
        {
          fontFamily: 'NeoDunggeunmo',
          fontSize: '30px',
          color: '#000',
          padding: {
            x: 5,
            y: 5
        }
      }).setWordWrapWidth(690)
      this.scene.add.existing(this.line).setDepth(20)
  }

  destroy() {
    super.destroy()
  }

  private get line_text() {
    if (this.index < this.dialogue.length) {
      return this.dialogue[this.index].line
    } else {
      return this.scene.events.emit('end-talk', this.npc, this)
    }
  }

  public get talking() {
    if (this.index < this.dialogue.length) {
      return true
    } else {
      return false
    }
  }

  create() {
    let _line = this.line_text
    this.line.text = _line

    this.on('update-line', () => {
      console.log('update-line')
      this.index++

      _line = this.line_text
      this.line.text = _line
    }, this)
  }
}