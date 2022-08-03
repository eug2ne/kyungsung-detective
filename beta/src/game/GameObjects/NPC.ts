import Phaser from 'phaser'
import Dialogue from './Dialogue'

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  public readonly id: string
  private sprite_key: string
  private anim_config: any
  public readonly dialogue: any
  public readonly question: any
  public readonly clue: any
  private readonly answer: any|null

  constructor(
    scene: Phaser.Scene,
    key: string,
    spritesheet_key: string,
    scale: number,
    anim_config: any,
    x: number,
    y: number,
    dialogue: any,
    question: any,
    clue: any,
    answer: any
  ) {
    const spritesheet = scene.textures.get(spritesheet_key)
    super(scene, x, y, spritesheet)
    scene.add.existing(this).setScale(0.16*scale).setDepth(10)
    scene.physics.add.existing(this, true)
    
    this.id = key
    this.sprite_key = spritesheet_key
    this.anim_config = anim_config
    this.dialogue = dialogue
    this.question = question
    this.clue = clue
    this.answer = answer
  }

  destroy() {
    super.destroy()
  }

  create() {
    this.debugShowBody = true
    this.debugShowVelocity = true
    this.debugBodyColor = 0x0033ff // debug option

    // create animation for each frame
    Object.entries(this.anim_config.frames).forEach((entry: any) => {
      const [frame, key] = entry

      this.anims.create({
        key: key,
        frames: this.anims.generateFrameNumbers(this.sprite_key, { start: parseInt(frame.split(',')[0]), end: parseInt(frame.split(',')[0]) }),
        frameRate: 10,
        repeat: this.anim_config.repeat[key]
      })
    })

    // start-talking event
    this.on('start-talking', (key: string, cameraX: number, cameraY: number) => {
      // pause npc anim
      this.anims.pause()

      // create dialogue
      const _dialogue = this.dialogue[key]
      const dialogue = new Dialogue(this.scene, cameraX, cameraY, _dialogue, this.question)
      dialogue.create()

      if (key == 'clue'||key == 'answer') {
        // update user_ config
        this.scene.events.emit('update-userconfig', this.id, `post_${key[0]}_repeat`)
      }
    })

    // end-talking event
    this.scene.events.on('end-talking', () => {
      // resume npc anims
      this.anims.resume()
    })
  }

  update() {
    const default_anim = this.anims.get(this.anim_config.default)

    if (this.anim_config.auto_start) {
      this.anims.play(default_anim.key, true)
    }
  }
}