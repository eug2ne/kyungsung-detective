import Phaser from "phaser"
import _ from "lodash"
import { useGameStore } from '../game.js'
import { addClue, addSubClue, addTimeline } from '../library.js'
import Update from "./Update"
import Stage from "./Stage.js"
import Village from "../scenes/Village_Scene.js"

const default_config = {
  player_config: { 'sceneKey': 'Village' , 'x': 570, 'y': 130 },
  scenes_config: {
    'Village': {
      npc: {},
      item: {}
    }
  }
}

const qevent_config = {
  'suspicion-system-activate': {
    sceneKey: 'Village',
    x: null,
    y: null,
    dialogue: [
      '지금부터 용의자들에게 사건을 "의심"하게 만들 수 있습니다.',
    ],
    event: { eventKey: 'suspicion-system-activate', eventData: {data: 'activate'} }
  }
}

const event_config = {
  // pre-suspicion events
  'start': [
    new Update({ data: 'no-clue' }, () => {
      // after start scene for first time, acquire clue
      const clue = {
        title: "00골 아이들 실종 사건",
        description: "00골에서 한 번에 마을 아이들 4명이 사라지는 사건이 발생했다. 해가 떨어지고 있다. 너무 늦기 전에 아이들을 찾아내자!",
        subClues: {
          0 : [], // case hint
          1 : [
            {
              title: "김정숙",
              description: "10세. 여아. 2녀1남 중 막내",
              clue_ref: "시작.2.subClues.1",
              quiz_id: null,
              reveal: true
            }
          ], // missing1 hint
          2 : [
            {
              title: "박선자",
              description: "10세. 여아. 외동",
              clue_ref: "시작.2.subClues.2",
              quiz_id: null,
              reveal: true
            }
          ], // missing2 hint
          3 : [
            {
              title: "이정웅",
              description: "12세. 남아. 2남 중 장남",
              clue_ref: "시작.2.subClues.3",
              quiz_id: null,
              reveal: true
            }
          ], // missing3 hint
          4 : [
            {
              title: "최영길",
              description: "9세. 남아. 외동",
              clue_ref: "시작.2.subClues.4",
              quiz_id: null,
              reveal: true
            }
          ] // missing4 hint
        },
        timelineData: { 
          timeline: { 0:null, 1:null, 2:null, 3:null, 4:null },
          complete: 0
        }
      }
      addClue(clue,2)

      return false
    })
  ],
  'z2Aj8sLVTc5FLNxZQ0Rg': [
    new Update({id: "test3_missing4mom", data: "missing4mom-time"}, () => {
      // after asking missing4mom about time, update timeline + add subClue
      const timeline = _.cloneDeep(useGameStore().cluenote[2].timelineData.timeline[1])

      const subclue = {
        title: "최영길 군",
        description: "몸이 안 좋아서 바로 집안에서 휴식을 취했다.",
        quiz_id: null,
        reveal: true
      }
      if (timeline[1]) {
        // if subclue already in timeline, return
        if (_.some(timeline[1].subClues, subclue)) return false
      } else {
        // create new timeline data
        timeline[1] = {
          title: "13:00 이후",
          description: "아이들은 학교에서 돌아온 이후 각자의 자택으로 돌아갔다.",
          subClues: []
        }
      }

      timeline[1].subClues.push(subclue)
      addTimeline(timeline[1], 2, 1, 0.05) // add timeline data

      // update subclue
      useGameStore().$patch((state: any) => {
        state.cluenote[2].subClues[4][0] = {
          title: "최영길",
          description: "9세. 남아. 외동. 선천적으로 몸이 약하다.",
          clue_ref: "시작.2.subClues.4",
          quiz_id: null,
          reveal: true
        }
      })

      // add subclue
      addSubClue({
        title: "",
        description: "발견 당시 집안에서 덮고있던 담요째로 사라졌다.",
        quiz_id: null,
        clue_ref: "시작.2.subClues.4",
        reveal: true
      }, 2, 4)

      return false
    }),
    new Update({id: "test3_item0", data: "item0-get"}, () => {
      // add item to inventory + update missing4mom dialogueKey
      const item = {
        name: "신발",
        id: "k_detective_beta.test3_shoe",
        descript: "최영길 군 자택 담장 아래에서 떨어져있는 걸 발견했다.",
        texture: "shoe.png"
      }
      useGameStore().$patch((state: any) => {
        // add item to inventory
        state.inventory.push(item)

        // update missing4mom dialogueKey
        state.stage.scenes_config['Test3'].npc['test3_missing4mom'].dialogueKey = 'answer'
      })

      return false
    }),
    new Update({id: "test3_missing4mom", data: "missing4mom-answer"}, () => {
      // add subclue + update missing4mom dialogueKey
      addSubClue({
        title: "떨어진 신발",
        description: "최영길 군이 누워서 휴식하고 있던 방 창문 아래에 본인의 신발이 한 쪽만 떨어져있었다.",
        quiz_id: null,
        clue_ref: "시작.2.subClues.4",
        reveal: true
      }, 2, 4)

      addSubClue({
        title: "꾀병?",
        description: "혹시 최영길 군은 꾀병을 부리고 방 안에 누워있다가 창문으로 나간 것 아닐까?",
        quiz_id: "z2Aj8sLVTc5FLNxZQ0Rg",
        clue_ref: "시작.2.subClues.4",
        reveal: false
      }) // add subclue

      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Village'].npc['test3_missing4mom'].dialogueKey = 'post_c_repeat'
      }) // update missing4mom dialogueKey

      return false
    }),
    new Update({quiz_id: "WIN3vIY76B5ZHa13x70c", route: "시작.2.subClues.4"}, () => {
      // update missing4mom optionKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test3'].npc['test3_missing4mom'].options.push('answer-fake')
      })

      return false
    }),
    new Update({id: "test3_missing4mom", data: "missing4mom-fake"}, () => {
      // disable missing4mom dialogue
      useGameStore().$patch((state: any) => {
        delete state.stage.scenes_config['Test3'].npc['test3_missing4mom']
      })

      return false
    })
  ],
  'test3-event-promise': [
    new Update({id: "test3_missing1bro", data: "missing1bro-time"}, () => {
      // after talking to missing1bro about time, add timeline + add subclue
      const timeline = _.cloneDeep(useGameStore().cluenote[2].timelineData.timeline)

      const subclue = {
        title: "김정숙 양",
        description: "격렬한 요구 끝에 공부를 그만두고 자택을 빠져나왔다.",
        quiz_id: null,
        reveal: true
      }
      if (timeline[2]) {
        // if subclue already in timeline, return
        if (_.some(timeline[2].subClues, subclue)) return false
      } else {
        // create new timeline data
        timeline[2] = {
          title: "15:00",
          description: "아이들의 15:00 가량 목격 정보는 다음과 같다.",
          subClues: []
        }
      }

      timeline[2].subClues.push(subclue)
      addTimeline(timeline[2], 2, 2, 0.1) // add timeline data

      addSubClue({
        title: "약속?",
        description: "김정숙 양은 오빠와의 대화에서 친구들과의 '약속'을 언급했다.",
        clue_ref: "시작.2.subClues.1",
        quiz_id: null,
        reveal: true
      }, 2, 1)

      return false
    }),
    new Update({id: "test3_item1", data: "item1-get"}, () => {
      // add item to inventory + update missing1sis dialogueKey
      const item = {
        name: "더러운 쪽지",
        id: "k_detective_beta.test3_note",
        descript: "마을 뒷쪽 풀숲에서 발견했다. 반쯤 찢겨져있다.",
        texture: "note.png"
      }
      useGameStore().$patch((state: any) => {
        // add item to inventory
        state.inventory.push(item)

        // update missing1sis dialogueKey
        state.stage.scenes_config['Test3'].npc['test3_missing1sis'].dialogueKey = 'answer'
      })

      return false
    }),
    new Update({id: "test3_missing1sis", data: "missing1sis-answer"}, () => {
      // update subclue + update missing1sis dialogueKey
      useGameStore().$patch((state: any) => {
        // update subclue
        const i = state.cluenote[2].subClues[1].findIndex((ele: any) => {
          return ele.title === '약속?'
        })
        state.cluenote[2].subClues[1][i] = {
          title: "약속",
          description: "김정숙 양은 친구들에게 양초를 가져가기로 약속했다.",
          clue_ref: "시작.2.subClues.1",
          quiz_id: null,
          reveal: true
        }

        // updata missing1sis dialogueKey
        state.stage.scenes_config['Village'].npc['test3_missing1sis'].dialogueKey = 'post_c_repeat'
      })

      return false
    })
  ],
  'test3-event-updateTimeline': [
    new Update({id: "test3_police", data: "police-case"}, () => {
      // add subclue
      addSubClue({
        title: "사건 개요",
        description: "신고 접수 시간은 17:00 전후. 마을과 자주 가는 장소들을 수색했지만 아이들의 흔적은 발견되지 않았다. 점심 시간 이후부터 어른들이 마을 입구 쪽 논이나 밭에서 일하고 있었으나 아이들이 나가는 걸 목격한 사람은 없다.",
        clue_ref: "시작.2.subClues.0",
        quiz_id: null,
        reveal: true
      }, 2, 0)
      addSubClue({
        title: "추측",
        description: "아이들이 갈 수 있는 장소는 뒷산 밖에 남지 않는다. 하지만 자주 다니던 길로 간 것 같지는 않다. 그럼 어디로 간거지?",
        clue_ref: "시작.2.subClues.0",
        quiz_id: null,
        reveal: true
      }, 2, 0) // add subclue
      
      return false
    }),
    new Update({id: "test3_villager12", data: "villager12-time"}, (stage: any) => {
      // add timeline + update subclue
      const timeline_complete = addTimeline({
        title: "13:00",
        description: "학교에서 돌아온 아이들이 주민들과 인사를 나눴다.",
        subClues: []
      }, 2, 0, 0.2) // add timeline

      useGameStore().$patch((state: any) => {
        state.cluenote[2].subClues[1][0].description = "10세. 여아. 2녀1남 중 막내. 인근 학교 오전반 재학 중"
        state.cluenote[2].subClues[2][0].description = "10세. 여아. 외동. 인근 학교 오전반 재학 중"
        state.cluenote[2].subClues[3][0].description = "12세. 남아. 2남 중 장남. 인근 학교 오전반 재학 중"
        state.cluenote[2].subClues[4][0].description = "9세. 남아. 외동. 인근 학교 오전반 재학 중"
      }) // update subclue

      if (timeline_complete === 1) {
        // if timeline complete, activate suspicion system after talking
        stage.game.scene.getScene('Village').events.once('end-talking', () => {
          useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
        })
      }
      
      return false
    }),
    new Update({id: "test3_villager34", data: "villager34-time"}, () => {
      // update villager34 optionKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Village'].npc['test3_villager34'].options.push('answer-missing2')
      })

      return false
    }),
    new Update({id: "test3_villager34", data: "villager34-missing2"}, () => {
      // update subclue
      addSubClue({
        title: "소문난 효녀",
        description: "박선자 양은 매일 자발적으로 하교 후 부모님 일을 돕는다.",
        clue_ref: "시작.2.subClues.2",
        quiz_id: null,
        reveal: true
      }, 2, 2)

      return false
    }),
    new Update({id: "test3_missing1mom", data: "missing1mom-time"}, (stage: any) => {
      // add timeline + update missing1mom optionKey
      const timeline = _.cloneDeep(useGameStore().cluenote[2].timelineData.timeline)

      const subclue = {
        title: "김정숙 양",
        description: "대학에서 돌아온 오빠에게 붙잡혀 공부를 시작했다.",
        quiz_id: null,
        reveal: true
      }
      if (timeline[1]) {
        // if subclue already in timeline, return
        if (_.some(timeline[1].subClues, subclue)) return false
      } else {
        // create new timeline data
        timeline[1] = {
          title: "13:00 이후",
          description: "아이들의 13:00 이후 행적은 다음과 같다.",
          subClues: []
        }
      }

      timeline[1].subClues.push(subclue)
      const timeline_complete = addTimeline(timeline[1], 2, 1, 0.05) // add timeline data

      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Village'].npc['test3_misssing2mom'].options.push('answer-friendship')
      }) // update missing1mom optionKey

      if (timeline_complete === 1) {
        // if timeline complete, activate suspicion system after talking
        stage.game.scene.getScene('Village').events.once('end-talking', () => {
          useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
        })
      }

      return false
    }),
    new Update({id: "test3_missing2mom", data: "missing2mom-friendship"}, () => {
      // add subclue
      addSubClue({
        title: "의자매",
        description: "김정숙 양과 박선자 양은 평소 우정이 두터운 친우 사이로, 며칠 전 서로 의자매를 맺었다.",
        quiz_id: null,
        clue_ref: "시작.2.subClues.2",
        reveal: true
      }, 2, 2) // add subclue

      return false
    }),
    new Update({id: "test3_missing1sis", data: "missing1sis-time"}, (stage: any) => {
      // add timeline
      const timeline_complete = addTimeline({
        title: "15:15 가량",
        description: "김정숙 양이 자택 부엌에 있는 모습이 친언니에 의해 목격되었다.",
        subClues: []
      }, 2, 3, 0.2)

      if (timeline_complete === 1) {
        // if timeline complete, activate suspicion system after talking
        stage.game.scene.getScene('Village').events.once('end-talking', () => {
          useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
        })
      }

      return false
    }),
    new Update({id: "test3_missing2mom", data: "missing2mom-time"}, (stage: any) => {
      // add timeline
      const timeline = _.cloneDeep(useGameStore().cluenote[2].timelineData.timeline)

      const subclue1 = {
        title: "박선자 양",
        description: "부모를 도와 논에서 일을 했다.",
        quiz_id: null,
        reveal: true
      }
      const subclue2 = {
        title: "박선자 양",
        description: "논에서 일을 하던 중 급하게 집으로 돌아갔다.",
        quiz_id: null,
        reveal: true
      }
      if (timeline[1]) {
        // if subclue already in timeline, return
        if (_.some(timeline[1].subClues, subclue1)) return false
      } else {
        // create new timeline data
        timeline[1] = {
          title: "13:00 이후",
          description: "아이들의 13:00 이후 행적은 다음과 같다.",
          subClues: []
        }
      }
      if (timeline[2]) {
        // if subclue already in timeline, return
        if (_.some(timeline[1].subClues, subclue1)) return false
      } else {
        // create new timeline data
        timeline[2] = {
          title: "15:00",
          description: "아이들의 15:00 가량 목격 정보는 다음과 같다.",
          subClues: []
        }
      }

      timeline[1].subClues.push(subclue1)
      timeline[2].subClues.push(subclue2)
      addTimeline(timeline[1], 2, 1, 0.05)
      const timeline_complete = addTimeline(timeline[2], 2, 2, 0.1) // add timeline data

      if (timeline_complete === 1) {
        // if timeline complete, activate suspicion system after talking
        stage.game.scene.getScene('Village').events.once('end-talking', () => {
          useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
        })
      }

      return false
    }),
    new Update({id: "test3_missing3mom", data: "missing3mom-time"}, (stage: any) => {
      // add timeline
      const timeline = _.cloneDeep(useGameStore().cluenote[2].timelineData.timeline)

      const subclue = {
        title: "이정웅 군",
        description: "집에서 동생을 돌보았다.",
        quiz_id: null,
        reveal: true
      }
      if (timeline[1]) {
        // if subclue already in timeline, return
        if (_.some(timeline[1].subClues, subclue)) return false
      } else {
        // create new timeline data
        timeline[1] = {
          title: "13:00 이후",
          description: "아이들의 13:00 이후 행적은 다음과 같다.",
          subClues: []
        }
      }

      timeline[1].subClues.push(subclue)
      addTimeline(timeline[1], 2, 1, 0.05)

      const timeline_complete = addTimeline({
        title: "16:00",
        description: "이정웅 군 동생이 형이 없어졌다고 집에서 뛰쳐나왔다. 이후 다른 아이들도 없어졌다는 것이 차례차례 확인되었다.",
        subClues: []
      }, 2, 4, 0.2)
      if (timeline_complete === 1) {
        // if timeline complete, activate suspicion system after talking
        stage.game.scene.getScene('Village').events.once('end-talking', () => {
          useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
        })
      }

      return false
    }),
    new Update({id: "test3_missing3bro", data: "missing3bro-time"}, () => {
      // update missing3bro optionKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Village'].npc['test3_missing3bro'].options.push('answer-play')
      })

      return false
    }),
    new Update({id: "test3_missing3bro", data: "missing3bro-play"}, () => {
      // add subclue
      addSubClue({
        title: "술래잡기",
        description: "이정웅 군은 동생과 숨바꼭질 놀이를 하며 동생을 일부러 떼어놓으려 했다.",
        quiz_id: null,
        clue_ref: "시작.2.subClues.3",
        reveal: true
      }, 2, 3)

      return false
    })
  ], // suspicion system activated after timeline complete
  'suspicion-system-activate': [
    new Update({data: 'activate'}, () => {
      // activate suspicion system
      useGameStore().$patch((state: any) => {
        // add suspicion option to all NPCs
        Object.values(state.stage.scenes_config['Village'].npc).forEach((dconfig: any) => {
          dconfig.options.push('suspicion')
        })
      })

      return false
    })
  ],
  // post-suspicion events
  'test3-event-tales': [
    new Update({id: "test3_missing3bro", data: "missing3bro-suspicion"}, () => {
      // add subclue + update villager12, police optionKey
      addSubClue({
        title: "산 속 괴물?",
        description: "이정웅 군의 동생은 산 속 괴물을 언급했다. 과연 괴물의 정체는 무엇일까?",
        quiz_id: null,
        clue_ref: "시작.2.subClues.0",
        reveal: true
      }, 2, 0) // add subclue

      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Village'].npc['test3_villager12'].options.splice(-1, 0, 'answer-tales')
        state.stage.scenes_config['Village'].npc['test3_police'].options.splice(-1, 0, 'answer-tales')
      }) // update villager12, police optionKey

      return false
    }),
    new Update({id: "test3_villager12", data: "villager12-tales"}, () => {
      // update subclue
      useGameStore().$patch((state: any) => {
        const i = state.cluenote[2].subClues[0].findIndex((ele: any) => {
          return ele.title === '산 속 괴물?'
        })
        state.cluenote[2].subClues[0][i] = {
          title: "괴담",
          description: "이 마을에서는 아이들이 늦은 시간에 산에 오르지 않게 겁주기 위해 대대로 산 속 괴물에 대한 괴담이 대대로 구전되었다.",
          quiz_id: null,
          clue_ref: "시작.2.subClues.0",
          reveal: true
        }
      })

      return false
    })
  ],
  'test3-event-kidnap': [
    new Update({id: "test3_missing4mom", data: "missing4mom-suspicion"}, () => {
      // add subclue + update police optionKey
      addSubClue({
        title: "인신매매?",
        description: "인근에서 인신매매단이 활동한다는 소문이 있다.",
        quiz_id: null,
        clue_ref: "시작.2.subClues.5",
        reveal: true
      }, 2, 5)

      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Village'].npc['test3_police'].options.splice(-1, 0, 'kidnap')
      }) // update police optionKey

      return false
    }),
    new Update({id: "test3_police", data: "police-kidnap"}, () => {
      // update subclue
      useGameStore().$patch((state: any) => {
        state.cluenote[2].subClues[5][0] = {
          title: "인신매매",
          description: "정황상 인신매매단에 대한 이야기는 소문으로만 쳐도 될 것 같다.",
          quiz_id: null,
          clue_ref: "시작.2.subClues.5",
          reveal: true
        }
      })

      return false
    })
  ],
  '5pSYFHRok3Es4xw6XWcC': [
    new Update({id: "test3_police", data: "police-suspicion"}, () => {
      // add subclue
      addSubClue({
        title: "자발적 실종?",
        description: "아이들이 납치나 사고에 의해 사라진 게 아닌 스스로 사라졌을 가능성이 있다?",
        quiz_id: null,
        clue_ref: "시작.2.subClues.0",
        reveal: true
      }, 2, 0)

      addSubClue({
        title: "탐험",
        description: "아이들은 자기들만의 탐험을 떠난 것이다.",
        quiz_id: "5pSYFHRok3Es4xw6XWcC",
        clue_ref: "시작.2.subClues.0",
        reveal: false
      })

      return false
    }),
    new Update({quiz_id: "WIN3vIY76B5ZHa13x70c", route: "시작.2.subClues.0"}, () => {
      // update missing2mom optionKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Village'].npc['test3_missing2mom'].options.splice(-1, 0, 'answer-adventure')
      })

      return false
    }),
    new Update({id: "test3_missing2mom", data: "missing2mom-adventure"}, () => {
      // update subclue + update missing1sis optionKey
      useGameStore().$patch((state: any) => {
        // update subclue
        const i = state.cluenote[2].subClues[2].findIndex((ele: any) => {
          return ele.title === '의자매'
        })
        state.cluenote[2].subClues[2][i] = {
          title: "의자매",
          description: "김정숙 양과 박선자 양은 평소 우정이 두터운 친우 사이로, 며칠 전 '탐험'을 떠나기 전에 서로 의자매를 맺었다.",
          quiz_id: null,
          clue_ref: "시작.2.subClues.2",
          reveal: true
        }

        // update missing1sis optionKey
        state.stage.scenes_config['Village'].npc['test3_missing1sis'].options.splice(-1, 0, 'answer-adventure')
      })

      return false
    }),
    new Update({id: "test3_missing1sis", data: "missing1sis-adventure"}, () => {
      // add subclue + update inspector optionKey
      addSubClue({
        title: "동굴",
        description: "며칠 전 새로운 동굴이 산에서 발견되었다. 아이들은 호기심으로 그곳에 간 게 틀림없다. 빨리 이 사실을 알리자!",
        quiz_id: null,
        clue_ref: "시작.2.subClues.0",
        reveal: true
      }, 2, 0) // add subclue

      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Village'].npc['test3_inspector'].options.splice(1, 1, 'answer-solve')
      }) // update inspector optionKey

      return false
    }),
    new Update({id: "test3_inspector", data: "inspector-solve"}, (stage: any) => {
      // stage clear
      return true
    })
  ]
}

export default class Test3Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ new Village() ], default_config, event_config, qevent_config, 'Test3Stage', null)
  }

  clear() {
    // emit game-clear event in scene
    const scene = this.game.scene.getScene('Village')
    scene.events.emit('game-clear')
  }
}