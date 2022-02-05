import Phaser from 'phaser'
import BootScene from '@/game/scenes/BootScene'
import PlayScene from '@/game/scenes/PlayScene'
import FirebasePlugin from './FirebasePlugin'

const launch = (containerId) => {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 2800/3,
    height: 1981/3,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0},
        debug: false
      }
    },
    scene: [BootScene, PlayScene],
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
  })
}

export default launch
export { launch }