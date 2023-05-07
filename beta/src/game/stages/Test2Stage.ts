import Phaser from "phaser"
import _ from "lodash"
import { useGameStore } from '../game.js'
import { addClue, addSubClue, addTimeline } from '../library.js'
import Stage from "./Stage.js"
import Update from "./Update"
import Test2 from '../scenes/Test2_Scene.js'
import Test3Stage from "./Test3Stage"

const default_config = {
  player_config: { 'sceneKey': 'Test2' , 'x': 300, 'y': 500 },
  scenes_config: {
    'Test2': {
      npc: {
        'test2_suspect1': { dialogueKey: 'default-question', options: ['option-default'] },
        'test2_suspect2': { dialogueKey: 'default-question', options: ['option-default'] },
        'test2_suspect3': { dialogueKey: 'default-question', options: ['option-default'] } 
      },
      item: {
        'test2_item0': { interactionKey: 'read' },
        'test2_item1': { interactionKey: 'read' },
        'test2_item2': { interactionKey: 'read' },
        'test2_item3': { interactionKey: 'read' }
      }
    }
  }
}

const qevent_config = {
  /* quiz answer '독' */'WIN3vIY76B5ZHa13x70c': {
    sceneKey: 'Test2',
    x: null,
    y: null,
    dialogue: [
      '치명적인 외상 없음,',
      '핏발 선 눈, 말라있는 입 안',
      {
        'image': 'sami_neutral',
        'line': '이건 탈륨 중독 증상이야!'
      },
      '탈륨은 살충제나 쥐약에 많이 들어가는데다, 무색무취에 물에 잘 녹는 특징이 있지.',
      {
        'image': 'victim_neutral',
        'line': '이제 밝혀내야 할 건 누가 언제, 어떻게 피해자를 중독시켰느냐야.'
      }
    ],
    event: { eventKey: 'WIN3vIY76B5ZHa13x70c', eventData: {quiz_id: 'WIN3vIY76B5ZHa13x70c', route: '1.0.2'} }
  },
  /* quiz answer '임금체불' */'tLJfpFrSVAq5O1sGNs8I': {
    sceneKey: 'Test2',
    x: null,
    y: null,
    dialogue: [
      '재정이 어려워지고 나서부터 가계부 관리가 소홀해진 탓에 그 전까지는 꼼꼼하게 기록되었던 사용인 기록도 없어져서 확실하지는 않지만,',
      {
        'image': 'sami_neutral',
        'line': '집 안에 사용인이 안연정 밖에 없는 걸로 봐서 가계가 기우니까 안연정을 제외한 나머지 사용인들을 정리한 건 확실해.'
      },
      {
        'image': 'sami_neutral',
        'line': '..하지만 사용인 기록이 없어진 이유가 관리해야 할 사람이 한 명 밖에 없어서인지,'
      },
      {
        'image': 'sami_neutral',
        'line': '그 한 명조차도 제대로 된 관리를 받지 못 하고 있기 때문인지는 모르지.'
      }
    ],
    event: { eventKey: 'tLJfpFrSVAq5O1sGNs8I', eventData: {quiz_id: 'tLJfpFrSVAq5O1sGNs8I', route: '1.2.2'} }
  },
  /* quiz answer '얼음' */'YPnEQwKAwueWEzSmpRdF': {
    sceneKey: 'Test2',
    x: null,
    y: null,
    dialogue: [
      '!!',
      {
        'image': 'sami_neutral',
        'line': '사건은 해결됐습니다!'
      },
      {
        'image': 'sami_neutral',
        'line': '범인은 피해자가 마신 냉커피의 얼음에 탈륨을 섞어, 얼음이 녹으면서 피해자가 치사량의 탈륨을 서서히 마시도록 만들었습니다.'
      },
      {
        'image': 'sami_neutral',
        'line': '그래서 피해자는 친구인 박유신이 떠날 때까지는 멀쩡할 수 있었던 겁니다.'
      },
      {
        'image': 'sami_neutral',
        'line': '그리고 이게 가능한 사람은 한 명뿐이죠.'
      },
      {
        'image': 'suspect3_neutral',
        'line': '바로 가정부인 안연정씨!'
      },
      {
        'image': 'suspect3_neutral',
        'line': '안연정씨는 친구인 박유신씨가 방문했을 때 피해자의 커피에 탈륨이 든 얼음을 넣었습니다.'
      },
      {
        'image': 'sami_neutral',
        'line': '얼음이 녹으면서 탈륨이 서서히 커피에 퍼졌기 때문에 피해자가 사망한 건 박유신씨가 떠난 다음이었죠.'
      },
      {
        'image': 'suspect1_neutral',
        'line': '얼음이 다 녹은 뒤에는 탈륨의 출처를 알 수 없으므로 안연정씨는 본인의 알리바이를 확보하는 동시에 박유신씨에게 의심이 가도록 만든 겁니다.'
      },
      {
        'image': 'inspector_neutral',
        'line': '일리있는 설명이군. 그렇다면 안연정의 살해 동기는?'
      },
      {
        'image': 'sami_neutral',
        'line': '안연정은 몇 개월째 임금을 못 받고 있습니다. 그게 살해동기입니다.'
      },
      {
        'image': 'suspect3_neutral',
        'line': '말도 안됩니다! 도련님을 죽인다고 없던 돈이 생겨나는 것도 아닌데 제가 왜 그러겠습니까!'
      },
      {
        'image': 'suspect2_neutral',
        'line': '피해자는 독신이기 때문에 죽으면 동생인 김현수씨에게 재산이 상속됩니다.'
      },
      {
        'image': 'sami_neutral',
        'line': '안연정씨는 집안 재산을 피해자가 아닌 김현수씨가 관리하게 되면 자신이 못 받은 월급을 받을 수 있게 되지않을까 하는 희망 때문에 피해자를 살해한 겁니다.'
      },
      {
        'image': 'suspect3_neutral',
        'line': '윽..'
      },
      {
        'image': 'suspect3_neutral',
        'line': '분하지만 인정할 수 밖에 없군요.'
      },
      {
        'image': 'suspect3_neutral',
        'line': '..맞습니다. 도련님이 가산을 탕진해 월급을 못 받은지도 벌써 몇 달째..'
      },
      {
        'image': 'suspect3_neutral',
        'line': '그간 일한 정이 있어 마지막까지 곁에 있으려 했지만..더이상은 도련님도 정신을 차리실 기미도 안 보이고, 생활도 점점 어려워져서'
      },
      {
        'image': 'suspect3_neutral',
        'line': '그만두겠다 말하면서 도련님께 다른 집으로 가서 일할 수 있도록 추천서를 부탁드렸건만..그마저도 거절하셨습니다.'
      },
      {
        'image': 'suspect3_neutral',
        'line': '오히려 그만두는 순간 자기가 절대 다른 일자리를 찾지 못 하도록 모든 수를 쓸거라고 하시니까 앞이 막막해져서 그만..'
      },
      {
        'image': 'inspector_smile',
        'line': '살해 방법과 살해 동기까지 맞히고, 심지어 범인의 자백까지 얻어내다니. 두 번째 시험도 통과다!'
      },
      {
        'image': 'sami_neutral',
        'line': '좋았어!'
      }
    ],
    event: { eventKey: 'YPnEQwKAwueWEzSmpRdF', eventData: {quiz_id: 'YPnEQwKAwueWEzSmpRdF', route: '1.0.3'} }
  },
  'suspicion-system-activate': {
    sceneKey: 'Test2',
    x: null,
    y: null,
    dialogue: [
      '지금부터 용의자들에게 사건을 "의심"하게 만들 수 있습니다.',
      '용의자가 사건을 "의심"하게 함으로써 사건의 전말에 대한 추가적인 단서를 얻을 수도 있으나,',
      '자칫 잘못 사용하면 용의자의 신뢰를 잃어 진술을 거부하게 만들 수도 있으니',
      '유의해서 사용하시기 바랍니다.'
    ],
    event: { eventKey: 'suspicion-system-activate', eventData: {data: 'activate'} }
  }
}

const event_config = {
  'start': [
    new Update({ data: 'no-clue' }, () => {
      // after start scene for first time, acquire clue
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
        "timelineData": { 
          "timeline": { 0:null, 1:null, 2:null, 3:null, 4:null },
          "complete": 0
        }
      }
      addClue(clue, 1)

      return false
    })
  ],
  'test2-event-timelineUpdate': [
    new Update({id: "test2_suspect1", data: "suspect1-time"}, (stage: any) => {
      // after asking suspect1 about time, update timeline
      const timeline_complete = addTimeline({
        "title": "헤어짐",
        "description": "박유신은 방문한지 얼마 되지않아 피해자의 집을 떠났다.",
        "subClues": null
      }, 1, 2, 0.2) // add timeline data

      // check timeline complete + suspicion system activate
      if (!stage.event_config['suspicion-system-activate']&&timeline_complete === 1) {
        // if timeline complete + suspicion system activate, add subclue
        addSubClue({
          "title": "얼음",
          "description": "범인은 피해자에게 내준 냉커피의 얼음에 탈륨을 섞어 피해자가 얼음이 녹으면서 시간차를 두고 서서히 치사량에 중독되게 만들었다.",
          "quiz_id": "YPnEQwKAwueWEzSmpRdF",
          "reveal": false,
          "clue_ref": "시작.1.subClues.0"
        }, 1, 0) // add subclue data
      }

      return false
    }),
    new Update({id: "test2_suspect2", data: "suspect2-time"}, (stage: any) => {
      // after asking suspect2 about time, update timeline
      const timeline_complete = addTimeline({
        "title": "김현수의 방문",
        "description": "오후에 김현수가 집을 방문했을 때 피해자는 이미 사망한 뒤였다.",
        "subClues": null
      }, 1, 4, 0.2) // add timeline data

      // check timeline complete + suspicion system activate
      if (!stage.event_config['suspicion-system-activate']&&timeline_complete === 1) {
        // if timeline complete + suspicion system activate, add subclue
        addSubClue({
          "title": "얼음",
          "description": "범인은 피해자에게 내준 냉커피의 얼음에 탈륨을 섞어 피해자가 얼음이 녹으면서 시간차를 두고 서서히 치사량에 중독되게 만들었다.",
          "quiz_id": "YPnEQwKAwueWEzSmpRdF",
          "reveal": false,
          "clue_ref": "시작.1.subClues.0"
        }, 1, 0) // add subclue data
      }

      return false
    })
  ],
  'test2-event-heritage': [
    new Update({id: "test2_item1", data: "item1-read"}, () => {
      // after inspecting desk, add subclue + update suspect3 dialogueKey
      addSubClue({
        "title": "유산상속",
        "description": "피해자의 생전에 집안의 거의 모든 재산이 장남인 피해자에게 남겨졌다.",
        "quiz_id": null,
        "reveal": true,
        "clue_ref": "시작.1.subClues.1"
      }, 1, 1) // add subclue data

      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2_suspect3'].options.push('option-suspect2')
      }) // update suspect3 dialogueKey

      return false
    }),
    new Update({id: "test2_suspect3", data: "suspect3-suspect2"}, () => {
      // after asking suspect3 about suspect2, update suspect2 dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2_suspect2'].options.push('option-heritage')
      }) // update suspect2 dialogueKey

      return false
    }),
    new Update({id: "test2_suspect2", data: "suspect2-heritage"}, () => {
      // after asking suspect2 about heritage, add subclue
      addSubClue({
        "title": "억울함",
        "description": "주변의 긍정적인 평가와 본인의 의지에도 불구하고 김현수는 차남이란 이유만으로 상속권에서 밀려났다.",
        "quiz_id": null,
        "reveal": true,
        "clue_ref": "시작.1.subClues.1"
      }, 1, 1) // add subclue data

      return false
    })
  ],
  /* quiz answer '독' */'WIN3vIY76B5ZHa13x70c': [
    new Update({id: "test2_item0", data: "item0-read"}, () => {
      // after body inspection, reveal autopsy subclues
      useGameStore().$patch((state: any) => {
        state.cluenote[1].subClues[0].forEach((subclue: any) => {
          subclue.reveal = true
        })
      }) // update subclue data
      return false
    }),
    new Update({id: "test2_suspect3", data: "suspect3-time"}, () => {
      // after asking suspect3 about time, update timeline + suspect1 dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2_suspect1'].options.push('option-fight')
      }) // update suspect1 dialogueKey
      
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
      }, 1, 0, 0.15)
      addTimeline({
        "title": "다툼",
        "description": "피해자와 박유신은 서재에서 큰 소리로 싸웠다.",
        "subClues": null
      }, 1, 1, 0.1)
      addTimeline({
        "title": "혼자 있는 시간",
        "description": "박유신이 떠난 뒤 서재에 들어간 사람은 아무도 없다.",
        "subClues": null
      }, 1, 3, 0.2) // add timeline data

      return false
    }),
    new Update({id: "test2_suspect1", data: "suspect1-fight"}, () => {
      // after asking suspect1 about fight, update timeline + add subclue-quiz
      addTimeline({
        "title": "다툼",
        "description": "피해자와 박유신은 서재에서 큰 소리로 싸웠다.",
        "subClues": [
          {
            "title": "피로?",
            "description": "박유신의 증언에 따르면 피해자는 평소보다 피곤해보였다.",
            "quiz_id": null,
            "reveal": true
          }
        ]
      }, 1, 1, 0.1) // update timeline data

      addSubClue({
        "title": "중독",
        "description": "시신의 상태, 평소보다 피곤해보였다는 박유신의 증언으로 미루어보아 피해자는 음독으로 죽었을 가능성이 높다.",
        "quiz_id": "WIN3vIY76B5ZHa13x70c",
        "reveal": false,
        "clue_ref": "시작.1.subClues.0"
      }, 1, 0) // add subclue

      return false
    }),
    new Update({quiz_id: "WIN3vIY76B5ZHa13x70c", route: "1.0.2"}, () => {
      // reveal subclue
      useGameStore().$patch((state: any) => {
        state.cluenote[1].subClues[0][2].reveal = true
      })

      return false
    })
  ],
  /* quiz answer: '얼음' */'YPnEQwKAwueWEzSmpRdF': [
    new Update({id: "test2_item3", data: "item3-read"}, () => {
      // after inspecting coffeetable, update suspect1 dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2_suspect1'].options.push('option-coffee')
      }) // update suspect1 dialogueKey

      return false
    }),
    new Update({id: "test2_suspect1", data: "suspect1-coffee"}, (stage: any) => {
      // after asking suspect1 about coffee, update timeline
      const timeline_complete = addTimeline({
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
      }, 1, 0, 0.5) // update timeline data

      // check timeline complete + suspicion system activate
      if (!stage.event_config['suspicion-system-activate']&&timeline_complete === 1) {
        // if timeline complete + suspicion system activate, add subclue
        addSubClue({
          "title": "얼음",
          "description": "범인은 피해자에게 내준 냉커피의 얼음에 탈륨을 섞어 피해자가 얼음이 녹으면서 시간차를 두고 서서히 치사량에 중독되게 만들었다.",
          "quiz_id": "YPnEQwKAwueWEzSmpRdF",
          "reveal": false,
          "clue_ref": "시작.1.subClues.0.3"
        }, 1, 0) // add subclue data
      }

      return false
    }),
    new Update({quiz_id: "YPnEQwKAwueWEzSmpRdF", route: "1.0.3"}, () => {
      // reveal subclue
      useGameStore().$patch((state: any) => {
        state.cluenote[1].subClues[0][3].reveal = true
      })

      // after accomplihing quiz >> stage clear
      return true
    })
  ],
  /* quiz answer: '임금체불' */'tLJfpFrSVAq5O1sGNs8I': [
    new Update({id: "test2_item2", data: "item2-read"}, () => {
      // after reading account-record from bookshelf, add subclues + update suspect3 options
      addSubClue({
        "title": "가계 장부",
        "description": "최근 몇 년 간 집안 살림을 축소한 흔적과 함께 사용인 기록이 빠지는 등 가계 장부를 제대로 관리하지 못 한 흔적이 보인다.",
        "quiz_id": null,
        "reveal": true,
        "clue_ref": "시작.1.subClues.2.0"
      }, 1, 2)
      addSubClue({
        "title": "충성",
        "description": "안연정은 오랫동안 피해자의 집안에서 일해오며 능력을 인정받았다.",
        "quiz_id": null,
        "reveal": true,
        "clue_ref": "시작.1.subClues.2.1"
      }, 1, 2) // add subclues

      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2_suspect3'].options.push('option-record')
        state.stage.scenes_config['Test2'].npc['test2_suspect2'].options.push('option-suspect3')
      }) // update suspect3 options

      return false
    }),
    new Update({id: "test2_suspect2", data: "suspect2-suspect3"}, () => {
      // after asking suspect2 about suspect3, reveal record subclue + add subclue 
      useGameStore().$patch((state: any) => {
        state.cluenote[1].subClues[2][1].reveal = true
      }) // update subclue data
      
      addSubClue({
        "title": "임금체불?",
        "description": "안연정은 가계가 기울어지고 월급을 제대로 못 받고있을 가능성이 있다?",
        "quiz_id": "tLJfpFrSVAq5O1sGNs8I",
        "reveal": false,
        "clue_ref": "시작.1.subClues.2.2"
      }, 1, 2) // add subclue

      return false
    }),
    new Update({quiz_id: "tLJfpFrSVAq5O1sGNs8I", route: "1.2.2"}, () => {
      // after accomplishing quiz, reveal subclue + update suspect3 options
      useGameStore().$patch((state: any) => {
        // reveal subclue
        state.cluenote[1].subClues[2][2].reveal = true

        const i = state.stage.scenes_config['Test2'].npc['test2-suspect3'].options.findIndex('option-record')
        // replace 'option-record' with 'option-pay'
        state.stage.scenes_config['Test2'].npc['test2_suspect3'].options.splice(i,1,'option-pay')
      }) // update suspect3 options

      return false
    }),
    new Update({id: "test2_suspect3", data: "suspect3-pay"}, () => {
      // after asking suspect3 about pay, update subclue + activate suspicion system
      useGameStore().$patch((state: any) => {
        const subclue = {
          "title": "임금체불",
          "description": "안연정은 가계가 기울어진 이후로 월급을 제대로 못 받고 있다.",
          "quiz_id": "tLJfpFrSVAq5O1sGNs8I",
          "reveal": true,
          "clue_ref": "시작.1.subClues.2.2"
        }
        // replace subclue with updated version
        state.cluenote[1].subClues[2].splice(2,1,subclue)
      }) // update subclue

      // activate suspicion system
      useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })

      return false
    })
  ],
  'suspicion-system-activate': [
    new Update({data: 'activate'}, () => {
      // activate suspicion system + add subclue
      useGameStore().$patch((state: any) => {
        // add suspicion option to all NPCs
        state.stage.scenes_config['Test2'].npc['test2-suspect1'].options.push('suspicion.test2_suspect2')
        state.stage.scenes_config['Test2'].npc['test2-suspect2'].options.push('suspicion.test2_suspect1')
        state.stage.scenes_config['Test2'].npc['test2-suspect3'].options.push('suspicion.test2_suspect1')
      })

      // check timeline complete
      if (useGameStore().cluenote[1].timelineData.complete === 1) {
        // if timeline complete, add subclue
        addSubClue({
          "title": "얼음",
          "description": "범인은 피해자에게 내준 냉커피의 얼음에 탈륨을 섞어 피해자가 얼음이 녹으면서 시간차를 두고 서서히 치사량에 중독되게 만들었다.",
          "quiz_id": "YPnEQwKAwueWEzSmpRdF",
          "reveal": false,
          "clue_ref": "시작.1.subClues.0.3"
        }, 1, 0) // add subclue data
      }
      
      return false
    })
  ],
  'test2-event-suspicion': [
    new Update({id: "test2_suspect1", data: "suspect1-suspicion.test2_suspect2"}, () => {
      // after suspect1 suspicion, update suspect2 dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2-suspect2'].dialogueKey = 'refusal'
      })

      return false
    }),
    new Update({id: "test2_suspect2", data: "suspect1-suspicion.test2_suspect1"}, () => {
      // after suspect2 suspicion, update suspect1 dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2-suspect1'].dialogueKey = 'refusal'
      })

      return false
    }),
    new Update({id: "test2_suspect3", data: "suspect3-suspicion.test2_suspect1"}, () => {
      // after suspect3 suspicion, update suspect1 dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2-suspect1'].dialogueKey = 'refusal'
      })
      
      return false
    })
  ]
}

export default class Test2Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ new Test2() ], default_config, event_config, qevent_config, 'Test2Stage', new Test3Stage(manager))
  }
}