import Phaser from 'phaser'
import _ from 'lodash'
import { subClue, event } from './ClueDataStructure'

const COLOR_WHITE = 0xffffff
const COLOR_BLACK = 0x000000
const COLOR_CONTAINER = 0xe3edfc
const COLOR_FOCUS = 0xa7c7fa

type scopeData = {
  scope: string,
  evidence: [ (subClue|event)? ]
}

class Evidence extends Phaser.GameObjects.GameObject {
  private rectangle: Phaser.GameObjects.Rectangle
  private title: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, 0, 0, '', {})
  private description: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, 0, 0, '', {})
  private click: boolean = false
  public evidence_data?: subClue|event

  constructor(
    scene: Phaser.Scene, 
    config: { centerX: number, centerY: number, zoom: number, index: number },
    evidence_data?: subClue|event
  ) {
    super(scene, 'Evidence')
    this.evidence_data = evidence_data

    // create default evidence
    const { centerX, centerY, zoom, index } = config
    const originX = centerX+(index-2)*215/zoom, originY = centerY // center position of evidence
    this.rectangle = new Phaser.GameObjects.Rectangle(this.scene, originX, originY, 200/zoom, 200/zoom, COLOR_CONTAINER)
    this.title.setOrigin(0,0).setPosition(originX-90/zoom, originY-90/zoom)
      .setStyle({
        fontFamily: 'NeoDunggeunmo',
        fontSize: `${20/zoom}px`,
        color: '#000',
        padding: {
          x: 10,
          y: 10
        },
        fixedHeight: 30       
      })
    this.description.setOrigin(0,0).setPosition(originX-90/zoom, originY-90/zoom+30)
      .setStyle({
        fontFamily: 'NeoDunggeunmo',
        fontSize: `${15/zoom}px`,
        color: '#000',
        padding: {
          x: 10,
          y: 10
        }
      })
      .setWordWrapWidth(200/zoom)

    if (this.evidence_data) {
      this.title.setText(this.evidence_data.title)
      if (this.title.width > 200/zoom) {
        const numCharacters = Math.floor(200/zoom / (this.title.width/this.title.text.length))
        const truncatedText = this.title.text.substring(0, numCharacters-2) + '...'

        this.title.setText(truncatedText)
      } // add ellipsis
      this.description.setText(this.evidence_data.description)
    }

    // add evidence to scene
    this.scene.add.existing(this.rectangle).setDepth(20)
    this.scene.add.existing(this.title).setDepth(20)
    this.scene.add.existing(this.description).setDepth(20)
  }

  destroy() {
    this.rectangle.destroy()
    this.title.destroy()
    this.description.destroy()
    super.destroy()
  }

  create() {
    // option-pointer event
    this.on('pointerover', () => {
      // create outline
      this.rectangle.setStrokeStyle(5, COLOR_FOCUS)
    })
    this.on('pointerout', () => {
      // destroy outline
      this.rectangle.setStrokeStyle(0)
    })
    this.on('pointerdown', () => {
      // clickable only when evidence-data exist
      if (!this.evidence_data) return

      // toggle click
      this.click = !this.click

      if (this.click) {
        // fill rectangle
        this.rectangle.setFillStyle(COLOR_FOCUS)
        // add evidence to submit-list
        this.emit('add-evidence', this.evidence_data)
      } else {
        // empty rectangle
        this.rectangle.setFillStyle(COLOR_CONTAINER)
        // splice evidence to submit-list
        this.emit('splice-evidence', this.evidence_data)
      }
    })
  }
}

export default class EvidencePanel extends Phaser.GameObjects.GameObject {
  private panel: Phaser.GameObjects.Rectangle
  private submit_button: Phaser.GameObjects.Text
  private submit_list: [ (subClue|event)? ] = []
  private readonly scope_data: scopeData
  /* interactive components */
  public evidences: [ Evidence? ] = []

  constructor(
    scene: Phaser.Scene,
    config: { cameraX: number, cameraY: number, zoom: number },
    scope_data: scopeData
  ) {
    super(scene, 'EvidencePanel')
    this.scope_data = scope_data

    const { cameraX, cameraY, zoom } = config
    // create panel
    this.panel = new Phaser.GameObjects.Rectangle(this.scene, cameraX, cameraY-100, 1100/zoom, 250/zoom, COLOR_WHITE)
      .setStrokeStyle(2, COLOR_BLACK)

    this.scene.add.existing(this.panel).setDepth(20)
    for (let i = 0; i<5; i++) {
      // create evidence*5
      this.evidences.push(new Evidence(this.scene,
          { centerX: cameraX, centerY: cameraY-100, zoom: zoom, index: i }, this.scope_data.evidence[i]
        )
      )
    }

    // create submit-button
    this.submit_button = new Phaser.GameObjects.Text(this.scene, cameraX+550/zoom-161, cameraY-250/zoom+6, '증거 제출', {
      fontFamily: 'NeoDunggeunmo',
      fontSize: `${25/zoom}px`,
      color: '#000',
      align: 'center',
      padding: {
        x: 10,
        y: 10
      },
      fixedHeight: 50,
      fixedWidth: 160
    })
      .setBackgroundColor('#e3edfc')
      .setInteractive()
    this.scene.add.existing(this.submit_button).setDepth(20)
  }

  destroy() {
    // destroy option-pointer + panel + evidences
    this.scene!.sceneload.dialogue.destroyOptionPointer()
    this.panel.destroy()
    this.submit_button.destroy()
    this.evidences.forEach((evidence?: Evidence) => {
      evidence?.destroy()
    })
    super.destroy()
  }

  create() {
    // submit-button pointer event
    this.submit_button.on('pointerover', () => {
      // fill focus color
      this.submit_button.setBackgroundColor('#a7c7fa')
    })
    this.submit_button.on('pointerout', () => {
      // fill default color
      this.submit_button.setBackgroundColor('#e3edfc')
    })
    this.submit_button.on('pointerdown', () => {
      // submit this.submit_list >> trigger clear/fail dialogue
      this.emit('submit-evidence', this.submit_list)
    })

    // create evidence
    this.evidences.forEach((evidence?: Evidence) => {
      evidence?.create()
      // on add-evidence event, add evidence to submit-list
      evidence?.on('add-evidence', (evidence: subClue|event) => {
        this.submit_list.push(evidence)
      })
      // on splice-evidence event, remove evidence from submit-list
      evidence?.on('splice-evidence', (evidence: subClue|event) => {
        _.remove(this.submit_list, evidence)
      })
    })
    // create option-pointer for evidence
    this.scene!.sceneload.dialogue.createOptionPointer(this.evidences)
  }
}