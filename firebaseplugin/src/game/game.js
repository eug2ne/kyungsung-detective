import Phaser from 'phaser'
import FirebasePlugin from './FirebasePlugin'
import Test1_Scene from './scenes/Test1_Scene'
import BootScene from './scenes/BootScene'

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
        debug: false
      }
    },
    scene: {
      preload: preload
    },
    plugins: {
      global: [
        {
          key: 'FirebasePlugin',
          plugin: FirebasePlugin,
          start: true,
          mapping: 'firebase'
        }
      ]
    }
  }

  const game = new Phaser.Game(config)

  async function preload() {
    console.log('preload')
    const firestore = this.plugins.get('FirebasePlugin')

    let PlayScene_Key = await firestore.loadGameData(userId)

    this.scene.add('Test1_Scene', Test1_Scene, false)
    this.scene.add('BootScene', BootScene, true)

    this.scene.switch(PlayScene_Key)
  }

  return game
}

export default launch
export { launch }