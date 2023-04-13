import Phaser from 'phaser'

export default class Dialogue extends Phaser.GameObjects.GameObject {
  private line_box: Phaser.GameObjects.Rectangle
  private readonly line_x: number
  private readonly line_y: number
  private line: Phaser.GameObjects.Text
  private image_box: Phaser.GameObjects.Rectangle
  private image: Phaser.GameObjects.Image
  private zoom: number
  private readonly options_data: any
  private options: [ Phaser.GameObjects.Text? ] = []
  private readonly dialogue_data: any
  private dialogue: any
  private index: number = 0
  private space_key: Phaser.Input.Keyboard.Key =
    this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false)
  
  constructor(scene: Phaser.Scene,
    cameraX: number,
    cameraY: number,
    zoom: number,
    dialogueKey: string|undefined,
    dialogue_data: any,
    options_data?: any
  ) {
    super(scene, 'Dialogue')

    this.dialogue_data = dialogue_data
    // select dialogue according to dialogueKey
    this.dialogue = dialogueKey ? dialogue_data[dialogueKey].dialogue : dialogue_data
    this.options_data = options_data
    this.zoom = zoom

    // create dialogue-box on screen
    const white = Phaser.Display.Color.GetColor32(255,255,255,0.1)
    const black = Phaser.Display.Color.GetColor32(0,0,0,0.1)
    this.line_box = this.scene.add.rectangle(cameraX+580/zoom, cameraY+550/zoom, 645/zoom, 200/zoom, white)
      .setDepth(20)
      .setStrokeStyle(2, black) // line-box
    this.image_box = this.scene.add.rectangle(cameraX+120/zoom, cameraY+550/zoom, 200/zoom, 200/zoom, white)
      .setDepth(20)
      .setStrokeStyle(2, black) // image-box

    // create image
    this.image = this.scene.add.image(this.image_box.x, this.image_box.y
      , (this.texture) ? this.texture:'undefined')
      .setDepth(20)

    // create line
    this.line_x = cameraX+270/zoom
    this.line_y = cameraY+460/zoom
    this.line = new Phaser.GameObjects.Text(
      this.scene,
      this.line_x,
      this.line_y,
      'loading...',
      {
        fontFamily: 'NeoDunggeunmo',
        fontSize: `${25/zoom}px`,
        color: '#000',
        padding: {
          x: 5,
          y: 5
        }
      }
    ).setWordWrapWidth(Math.floor(640/zoom))
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
    if (this.index != 0&&this.index === this.dialogue.length) {
      // end of dialogue
      this.scene.events.emit('end-talking')
      this.destroy()
    } else {
      // return image-key
      const key = (this.dialogue[this.index].question)
        ? this.dialogue[this.index].question.image:this.dialogue[this.index].image
        
      if (!this.scene.textures.exists(key)) return
        
      return key
    }
  }

  create(dialogueKey: string|undefined) {
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
            this.index++ // update this.index
          }
        },
        repeat: l-1,
        delay: 100
      })
    }
    const renderTextImage = (writing: boolean) => {
      this.image_box.visible = (this.texture) ? true:false
      this.image.setTexture(this.texture).setDisplaySize(200/this.zoom, 200/this.zoom)
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
          this.options_data.forEach((option: any, index: number) => {
            this.options.push(new Phaser.GameObjects.Text(
              this.scene,
              this.line_x,
              this.line_y+this.line.height+25+35*index,
              `>> ${option.answer}`,
              {
                fontFamily: 'NeoDunggeunmo',
                fontSize: `${25/this.zoom}px`,
                color: '#000',
                padding: {
                  x: 5,
                  y: 5
                }
              }
              )
              .setData({ event: option.event, to: option.to })
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
              if (this.index != this.dialogue.length) {
                // auto-complete current question
                this.scene.time.removeAllEvents()
                this.line.text = this.line_text
              }

              if (!option.data.values.to) {
                // end of question/dialogue
                if (option.data.values.event) {
                  // if event-data in option, emit event-data to scene
                  this.scene.events.emit('pass-event-data', option.data.values.event)
                }
                this.scene.events.emit('end-talking', this)
              } else {
                const answer_dialogue_data = this.dialogue_data[option.data.values.to]

                // if event-data in answer-dialogue-data, emit event-data to scene
                if (answer_dialogue_data.event) {
                  this.scene.events.emit('pass-event-data', answer_dialogue_data.event)
                }
                // add answer dialogue to this.dialogue
                this.dialogue = this.dialogue.concat(answer_dialogue_data.dialogue)
                
                // enable update-line event
                this.space_key.enabled = true
                
                writing = true // reset writing
                this.emit('update-line') // continue dialogue 
              }

              this.options.forEach((option: Phaser.GameObjects.Text|undefined) => {
                option?.destroy()
              }) // destroy options
              this.options = [] // reset this.options
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

    // if event-data in dialogue_data, emit event-data to scene
    if (dialogueKey&&this.dialogue_data[dialogueKey].event) {
      this.scene.events.emit('pass-event-data', this.dialogue_data[dialogueKey].event)
    }
  }
}