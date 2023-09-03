import Phaser from "phaser"
import _ from "lodash"
import { useGameStore } from '../game.js'
import { addInvestigation } from '../library.js'
import { Investigation, Clue } from '../GameObjects/ClueDataStructure'
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
      const clue: Clue = {
        title: '붉은 마패를 찾아라.',
        description:
          '마패란, 관리들이 공무로 지방에 갈 때 나라의 말을 이용할 수 있도록 증표로 쓰던 패이다. 특히, 왕의 임명을 받은 암행어사가 봉서, 사목과 함께 하사받는 물건으로, 암행어사의 신분을 증명하는 중요한 용도로 사용되기도 하였다. 하지만 현재는 암행어사의 역할이 경찰과 탐정에게 넘어가면서 암행어사와 함께 마패도 사라졌다. 지금의 \'붉은 마패\'란 과연 무엇일까?',
        index: 0,
        source: { type: 'NPC', name: '감독관', id: 'test1_inspector' },
        subClues: { 0:
          {
            title: '붉은 마패를 찾았다!',
            description: '붉은 마패는 황실의 직속 비밀정보기관, \'제국익문사\'를 말하는 것이다. \'제국익문사\'의 주 임무는 정부고관과 서울 주재 외국 공관원의 동정, 국사범과 외국인의 간첩행위를 탐지하는 것이지만, 매일 사보를 발간해 국민들이 보도록 하고 국가에 긴요한 서적도 인쇄하는 역할도 표면적으로 맡고 있다. 신문팔이에게 가서 붉은 마패를 달라고 해보자!',
            index: 0,
            c_index: 0,
            p_index: 0,
            quiz_id: 'cJ89EcZyF5EHwElEGRGZ',
            reveal: false,
          }
        },
        related: {
          testimony: [],
          interrogation: [ { type: 'NPC', name: '감독관', id: '' } ]
        }
      }
      const investigation: Investigation = {
        title: '첫번째 탐정시험',
        description: '탐정시험의 첫 번째 문제는 붉은 마패를 찾아오는 것이다. 붉은 마패는 어디 있을까?',
        index: 0,
        complete: false,
        i_scope: null,
        timeline: {},
        clues: { 0: clue }
      }

      const message = addInvestigation(0, investigation)

      // change inspector dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test1Stage'].npc['test1_inspector'].dialogueKey = 'post_c_repeat'
      })

      return { clear: false, message: message }
    }),
    new Update({ quiz_id: 'cJ89EcZyF5EHwElEGRGZ', route: '시작.0.subClues.0' }, () => {
      // after accomplishing quiz, reveal subclue + update newspaperstand dialogue-key
      useGameStore().$patch((state: any) => {
        // reveal subclue
        state.cluenote[0].clues[0].subClues[0].reveal = true

        // update newspaperstand dialogue-key
        state.stage.scenes_config['Test1'].npc['test1_newspaperstand'].dialogueKey = 'answer'
      })

      return { clear: false, message: '기존 단서의 정보가 갱신되었습니다.' }
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

      return { clear: false, message: '「 신문 」 아이템을 획득했습니다.' }
    }),
    new Update({ id: 'test1_inspector', data: 'inspector-clear' }, () => {
      // after talking to inspector carrying newspaper item >> stage clear
      return { clear: true, message: '' }
    })
  ]
}

export default class Test1Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ new Test1() ], default_config, event_config, qevent_config, 'Test1Stage', new Test2Stage(manager))
  }
}