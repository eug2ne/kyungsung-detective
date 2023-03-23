import Phaser from "phaser"
import _ from "lodash"
import { useGameStore } from '../game.js'
import { addClue, addSubClue, addTimeline } from '../library.js'
import Village from '../scenes/Village_Scene.js'
import Test2 from '../scenes/Test2_Scene.js'
import Stage from "./Stage.js"
import Update from "./Update"

const default_config = {
  player_config: { 'sceneKey': 'Test2' , 'x': 570, 'y': 130 },
  scenes_config: {
    'Test2': {
      npc: {
        'test2_suspect1': { dialogueKey: 'question' },
        'test2_suspect2': { dialogueKey: 'question' },
        'test2_suspect3': { dialogueKey: 'question' } 
      },
      item: ['test2_item0', 'test2_item1', 'test2_item2', 'test2_item3']
    }
  }
}

const qevent_config = {
  'start': {
    sceneKey: 'Test2',
    x: null,
    y: null,
    dialogue: [
      {
        image: "inspector_neutral",
        line: "두 번째 시험은 모의 수사다."
      },
      {
        image: "inspector_neutral",
        line: "사건에 대해 설명하겠다. 피해자의 이름은 김철수."
      },
      {
        image: "victim_neutral",
        line: "나이는 29세. 지병 없이 건강하고 건장한 체형이나 오늘 오후 자택에서 숨진채 발견되었다."
      },
      {
        image: "suspect2_neutral",
        line: "피해자를 가장 먼저 발견한 건 자택을 방문한 동생인 김현수."
      },
      {
        image: "inspector_neutral",
        line: "그 외에 사건 전후로 현장에 드나들었던 사람들은,"
      },
      {
        image: "suspect1_neutral",
        line: "오전 중에 피해자를 방문했던 친구, 박유신"
      },
      {
        image: "suspect3_neutral",
        line: "자택에서 일하는 가정부, 안연정이다."
      },
      {
        image: "inspector_neutral",
        line: "방 안을 조사하고 용의자들과 대화하여 사건의 전말을 밝히도록."
      },
      {
        image: "inspector_neutral",
        line: "비록 이 방은 가상의 사건을 재현한 공간이고, 용의자들은 연기자이나 실제 사건처럼 진지하게 임하길 바란다."
      },
      {
        image: "applicant4_neutral",
        line: "훗 이 정도는 너무 쉽군."
      },
      {
        image: "applicant4_neutral",
        line: "범인은 친구인 박유신이다!"
      },
      {
        image: "inspector_neutral",
        line: "근거는?"
      },
      {
        image: "applicant4_neutral",
        line: "뱀눈은 전형적인 범죄자상이지."
      },
      {
        image: "applicant4_neutral",
        line: "거기다 콧대와 콧방울이 얇아 자기 재산도 지키지 못 하는 상이군."
      },
      {
        image: "applicant4_neutral",
        line: "그렇다면 뻔하지. 피해자와 돈 문제 때문에 다투고 홧김에 죽인거야!"
      },
      {
        image: "applicant4_neutral",
        line: "10년간 관상을 봐온 내 경력이 확실히 증명한다!"
      },
      {
        image: "inspector_neutral",
        line: "...."
      },
      {
        image: "sami_neutral",
        line: "...."
      }
    ]
  },
  /* quiz answer '독' */'WIN3vIY76B5ZHa13x70c': {
    sceneKey: 'Test2',
    x: null,
    y: null,
    dialogue: [],
    update: {
      inventory: [],
      npc: []
    }
  },
  /* quiz answer '종이' */'pX9yRghqbck1IMQK80lu': {
    sceneKey: 'Test2',
    x: null,
    y: null,
    dialogue: [],
    update: {
      inventory: [],
      npc: []
    }
  }
}

const event_config = {
  'start': [
    new Update({ data: 'no-clue' }, () => {
      // after quiz-event 'start', acquire clue
      const clue = {
        "title": "살인사건을 해결하라.",
        "description": "탐정시험의 두 번째 문제는 가상의 살인사건을 해결하는 것이다. 용의자들과 대화하고 주변을 관찰하여 사건 해결의 단서를 수집하라.",
        "subClues": {
          0 : [
            {
              "title": "작은 외상",
              "description": "시신 조사 결과, 전신에 사소한 멍과 찰과상이 있다. 하지만 치명적인 외상은 보이지 않는다.",
              "quiz_id": null,
              "reveal": false
            },
            {
              "title": "원인불명의 흔적들",
              "description": "시신 조사 결과, 눈에 핏발이 유독 심하며, 입안이 이상할 정도로 말라있다는 사실을 알아냈다.",
              "quiz_id": null,
              "reveal": false
            }
          ], // autopsy hint
          1 : [], // heritage hint
          2 : [] // account-record hint
        },
        "timeline": { 0:null, 1:null, 2:null, 3:null, 4:null }
      }
      addClue(clue, 1)

      return false
    })
  ]
}

export default class Test2Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ new Test2() ], default_config, event_config, qevent_config, 'Test2Stage', null)
  }

  event(scene: any): void {
    scene.events.once('to-update.subclue.reveal.true', () => {
      // acquire subclue from body >> set subclue.reveal to true + update suspect1 dialogue-key
      useGameStore().$patch((state:any) => {
        // unlock subclue >> set reveal to true
        state.cluenote[1].subClues[0][0].reveal = true
        state.cluenote[1].subClues[0][1].reveal = true
      })
      useGameStore().$patch({ stage: {
        player_config: {...scene.sceneload.config.player_config}
      }})
    })

    scene.events.once('to-update.suspect2.heritage.suspect3.suspect2', () => {
      // update suspect2, suspect3 dialogueKey + add subClue
      // updateDialogueKey('test2_suspect2', scene.sceneload.config.scenes_config['Test2'].npc['test2_suspect2'], '.heritage', scene) // update suspect2 dialogueKey
      // updateDialogueKey('test2_suspect3', scene.sceneload.config.scenes_config['Test2'].npc['test2_suspect2'], '.suspect2', scene) // update suspect3 dialogueKey
      
      // add subClue to cluenote
      addSubClue({
        "title": "유산상속",
        "description": "피해자의 생전에 집안의 거의 모든 재산이 장남인 피해자에게 남겨졌다.",
        "quiz_id": null,
        "reveal": true,
        "clue_ref": "시작.1.subClues.1"
      }, 1, 1)
    })

    scene.events.once('to-update.suspect3.record', () => {
      // update suspect3 dialogueKey + add subClue
      // updateDialogueKey('test2_suspect3', scene.sceneload.scenes_config['Test2'].npc['test2_suspect3'], '.record', scene) // update suspect3 dialogueKey

      // add subClue to cluenote
      addSubClue({
        "title": "가계 장부",
        "description": "가계 장부에 최근 몇 년 간 집안 살림을 축소한 흔적이 있다. 최근 들어서는 사용인 관련 기록이 아예 없다.",
        "quiz_id": null,
        "reveal": true,
        "clue_ref": "시작.1.subClues.2"
      }, 1, 2)
      addSubClue({
        "title": "충성",
        "description": "오래 전 기록부터 안연정의 이름이 남아있었다.",
        "quiz_id": null,
        "reveal": true,
        "clue_ref": "시작.1.subClues.2"
      }, 1, 2)
      addSubClue({
        "title": "임금체불?",
        "description": "안연정은 가계가 기울어지고 월급을 제대로 못 받고있을 가능성이 있다?",
        "quiz_id": "",
        "clue_ref": "시작.1.subClues.2"
      }, 1, 2)
    })

    scene.events.on('update-userconfig', (id: string, dialogueKey: string, data: any /* answer data: string */) => {
      if (id == 'test2_suspect1') {
        // talking to suspect1
        if (dialogueKey == 'question'&&data == 'time') {
          // add timeline data
          addTimeline({
            "title": "헤어짐",
            "description": "박유신은 방문한지 얼마 되지않아 피해자의 집을 떠났다.",
            "subClues": null
          }, 1, 2)
        } else if (data == 'coffee') {
          // add timeline data
          addTimeline({
            "title": "친구의 방문",
            "description": "오전 중에 피해자의 친구 박유신이 방문했다.",
            "subClues": [
              {
                "title": "커피",
                "description": "방문 당시 안연정은 두 사람에게 커피를 대접했다.",
                "quiz_id": null,
                "reveal": true
              },
              {
                "title": "",
                "description": "피해자는 냉커피를, 박유신은 따뜻한 커피를 각각 대접받았다.",
                "quiz_id": null,
                "reveal": true
              }
            ]
          }, 1, 0)
        }
      } else if (id == 'test2_suspect2') {
        // talking to suspect2
        if (dialogueKey == 'question'&&data == 'time') {
          // add timeline data
          addTimeline({
            "title": "김현수의 방문",
            "description": "오후에 김현수가 집을 방문했을 때 피해자는 이미 사망한 뒤였다.",
            "subClues": null
          }, 1, 4)
        }
      } else if (id == 'test2_suspect3') {
        // talking to suspect3
        if (dialogueKey == 'question'&&data == 'time') {
          // update suspect1 dialogueKey + add timeline data
          // updateDialogueKey('test2_suspect1', scene.sceneload.config.scenes_config['Test2'].npc['test2_suspect1'], '.fight', scene) // update suspect1 dialogueKey

          // add timeline data
          addTimeline({
            "title": "친구의 방문",
            "description": "오전 중에 피해자의 친구 박유신이 방문했다.",
            "subClues": [
              {
                "title": "커피",
                "description": "방문 당시 안연정은 두 사람에게 커피를 대접했다.",
                "quiz_id": null,
                "reveal": true
              }
            ]
          }, 1, 0)
          addTimeline({
            "title": "다툼",
            "description": "피해자와 박유신은 서재에서 큰 소리로 싸웠다.",
            "subClues": null
          }, 1, 1)
        }
      }

    })
  }
}