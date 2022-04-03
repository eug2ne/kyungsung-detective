import Phaser from 'phaser'
import FirebasePlugin from './FirebasePlugin'
import SceneLoadPlugin from './SceneLoadPlugin'
import Test1_Scene from './scenes/Test1_Scene'

const launch = (containerId, userId) => {
  const config = {
    type: Phaser.AUTO,
    width: 2800/3,
    height: 1981/3,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    scene: {
      preload: preload,
      destroy: destroy
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

  const game = new Phaser.Game(config)

  async function preload() {
    const firestore = this.plugins.get('FirebasePlugin')

    let player_config = await firestore.loadGameData(userId)
    let PlayScene_Key = player_config.sceneKey

    this.scene.add('Test1_Scene', Test1_Scene, false)

    this.scene.start(PlayScene_Key, player_config)
  }

  async function destroy(data) {
    console.log('destroy')

  }

  return game
}

export default launch
export { launch }