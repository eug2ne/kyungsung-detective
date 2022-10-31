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

const progress_dial = {
  'cJ89EcZyF5EHwElEGRGZ': [
    {
      "image": null,
      "line": "비밀 정보원! 암행어사와 관련된 문제였어."
    },
    {
      "image": null,
      "line": "비밀 정보원..우리나라의 비밀 정보원..?"
    },
    {
      "image": null,
      "line": "'제국익문사!'"
    },
    {
      "image": null,
      "line": "들은 적이 있어. 겉으로는 일반 신문사지만 비밀 정보기관으로 활동한다고."
    },
    {
      "image": null,
      "line": "제국익문사가 맞다면, 붉은 마패는 제국익문사의 증표가 확실해."
    },
    {
      "image": null,
      "line": "그 신문팔이한테 한 번 가봐야겠는데."
    }
  ]
}

export default class Test1Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ Test1 ], default_config, 'Test1Stage', null)
  }

  event(scene: Phaser.Scene, progress: string|null): void {
    if (progress) {
      // outer-game event progress

      // emit progress-dialogue event
      scene.events.emit('progress-event', progress_dial[progress as keyof typeof progress_dial])

      this.scenes_config['Test1'].npc['test1_newspaperstand'] = 'answer'
      this.game.pause() // save game progress
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