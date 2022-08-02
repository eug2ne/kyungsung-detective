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
  private readonly line_x: number
  private readonly line_y: number
  
  constructor(scene: Phaser.Scene,
    cameraX: number,
    cameraY: number,
    dialogue?: any,
    question?: any
  ) {
    super(scene, 'Dialogue')

    this.dialogue = dialogue
    this.question = question

    // create dialogue-box on screen
    const white = Phaser.Display.Color.GetColor32(255,255,255,0.1)
    this.line_box = this.scene.add.rectangle(cameraX+570, cameraY+550, 645, 200, white)
      .setDepth(20) // line-box
    this.image_box = this.scene.add.rectangle(cameraX+120, cameraY+550, 200, 200, white)
      .setDepth(20) // image-box

    // create image
    this.image = this.scene.add.image(this.image_box.x, this.image_box.y
      , (this.texture) ? this.texture:'undefined')
      .setDisplaySize(200,200).setDepth(20)

    // create line
    this.line_x = cameraX+260
    this.line_y = cameraY+460
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
    // if (this.index >= this.dialogue.length) {
    //   // end of dialogue
    //   return false
    // } else {
    //   // update dialogue
    //   if (this.dialogue[this.index].to) {
    //     // shift from dialogue to question
    //     this.dialogue[this.index] = this.question[this.dialogue[this.index].to]
    //   } else if ((!this.dialogue[this.index])&&this.question) {
    //     // item-interact event: question
    //     this.dialogue[this.index] = this.question
    //   }

    //   // return line_text
    //   if (this.dialogue[this.index].question) {
    //     return this.dialogue[this.index].question.line
    //   } else {
    //     return (this.dialogue[this.index].line) ? this.dialogue[this.index].line:this.dialogue[this.index]
    //   }
    // }

    return (this.dialogue[this.index].question)
      ? this.dialogue[this.index].question.line:this.dialogue[this.index].line
  }

  private get texture() {
    if (this.index >= this.dialogue.length) {
      // end of dialogue
      return false
    } else {
      // update dialogue
      if (this.dialogue[this.index].to) {
        // shift from dialogue to question
        this.dialogue[this.index] = this.question[this.dialogue[this.index].to]
      } else if ((!this.dialogue[this.index])&&this.question) {
        // item-interact event: question
        this.dialogue[this.index] = this.question
      }

      // return image-key
      const key = (this.dialogue[this.index].question)
        ? this.dialogue[this.index].question.image:this.dialogue[this.index].image
      
      if (!this.scene.textures.exists(key)) {
        return 'undefined'
      } else {
        return this.scene.textures.get(key)
      } 
    }
  }

  create() {
    // text/image render func.
    let writing = true
    const renderTextImage = () => {
      this.image_box.visible = (this.texture) ? true:false
      this.image.visible = (this.texture) ? true:false

      if (!writing) {
        // auto completion
        this.scene.time.removeAllEvents()
        this.line.text = this.line_text
        writing = true
      } else {
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
      }
    }

    // create first line+image
    renderTextImage()
    if (this.dialogue[this.index].question) {
      // disable update-line event
      this.scene.input.keyboard.off('keydown-SPACE')
       
      // create options
      this.dialogue[this.index].options.forEach((option: any, index: number) => {
        console.log(option)
        this.options.push(new Phaser.GameObjects.Text(
          this.scene,
          this.line_x,
          this.line_y+this.line.height+15+35*index,
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
          if (!option.data.values.to) {
            // end of question/dialogue
            this.scene.events.emit('end-talking', this)
          } else if (option.data.values.to == 'dialogue') {
            // continue to dialogue
            this.options.forEach((option: any) => {
              option.destroy()
            }) // destroy options
            this.options = [] // reset this.options

            this.emit('update-line') // this.index++
          } else {
            // update user-config according to value
            this.scene.events.emit(`to-${option.data.to}`)

            // end of question/dialogue
            this.scene.events.emit('end-talking', this)
          }
        })
      })
    }

    this.on('update-line', () => {
      this.index++

      if (!this.texture) {
        // end of dialogue
        this.scene.events.emit('end-talking', this)
      } else if (this.dialogue[this.index].question) {
        // disable update-line event
        this.scene.input.keyboard.off('keydown-SPACE')
        // create question
        renderTextImage()

        // create options
        this.dialogue[this.index].options.forEach((option: any, index: number) => {
          this.options.push(new Phaser.GameObjects.Text(
            this.scene,
            this.line_x,
            this.line_y+this.line.height+10+35*index,
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
            .setData('to', option.to)
            .setInteractive()
            .setWordWrapWidth(685)
          )
        })
        this.options.forEach((option: any) => {
          this.scene.add.existing(option).setDepth(20)
          // mouse over/out event
          option.on('pointerover', () => {
            option.setBackgroundColor('#c0c6ce')
          })
          option.on('pointerout', () => {
            option.setBackgroundColor(null)
          })
      
          // mouse click event
          option.on('pointerdown', () => {
            if (!option.data.values.to) {
              // end of question/dialogue
              this.scene.events.emit('end-talking', this)
            } else if (option.data.values.to == 'dialogue') {
              // continue to dialogue
              this.options.forEach((option: any) => {
                option.destroy()
              }) // destroy options
              this.options = [] // reset this.options
  
              this.emit('update-line') // this.index++
            } else {
              // update user-config according to value
              this.scene.events.emit(`to-${option.data.values.to}`)

              // end of question/dialogue
              this.scene.events.emit('end-talking', this)
            }
          })
        })
      } else {
        // set update-line event
        this.scene.input.keyboard.on('keydown-SPACE', () => {
          this.emit('update-line')
        })

        // create dialogue
        renderTextImage()
      }
    }, this)
  }
}