import Phaser from 'phaser'

export default class Dialogue extends Phaser.GameObjects.GameObject {
  private line_box: Phaser.GameObjects.Rectangle
  private image_box: Phaser.GameObjects.Rectangle
  private line: Phaser.GameObjects.Text
  private options: [ Phaser.GameObjects.Text? ] = []
  private image: Phaser.GameObjects.Image
  private readonly dialogue: any /* npc.dialogue|item.content */
  private readonly question: any
  private index: number = 0
  
  constructor(scene: Phaser.Scene,
    cameraX: number,
    cameraY: number,
    dialogue?: any,
    question?: any
  ) {
      super(scene, 'Dialogue')
      // this.scene.events.emit('talking', npc)
      this.dialogue = dialogue
      this.question = question

      // create dialogue-box on screen
      const white = Phaser.Display.Color.GetColor32(255,255,255,0.1)
      this.line_box = this.scene.add.rectangle(cameraX+570, cameraY+550, 645, 200, white)
        .setDepth(20) // line-box
      this.image_box = this.scene.add.rectangle(cameraX+120, cameraY+550, 200, 200, white)
        .setDepth(20) // image-box

      if (this.dialogue[this.index].to) {
        // shift from dialogue to question
        this.dialogue[this.index] = this.question[this.dialogue[this.index].to]

        // create question+options
        this.line = new Phaser.GameObjects.Text(
          this.scene,
          cameraX+260,
          cameraY+460,
          this.dialogue[this.index].question[0].line,
          {
            fontFamily: 'NeoDunggeunmo',
            fontSize: '25px',
            color: '#000',
            padding: {
              x: 5,
              y: 5
          }
        }).setWordWrapWidth(640)
        // this.dialogue[this.index].options.forEach((option: any) => {
        //   this.options.push(new Phaser.GameObjects.Text(
        //     this.scene,
        //     cameraX+315,
        //     cameraY+550,
        //     option.answer,
        //     {
        //       fontFamily: 'NeoDunggeunmo',
        //       fontSize: '30px',
        //       color: '#000',
        //       padding: {
        //         x: 5,
        //         y: 5
        //       }
        //     }
        //   ).setWordWrapWidth(685))

          this.scene.add.existing(this.line).setDepth(20)
          // this.scene.add.existing(this.options as unknown as Phaser.GameObjects.Group).setDepth(20)
      } else if (this.dialogue) {
        // npc-talking event|item.interact.type == read

      } else {
        // item.interact.type == question

      }

      // this.line = new Phaser.GameObjects.Text(
      //   this.scene,
      //   cameraX+315,
      //   cameraY+510,
      //   this.line_text,
      //   {
      //     fontFamily: 'NeoDunggeunmo',
      //     fontSize: '30px',
      //     color: '#000',
      //     padding: {
      //       x: 5,
      //       y: 5
      //   }
      // }).setWordWrapWidth(685)
      // this.scene.add.existing(this.line).setDepth(20)
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
      return (this.dialogue[this.index].line) ? this.dialogue[this.index].line:this.dialogue[this.index]
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
          this.scene.events.emit('end-talking', this)
        }
      }
    }, this)
  }
}