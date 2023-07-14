import Phaser from "phaser"
import _ from 'lodash'
import { useGameStore } from '../game.js'

class Stage extends Phaser.Plugins.BasePlugin /*implements StageInterface*/ {
  // public key: string
  // public readonly next: Stage|null
  // public item_carry: [ Item? ]
  // private _player_config: {
  //   sceneKey: string,
  //   x: number,
  //   y: number
  // }|null
  // public scenes: [ Phaser.Scene ]
  // public scenes_config: any /* { scene_key: scene_config, ... } */
  // public default_config: {
  //   player_config: { sceneKey: string, x: number, y: number },
  //   scenes_config: any /* { scene_key: scene_config } */
  // }
  // public event_config: any /* { eventKey: [{ Update }] } */
  // public q_event_config: any /* { quiz_id: { /* quiz-event config */ } } */

  constructor(manager /*: Phaser.Plugins.PluginManager*/,
    scenes /*: [ Phaser.Scene ]*/,
    default_config, //: {
    //   player_config: { sceneKey: string, x: number, y: number },
    //   scenes_config: any /* { scene_key: scene_config } */
    // },
    event_config, // : {
    //   eventKey: [ { Update } ], ...
    // },
    qevent_config, // : {
    //   quiz_id: { /* quiz-event config */}
    // }
    key /*: string*/,
    next /*: Stage|null*/
  ) {
    super(manager)
    this.scenes = scenes
    this.default_config = default_config
    this.event_config = event_config
    this.qevent_config = qevent_config
    this.key = key
    this.next = next
  }

  set player_config(value /*: any*/) {
    if (!value) {
      // stage_info not existing in user db
      // set default_config as player_config
      const sceneKey = this.default_config.player_config.sceneKey
      this._player_config = {
        'sceneKey': sceneKey,
        'x': this.default_config.player_config.x,
        'y': this.default_config.player_config.y
      }
      this.scenes_config = _.cloneDeep(this.default_config.scenes_config)
    } else {
      // set value as player_config
      const sceneKey = value.player_config.sceneKey
      this._player_config = {
        'sceneKey': sceneKey,
        'x': value.player_config.x,
        'y': value.player_config.y
      }
      this.scenes_config = value.scenes_config
    }
  }

  get player_config() {
    return this._player_config
  }

  clear() {
    if (!this.next) {
      // end of game
    } else {
      // stage clear >> move to next stage
      useGameStore().$patch({
        stage: {
          key: this.next.key,
          player_config: this.next.default_config.player_config,
          scenes_config: { ...this.next.default_config.scenes_config }
        }
      })
      this.game.create()
    }
  }

  preload() {
    console.log('stage preload')
    // add stage.scenes to game.scene
    this.scenes.forEach((scene, index) => {
      const sceneKey = Object.keys(this.default_config.scenes_config)[index]
      if (!this.game.scene.getScene(sceneKey)) this.game.scene.add(sceneKey, scene, false)
    })
  }

  // inner-game event progress
  mapEvent(scene /*: Phaser.Scene */) {
    scene.events.on('pass-event-data', (e) => {
      const { eventKey, eventData } = e

      // search for eventKey in event_config
      const event = this.event_config[eventKey]

      if (!event) return

      // check NPC/Item state
      const i = event.findIndex((u) => {
        return _.isEqual(u.condition, eventData)
      }) // update happen in non-linear order within event
      if (i === -1) return

      // run update
      const clear = event[i].update(this)

      if (clear) {
        // if stage-clear condition fulfilled, run stage.clear()
        scene.events.once('end-talking', () => {
          this.clear()
        }) // run stage.clear() after dialogue|interaction
      } else {
        // update player_config
        useGameStore().$patch({
          stage: { player_config: { ...scene.sceneload.config.player_config } }
        })

        // delete update from event_map
        event.splice(i,1)

        if (event.length === 0) {
          // if all update from event is over, delete event from event_config
          delete this.event_config[eventKey]
        }
      }
    })
  }

  // outer-game event progress (quiz-progress)
  quizEvent(id /* : string */) {
    // get qevent-scene
    const p_scene = this.game.scene.getScene(this.qevent_config[id].sceneKey)
    if (this.qevent_config[id].sceneKey != this.player_config.sceneKey) {
      // pause current-scene >> start progress-scene
      const c_scene = this.game.scene.getScene(this.player_config.sceneKey)
      this.game.scene.pause(c_scene) // pause current-scene
      this.game.scene.bringToTop(p_scene) // render progress-scene on top
      
      // emit progress-event + pass progress-config
      p_scene.events.emit('quiz-event', id, this.qevent_config)

      // after progress-event, resume to current-scene
      this.game.scene.stop(p_scene)
      this.game.scene.bringToTop(c_scene)
      this.game.scene.resume(c_scene)
    } else {
      // start progress-event on current-scene
      p_scene.events.emit('quiz-event', id, this.qevent_config)
    }
  }
}

export default Stage