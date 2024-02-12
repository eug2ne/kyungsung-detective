import Phaser from 'phaser'
import _ from 'lodash'
import { useGameStore } from '@/game/game.js'
import { subClue, event } from '../GameObjects/ClueDataStructure'
import EvidencePanel from '../GameObjects/EvidencePanel'

type scopeData = {
  scope: string,
  evidence: [ (subClue|event)? ]
}

type eventData = {
  eventKey: string,
  eventData: { id: string, data: string }
}

const checkAnswer = (answer: { evidences: [ (subClue|event) ], to: string },
  submit_list: [ (subClue|event)? ], loose: boolean): boolean => {
  if (loose) {
    // loose check
    return answer.evidences.find(ele => _.some(submit_list, ele)) ? true : false
  } else {
    return _.includes(submit_list, answer.evidences)
  }
}

export default class InvestigationPlugin extends Phaser.Plugins.ScenePlugin {
  private config: { sceneKey: string, x: number, y: number }
  private verification_config: {
    verificationStart: {
      dialogue_config: { [key: string]: {
        dialogue: [ string|{ line: string, name: string, image: string, event: eventData }|{ question: { line: string, name: string, image: string } } ],
      }
      },
      options?: [ { answer: string, to: string|null } ]
    },
    verificationEvent: {
      verifications: [
        {
          key: string,
          dialogue: [ string|{ line: string, name: string, image: string }|{ question: { line: string, name: string, image: string }} ],
          answer?: { evidences: [ (subClue|event) ], to: string }
        }
      ],
      dialogue_config: { [key: string]: {
        dialogue: [ string|{ line: string, name: string, image: string, event: eventData }|{ question: { line: string, name: string, image: string } } ],
        options?: [ { answer: string, to: string|null } ]
      }
      }
    }
  }
  private evidence_panel: EvidencePanel
  
  constructor(scene: Phaser.Scene, manager: Phaser.Plugins.PluginManager, key: string) {
    super(scene, manager, key)
  }

  destroy() {
    // save scene data to this.game.active_scenes
    super.destroy()
  }

  create() {
    // create verification dialogue when player choose 'yes' from option
    this.scene!.events.on('pass-event-data', (e: { eventKey: string, eventData: {id: string, data: string} }) => {
      const { eventKey, eventData } = e
      
      if (eventKey === 'verification'&&eventData.id === 'verification'&&eventData.data === 'verification-start') {
        // after verification-start dialogue, create verification dialogue
        this.scene!.events.once('end-talking', () => {
          // destroy verification-start dialogue
          this.scene!.sceneload.dialogue.destroyDialogue()
          this.createVerification()
        })
      }
    })

    // verification-fail event
    this.scene!.events.on('verification-fail', () => {
      // destroy current dialogue
      this.scene!.sceneload.dialogue.destroyDialogue()

      // create verification-fail dialogue
      // get zoom
      const zoom = this.scene!.cameras.main.zoom
      this.scene!.sceneload.dialogue.createDialogue(this.config.x, this.config.y, zoom,
        'verification-fail', this.verification_config.verificationEvent.dialogue_config)
      this.scene!.events.emit('start-talking')
    })

    // verification-clear event
    this.scene!.events.on('verification-clear', () => {
      // destroy current dialogue
      this.scene!.sceneload.dialogue.destroyDialogue()

      // create verification-fail dialogue
      // get zoom
      const zoom = this.scene!.cameras.main.zoom
      this.scene!.sceneload.dialogue.createDialogue(this.config.x, this.config.y, zoom,
        'verification-clear', this.verification_config.verificationEvent.dialogue_config)
      this.scene!.events.emit('start-talking')
    })
  }

  startVerification(
    config: { sceneKey: string, x: number, y: number },
    verification_config: {
      verificationStart: {
        dialogue_config: { [key: string]: {
          dialogue: [ string|{ line: string, name: string, image: string, event: eventData }|{ question: { line: string, name: string, image: string } } ],
        }
        },
        options: [ { answer: string, to: string|null } ]
      },
      verificationEvent: {
        verifications: [
          {
            key: string,
            dialogue: [ string|{ line: string, name: string, image: string }|{ question: { line: string, name: string, image: string }} ],
            answer?: { evidences: [ (subClue|event) ], to: string }
          }
        ],
        dialogue_config: { [key: string]: {
          dialogue: [ string|{ line: string, name: string, image: string, event: eventData }|{ question: { line: string, name: string, image: string } } ],
          options?: [ { answer: string, to: string|null } ]
        }
        }
      }
    }
  ) {
    this.config = config
    this.verification_config = verification_config

    // set up config
    // set player.position to given value
    this.scene!.sceneload.player.x = this.config.x ?? this.scene!.sceneload.player.x
    this.scene!.sceneload.player.y = this.config.y ?? this.scene!.sceneload.player.y
    // get zoom
    const zoom = this.scene!.cameras.main.zoom
    // create verification-start dialogue via sceneload-plugin
    this.scene!.sceneload.dialogue.createDialogue(this.config.x, this.config.y, zoom, 'verification-start1',
      this.verification_config.verificationStart.dialogue_config, this.verification_config.verificationStart.options
    )
    this.scene!.events.emit('start-talking')
  }

  createVerification(key?: string) {
    // get p_index
    const p_index = useGameStore().progress.route
    const i_scope: [ scopeData ] = useGameStore().cluenote[p_index].i_scope
    
    // after verification-start dialogue, create first verification dialogue
    const verification: {
        key: string,
        dialogue: [ string|{ line: string, name: string, image: string }|{ question: { line: string, name: string, image: string }} ],
        answer?: { evidences: [ (subClue|event) ], to: string }
      }|undefined
      = key ? this.verification_config.verificationEvent.verifications.find(ele => ele.key === key) :
        this.verification_config.verificationEvent.verifications[0]
    const scope: scopeData|undefined = i_scope.find(ele => ele.scope === verification!.key)
    const answer: { evidences: [ (subClue|event) ], to: string }|undefined = verification!.answer
    
    // get zoom
    const zoom = this.scene!.cameras.main.zoom
    // create verification dialogue via sceneload-plugin
    this.scene!.sceneload.dialogue.createDialogue(this.config.x, this.config.y, zoom, '', verification!.dialogue)
    this.scene!.events.emit('start-talking')
    // create evidence-panel on scene
    this.scene!.events.once('end-of-dialogue', () => {
      this.createEvidencePanel(scope!, answer!)
    })
  }

  createEvidencePanel(scope_data: scopeData, answer: { evidences: [ (subClue|event) ], to: string }) {
    // create evidence panel on scene
    // get zoom
    const zoom = this.scene!.cameras.main.zoom
    this.evidence_panel = new EvidencePanel(this.scene!, { cameraX: this.config.x, cameraY: this.config.y, zoom: zoom }, scope_data)
    this.scene!.sceneload.keyboard.startTalking(false) // set option-pointer to horizontal
    this.evidence_panel.create()

    // submit this.submit_list >> trigger clear/fail dialogue
    this.evidence_panel.on('submit-evidence', (submit_list: [ (subClue|event)? ]) => {
      // destroy evidence-panel
      this.evidence_panel.destroy()
      // destroy current dialogue
      this.scene!.sceneload.dialogue.destroyDialogue()

      // trigger clear/fail dialogue
      if (checkAnswer(answer, submit_list, true)) {
        if (answer.to === 'verification-clear') {
          // verification clear >> trigger clear dialogue
          setTimeout(() => {
            // emit verification-fail event
            this.scene!.events.emit('verification-clear')
          }, 500)
        } else {
          // verification success >> proceed to next verification
          setTimeout(() => {
            this.createVerification(answer.to)
          }, 500)
        }
      } else {
        // verification fail >> trigger fail dialogue
        setTimeout(() => {
          // emit verification-fail event
          this.scene!.events.emit('verification-fail')
        }, 500)
      }
    })
  }
}