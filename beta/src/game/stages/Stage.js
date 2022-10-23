import Phaser from "phaser"

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
    key /*: string*/,
    next /*: Stage|null*/
  ) {
    super(manager)
    this.scenes = scenes
    this.default_config = default_config
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
      this.item_carry = []
      this.scenes_config = this.default_config.scenes_config
    } else {
      // set value as player_config
      const sceneKey = value.player_config.sceneKey
      this._player_config = {
        'sceneKey': sceneKey,
        'x': value.player_config.x,
        'y': value.player_config.y,
        'item_carry': value.item_carry
      }
      this.item_carry = value.item_carry
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
      await this.game.create(true)
    }
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

  event(scene /*: Phaser.Scene|string (if string, game progress event)*/) {}
}

export default Stage