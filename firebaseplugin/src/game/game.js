import Phaser from 'phaser'
import FirebasePlugin from './FirebasePlugin'
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
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create
    }
    // plugins: {
    //   global: [
    //     {
    //       key: 'FirebasePlugin',
    //       plugin: FirebasePlugin,
    //       start: true,
    //       mapping: 'firebase'
    //     }
    //   ]
    // }
  }

  let game = new Phaser.Game(config)

  function preload() {
    console.log('preload')
  }

  function create() {
    console.log('create')
    game.plugins.install('FirestorePlugin', FirebasePlugin, true, 'firestore')
  }

  return game
}

export default launch
export { launch }