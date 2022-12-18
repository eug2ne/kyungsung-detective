import Phaser from "phaser"
import _ from 'lodash'

// interface StageInterface {
//   key: string,
//   readonly next: Stage|null, /* key of next stage */
//   player_config: any,
//   scenes: [ Phaser.Scene ] /* [ Scene ] */,
//   scenes_config: any /* { scene_key: scene_config } */,
//   default_config: {
//     player_cofig: { sceneKey: string, x: number, y: number },
//     scenes_config: any /* { scene_key: scene_config } */
//   },
//   clear(): Promise<void> /* check stage clear terms */,
//   event(scene: Phaser.Scene): void /* handle scene events */
// }

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

  constructor(manager /*: Phaser.Plugins.PluginManager*/,
    scenes /*: [ Phaser.Scene ]*/,
    default_config, //: {
    //   player_config: { sceneKey: string, x: number, y: number },
    //   scenes_config: any /* { scene_key: scene_config } */
    // },
    progress,
    key /*: string*/,
    next /*: Stage|null*/
  ) {
    super(manager)
    this.scenes = scenes
    this.default_config = default_config
    this.progress = progress
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
      this.scenes_config = this.default_config.scenes_config
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

  async clear() {
    if (!this.next) {
      // end of game
    } else {
      // stage clear >> move to next stage
      this.game.stage = this.next
      await this.game.preload()
    }
  }

  preload() {
    // add stage.scenes to game.scene
    this.scenes.forEach((scene, index) => {
      const sceneKey = Object.keys(this.scenes_config)[index+1] // because store patches data (original data is left in state)
      this.game.scene.add(sceneKey, scene, false)
    })
  }

  pause(clue /* Clue */, item /* Item */) {
    if (item) {
      // remove item.id from scenes_config
      const remove_i = scenes_config[this.player_config.sceneKey].item.indexOf(item?.id)
      scenes_config[this.player_config.sceneKey].item.splice(remove_i, 1)
      item?.destroy() // destroy item from scene
    }
    this.game.pause(clue, item) // upload clue to user db + save progress
  }

  // in-game event progress
  event(scene /*: Phaser.Scene */, progress /*: string|null */) {}

  // pass item-config to player-config
  itemCarry(carry_item /* [ Item? ] */) {
    this.item_carry = carry_item
  }

  // outer-game event progress
  progressEvent(id /*: string */) {
    // get progress-scene
    const p_scene = this.game.scene.getScene(this.progress[id].sceneKey)
    if (this.progress[id].sceneKey != this.player_config.sceneKey) {
      // pause current-scene >> start progress-scene
      const c_scene = this.game.scene.getScene(this.player_config.sceneKey)
      this.game.scene.pause(c_scene) // pause current-scene
      this.game.scene.bringToTop(p_scene) // render progress-scene on top
      p_scene.events.emit('progress-event', this.progress[id]) // emit progress-event + pass progress-config

      // after dialogue-event, update scenes_config + save to dB
      p_scene.events.on('end-talking', () => {
        const update = this.progress[id].update
        // update inventory
        
        // update npc-config
        for (const n of update.npc) {
          this.scenes_config[n.scene].npc[n.id] = n.to
        }
        this.game.pause()
      })

      // after progress-event, resume to current-scene
      this.game.scene.stop(p_scene)
      this.game.scene.bringToTop(c_scene)
      this.game.scene.resume(c_scene)
    } else {
      // start progress-event on current-scene
      p_scene.events.emit('progress-event', this.progress[id])
    }
  }
}

export default Stage