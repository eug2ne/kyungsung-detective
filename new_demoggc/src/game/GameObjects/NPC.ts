import Phaser from 'phaser'
import { auth, db } from '../../firestoreDB.js'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  public readonly id: string
  private sprite_key: string
  private readonly _dialogue: any
  private readonly clue: any
  private readonly answer: any|null

  constructor(
    scene: Phaser.Scene,
    key: string,
    spritesheet_key: string,
    x: number,
    y: number,
    dialogue: any,
    clue: any,
    answer: any
  ) {
    const spritesheet = scene.textures.get(spritesheet_key)
    super(scene, x, y, spritesheet)
    scene.add.existing(this).setScale(0.32).setDepth(10)
    scene.physics.add.existing(this, true)
    
    this.id = key
    this.sprite_key = spritesheet_key
    this._dialogue = dialogue
    this.clue = clue
    this.answer = answer
  }

  public get dialogue() {
    // check clue
    if (this.clue) {
      const user = auth.currentUser
      const UsersRef = collection(db, 'Users')
      const userRef = doc(UsersRef, user.uid)

      const check = async () => {
        const userSnap = await getDoc(userRef)
        if (userSnap.data().clues[this.clue.story]) {
          // clue acquired
          try {
            const userQuizsRef = collection(userRef, 'Quizs')
            const userquizRef = doc(userQuizsRef, this.clue.quiz_id)
            const userQuizSnap = await getDoc(userquizRef)
            
            if (userQuizSnap.data().accomplished) {
              // clue acquired + quiz solved
              return this._dialogue['answer']
            } else {
              // clue acquired + quiz not solved
              return this._dialogue['post_c_repeat']
            }
          } catch (error) {
            // this.clue.quiz_id == null
            // >> answer_check not needed
            return this._dialogue['post_c_repeat']
          }
        } else {
          // clue not acquired
          // add clue to user doc
          const Clue = this.clue
          let set: Partial<Record<keyof typeof Clue, string>> = {}
          set[this.clue.story] = this.clue
          
          await updateDoc(userRef, {
            clues: set
          })

          return this._dialogue['clue']
        }
      }

      check()
    } else {
      return this._dialogue['pre_c_repeat']
    }
  }

  destroy() {
    super.destroy()
  }

  create() {
    console.log(this.id)
    this.debugShowBody = true
    this.debugShowVelocity = true
    this.debugBodyColor = 0x0033ff // debug option

    // create animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(this.sprite_key, { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
        key: 'back',
        frames: this.anims.generateFrameNumbers(this.sprite_key, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: 'front',
        frames: this.anims.generateFrameNumbers(this.sprite_key, { start: 9, end: 12 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(this.sprite_key, { start: 13, end: 16 }),
        frameRate: 10,
        repeat: -1
    })
  }

  update() {
    this.anims.play('front')
  }
}