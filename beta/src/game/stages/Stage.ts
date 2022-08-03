import Phaser from "phaser"

interface StageInterface {
  key: string,
  player_config: any,
  scenes: [ Phaser.Scene ] /* [ Scene ] */,
  scenes_config: any /* { scene_key: scene_config } */,
  default_config: {
    p_scene: { sceneKey: string, x: number, y: number },
    scenes: any /* { scene_key: scene_config } */
  },
  clear(): void /* check stage clear terms */,
  event(): void /* handle scene events */
}

export default class Stage implements StageInterface {
  public key: string
  private _player_config: any
  public scenes: [ Phaser.Scene ]
  public scenes_config: any
  public default_config: {
    p_scene: { sceneKey: string, x: number, y: number },
    scenes: any /* { scene_key: scene_config } */
  }

  constructor(scenes: [ Phaser.Scene ]
    , default_config: {
      p_scene: { sceneKey: string, x: number, y: number },
      scenes: any /* { scene_key: scene_config } */
    },
    key: string
  ) {
    this.scenes = scenes
    this.default_config = default_config
    this.key = key
  }

  public set player_config(value: any) {
    if (!value||value.key == this.key) {
      // stage_info not existing in user db
      // set default_config as player_config.scene_config
      this._player_config = {
        'item_carry': [],
        'p_scene': this.default_config.p_scene,
        'scenes': this.default_config.scenes
      }
    } else {
      // set value as player_config
      this._player_config = value
    }
  }

  public get player_config() {
    return this._player_config
  }

  clear(): void {}

  event(): void {}
}