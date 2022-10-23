import Phaser from "phaser"
import Stage from "./Stage.js"
import Test1 from '../scenes/Test1_Scene.js'
import _ from "lodash"

const default_config = {
  'player_config': { 'sceneKey': 'Test1' , 'x': 700, 'y': 700 },
  'scenes_config': {
    'Test1': {
      'npc': { 'test1_inspector': 'clue', 'test1_newspaperstand': 'post_c_repeat' },
      'item': []
    }
  }
}

const event_dial = {}

export default class Test1Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ Test1 ], default_config, 'Test1Stage', null)
  }

  event(scene: Phaser.Scene|string): void {
    if (typeof scene == 'string') {
      console.log(scene)
      // outer-game event progress

      this.scenes_config['Test1'].npc['test1_newspaperstand'] = 'answer'
    } else {
      // in-game event progress

      // after talking to inspector
      // update player_config
      scene.events.on('update-userconfig', (id: string, to: string, clue?: {story: string, title: string, description: string, subClues: any}) => {
        this.scenes_config['Test1'].npc[id] = to

        if (!clue) return

        // upload clue to user db + save progress
        this.pause(clue, null)
      })
    }
  }
}