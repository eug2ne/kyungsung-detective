import Phaser from 'phaser'
import FirebasePlugin from './FirebasePlugin'
import SceneLoadPlugin from './SceneLoadPlugin'

// import stages
import BreakfastStage from './stages/BreakfastStage'

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
    this.stage = new BreakfastStage
  }

  async destroy() {
    // update p_scene config
    const { config, x, y, inventory } = this.scene.getScene(this.player_config.p_scene.sceneKey).sceneload.scene_config
    this.player_config.p_scene.x = x
    this.player_config.p_scene.y = y
    this.active_scenes[this.player_config.p_scene.sceneKey] = config

    const firestore = this.plugins.get('FirebasePlugin')
    // save player_config + inventory to db
    firestore.saveGameData(this.player_config, inventory)
    super.destroy()
  }

  async create() {
    const firestore = this.plugins.get('FirebasePlugin')

    await firestore.loadGameData(this.stage)

    this.stage.scenes.forEach((scene) => {
      this.scene.add(scene.key, scene, false)
    })

    let PlayScene_Key = this.stage.player_config.p_scene.sceneKey /* present sceneKey */
    this.scene.start(PlayScene_Key, this.scene.player_config)
  }
}
