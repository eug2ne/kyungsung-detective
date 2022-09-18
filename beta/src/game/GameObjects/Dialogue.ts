import Phaser from 'phaser'

export default class Dialogue extends Phaser.GameObjects.GameObject {
  private line_box: Phaser.GameObjects.Rectangle
  private readonly line_x: number
  private readonly line_y: number
  private line: Phaser.GameObjects.Text
  private image_box: Phaser.GameObjects.Rectangle
  private image: Phaser.GameObjects.Image
  private options: [ Phaser.GameObjects.Text? ] = []
  private readonly dialogue: any /* npc.dialogue|item.content */
  private readonly question: any
  private index: number = 0
  private space_key: Phaser.Input.Keyboard.Key =
    this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false)
  
  constructor(scene: Phaser.Scene,
    cameraX: number,
    cameraY: number,
    zoom: number,
    dialogue?: any,
    question?: any
  ) {
    super(scene, 'Dialogue')

    this.dialogue = dialogue
    this.question = question

    // create dialogue-box on screen
    const white = Phaser.Display.Color.GetColor32(255,255,255,0.1)
    this.line_box = this.scene.add.rectangle(cameraX+570/zoom, cameraY+550/zoom, 645/zoom, 200/zoom, white)
      .setDepth(20) // line-box
    this.image_box = this.scene.add.rectangle(cameraX+120/zoom, cameraY+550/zoom, 200/zoom, 200/zoom, white)
      .setDepth(20) // image-box

    // create image
    this.image = this.scene.add.image(this.image_box.x, this.image_box.y
      , (this.texture) ? this.texture:'undefined')
      .setDisplaySize(200/zoom,200/zoom).setDepth(20)

    // create line
    this.line_x = cameraX+260/zoom
    this.line_y = cameraY+460/zoom
    this.line = new Phaser.GameObjects.Text(
      this.scene,
      this.line_x,
      this.line_y,
      'loading...',
      {
        fontFamily: 'NeoDunggeunmo',
        fontSize: '25px',
        color: '#000',
        padding: {
          x: 5,
          y: 5
        }
      }
    ).setWordWrapWidth(640)
    this.scene.add.existing(this.line).setDepth(20)
  }

  destroy() {
    this.line_box.destroy()
    this.image_box.destroy()
    this.line.destroy()
    this.options.forEach((option: any) => {
      option.destroy()
    })
    this.image?.destroy()
    super.destroy()
  }

  private get line_text() {
    if (this.dialogue[this.index].question) {
      return this.dialogue[this.index].question.line
    } else {
      return (this.dialogue[this.index].line) ?
        this.dialogue[this.index].line : this.dialogue[this.index]
    }
  }

  private get texture() {
    if (this.index != 0&&this.index == this.dialogue.length) {
      // end of dialogue
      this.scene.events.emit('end-talking')
      this.destroy()
    } else {
      // update dialogue
      if (!this.dialogue[this.index]&&this.question) {
        // item-interact event: question
        this.dialogue[this.index] = this.question
      } else if (this.dialogue[this.index].to) {
        // shift from dialogue to question
        this.dialogue[this.index] = this.question[this.dialogue[this.index].to]
      }
      
      // return image-key
      const key = (this.dialogue[this.index].question)
        ? this.dialogue[this.index].question.image:this.dialogue[this.index].image
        
      if (!this.scene.textures.exists(key)) return
        
      return key
    }
  }

  create() {
    // create update-line event
    this.space_key.on('down', () => {
      this.space_key.isDown = false
      this.emit('update-line')
    })

    // text/image render func.
    let writing = true
    const typewriter = () => {
      // typewriter effect
      const l = this.line_text.length
      let i = 0
      this.line.text = '' // reset line
      this.scene.time.addEvent({
        callback: () => {
          this.line.text += this.line_text[i]
          i++

          if (i == l) {
            writing = true
            this.index++
          }
        },
        repeat: l-1,
        delay: 100
      })
    }
    const renderTextImage = (writing: boolean) => {
      this.image_box.visible = (this.texture) ? true:false
      this.image.setTexture(this.texture)
      this.image.visible = (this.texture) ? true:false

      if (!writing) {
        // auto completion
        this.scene.time.removeAllEvents()
        this.line.text = this.line_text
      } else {
        if (this.dialogue[this.index].question) {
          // disable update-line event
          this.space_key.enabled = false

          // create question
          typewriter()
           
          // create options
          this.dialogue[this.index].options.forEach((option: any, index: number) => {
            this.options.push(new Phaser.GameObjects.Text(
              this.scene,
              this.line_x,
              this.line_y+this.line.height+25+35*index,
              `>> ${option.answer}`,
              {
                fontFamily: 'NeoDunggeunmo',
                fontSize: '25px',
                color: '#000',
                padding: {
                  x: 5,
                  y: 5
                }
              }
              )
              .setData({ to: option.to })
              .setInteractive()
              .setWordWrapWidth(685)
            )
          })
          this.options.forEach((option: any) => {
            this.scene.add.existing(option).setDepth(25)
            // mouse over/out event
            option.on('pointerover', () => {
              option.setBackgroundColor('#c0c6ce')
            })
            option.on('pointerout', () => {
              option.setBackgroundColor(null)
            })
        
            // mouse click event
            option.on('pointerdown', () => {
              console.log(option.data.values.to)
              if (!option.data.values.to) {
                // end of question/dialogue
                this.scene.events.emit('end-talking', this)
              } else if (option.data.values.to == 'dialogue') {
                // continue to dialogue
                this.options.forEach((option: any) => {
                  option.destroy()
                }) // destroy options
                this.options = [] // reset this.options
    
                writing = true
                this.emit('update-line')
              } else {
                // update user-config according to value
                this.scene.events.emit(`to-${option.data.values.to}`)
    
                // end of question/dialogue
                this.scene.events.emit('end-talking', this)
              }
            })
          })
        } else {
          // enable update-line event
          this.space_key.enabled = true
  
          // create line+image
          typewriter()
        }
      }
    }

    // create first line+image|question+options
    renderTextImage(writing)
    writing = false

    this.on('update-line', () => {
      if (!writing) {
        // auto-completion
        renderTextImage(writing)

        writing = true // reset writing
        this.index++ // update this.index
      } else {
        // create line+image|question+options
        renderTextImage(writing)
        writing = false
      }
    }, this)
  }
}