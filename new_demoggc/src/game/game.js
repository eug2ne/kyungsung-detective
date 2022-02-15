import Phaser from 'phaser'
import BootScene from '@/game/scenes/BootScene'
import Test1Scene from '@/game/scenes/Test1Scene'
import VillageScene from '@/game/scenes/VillageScene'

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 2800 / 3,
    height: 1981 / 3,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [BootScene, Test1Scene, VillageScene]
  })
}

export default launch
export { launch }
