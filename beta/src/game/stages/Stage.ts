import Phaser from "phaser"
import Item from "../GameObjects/Item"

interface StageInterface {
  key: string,
  readonly next: Stage|null, /* key of next stage */
  player_config: any,
  scenes: [ Phaser.Scene ] /* [ Scene ] */,
  scenes_config: any /* { scene_key: scene_config } */,
  p_scene: {
    sceneKey: string,
    x: number,
    y: number
  },
  default_config: {
    p_scene: { sceneKey: string, x: number, y: number },
    scenes: any /* { scene_key: scene_config } */
  },
  clear(): Promise<void> /* check stage clear terms */,
  event(scene: Phaser.Scene): void /* handle scene events */
}

export default class Stage extends Phaser.Plugins.BasePlugin implements StageInterface {
  public key: string
  public readonly next: Stage|null
  public item_carry: [ Item? ]
  private _player_config: {
    sceneKey: string,
    x: number,
    y: number,
    item_carry: [ Item? ],
    scene_config: any
  }|null
  public scenes: [ Phaser.Scene ]
  public scenes_config: any /* { scene_key: scene_config, ... } */
  public p_scene: {
    sceneKey: string,
    x: number,
    y: number
  } = { sceneKey: '', x: 0, y: 0}
  public default_config: {
    p_scene: { sceneKey: string, x: number, y: number },
    scenes: any /* { scene_key: scene_config } */
  }

  constructor(manager: Phaser.Plugins.PluginManager,
    scenes: [ Phaser.Scene ],
    default_config: {
      p_scene: { sceneKey: string, x: number, y: number },
      scenes: any /* { scene_key: scene_config } */
    },
    key: string,
    next: Stage|null
  ) {
    super(manager)
    this.scenes = scenes
    this.default_config = default_config
    this.key = key
    this.next = next
  }

  public set player_config(value: any) {
    if (!value||value.key != this.key) {
      // stage_info not existing in user db
      // set default_config as player_config
      const sceneKey = this.default_config.p_scene.sceneKey
      this._player_config = {
        'sceneKey': sceneKey,
        'x': this.default_config.p_scene.x,
        'y': this.default_config.p_scene.y,
        'item_carry': [],
        'scene_config': this.default_config.scenes[sceneKey]
      }
      this.scenes_config = this.default_config.scenes
    } else {
      // set value as player_config
      const sceneKey = value.p_scene.sceneKey
      this._player_config = {
        'sceneKey': sceneKey,
        'x': value.p_scene.x,
        'y': value.p_scene.y,
        'item_carry': value.item_carry,
        'scene_config': value.scenes[sceneKey]
      }
      this.scenes_config = value.scenes
    }
  }

  public get player_config() {
    return this._player_config
  }

  async clear(): Promise<void> {
    if (!this.next) {
      // end of game
    } else {
      // stage clear >> move to next stage
      const firestore: any = this.game.plugins.get('FirebasePlugin')
      
      await firestore.saveGameData(this.next, []) // save next-stage data to db

      this.next.scenes.forEach((scene: any) => {
        console.log(scene.key)
        this.game.scene.add(scene.key, scene, false)
      })

      let PlayScene_Key = this.next.player_config.sceneKey /* present sceneKey */
      this.game.scene.start(PlayScene_Key, this.next.player_config)
      }
  }

  event(scene: Phaser.Scene): void {}
}