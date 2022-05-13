import Phaser from 'phaser'
import FirebasePlugin from './FirebasePlugin'
import SceneLoadPlugin from './SceneLoadPlugin'
import Test1_Scene from './scenes/Test1_Scene'
import Village_Scene from './scenes/Village_Scene'

export default class game extends Phaser.Game {
 constructor(containerId) {
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
 }

 async create(userId) {
  console.log('game create')
  const firestore = this.plugins.get('FirebasePlugin')

  this.player_config = await firestore.loadGameData(userId)
  this.active_scenes = this.player_config.scenes /* connected scenes */

  let PlayScene_Key = this.player_config.p_scene.sceneKey /* present sceneKey */

  this.scene.add('Test1_Scene', Test1_Scene, false)
  this.scene.add('Village_Scene', Village_Scene, false)

  this.scene.start(PlayScene_Key, this.player_config)
 }

 async pause(userId) {
   console.log('game pause')
   // pause all active scenes
   for (scene in this.active_scenes) {
    scene.pause()
   }

   const firestore = this.plugins.get('FirebasePlugin')
   // save player_config to db
   // firestore.saveGameData(userId, this.active_scenes) 
 }
}
