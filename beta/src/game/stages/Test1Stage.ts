import Phaser from "phaser"
import Stage from "./Stage.js"
import Test1 from "../scenes/Test1_Scene.js"
import _ from "lodash"

const default_config = {
  player_config: { 'sceneKey': 'Test1' , 'x': 700, 'y': 700 },
  scenes_config: {
    'Test1': {
      npc: { 'test1_inspector': 'clue', 'test1_newspaperstand': 'post_c_repeat' },
      item: []
    }
  }
}

const progress = {
  'cJ89EcZyF5EHwElEGRGZ': {
    sceneKey: 'Test1',
    x: null,
    y: null,
    dialogue: [
      {
        "image": 'sami_smile3',
        "line": "비밀 정보원! 암행어사와 관련된 문제였어."
      },
      {
        "image": 'sami_sus',
        "line": "비밀 정보원..우리나라의 비밀 정보원..?"
      },
      {
        "image": 'sami_smile2',
        "line": "'제국익문사!'"
      },
      {
        "image": 'sami_smile',
        "line": "들은 적이 있어. 겉으로는 일반 신문사지만 비밀 정보기관으로 활동한다고."
      },
      {
        "image": 'sami_smile',
        "line": "제국익문사가 맞다면, 붉은 마패는 제국익문사의 증표가 확실해."
      },
      {
        "image": 'sami_sure2',
        "line": "그 신문팔이한테 한 번 가봐야겠는데."
      }
    ],
    update: {
      inventory: [],
      npc: [ { scene: 'Test1', id: 'test1_newspaperstand', to: 'answer' } ]
    }
}
}

export default class Test1Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ Test1 ], default_config, progress, 'Test1Stage', null)
  }

  event(scene: Phaser.Scene): void {
    // in-game event progress

    // after talking to inspector
    // update player_config
    scene.events.on('update-userconfig', (id: string, to: string, data?: any /* clue|item */) => {
      this.scenes_config['Test1'].npc[id] = to

      if (!data) return

      // update player_config
      if (id == 'test1_inspector'&&to == 'post_c_repeat') {
        // after talking to inspector
        this.game.pause(data, null)
      } else if (id == 'test1_newspaperstand'&&to == 'post_a_repeat') {
        // after getting newspaper item from newspaperstand
        this.game.pause(null, data)
      }
    })

    // after getting newpaper item from newspaperstand
    // update player_config
  }
}