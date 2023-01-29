import Phaser from "phaser"
import { useGameStore } from '../game.js'
import Stage from "./Stage.js"
import Test1 from "../scenes/Test1_Scene.js"
import _ from "lodash"

const default_config = {
  player_config: { 'sceneKey': 'Test1' , 'x': 570, 'y': 130 },
  scenes_config: {
    'Test1': {
      npc: { 'test1_inspector': 'clue',
        'test1_newspaperstand': 'post_c_repeat',
        'test1_applicant1': 'post_c_repeat',
        'test1_applicant2': 'post_c_repeat',
        'test1_applicant3': 'post_c_repeat',
        'test1_applicant4': 'post_c_repeat',
        'test1_applicant5': 'post_c_repeat',
      },
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

  event(scene: any): void {
    // in-game event progress

    // after talking to inspector
    // update player_config
    scene.events.on('update-userconfig', (id: string, to: string, data?: any /* clue|item */) => {
      this.scenes_config['Test1'].npc[id] = to

      if (!data) return

      // update player_config
      if (id == 'test1_inspector'&&to == 'post_c_repeat') {
        // after talking to inspector, save clue to gameStore
        useGameStore().$patch({ acquire_clue: data, stage: {player_config: {...scene.sceneload.config.player_config}} })
      } else if (id == 'test1_newspaperstand'&&to == 'post_a_repeat') {
        // after getting newspaper item from newspaperstand
        useGameStore().inventory.push(data)
        useGameStore().$patch({ stage: {player_config: {...scene.sceneload.config.player_config}} })
      } else if (id == 'test1_inspector'&&data == 'test1stage_clear') {
        // after talking to inspector carrying newspaper item >> stage clear
        this.clear()
      }
    })

    // after getting newpaper item from newspaperstand
    // update player_config

    // out_game event progress

    // update newspaperstand dialogue-key
    scene.events.on('progress-event', (progress: any) => {
      useGameStore().$patch({ stage: { scenes_config: { 'Test1': {npc: { 'test1_newspaperstand': 'answer' }} } } })
    })
  }
}