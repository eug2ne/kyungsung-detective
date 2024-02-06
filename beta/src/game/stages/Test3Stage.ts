import Phaser from "phaser"
import _ from "lodash"
import { useGameStore } from '../game.js'
import { Investigation, Clue, subClue, event } from "../GameObjects/ClueDataStructure.js"
import { spliceOption, addInvestigation, addClue, addEvent, addSubClue, updateSubClue } from '../library.js'
import Update from "./Update"
import Stage from "./Stage.js"
import Village from "../scenes/Village_Scene.js"

const default_config = {
  player_config: { 'sceneKey': 'Village' , 'x': 1600, 'y': 1900 },
  scenes_config: {
    'Village': {
      npc: {
        'test3_missing1mom': { dialogueKey: 'default-question', options: ['option-time'] },
        'test3_missing1bro': { dialogueKey: 'default-question', options: ['option-time'] },
        'test3_missing1sis': { dialogueKey: 'default-question', options: ['option-time'] },
        'test3_missing2mom': { dialogueKey: 'default-question', options: ['option-time'] },
        'test3_missing3mom': { dialogueKey: 'default-question', options: ['option-time'] },
        'test3_missing3bro': { dialogueKey: 'default-question', options: ['option-time'] },
        'test3_missing4mom': { dialogueKey: 'default-question', options: ['option-time'] },
        'test3_villager12': { dialogueKey: 'default-question', options: ['option-time'] },
        'test3_villager34': { dialogueKey: 'default-question', options: ['option-time'] },
        'test3_police': { dialogueKey: 'default-question', options: ['option-time'] },
        'test3_inspector': { dialogueKey: 'default-question', options: ['option-time'] },
      },
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
      // after start scene for first time, acquire investigation
      const investigation: Investigation = {
        title: "00골 아이들 실종 사건",
        description: "00골에서 한 번에 마을 아이들 4명이 사라지는 사건이 발생했다. 너무 늦기 전에 아이들을 찾아내자!",
        index: 2,
        complete: false,
        i_scope: [ { scope: '사인', evidence: [] }, { scope: '범행 방법', evidence: [] }, { scope: '동기', evidence: [] } ],
        timeline: { 0:null, 1:null, 2:null, 3:null, 4:null },
        clues: {
          0 : null, // case hint
          1 : {
            title: "김정숙",
            description: "10세. 여아. 2녀1남 중 막내.",
            index: 1,
            subClues: {
              0: null,
              1: null
            },
            related: {
              testimony: [],
              interrogation: []
            },
            img: 'missing1_neutral.png'
          }, // missing1 hint
          2 : {
            title: "박선자",
            description: "10세. 여아. 외동.",
            index: 2,
            subClues: {
              0: null
            },
            related: {
              testimony: [],
              interrogation: []
            },
            img: 'missing2_neutral.png'
          }, // missing2 hint
          3 : {
            title: "이정웅",
            description: "12세. 남아. 2남 중 장남.",
            index: 3,
            subClues: {
              0: null
            },
            related: {
              testimony: [],
              interrogation: []
            },
            img: 'missing3_neutral.png'
          }, // missing3 hint
          4 : {
            title: "최영길",
            description: "9세. 남아. 외동.",
            index: 4,
            subClues: {
              0: null,
              1: null,
              2: null
            },
            related: {
              testimony: [],
              interrogation: []
            },
            img: 'missing4_neutral.png'
          } // missing4 hint
        }
      }

      const message = addInvestigation(2,investigation)

      return { clear: false, message: message }
    })
  ],
  'z2Aj8sLVTc5FLNxZQ0Rg': [
    new Update({id: "test3_missing4mom", data: "missing4mom-time"}, () => {
      // after asking missing4mom about time, update timeline + add subClue
      const e_subclue: subClue = {
        title: "최영길 군",
        description: "몸이 안 좋아서 바로 집안에서 휴식을 취했다.",
        index: 0,
        t_index: 4,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      if (!useGameStore().cluenote[2].timeline[1]) {
        // add event to timeline
        const event: event = {
          title: "13:00 이후",
          description: "아이들은 학교에서 돌아온 이후 각자의 자택으로 돌아갔다.",
          index: 1,
          subClues: { 0: null, 1: null, 2: null, 3: e_subclue }
        }
        addEvent(2, event)
      } else {
        // only add subclue
        addSubClue(2, e_subclue)
      }

      // update clue + add subclue
      useGameStore().$patch((state: any) => {
        state.cluenote[2].clues[4].description += " 선천적으로 몸이 약하다."
      })
      const subclue: subClue = {
        title: "",
        description: "발견 당시 집안에서 덮고있던 담요째로 사라졌다.",
        index: 0,
        c_index: 4,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = addSubClue(2, subclue)

      return { clear: false, message: message }
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

      return { clear: false, message: "「 신발 」 아이템을 획득했습니다." }
    }),
    new Update({id: "test3_missing4mom", data: "missing4mom-answer"}, () => {
      // add subclue + update missing4mom dialogueKey
      const subclue_1: subClue = {
        title: "떨어진 신발",
        description: "최영길 군이 누워서 휴식하고 있던 방 창문 아래에 본인의 신발이 한 쪽만 떨어져있었다.",
        index: 1,
        c_index: 4,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const subclue_2: subClue = {
        title: "꾀병?",
        description: "혹시 최영길 군은 꾀병을 부리고 방 안에 누워있다가 창문으로 나간 것 아닐까?",
        index: 2,
        c_index: 4,
        p_index: 2,
        quiz_id: "z2Aj8sLVTc5FLNxZQ0Rg",
        reveal: false
      }
      const message = addSubClue(2, subclue_1, subclue_2)

      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Village'].npc['test3_missing4mom'].dialogueKey = 'post_c_repeat'
      }) // update missing4mom dialogueKey

      return { clear: false, message: message }
    }),
    new Update({quiz_id: "z2Aj8sLVTc5FLNxZQ0Rg"}, () => {
      // update missing4mom optionKey
      spliceOption('Test3', 'test3_missingmom4', undefined, 'option-fake')

      return { clear: false, message: "" }
    }),
    new Update({id: "test3_missing4mom", data: "missing4mom-fake"}, () => {
      // disable missing4mom dialogue
      useGameStore().$patch((state: any) => {
        delete state.stage.scenes_config['Test3'].npc['test3_missing4mom']
      })

      return { clear: false, message: "" }
    })
  ],
  'test3-event-promise': [
    new Update({id: "test3_missing1bro", data: "missing1bro-time"}, () => {
      // after talking to missing1bro about time, add timeline + add subclue
      const e_subclue: subClue = {
        title: "김정숙 양",
        description: "격렬한 요구 끝에 공부를 그만두고 자택을 빠져나왔다.",
        index: 1,
        t_index: 2,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      if (!useGameStore().cluenote[2].timeline[2]) {
        // add event + subclue
        const event: event = {
          title: "15:00",
          description: "아이들의 15:00 가량 목격 정보는 다음과 같다.",
          index: 2,
          subClues: { 0: e_subclue, 1: null }
        }
        addEvent(2, event)
      } else {
        // only add subclue
        addSubClue(2, e_subclue)
      }

      // add subclue
      const subclue: subClue = {
        title: "약속?",
        description: "김정숙 양은 오빠와의 대화에서 친구들과의 '약속'을 언급했다.",
        index: 0,
        c_index: 1,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = addSubClue(2, subclue)

      return { clear: false, message: message }
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

      return { clear: false, message: "「 더러운 쪽지 」 아이템을 획득했습니다." }
    }),
    new Update({id: "test3_missing1sis", data: "missing1sis-answer"}, () => {
      // update subclue + update missing1sis dialogueKey
      const subclue: subClue = {
        title: "약속",
        description: "김정숙 양은 친구들에게 양초를 가져가기로 약속했다.",
        index: 0,
        c_index: 1,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = updateSubClue(2, subclue)

      useGameStore().$patch((state: any) => {
        // update missing1sis dialogueKey
        state.stage.scenes_config['Village'].npc['test3_missing1sis'].dialogueKey = 'post_c_repeat'
      })

      return { clear: false, message: message }
    })
  ],
  'test3-event-updateTimeline': [
    new Update({id: "test3_police", data: "police-case"}, () => {
      // add event + clue + subclue
      const subclue: subClue = {
        title: "추측",
        description: "아이들이 갈 수 있는 장소는 뒷산 밖에 남지 않는다. 하지만 자주 다니던 길로 간 것 같지는 않다. 그럼 어디로 간거지?",
        index: 0,
        c_index: 0,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const clue: Clue = {
        title: "사건 개요",
        description: "신고 접수 시간은 17:00 전후. 마을과 자주 가는 장소들을 수색했지만 아이들의 흔적은 발견되지 않았다. 점심 시간 이후부터 어른들이 마을 입구 쪽 논이나 밭에서 일하고 있었으나 아이들이 나가는 걸 목격한 사람은 없다.",
        index: 0,
        subClues: { 0: subclue }
      }

      const message = addClue(2, clue)
      
      return { clear: false, message: message }
    }),
    new Update({id: "test3_villager12", data: "villager12-time"}, (stage: any) => {
      // add event + update clue
      const event: event = {
        title: "13:00",
        description: "학교에서 돌아온 아이들이 주민들과 인사를 나눴다.",
        index: 0
      }
      let message = addEvent(2, event)

      useGameStore().$patch((state: any) => {
        state.cluenote[2].clues[1].description += " 인근 학교 오전반 재학 중."
        state.cluenote[2].clues[2].description += " 인근 학교 오전반 재학 중."
        state.cluenote[2].clues[3].description += " 인근 학교 오전반 재학 중."
        state.cluenote[2].clues[4].description += " 인근 학교 오전반 재학 중."
      }) // update subclue

      const timeline_complete = Object.values(useGameStore().cluenote[1].timeline).length
      if (timeline_complete === 5) {
        // if timeline complete, activate suspicion system after talking
        stage.game.scene.getScene('Village').events.once('end-talking', () => {
          useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
        })
        message = ""
      }
      
      return { clear: false, message: message }
    }),
    new Update({id: "test3_villager34", data: "villager34-time"}, () => {
      // update villager34 optionKey
      spliceOption('Test3', 'test3_villager34', undefined, 'option-missing2')

      return { clear: false, message: "" }
    }),
    new Update({id: "test3_villager34", data: "villager34-missing2"}, () => {
      // add subclue
      const subclue: subClue = {
        title: "소문난 효녀",
        description: "박선자 양은 매일 자발적으로 하교 후 부모님 일을 돕는다.",
        index: 0,
        c_index: 2,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = addSubClue(2, subclue)

      return { clear: false, message: message }
    }),
    new Update({id: "test3_missing1mom", data: "missing1mom-time"}, (stage: any) => {
      // add timeline + update missing1mom optionKey
      const e_subclue: subClue = {
        title: "김정숙 양",
        description: "대학에서 돌아온 오빠에게 붙잡혀 공부를 시작했다.",
        index: 0,
        t_index: 1,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      let message = ""
      if (!useGameStore().cluenote[2].timeline[1]) {
        // add event + subclue
        const event: event = {
          title: "13:00 이후",
          description: "아이들은 학교에서 돌아온 이후 각자의 자택으로 돌아갔다.",
          index: 1,
          subClues: { 0: e_subclue, 1: null, 2: null, 3: null }
        }
        message = addEvent(2, event)
      } else {
        // only add subclue
        message = addSubClue(2, e_subclue)
      }

      // update missing1mom optionKey
      spliceOption('Test3', 'test3_missing1mom', undefined, 'option-friendship')

      const timeline_complete = Object.values(useGameStore().cluenote[1].timeline).length
      if (timeline_complete === 5) {
        // if timeline complete, activate suspicion system after talking
        stage.game.scene.getScene('Village').events.once('end-talking', () => {
          useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
        })
        message = ""
      }

      return { clear: false, message: message }
    }),
    new Update({id: "test3_missing2mom", data: "missing2mom-friendship"}, () => {
      // add subclue
      const subclue: subClue = {
        title: "의자매",
        description: "김정숙 양과 박선자 양은 평소 우정이 두터운 친우 사이로, 며칠 전 서로 의자매를 맺었다.",
        index: 1,
        c_index: 1,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = addSubClue(2, subclue)

      return { clear: false, message: message }
    }),
    new Update({id: "test3_missing1sis", data: "missing1sis-time"}, (stage: any) => {
      // add event
      const event: event = {
        title: "15:15 가량",
        description: "김정숙 양이 자택 부엌에 있는 모습이 친언니에 의해 목격되었다.",
        index: 3
      }
      const message = addEvent(2, event)

      const timeline_complete = Object.values(useGameStore().cluenote[1].timeline).length
      if (timeline_complete === 5) {
        // if timeline complete, activate suspicion system after talking
        stage.game.scene.getScene('Village').events.once('end-talking', () => {
          useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
        })
      }

      return { clear: false, message: message }
    }),
    new Update({id: "test3_missing2mom", data: "missing2mom-time"}, (stage: any) => {
      // add event to timeline
      const e_subclue1: subClue = {
        title: "박선자 양",
        description: "부모를 도와 논에서 일을 했다.",
        index: 1,
        t_index: 1,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      if (!useGameStore().cluenote[2].timeline[1]) {
        // add event + subclue
        const event_1: event = {
          title: "13:00 이후",
          description: "아이들은 학교에서 돌아온 이후 각자의 자택으로 돌아갔다.",
          index: 1,
          subClues: { 0: null, 1: e_subclue1, 2: null, 3: null }
        }
        addEvent(2, event_1)
      } else {
        // only add subclue
        addSubClue(2, e_subclue1)
      }

      const e_subclue2: subClue = {
        title: "박선자 양",
        description: "논에서 일을 하던 중 급하게 집으로 돌아갔다.",
        index: 1,
        t_index: 2,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      let message = ""
      if (!useGameStore().cluenote[2].timeline[2]) {
        // add event + subclue
        const event_2: event = {
          title: "15:00",
          description: "아이들의 15:00 가량 목격 정보는 다음과 같다.",
          index: 2,
          subClues: { 0: null, 1: e_subclue2 }
        }
        message = addEvent(2, event_2)
      } else {
        // only add subclue
        message = addSubClue(2, e_subclue2)
      }

      const timeline_complete = Object.values(useGameStore().cluenote[1].timeline).length
      if (timeline_complete === 5) {
        // if timeline complete, activate suspicion system after talking
        stage.game.scene.getScene('Village').events.once('end-talking', () => {
          useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
        })
      }

      return { clear: false, message: message }
    }),
    new Update({id: "test3_missing3mom", data: "missing3mom-time"}, (stage: any) => {
      // add event to timeline
      const e_subclue: subClue = {
        title: "이정웅 군",
        description: "집에서 동생을 돌보았다.",
        index: 2,
        t_index: 1,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      let message = ""
      if (!useGameStore().cluenote[2].timeline[1]) {
        // add event + subclue
        const event: event = {
          title: "13:00 이후",
          description: "아이들은 학교에서 돌아온 이후 각자의 자택으로 돌아갔다.",
          index: 1,
          subClues: { 0: null, 1: null, 2: e_subclue, 3: null }
        }
        message = addEvent(2, event)
      } else {
        // only add subclue
        message = addSubClue(2, e_subclue)
      }

      const timeline_complete = Object.values(useGameStore().cluenote[1].timeline).length
      if (timeline_complete === 5) {
        // if timeline complete, activate suspicion system after talking
        stage.game.scene.getScene('Village').events.once('end-talking', () => {
          useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
        })
      }

      return { clear: false, message: message }
    }),
    new Update({id: "test3_missing3bro", data: "missing3bro-time"}, () => {
      // update missing3bro optionKey
      spliceOption('Village', 'test3_missing3bro', undefined, 'option-play')

      return { clear: false, message: "" }
    }),
    new Update({id: "test3_missing3bro", data: "missing3bro-play"}, () => {
      // add subclue
      const subclue: subClue = {
        title: "술래잡기",
        description: "이정웅 군은 동생과 숨바꼭질 놀이를 하며 동생을 일부러 떼어놓으려 했다.",
        index: 0,
        c_index: 3,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = addSubClue(2, subclue)

      return { clear: false, message: message }
    })
  ], // suspicion system activated after timeline complete
  'suspicion-system-activate': [
    new Update({data: 'activate'}, () => {
      // activate suspicion system
      spliceOption('Village', 'test3_missing1mom', undefined, 'suspicion')
      spliceOption('Village', 'test3_missing1bro', undefined, 'suspicion')
      spliceOption('Village', 'test3_missing1sis', undefined, 'suspicion')
      spliceOption('Village', 'test3_missing2mom', undefined, 'suspicion')
      spliceOption('Village', 'test3_missing3mom', undefined, 'suspicion')
      spliceOption('Village', 'test3_missing3bro', undefined, 'suspicion')
      spliceOption('Village', 'test3_missing4mom', undefined, 'suspicion')
      spliceOption('Village', 'test3_villager12', undefined, 'suspicion')
      spliceOption('Village', 'test3_villager34', undefined, 'suspicion')
      spliceOption('Village', 'test3_police', undefined, 'suspicion')

      return { clear: false, message: "" }
    })
  ],
  // post-suspicion events
  'test3-event-tales': [
    new Update({id: "test3_missing3bro", data: "missing3bro-suspicion"}, () => {
      // add subclue + update villager12, police optionKey
      const subclue: subClue = {
        title: "산 속 괴물?",
        description: "이정웅 군의 동생은 산 속 괴물을 언급했다. 과연 괴물의 정체는 무엇일까?",
        index: 1,
        c_index: 0,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = addSubClue(2, subclue)

      // update villager12, police optionKey
      spliceOption('Village', 'test3_villager12', undefined, 'option-tales')
      spliceOption('Village', 'test3_police', undefined, 'option-tales')

      return { clear: false, message: message }
    }),
    new Update({id: "test3_villager12", data: "villager12-tales"}, () => {
      // update subclue
      const subclue: subClue = {
        title: "괴담",
          description: "이 마을에서는 아이들이 늦은 시간에 산에 오르지 않게 겁주기 위해 대대로 산 속 괴물에 대한 괴담이 대대로 구전되었다.",
          index: 1,
          c_index: 0,
          p_index: 2,
          quiz_id: "",
          reveal: true
      }
      const message = updateSubClue(2, subclue)

      return { clear: false, message: message }
    })
  ],
  'test3-event-kidnap': [
    new Update({id: "test3_missing4mom", data: "missing4mom-suspicion"}, () => {
      // add subclue + update police optionKey
      const subclue: subClue = {
        title: "인신매매?",
        description: "인근에서 인신매매단이 활동한다는 소문이 있다.",
        index: 4,
        c_index: 0,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = addSubClue(2, subclue)

      // update police optionKey
      spliceOption('Village', 'test3_police', undefined, 'option-kidnap')

      return { clear: false, message: message }
    }),
    new Update({id: "test3_police", data: "police-kidnap"}, () => {
      // update subclue
      const subclue: subClue = {
        title: "인신매매",
        description: "정황상 인신매매단에 대한 이야기는 소문으로만 쳐도 될 것 같다.",
        index: 4,
        c_index: 0,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = updateSubClue(2, subclue)

      return { clear: false, message: message }
    })
  ],
  '5pSYFHRok3Es4xw6XWcC': [
    new Update({id: "test3_police", data: "police-suspicion"}, () => {
      // add subclue
      const subclue_1: subClue = {
        title: "자발적 실종?",
        description: "아이들이 납치나 사고에 의해 사라진 게 아닌 스스로 사라졌을 가능성이 있다?",
        index: 2,
        c_index: 0,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const subclue_2: subClue = {
        title: "탐험",
        description: "아이들은 자기들만의 탐험을 떠난 것이다.",
        index: 3,
        c_index: 0,
        p_index: 2,
        quiz_id: "5pSYFHRok3Es4xw6XWcC",
        reveal: false
      }

      const message = addSubClue(2, subclue_1, subclue_2)

      return { clear: false, message: message }
    }),
    new Update({quiz_id: "5pSYFHRok3Es4xw6XWcC"}, () => {
      // update missing2mom optionKey
      spliceOption('Village', 'test3_missing2mom', undefined, 'option-adventure')

      return { clear: false, message: "" }
    }),
    new Update({id: "test3_missing2mom", data: "missing2mom-adventure"}, () => {
      // update subclue + update missing1sis optionKey
      const subclue: subClue = {
        title: "의자매",
        description: "김정숙 양과 박선자 양은 평소 우정이 두터운 친우 사이로, 며칠 전 '탐험'을 떠나기 전에 서로 의자매를 맺었다.",
        index: 1,
        c_index: 1,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = updateSubClue(2, subclue)

      // update missing1sis optionKey
      spliceOption('Village', 'test3_missing1sis', undefined, 'option-adventure')

      return { clear: false, message: message }
    }),
    new Update({id: "test3_missing1sis", data: "missing1sis-adventure"}, () => {
      // add subclue + update inspector optionKey
      const subclue: subClue = {
        title: "동굴",
        description: "며칠 전 새로운 동굴이 산에서 발견되었다. 아이들은 호기심으로 그곳에 간 게 틀림없다. 빨리 이 사실을 알리자!",
        index: 4,
        c_index: 0,
        p_index: 2,
        quiz_id: "",
        reveal: true
      }
      const message = addSubClue(2, subclue)

      // update inspector optionKey

      return { clear: false, message: message }
    }),
    new Update({id: "test3_inspector", data: "inspector-solve"}, (stage: any) => {
      // stage clear
      return { clear: true }
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