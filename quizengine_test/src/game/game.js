import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'

function launch(containerId) {
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
    scene: [BootScene, PlayScene]
  })
}

export default launch
export { launch }