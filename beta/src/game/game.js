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

  destroy() {
    super.destroy()
  }

  async create(update = false /* update flag */) {
    const firestore = this.plugins.get('FirebasePlugin')

    await firestore.loadGameData(this, update)

    this.scene.scenes = []
    this.stage.scenes.forEach((scene) => {
      this.scene.add('', scene, false)
    })

    let PlayScene_Key = this.stage.player_config.sceneKey /* present sceneKey */

    // start stage
    const config = {
      player_config: this.stage.player_config,
      scenes_config: this.stage.scenes_config,
      item_carry: this.stage.item_carry
    }
    this.scene.getScene(PlayScene_Key).sceneload.config = config
    this.scene.start(PlayScene_Key)
    this.stage.event(this.scene.getScene(PlayScene_Key))
  }

  async pause(clue, item) {
    this.scene.pause() // pause game

    // update stage data
    const config = this.scene.getScene(this.stage.player_config.sceneKey).sceneload.config
    this.stage.player_config = config

    const firestore = this.plugins.get('FirebasePlugin')
    // save player_config + inventory to db
    const stage = {
      'item_carry': this.stage.item_carry,
      'key': this.stage.key,
      'player_config': this.stage.player_config,
      'scenes_config': this.stage.scenes_config
    }
    await firestore.saveGameData(stage, [], this.key, null)

    setTimeout(() => {
      this.scene.resume()
    },)
  }
}
