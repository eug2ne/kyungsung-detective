import Phaser from 'phaser'
import FirebasePlugin from './FirebasePlugin'
import SceneLoadPlugin from './SceneLoadPlugin'

// import stages
import BreakfastStage from './stages/BreakfastStage'
import Test1Stage from './stages/Test1Stage'

export default class game extends Phaser.Game {
  constructor(containerId) {
    const config = {
      type: Phaser.AUTO,
      width: 2800/3,
      height: 1981/3,
      parent: containerId,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true
        }
      },
      plugins: {
        global: [
          {
            key: 'FirebasePlugin',
            plugin: FirebasePlugin,
            start: true
          }
        ],
        scene: [
          {
            key: 'SceneLoadPlugin',
            plugin: SceneLoadPlugin,
            start: true,
            mapping: 'sceneload'
          }
        ]
      }
    }

    super(config)
    this.key = 'k_detective_beta'
    this.stage_keys = {'BreakfastStage':BreakfastStage, 'Test1Stage':Test1Stage}
    this.stage = new BreakfastStage(this.plugins) // default first stage
  }

  async destroy() {
    // update p_scene config
    const player_config = this.scene.getScene(this.stage.player_config.sceneKey).sceneload.player_config
    this.stage.item_carry = player_config.item_carry
    this.stage.p_scene.sceneKey = player_config.sceneKey
    this.stage.p_scene.x = player_config.x
    this.stage.p_scene.y = player_config.y
    this.stage.scenes_config[player_config.sceneKey] = player_config.scene_config

    const firestore = this.plugins.get('FirebasePlugin')
    // save player_config + inventory to db
    await firestore.saveGameData(this.stage, player_config.inventory, this.key)
    super.destroy()
  }

  async create(update = false /* boolean */) {
    const firestore = this.plugins.get('FirebasePlugin')

    await firestore.loadGameData(this, update)

    this.scene.scenes = []
    this.stage.scenes.forEach((scene) => {
      this.scene.add('', scene, false)
    })
    console.log(this.stage)

    let PlayScene_Key = this.stage.player_config.sceneKey /* present sceneKey */

    // start stage
    this.scene.start(PlayScene_Key, this.stage.player_config)
    this.stage.event(this.scene.getScene(PlayScene_Key))
  }
}
