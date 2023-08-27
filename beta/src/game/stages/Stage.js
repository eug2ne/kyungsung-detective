import Phaser from "phaser"
import _ from 'lodash'
import { useGameStore } from '../game.js'

const VER_CONFIG = { sceneKey: "Test2", x: 880, y: 1000 }
const VER_DIALOGUE_CONFIG = {
  verificationStart: {
    dialogue_config: {
      "verification-start1": {
        dialogue: [
          {
            "line": "사건 증명을 시작하면 '사인', '범행 방법', '동기'를 차례로 증명하게 될 것이다.",
            "image": "inspector_neutral",
            "name": "감독관"
          },
          {
            "line": "각 단계에서 자네가 지금까지 모아온 증거들이 화면에 표시될 걸세. 방향키와 Enter / Space 버튼을 이용해 증명에 필요한 단서들을 모두 선택한 뒤 하단의 '증거 제출' 버튼을 클릭하면 되네.",
            "image": "inspector_neutral",
            "name": "감독관"
          },
          {
            "line": "예를 들어, '사인'을 증명할 때는 자네가 '사인'에 대한 증거로 따로 모아놓은 최대 5개까지의 증거가 나타날 걸세. 그 중에서 '사인'을 증명하는데 필요한 증거를 선택하여 '증거 제출' 할 수 있네.",
            "image": "inspector_neutral",
            "name": "감독관"
          },
          {
            "line": "각 단계에서 증명에 필요한 단서의 개수는 모두 다르고, 미리 알 수도 없어. 즉, 자네가 모은 5개의 단서 안에 증명에 필요한 모든 단서가 있어야 하네.",
            "image": "inspector_neutral",
            "name": "감독관"
          },
          {
            "line": "증명에 필요한 모든 단서를 제출하여 증명에 성공해야 다음 단계로 넘어갈 수 있어. 만약 실패한다면 처음부터 사건 증명을 다시 시작하네.",
            "image": "inspector_neutral",
            "name": "감독관"
          },
          {
            "question": {
              "line": "그럼, 사건을 증명할 준비가 다 되었는가?",
              "image": "inspector_neutral",
              "name": "감독관"
            }
          }
        ]
      },
      "verification-start2": {
        dialogue: [
          {
            line: "좋다. 그럼 사건 입증을 시작하겠다!",
            image: "inspector_neutral",
            name: "감독관"
          }
        ],
        event: { eventKey: "verification", eventData: {id: "verification", data: "verification-start"} }
      }
    },
    options: [
      {
        answer: "예",
        to: "verification-start2"
      },
      {
        answer: "아니요",
        to: null
      }
    ]
  },
  verificationEvent: {
    verifications: [
      {
        key: "사인",
        dialogue: [
          {
            question: {
              line: "먼저, 사인을 증명하는 증거를 모두 제출하라.",
              image: "inspector_neutral",
              name: "감독관"
            },
            verification: "사인"
          }
        ],
        answer: {
          evidences: [
            {
              title: '원인불명의 흔적들',
              description: '시신 조사 결과, 눈에 핏발이 유독 심하며, 입안이 이상할 정도로 말라있다는 사실을 알아냈다.',
              index: 1,
              c_index: 0,
              p_index: 1,
              source: { id: 'test2_item0', name: 'body', type: 'Item'},
              quiz_id: '',
              reveal: true
            },
            {
              title: "탈륨 중독",
              description: "시신의 상태, 평소보다 피곤해보였다는 박유신의 증언으로 미루어보아 피해자는 음독으로 죽었을 가능성이 높다.",
              index: 2,
              c_index: 0,
              p_index: 1,
              quiz_id: "WIN3vIY76B5ZHa13x70c",
              reveal: true
            }
          ],
          to: "범행 방법"
        }
      },
      {
        key: "범행 방법",
        dialogue: [
          {
            "line": "시신은 양눈의 핏발이 심하며, 입안이 이상할 정도로 말라있습니다.",
            "image": "sami_neutral",
            "name": "사미"
          },
          {
            "line": "이는 탈륨 중독 증상 입니다!",
            "image": "sami_angry1",
            "name": "사미"
          },
          {
            "line": "탈륨은 살충제나 쥐약에 포함되며, 무색무취에 물에 잘 녹는 특징이 있습니다.",
            "image": "sami_sus",
            "name": "사미"
          },
          {
            "line": "따라서 피해자는 독살에 의한 탈륨 중독 증상으로 사망하였습니다.",
            "image": "sami_sus",
            "name": "사미"
          },
          {
            "question": {
              "line": "좋다. 그러면 범인이 어떻게 피해자를 독살 했는지, 범행 방법을 증명하는 증거를 모두 제출하라.",
              "image": "inspector_neutral",
              "name": "감독관"
            },
            verification: "범행 방법"
          }
        ],
        answer: {
          evidences: [
            {
              title: "커피",
              description: "방문 당시 안연정은 두 사람에게 커피를 대접했다. 피해자는 냉커피를, 박유신은 따뜻한 커피를 각각 대접받았다.",
              index: 0,
              t_index: 0,
              p_index: 1,
              quiz_id: "",
              reveal: true
            },
            {
              title: "얼음",
              description: "범인은 피해자에게 내준 냉커피의 얼음에 탈륨을 섞어 피해자가 얼음이 녹으면서 시간차를 두고 서서히 치사량에 중독되게 만들었다.",
              index: 2,
              c_index: 0,
              p_index: 1,
              quiz_id: "YPnEQwKAwueWEzSmpRdF",
              reveal: true
            }
          ],
          to: "동기"
        }
      },
      {
        key: "동기",
        dialogue: [
          {
            "line": "피해자가 친구인 박유신이 왔을 때 마신 커피 입니다.",
            "image": "sami_neutral",
            "name": "사미"
          },
          {
            "line": "피해자는 냉커피만 마시죠.",
            "image": "sami_neutral",
            "name": "사미"
          },
          {
            "line": "범인을 이 점을 이용하여 범행을 성공시키는 동시에 알리바이도 만들었습니다.",
            "image": "sami_neutral",
            "name": "사미"
          },
          {
            "line": "바로 얼음에 탈륨을 섞어, 얼음이 녹으면서 시간차를 두고 치사량의 탈륨이 커피에 섞이도록 만든 겁니다!",
            "image": "sami_sus",
            "name": "사미"
          },
          {
            "line": "그리고 이게 가능한 범인은 직접 커피를 내왔던 가정부, 안연정 씨 입니다!",
            "image": "sami_sus",
            "name": "사미"
          },
          {
            "line": "뭐라고요?!",
            "image": "suspect3_neutral",
            "name": "안연정"
          },
          {
            "line": "제가 왜 주인님을 죽이겠습니까? 물론, 월급을 못 받고 있는 건 사실이지만,",
            "image": "suspect3_neutral",
            "name": "안연정"
          },
          {
            "line": "주인님을 죽이면 없던 월급이 생기기라도 합니까? 말이 되는 소릴 하십시오!",
            "image": "suspect3_neutral",
            "name": "안연정"
          },
          {
            "line": "범행 방법을 증명하더라도 동기까지 밝히지 못 하면 추리에 설득력이 떨어질 수 있다.",
            "image": "inspector_neutral",
            "name": "감독관"
          },
          {
            "question": {
              "line": "마지막으로, 안연정이 범인이라면 동기를 증명하는 증거를 모두 제출하라!",
              "image": "inspector_neutral",
              "name": "감독관"
            },
            verification: "동기"
          }
        ],
        answer: {
          evidences: [
            {
              title: "임금체불",
              description: "안연정은 가계가 기울어진 이후로 월급을 제대로 못 받고 있다.",
              index: 2,
              c_index: 2,
              p_index: 1,
              source: { type: "NPC", name: "안연정", id: "test2_suspect3" },
              quiz_id: "tLJfpFrSVAq5O1sGNs8I",
              reveal: true
            },
            {
              title: "주변의 평가와 안타까움",
              description: "주변에서는 김현수의 노력과 능력을 높이 평가하지만, 차남이란 이유만으로 상속권에서 밀려난 걸 안타까워 한다.",
              index: 0,
              c_index: 1,
              p_index: 1,
              source: { type: "NPC", name: "안연정", id: "test2_suspect3" },
              quiz_id: '',
              reveal: true,
            }
          ],
          to: "verification-clear"
        }
      }
    ],
    dialogue_config: {
      "verification-clear": {
        dialogue: [
          {
            image: 'sami_angry1',
            line: '월급이 안 나오기는요.',
            name: '사미'
          },
          {
            image: 'sami_neutral',
            line: '피해자는 독신이기 때문에 죽으면 동생인 김현수 씨에게 재산이 상속됩니다.',
            name: '사미'
          },
          {
            image: 'sami_sus',
            line: '더군다나 재산을 탕진하는 김철수 씨와 달리, 김현수 씨는 예전부터 형보다 집안 재산을 지키고 관리할 만한 경제 관념이 있었습니다.',
            name: '사미'
          },
          {
            image: 'sami_angry1',
            line: '그렇기 때문에 안연정 씨는 집안 재산을 피해자가 아닌 김현수 씨가 관리하게 되면,',
            name: '사미'
          },
          {
            image: 'sami_angry2',
            line: '자신이 못 받은 월급을 받을 수 있게 되지 않을까 하는 희망 때문에 피해자를 살해한 겁니다!',
            name: '사미'
          },
          {
            image: 'suspect3_neutral',
            line: '윽..',
            name: '안연정'
          },
          {
            image: 'suspect3_neutral',
            line: '분하지만 인정할 수 밖에 없군요.',
            name: '안연정'
          },
          {
            image: 'suspect3_neutral',
            line: '..맞습니다. 도련님이 가산을 탕진해 월급을 못 받은지도 벌써 몇 달째..',
            name: '안연정'
          },
          {
            image: 'suspect3_neutral',
            line: '그간 일한 정이 있어 마지막까지 곁에 있으려 했지만..더이상은 도련님도 정신을 차리실 기미도 안 보이고, 생활도 점점 어려워져서',
            name: '안연정'
          },
          {
            image: 'suspect3_neutral',
            line: '그만두겠다 말하면서 도련님께 다른 집으로 가서 일할 수 있도록 추천서를 부탁드렸건만..그마저도 거절하셨습니다.',
            name: '안연정'
          },
          {
            image: 'suspect3_neutral',
            line: '오히려 그만두는 순간 자기가 절대 다른 일자리를 찾지 못 하도록 모든 수를 쓸거라고 하시니까 앞이 막막해져서 그만..',
            name: '안연정'
          },
          {
            image: 'inspector_smile',
            line: '살해 방법과 살해 동기까지 맞히고, 심지어 범인의 자백까지 얻어내다니. 두 번째 시험도 통과다!',
            name: '감독관'
          },
          {
            image: 'sami_smile',
            line: '좋았어!',
            name: '사미'
          }
        ],
        event: { eventKey: "verification-clear", eventData: {id: "verification", data: "verification-clear"} }
      },
      "verification-fail": {
        dialogue: [
          {
            line: "안타깝지만 자네의 입증은 증거가 부족한 것 같군.",
            image: "inspector_neutral",
            name: "감독관"
          },
          {
            line: "가지고 있는 단서들을 좀 더 살핀 뒤 다시 입증에 도전하도록 하게.",
            image: "inspector_neutral",
            name: "감독관"
          }
        ]
      }
    }
  }
}
class Stage extends Phaser.Plugins.BasePlugin /*implements StageInterface*/ {
  // public key: string
  // public readonly next: Stage|null
  // public item_carry: [ Item? ]
  // private _player_config: {
  //   sceneKey: string,
  //   x: number,
  //   y: number
  // }|null
  // public scenes: [ Phaser.Scene ]
  // public scenes_config: any /* { scene_key: scene_config, ... } */
  // public default_config: {
  //   player_config: { sceneKey: string, x: number, y: number },
  //   scenes_config: any /* { scene_key: scene_config } */
  // }
  // private cluenote: cluenoteInterface
  // public event_config: any /* { eventKey: [{ Update }] } */
  // public q_event_config: any /* { quiz_id: { /* quiz-event config */ } } */

  constructor(manager /*: Phaser.Plugins.PluginManager*/,
    scenes /*: [ Phaser.Scene ]*/,
    default_config, //: {
    //   player_config: { sceneKey: string, x: number, y: number },
    //   scenes_config: any /* { scene_key: scene_config } */
    // },
    event_config, // : {
    //   eventKey: [ { Update } ], ...
    // },
    qevent_config, // : {
    //   quiz_id: { /* quiz-event config */}
    // }
    key /*: string*/,
    next /*: Stage|null*/
  ) {
    super(manager)
    this.scenes = scenes
    this.default_config = default_config
    this.event_config = event_config
    this.qevent_config = qevent_config
    this.key = key
    this.next = next
  }

  set player_config(value /*: any*/) {
    if (!value) {
      // stage_info not existing in user db
      // set default_config as player_config
      const sceneKey = this.default_config.player_config.sceneKey
      this._player_config = {
        'sceneKey': sceneKey,
        'x': this.default_config.player_config.x,
        'y': this.default_config.player_config.y
      }
      this.scenes_config = _.cloneDeep(this.default_config.scenes_config)
    } else {
      // set value as player_config
      const sceneKey = value.player_config.sceneKey
      this._player_config = {
        'sceneKey': sceneKey,
        'x': value.player_config.x,
        'y': value.player_config.y
      }
      this.scenes_config = value.scenes_config
    }
  }

  get player_config() {
    return this._player_config
  }

  clear() {
    if (!this.next) {
      // end of game
      useGameStore().$patch({ game_clear: true })
    } else {
      // stage clear >> move to next stage
      useGameStore().$patch({
        stage: {
          key: this.next.key,
          player_config: this.next.default_config.player_config,
          scenes_config: { ...this.next.default_config.scenes_config }
        }
      })
      this.game.create()
    }
  }

  preload() {
    // add stage.scenes to game.scene
    this.scenes.forEach((scene, index) => {
      const sceneKey = Object.keys(this.default_config.scenes_config)[index]
      if (!this.game.scene.getScene(sceneKey)) this.game.scene.add(sceneKey, scene, false)
    })
  }

  // inner-game event progress
  mapEvent(scene /*: Phaser.Scene */) {
    scene.events.on('pass-event-data', (e) => {
      const { eventKey, eventData } = e

      // search for eventKey in event_config
      const event = this.event_config[eventKey]

      if (!event) return

      // check NPC/Item state
      const i = event.findIndex((u) => {
        return _.isEqual(u.condition, eventData)
      }) // update happen in non-linear order within event
      if (i === -1) return

      // run update
      const { clear, message } = event[i].update(this)
      if (message) scene.events.on('end-talking', () => {
        useGameStore().$patch({ progress: { message: message } })
      })

      if (clear) {
        // if stage-clear condition fulfilled, run stage.clear()
        scene.events.once('end-talking', () => {
          this.clear()
        }) // run stage.clear() after dialogue|interaction
      } else {
        // update player_config
        useGameStore().$patch({
          stage: { player_config: { ...scene.sceneload.config.player_config } }
        })

        // delete update from event_map
        this.event_config[eventKey].splice(i,1)

        if (event.length === 0) {
          // if all update from event is over, delete event from event_config
          delete this.event_config[eventKey]
        }
      }
    })
  }

  // outer-game event progress (quiz-progress)
  quizEvent(id /* : string */) {
    if (id === 'verification') {
      // verification event
      
      // get scene
      const scene = this.game.scene.getScene(this.player_config.sceneKey)
      // pass config to investigation-plugin
      scene.investigation.startVerification(VER_CONFIG, VER_DIALOGUE_CONFIG)
    } else if (this.qevent_config[id].sceneKey != this.player_config.sceneKey) {
      // get qevent-scene
      const p_scene = this.game.scene.getScene(this.qevent_config[id].sceneKey)
    
      // pause current-scene >> start progress-scene
      const c_scene = this.game.scene.getScene(this.player_config.sceneKey)
      this.game.scene.pause(c_scene) // pause current-scene
      this.game.scene.bringToTop(p_scene) // render progress-scene on top
      
      // emit progress-event + pass progress-config
      p_scene.events.emit('quiz-event', id, this.qevent_config)

      // after progress-event, resume to current-scene
      this.game.scene.stop(p_scene)
      this.game.scene.bringToTop(c_scene)
      this.game.scene.resume(c_scene)
    } else {
      // start progress-event on current-scene
      p_scene.events.emit('quiz-event', id, this.qevent_config)
    }
  }
}

export default Stage