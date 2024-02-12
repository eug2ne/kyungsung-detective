import Phaser from "phaser"
import _ from "lodash"
import { useGameStore } from '../game.js'
import STAGE_DEFAULT_CONFIG from './config/STAGE_DEFAULT_CONFIG.json' // import default-config
import { Investigation, Clue, subClue, event } from "../GameObjects/ClueDataStructure.js"
import { spliceOption, addInvestigation, addClue, addEvent, addSubClue, updateSubClue } from '../library.js'
import Stage from "./Stage.js"
import Update from "./Update"
import Test2 from '../scenes/Test2_Scene.js'
import Test3Stage from "./Test3Stage"

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
        'line': '이건 탈륨 중독 증상이야!',
        'name': '사미'
      },
      '탈륨은 살충제나 쥐약에 많이 들어가는데다, 무색무취에 물에 잘 녹는 특징이 있지.',
      {
        'image': 'victim_neutral',
        'line': '이제 밝혀내야 할 건 누가 언제, 어떻게 피해자를 중독시켰느냐야.',
        'name': '김철수(고인)'
      }
    ],
    event: { eventKey: 'WIN3vIY76B5ZHa13x70c', eventData: {quiz_id: 'WIN3vIY76B5ZHa13x70c'} }
  },
  /* quiz answer '임금체불' */'tLJfpFrSVAq5O1sGNs8I': {
    sceneKey: 'Test2',
    x: null,
    y: null,
    dialogue: [
      '재정이 어려워지고 나서부터 가계부 관리가 소홀해진 탓에 그 전까지는 꼼꼼하게 기록되었던 사용인 기록도 없어져서 확실하지는 않지만,',
      {
        'image': 'sami_neutral',
        'line': '집 안에 사용인이 안연정 밖에 없는 걸로 봐서 가계가 기우니까 안연정을 제외한 나머지 사용인들을 정리한 건 확실해.',
        'name': '사미'
      },
      {
        'image': 'sami_neutral',
        'line': '..하지만 사용인 기록이 없어진 이유가 관리해야 할 사람이 한 명 밖에 없어서인지,',
        'name': '사미'
      },
      {
        'image': 'sami_neutral',
        'line': '그 한 명조차도 제대로 된 관리를 받지 못 하고 있기 때문인지는 모르지.',
        'name': '사미'
      }
    ],
    event: { eventKey: 'tLJfpFrSVAq5O1sGNs8I', eventData: {quiz_id: 'tLJfpFrSVAq5O1sGNs8I'} }
  },
  /* quiz answer '얼음' */'YPnEQwKAwueWEzSmpRdF': {
    sceneKey: 'Test2',
    x: null,
    y: null,
    dialogue: [
      '!!',
      {
        'image': 'sami_neutral',
        'line': '사건을 해결하는데 필요한 모든 단서를 얻었다.',
        'name': '사미'
      },
      {
        'image': 'sami_neutral',
        'line': '이제 남은 건 사건을 해결하는 것뿐!',
        'name': '사미'
      }
    ],
    event: { eventKey: 'YPnEQwKAwueWEzSmpRdF', eventData: {quiz_id: 'YPnEQwKAwueWEzSmpRdF'} }
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
      const clue:Clue = {
        title: '시신을 조사해보자.',
        description: '책상 옆에 있는 시신을 관찰하여 정보를 얻어보자.',
        index: 0,
        source: { id: 'test2_item0', name: 'body', type: 'Item' },
        subClues: {
          0: {
            title: '작은 외상',
            description: '시신 조사 결과, 전신에 사소한 멍과 찰과상이 있다. 하지만 치명적인 외상은 보이지 않는다.',
            index: 0,
            c_index: 0,
            p_index: 1,
            source: { id: 'test2_item0', name: 'body', type: 'Item'},
            quiz_id: '',
            reveal: false
          },
          1: {
            title: '원인불명의 흔적들',
            description: '시신 조사 결과, 눈에 핏발이 유독 심하며, 입안이 이상할 정도로 말라있다는 사실을 알아냈다.',
            index: 1,
            c_index: 0,
            p_index: 1,
            source: { id: 'test2_item0', name: 'body', type: 'Item'},
            quiz_id: '',
            reveal: false
          }
        },
        related: {
          testimony: [],
          interrogation: []
        },
        img: 'deadbody.png'
      }
      const investigation: Investigation = {
        title: '두번째 탐정시험',
        description: '탐정시험의 두 번째 문제는 가상의 살인사건을 해결하는 것이다. 단서를 모아 사건을 입증해보자.',
        index: 1,
        complete: false,
        i_scope: [ { scope: '사인', evidence: [] }, { scope: '범행 방법', evidence: [] }, { scope: '동기', evidence: [] } ],
        timeline: { 0:null, 1:null, 2:null, 3:null, 4:null },
        clues: {
          0: clue, // autopsy hint
          1: null, // heritage hint
          2: null // account-record hint
        }
      }

      const message = addInvestigation(1, investigation)

      return { clear: false, message: message }
    })
  ],
  'test2-event-timelineUpdate': [
    new Update({id: "test2_suspect1", data: "suspect1-time"}, (stage: any) => {
      // after asking suspect1 about time, update timeline
      const event_1: event = {
        title: "박유신의 방문",
        description: "오전에 친구인 박유신이 돈 문제로 피해자를 방문했다.",
        index: 0,
        subClues: { 0: null },
        source: { type: "NPC", name: "박유신", id: "test2_suspect1" }
      }
      const event_2: event = {
        title: "헤어짐",
        description: "박유신은 방문한지 얼마 되지않아 피해자의 집을 떠났다.",
        index: 2,
        source: { type: "NPC", name: "박유신", id: "test2_suspect1" }
      }
      let message = addEvent(1, event_1, event_2) // add timeline event

      // check timeline complete + suspicion system activate
      const timeline_complete = Object.values(useGameStore().cluenote[1].timeline).length
      if (!stage.event_config['suspicion-system-activate']&&timeline_complete === 5) {
        // if timeline complete + suspicion system activate, add subclue
        const subclue: subClue = {
          title: "얼음",
          description: "범인은 피해자에게 내준 냉커피의 얼음에 탈륨을 섞어 피해자가 얼음이 녹으면서 시간차를 두고 서서히 치사량에 중독되게 만들었다.",
          index: 2,
          c_index: 0,
          p_index: 1,
          quiz_id: "YPnEQwKAwueWEzSmpRdF",
          reveal: false
        }
        message = addSubClue(1, subclue) // add subclue
      }

      return { clear: false, message: message }
    }),
    new Update({id: "test2_suspect2", data: "suspect2-time"}, (stage: any) => {
      // after asking suspect2 about time, update timeline
      const event: event = {
        title: "김현수의 방문",
        description: "오후에 김현수가 집을 방문했을 때 피해자는 이미 사망한 뒤였다.",
        index: 4,
        source: { type: "NPC", name: "김현수", id: "test2_suspect2" }
      }
      let message = addEvent(1, event) // add timeline event

      // check timeline complete + suspicion system activate
      const timeline_complete = Object.values(useGameStore().cluenote[1].timeline).length
      if (!stage.event_config['suspicion-system-activate']&&timeline_complete === 5) {
        // if timeline complete + suspicion system activate, add subclue
        const subclue: subClue = {
          title: "얼음",
          description: "범인은 피해자에게 내준 냉커피의 얼음에 탈륨을 섞어 피해자가 얼음이 녹으면서 시간차를 두고 서서히 치사량에 중독되게 만들었다.",
          index: 2,
          c_index: 0,
          p_index: 1,
          quiz_id: "YPnEQwKAwueWEzSmpRdF",
          reveal: false
        }
        message = addSubClue(1, subclue) // add subclue
      }

      return { clear: false, message: message }
    })
  ],
  'test2-event-heritage': [
    new Update({id: "test2_item1", data: "item1-read"}, () => {
      // after inspecting desk, add clue + update suspect3 dialogueKey
      const clue: Clue = {
        title: "유산상속",
        description: "피해자의 생전에 집안의 거의 모든 재산이 장남인 피해자에게 남겨졌다.",
        index: 1,
        source: { type: "Item", name: "book", id: "test2_item1" },
        subClues: { 0: null, 1: null },
        img: 'deskbook.png'
      }
      const message = addClue(1, clue) // add clue
      
      // update suspect3 dialogueKey
      spliceOption('Test2', 'test2_suspect3', undefined, 'option-suspect2')

      return { clear: false, message: message }
    }),
    new Update({id: "test2_suspect3", data: "suspect3-suspect2"}, () => {
      // after asking suspect3 about suspect2, add subclue + update suspect2 dialogueKey
      const subclue: subClue = {
        title: "주변의 평가와 안타까움",
        description: "주변에서는 김현수의 노력과 능력을 높이 평가하지만, 차남이란 이유만으로 상속권에서 밀려난 걸 안타까워 한다.",
        index: 0,
        c_index: 1,
        p_index: 1,
        source: { type: "NPC", name: "안연정", id: "test2_suspect3" },
        quiz_id: '',
        reveal: true,
      }
      const message = addSubClue(1, subclue) // add subclue
      
      spliceOption('Test2', 'test2_suspect2', undefined, 'option-heritage')

      return { clear: false, message: message }
    }),
    new Update({id: "test2_suspect2", data: "suspect2-heritage"}, () => {
      // after asking suspect2 about heritage, add subclue
      const subclue: subClue = {
        title: "억울함",
        description: "김현수는 능력을 입증한 자신이 아닌 무능한 피해자가 상속권을 가졌다는 사실에 억울해 하지만, 그것 때문에 피해자를 죽일 마음은 없다고 한다. 과연 이 말을 어디까지 믿을 수 있을까?",
        index: 1,
        c_index: 1,
        p_index: 1,
        source: { type: "NPC", name: "김현수", id: "test2_suspect2" },
        quiz_id: '',
        reveal: true,
      }
      const message = addSubClue(1, subclue) // add subclue

      return { clear: false, message: message }
    })
  ],
  /* quiz answer '독' */'WIN3vIY76B5ZHa13x70c': [
    new Update({id: "test2_item0", data: "item0-read"}, () => {
      // after body inspection, reveal autopsy subclues
      useGameStore().$patch((state: any) => {
        state.cluenote[1].clues[0].subClues[0].reveal = true
        state.cluenote[1].clues[0].subClues[1].reveal = true
      }) // update subclue data

      return { clear: false, message: "기존 단서의 정보가 갱신되었습니다." }
    }),
    new Update({id: "test2_suspect3", data: "suspect3-time"}, () => {
      // after asking suspect3 about time, update timeline + suspect1 dialogueKey
      spliceOption('Test2', 'test2_suspect1', undefined, 'option-fight')

      const event_1: event = {
        title: "다툼",
        description: "피해자와 박유신은 서재에서 큰 소리로 싸웠다.",
        index: 1,
        source: { type: "NPC", name: "안연정", id: "test2_suspect3" },
        subClues: { 0: null }
      }
      const event_2: event = {
        title: "혼자 있는 시간",
        description: "박유신이 떠난 뒤 서재에 들어간 사람은 아무도 없다.",
        index: 3,
        source: { type: "NPC", name: "안연정", id: "test2_suspect3" }
      }
      const message = addEvent(1, event_1, event_2) // add timeline data

      return { clear: false, message: message }
    }),
    new Update({id: "test2_suspect1", data: "suspect1-fight"}, () => {
      // after asking suspect1 about fight, add subclue
      const subclue_1: subClue = {
        title: "피로?",
        description: "박유신의 증언에 따르면 피해자는 평소보다 피곤해보였다.",
        index: 0,
        t_index: 1,
        p_index: 1,
        source: { type: "NPC", name: "박유신", id: "test2_suspect1"},
        quiz_id: "",
        reveal: true
      }
      const subclue_2: subClue = {
        title: "탈륨 중독",
        description: "시신의 상태, 평소보다 피곤해보였다는 박유신의 증언으로 미루어보아 피해자는 음독으로 죽었을 가능성이 높다.",
        index: 2,
        c_index: 0,
        p_index: 1,
        quiz_id: "WIN3vIY76B5ZHa13x70c",
        reveal: false
      }
      const message = addSubClue(1, subclue_1, subclue_2) // add subclue

      return { clear: false, message: message }
    }),
    new Update({ quiz_id: "WIN3vIY76B5ZHa13x70c" }, () => {
      // reveal subclue
      useGameStore().$patch((state: any) => {
        state.cluenote[1].clues[0].subClues[2].reveal = true
      })

      return { clear: false, message: "기존 단서의 정보가 갱신되었습니다." }
    })
  ],
  /* quiz answer: '얼음' */'YPnEQwKAwueWEzSmpRdF': [
    new Update({id: "test2_item3", data: "item3-read"}, () => {
      // after inspecting coffeetable, update suspect1 dialogueKey
      spliceOption('Test2', 'test2_suspect1', undefined, 'option-coffee')

      return { clear: false, message: "" }
    }),
    new Update({id: "test2_suspect1", data: "suspect1-coffee"}, (stage: any) => {
      // after asking suspect1 about coffee, add subclue
      const subclue: subClue = {
        title: "커피",
        description: "방문 당시 안연정은 두 사람에게 커피를 대접했다. 피해자는 냉커피를, 박유신은 따뜻한 커피를 각각 대접받았다.",
        index: 0,
        t_index: 0,
        p_index: 1,
        quiz_id: "",
        reveal: true
      }
      let message = addSubClue(1, subclue) // add subclue to timeline-event

      // check timeline complete + suspicion system activate
      const timeline_complete = Object.values(useGameStore().cluenote[1].timeline).length
      if (!stage.event_config['suspicion-system-activate']&&timeline_complete === 5) {
        // if timeline complete + suspicion system activate, add subclue
        const subclue: subClue = {
          title: "얼음",
          description: "범인은 피해자에게 내준 냉커피의 얼음에 탈륨을 섞어 피해자가 얼음이 녹으면서 시간차를 두고 서서히 치사량에 중독되게 만들었다.",
          index: 2,
          c_index: 0,
          p_index: 1,
          quiz_id: "YPnEQwKAwueWEzSmpRdF",
          reveal: false
        }
        message = addSubClue(1, subclue) // add subclue
      }

      return { clear: false, message: message }
    }),
    new Update({ quiz_id: "YPnEQwKAwueWEzSmpRdF" }, () => {
      // reveal subclue
      useGameStore().$patch((state: any) => {
        state.cluenote[1].clues[0].subClues[3].reveal = true
      })

      // after accomplihing quiz >> stage clear
      return { clear: false, message: "기존 단서의 정보가 갱신되었습니다." }
    })
  ],
  /* quiz answer: '임금체불' */'tLJfpFrSVAq5O1sGNs8I': [
    new Update({id: "test2_item2", data: "item2-read"}, () => {
      // after reading account-record from bookshelf, add clue + update suspect3 options
      const clue: Clue = {
        title: "가계 장부",
        description: "최근 몇 년 간 집안 살림을 축소한 흔적과 함께 사용인 기록이 빠지는 등 가계 장부를 제대로 관리하지 못 한 흔적이 보인다.",
        index: 2,
        source: { type: "Item", name: "book", id: "test2_item2" },
        subClues: { 0: null },
        img: 'bookshelf.png'
      }
      const message = addClue(1, clue) // add clue

      // update suspect2, suspect3 options
      spliceOption('Test2', 'test2_suspect2', undefined, 'option-suspect3')
      spliceOption('Test2', 'test2_suspect3', undefined, 'option-record')

      return { clear: false, message: message }
    }),
    new Update({id: "test2_suspect2", data: "suspect2-suspect3"}, () => {
      // after asking suspect2 about suspect3, add subclues
      const subclue_1: subClue = {
        title: "충성",
        description: "안연정은 오랫동안 피해자의 집안에서 일해오며 능력을 인정받았다. 어린 시절부터 같이 지낸 피해자와도 별다른 문제가 없었다.",
        index: 0,
        c_index: 2,
        p_index: 1,
        source: { type: "NPC", name: "김현수", id: "test2_suspect2" },
        quiz_id: '',
        reveal: true
      }
      const subclue_2: subClue = {
        title: "임금체불?",
        description: "안연정은 가계가 기울어지고 월급을 제대로 못 받고있을 가능성이 있다?",
        index: 1,
        c_index: 2,
        p_index: 1,
        quiz_id: "tLJfpFrSVAq5O1sGNs8I",
        reveal: false
      }
      const message = addSubClue(1, subclue_1, subclue_2, 1) // add subclue

      return { clear: false, message: message }
    }),
    new Update({ quiz_id: "tLJfpFrSVAq5O1sGNs8I" }, () => {
      // after accomplishing quiz, reveal subclue + update suspect3 options
      useGameStore().$patch((state: any) => {
        // reveal subclue
        state.cluenote[1].clues[2].subClues[1].reveal = true
      })
      // update suspect3 options
      spliceOption('Test2', 'test2_suspect3', 'option-record', 'option-pay')

      return { clear: false, message: "기존 단서의 정보가 갱신되었습니다." }
    }),
    new Update({id: "test2_suspect3", data: "suspect3-pay"}, (stage: any) => {
      // after asking suspect3 about pay, update subclue + activate suspicion system
      const subclue: subClue = {
        title: "임금체불",
        description: "안연정은 가계가 기울어진 이후로 월급을 제대로 못 받고 있다.",
        index: 1,
        c_index: 2,
        p_index: 1,
        source: { type: "NPC", name: "안연정", id: "test2_suspect3" },
        quiz_id: "tLJfpFrSVAq5O1sGNs8I",
        reveal: true
      }
      const message = updateSubClue(1, subclue) // update subclue

      // activate suspicion system after talking
      stage.game.scene.getScene('Test2').events.once('end-talking', () => {
        useGameStore().$patch({ progress: { id: 'suspicion-system-activate' } })
      })

      return { clear: false, message: message }
    })
  ],
  'suspicion-system-activate': [
    new Update({data: 'activate'}, () => {
      // activate suspicion system + add subclue
      spliceOption('Test2', 'test2_suspect1', undefined, 'option-suspicion')
      spliceOption('Test2', 'test2_suspect2', undefined, 'option-suspicion')
      spliceOption('Test2', 'test2_suspect3', undefined, 'option-suspicion')

      const timeline_complete = Object.values(useGameStore().cluenote[1].timeline).length
      if (timeline_complete === 5) {
        // if timeline complete, add subclue
        const subclue: subClue = {
          title: "얼음",
          description: "범인은 피해자에게 내준 냉커피의 얼음에 탈륨을 섞어 피해자가 얼음이 녹으면서 시간차를 두고 서서히 치사량에 중독되게 만들었다.",
          index: 2,
          c_index: 0,
          p_index: 1,
          quiz_id: "YPnEQwKAwueWEzSmpRdF",
          reveal: false
        }
        const message = addSubClue(1, subclue) // add subclue

        return { clear: false, message: message }
      }
      
      return { clear: false, message: "" }
    })
  ],
  'test2-event-suspicion': [
    new Update({id: "test2_suspect1", data: "suspect1-suspicion.test2_suspect2"}, () => {
      // after suspect1 suspicion, update suspect2 dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2-suspect2'].dialogueKey = 'refusal'
      })

      return { clear: false, message: "" }
    }),
    new Update({id: "test2_suspect2", data: "suspect1-suspicion.test2_suspect1"}, () => {
      // after suspect2 suspicion, update suspect1 dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2-suspect1'].dialogueKey = 'refusal'
      })

      return { clear: false, message: "" }
    }),
    new Update({id: "test2_suspect3", data: "suspect3-suspicion.test2_suspect1"}, () => {
      // after suspect3 suspicion, update suspect1 dialogueKey
      useGameStore().$patch((state: any) => {
        state.stage.scenes_config['Test2'].npc['test2-suspect1'].dialogueKey = 'refusal'
      })
      
      return { clear: false, message: "" }
    })
  ],
  'verification-clear': [
    new Update({id: "verification", data: "verification-clear"}, () => {
      // stage clear
      return { clear: true, message: "" }
    })
  ]
}

export default class Test2Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ new Test2() ], STAGE_DEFAULT_CONFIG['Test2Stage'], event_config, qevent_config, 'Test2Stage', new Test3Stage(manager))
  }
}