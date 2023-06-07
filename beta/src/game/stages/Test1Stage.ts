import Phaser from "phaser"
import _ from "lodash"
import { useGameStore } from '../game.js'
import { addClue } from '../library.js'
import Update from "./Update"
import Stage from "./Stage.js"
import Test1 from "../scenes/Test1_Scene.js"
import Test2Stage from "./Test2Stage"

const default_config = {
  player_config: { 'sceneKey': 'Test1' , 'x': 570, 'y': 130 },
  scenes_config: {
    'Test1': {
      npc: { 'test1_inspector': { dialogueKey: 'clue' },
        'test1_newspaperstand': { dialogueKey: 'default' },
        'test1_applicant1': { dialogueKey: 'default' },
        'test1_applicant2': { dialogueKey: 'default' },
        'test1_applicant3': { dialogueKey: 'default' },
        'test1_applicant4': { dialogueKey: 'default' },
        'test1_applicant5': { dialogueKey: 'default' },
      },
      item: {}
    }
  }
}

const qevent_config = {
  'cJ89EcZyF5EHwElEGRGZ': {
    sceneKey: 'Test1',
    x: null,
    y: null,
    dialogue: [
      {
        "image": 'sami_smile3',
        "line": "비밀 정보원! 암행어사와 관련된 문제였어.",
        "name": "사미"
      },
      {
        "image": 'sami_sus',
        "line": "비밀 정보원..우리나라의 비밀 정보원..?",
        "name": "사미"
      },
      {
        "image": 'sami_smile2',
        "line": "'제국익문사!'",
        "name": "사미"
      },
      {
        "image": 'sami_smile',
        "line": "들은 적이 있어. 겉으로는 일반 신문사지만 비밀 정보기관으로 활동한다고.",
        "name": "사미"
      },
      {
        "image": 'sami_smile',
        "line": "제국익문사가 맞다면, 붉은 마패는 제국익문사의 증표가 확실해.",
        "name": "사미"
      },
      {
        "image": 'sami_sure2',
        "line": "그 신문팔이한테 한 번 가봐야겠는데.",
        "name": "사미"
      }
    ],
    event: { eventKey: "cJ89EcZyF5EHwElEGRGZ", eventData: {quiz_id: "cJ89EcZyF5EHwElEGRGZ", route: "시작.0.subClues.0"} }
  }
}

const event_config = {
  'cJ89EcZyF5EHwElEGRGZ': [
    new Update({ id: 'test1_inspector', data: 'inspector-clue' }, () => {
      // after talking to inspector, save clue to gameStore
      const clue = {
        "title": "붉은 마패를 찾아라.",
        "description": "탐정시험의 첫 번째 문제는 붉은 마패를 찾아오는 것이다. 붉은 마패는 어디 있을까?",
        "subClues": {
          0 : [
            {
              "title": "붉은 마패를 찾았다!",
              "description": "붉은 마패는 황실에서 발행하는 신문을 말하는 것이다. 신문팔이에게 가서 붉은 마패를 달라고 해보자!",
              "quiz_id": "cJ89EcZyF5EHwElEGRGZ",
              "clue_ref": "시작.0.subClues.0",
              "reveal": false
            }
          ]
        }
      }
      addClue(clue, 0)

      // update inspector dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test1'].npc['test1_inspector'].dialogueKey = 'post_c_repeat'
      })

      return false
    }),
    new Update({ quiz_id: 'cJ89EcZyF5EHwElEGRGZ', route: '시작.0.subClues.0' }, () => {
      // after accomplishing quiz, reveal subclue + update newspaperstand dialogue-key
      useGameStore().$patch((state: any) => {
        // reveal subclue
        state.cluenote[0].subClues[0][0].reveal = true

        state.stage.scenes_config['Test1'].npc['test1_newspaperstand'].dialogueKey = 'answer'
      })

      return false
    }),
    new Update({ id: 'test1_newspaperstand', data: 'newspaper-get' }, () => {
      // get newspaper item from newspaperstand + update inspector, newspaperstand dialogueKey
      const item = {
        "name": "신문",
        "id": "k_detective_beta.test1_newspaper",
        "descript": "오늘자 제국익문사 신문이자, '붉은 마패'이다",
        "texture": "newspaper.png"
      }
      useGameStore().$patch((state: any) => {
        // add item to inventory
        state.inventory.push(item)

        // update npc dialogueKey
        state.stage.scenes_config['Test1'].npc['test1_inspector'].dialogueKey = 'answer'
        state.stage.scenes_config['Test1'].npc['test1_newspaperstand'].dialogueKey = 'post_a'
      })

      return false
    }),
    new Update({ id: 'test1_inspector', data: 'inspector-clear' }, () => {
      // after talking to inspector carrying newspaper item >> stage clear
      return true
    })
  ]
}

export default class Test1Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ new Test1() ], default_config, event_config, qevent_config, 'Test1Stage', new Test2Stage(manager))
  }
}