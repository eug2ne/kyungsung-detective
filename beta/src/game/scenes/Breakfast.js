// mission: eat breakfast + read newspaper >> talk to maid

import Phaser from "phaser"
import Item from "../GameObjects/Item"
import NPC from "../GameObjects/NPC"
import kitchen from '../assets/breakfast/kitchen_background.png'
import frontchair from '../assets/breakfast/kitchen_frontchair.png'
import backchair from '../assets/breakfast/kitchen_backchair.png'
import table from '../assets/breakfast/kitchen_table.png'
import closet from '../assets/breakfast/kitchen_leftright.png'
import b_meal from '../assets/breakfast/kitchen_meal.png'
import newspaper from '../assets/breakfast/kitchen_newspaper.png'

// import npc spritesheet
import maid_dishwash from '../assets/npc_sprite/maid_dishwash.png'

// import npc + sami log image
import maid_neutral from '../assets/npc_log/maid_neutral.png'
import maid_surprise from '../assets/npc_log/maid_surprise.png'
import maid_smile from '../assets/npc_log/maid_smile.png'
import sami_neutral from '../assets/sami_log/sami_무표정.png'
import sami_smile from '../assets/sami_log/sami_웃음.png'
import { useGameStore } from "../game"

const npcs_JSON = [
  {
    "name": "사치코",
    "id": "breakfast_maid",
    "dialogue": {
      "default-question": {
        dialogue: [
          {
            question: {
              "image": "maid_smile",
              "line": "아직 여독이 가시지 않아 피곤하실텐데 오늘은 쉬시는게 어떤가요?",
              "name": "사치코"
            }
          }
        ]
      },
      "answer-default": {
        dialogue: [
          {
            "image": "maid_smile",
            "line": "뭘 하시는건 좋은데 일단은 뭐든 드시고 하시지요.",
            "name": "사치코"
          }
        ],
        event: null
      },
      "answer-no-plan": {
        dialogue: [
          {
            "image": "maid_smile",
            "line": "뭘 할지 계획은 있으신가요?",
            "name": "사치코"
          },
          {
            "image": "sami_neutral",
            "line": "....",
            "name": "사미"
          },
          {
            "image": "sami_neutral",
            "line": "(생각해보니 딱히 계획이 없다.)",
            "name": "사미"
          }
        ],
        event: null
      },
      "answer-clear": {
        dialogue: [
          {
            "image": "sami_neutral",
            "line": "사치코. 나, 탐정 시험을 보려고.",
            "name": "사미"
          },
          {
            "image": "sami_neutral",
            "line": "신문을 보니까 마침 공인 시험이 오늘 경무대에서 진행된다더라.",
            "name": "사미"
          },
          {
            "image": "maid_surprise",
            "line": "..",
            "name": "사치코"
          },
          {
            "image": "maid_surprise",
            "line": "..아",
            "name": "사치코"
          },
          {
            "image": "maid_neutral",
            "line": "전 주인님께서 그렇게 가시고 아가씨가 같은 길을 가실 생각을 하실 줄은 몰라서..",
            "name": "사미"
          },
          {
            "image": "sami_neutral",
            "line": "..나 정말 오랜만에 이 집에 돌아왔는데 장례만 치르고 다시 떠나기 싫거든. 여기서 좀 지내면서 마음을 좀 추스르고 싶어.",
            "name": "사미"
          },
          {
            "image": "sami_smile",
            "line": "그래서 지내는 동안 용돈 벌이 정도는 해야 하잖아?",
            "name": "사미"
          },
          {
            "image": "maid_surprise",
            "line": "아가씨가 여기서 지내더라도 부친께서 꼭 생활비는 해결해주실 거에요! 걱정하지 않으셔도 돼요!",
            "name": "사치코"
          },
          {
            "image": "sami_smile",
            "line": "아, 그건 알지.",
            "name": "사미"
          },
          {
            "image": "sami_neutral",
            "line": "사실 그런 이유뿐만 아니라,",
            "name": "사미"
          },
          {
            "image": "sami_smile",
            "line": "기왕 일하는 거 어머니를 위해서 할 수 있는 일을 하고 싶어.",
            "name": "사미"
          },
          {
            "image": "maid_surprise",
            "line": "설마 주인님의 죽음이 의심스러우신가요?",
            "name": "사치코"
          },
          {
            "image": "sami_neutral",
            "line": "그럴리가. 그런게 아냐.",
            "name": "사미"
          },
          {
            "image": "sami_neutral",
            "line": "어머니가 탐정이 되는 걸 좋아할 수 밖에 없었던 이유를 알고 싶어.",
            "name": "사미"
          },
          {
            "image": "sami_neutral",
            "line": "(그동안 내가 봐온 어머니는 신문 기사 속에서만 있었어.)",
            "name": "사미"
          },
          {
            "image": "sami_neutral",
            "line": "(늦었지만 이제부터라도 알고싶어. 이대로 어머니가 어떤 사람이었는지도 제대로 모르는 채 흘려보내고 싶지 않아.)",
            "name": "사미"
          },
          {
            "image": "maid_neutral",
            "line": "....",
            "name": "사치코"
          },
          {
            "image": "maid_smile",
            "line": "..저는 아가씨가 어떤 길을 가시든 진심으로 응원해요.",
            "name": "사치코"
          },
          {
            "image": "maid_smile",
            "line": "그러니 마지막으로 한 가지만 더 알려드릴게요.",
            "name": "사치코"
          },
          {
            "image": "maid_smile",
            "line": "이 게임은 게임을 진행하면서 자동저장이 이루어지기는 하나, 왼쪽 상단의 새로고침 아이콘을 누르면 원하는 슬롯에 지금까지의 진행정보를 따로 저장할 수도 있어요.",
            "name": "사치코"
          },
          {
            "image": "maid_smile",
            "line": "물론 과거에 저장했던 슬롯을 불러오는 것도 가능하고요. '스테이지 선택' 으로 넘어가시면 원하시는 스테이지를 고를 수도 있어요.",
            "name": "사치코"
          },
          {
            "image": "maid_smile",
            "line": "앞으로 탐정업을 하시는데 도움이 되실 겁니다. 물론 어떻게 활용하실지는 아가씨의 몫이지만요.",
            "name": "사치코"
          },
          {
            "image": "sami_smile",
            "line": "응. 잘 알았어. 기왕 알려준 거 잘 활용해볼게. 이해해줘서 고마워, 사치코",
            "name": "사미"
          }
        ],
        event: { eventKey: "breakfast-event-npc0", eventData: {id: "breakfast_maid", data: "option-clear"} }
      }
    },
    "options_config": {
      "option-end": {
        answer: "그럴까?",
        to: null /* end of conversation */
      },
      "option-default": {
        answer: "아니. 나가보려고.",
        to: "answer-default" /* to default dialogue */
      },
      "option-no-plan": {
        answer: "아니. 나가보려고.",
        to: "answer-no-plan" /* to no-plan dialogue */
      },
      "option-clear": {
        answer: "아니. 나가보려고.",
        to: "answer-clear" /* to clear dialogue */
      }
    },
    "spritesheet": "maid_dishwash",
    "scale": 1.1,
    "anim_config": {
      "frames": {
        "0,5": "dishwash"
      },
      "repeat": {
        "dishwash": true
      },
      "default": "dishwash",
      "auto_start": true
    },
    "check": null,
    "x": 620,
    "y": 240
  }
]

const items_JSON = [
  {
    "name": "newspaper",
    "id": "breakfast_item0",
    "x": 770,
    "y": 425,
    "scale": 2,
    "depth": 10,
    "texture": "newspaper",
    "interact": {
      "read": {
        "type": "read",
        "dialogue": [
          "아침 신문이다.",
          "..「경성 최고의 탐정 별세」",
          "「범인은 현장에서 같이 죽은채로 발견된 40세 윤 모씨로 추정」",
          "「현장에서 윤 모씨의 지문이 묻은 권총이 발견되고,」",
          "「부검결과 범행 시각 당시 지첨초 중독 상태였던 것으로 미루어보아」",
          "「우발적 살해 후 실족사 혹은 자살로 추정」",
          "「특히 경찰은 윤 씨가 지첨초 밀매에 종사했다는 근거로 미루어보아」",
          "「평소 사마전씨에게 앙심을 품고 있었을 걸로 보고」",
          "「수사를 종결했다.」",
          "..역시나 어머니의 부고 소식으로 떠들썩하다.",
          "그 아래 새로운 소식이 눈에 띈다.",
          "「탐정 시험 xx월 xx일 경무대에서 진행」",
          {
            "image": "sami_neutral",
            "line": "xx월 xx일이라니. 오늘이잖아?"
          },
          {
            "image": "sami_neutral",
            "line": "...."
          }
        ],
        event: { eventKey: "breakfast-event-item0", eventData: {id: "breakfast_item0", data: "item0-read"} } /* update npc dialogueKey to answer if dialogueKey == post_c_repeat */
      }
    }
  },
  {
    "name": "b_meal",
    "id": "breakfast_item1",
    "x": 660,
    "y": 422,
    "scale": 2,
    "depth": 5,
    "texture": "b_meal",
    "interact": {
      "eat": {
        "type": "question",
        "dialogue": [
          {
            question: {
              "image": null,
              "line": "아침이 차려져있다."
            }
          }
        ],
        "options_config": {
          "option-eat": {
            answer: "먹는다.",
            event: { eventKey: "breakfast-event-item1", eventData: {id: "breakfast_item1", data: "item1-eat"} } /* update npc dialogueKey */
          },
          "option-skip": {
            answer: "별로 입맛이 없다.",
            event: null /* end of interaction */
          }
        }
      }
    }
  }
]

export default class Breakfast extends Phaser.Scene {
  constructor() {
    super({key: 'Breakfast'})
  }

  // init(player_config) {
  //   // pass player_config to sceneload plugin
  //   this.sceneload.init(player_config)
  // }

  preload() {
    // load map image
    this.load.image('kitchen', kitchen)
    this.load.image('frontchair', frontchair)
    this.load.image('backchair', backchair)
    this.load.image('table', table)
    this.load.image('closet', closet)

    // load npc+sami image+spritesheet
    this.load.image('maid_neutral', maid_neutral)
    this.load.image('maid_surprise', maid_surprise)
    this.load.image('maid_smile', maid_smile)
    this.load.image('sami_neutral', sami_neutral)
    this.load.image('sami_smile', sami_smile)
    this.load.spritesheet('maid_dishwash', maid_dishwash, { frameWidth: 2074 / 6, frameHeight: 512 })

    // load item image
    this.load.image('b_meal', b_meal)
    this.load.image('newspaper', newspaper)

    // sceneload plugin preload()
    this.sceneload.preload()
  }

  create(data) {
    // add background image + set world bound
    const background = this.add.image(350, 100, 'kitchen').setOrigin(0, 0).setScale(2)
    this.physics.world.setBounds(359, 100, background.width*2-18, background.height*2, true, true, true, true)

    // add obstacle image + adjust body
    const cupboard = this.physics.add.staticImage(350,100,'cupboard').setOrigin(0,0)
    cupboard.visible = false, cupboard.body.x = 350, cupboard.body.y = 100, cupboard.body.setSize(500,80,false)
    const sink = this.physics.add.staticImage(350,100,'sink').setOrigin(0,0)
    sink.visible = false, sink.body.x = 440, sink.body.y = 190, sink.body.setSize(300,50,false)
    const glasscloset = this.physics.add.staticImage(350,100,'glasscloset').setOrigin(0,0)
    glasscloset.visible = false, glasscloset.body.x = 855, glasscloset.body.y = 110, glasscloset.body.setSize(125,115,false)
    
    const table = this.physics.add.staticImage(350,95,'table').setOrigin(0,0).setScale(2)
    table.body.x = 540, table.body.y = 350, table.body.setSize(250,100,false)
    
    this.physics.add.staticImage(350,100,'closet').setOrigin(0,0).setScale(2).setDepth(15)
    const closet_l = this.physics.add.staticImage(350,100,'closet_l').setOrigin(0,0)
    closet_l.visible = false, closet_l.body.x = 350, closet_l.body.y = 395, closet_l.body.setSize(50,150,false)
    const closet_r = this.physics.add.staticImage(350,100,'closet_r').setOrigin(0,0)
    closet_r.visible = false, closet_r.body.x = 925, closet_r.body.y = 395, closet_r.body.setSize(50,150,false)

    const chairs = this.physics.add.staticGroup() // chairs do not apply collision
    chairs.create(350,95,'backchair').setOrigin(0,0).setScale(2)
      .refreshBody().setDepth(15)
    chairs.create(350,95,'frontchair').setOrigin(0,0).setScale(2)
      .refreshBody().setDepth(7)

    this.add.existing(cupboard,sink,glasscloset,table,closet,closet_l,closet_r)

    this.items = []
    items_JSON.forEach((item) => {
      this.items.push(new Item(
        this,
        item.id,
        item.x,
        item.y,
        item.name,
        item.scale,
        item.depth,
        item.texture,
        item.interact
      ))
    })
    this.npcs = []
    npcs_JSON.forEach((npc) => {
      this.npcs.push(new NPC(
        this,
        this.sceneload,
        npc.id,
        npc.spritesheet,
        npc.scale,
        npc.anim_config,
        npc.x,
        npc.y,
        npc.dialogue,
        npc.options_config
      ))
    })

    const colliders = [ cupboard, sink, glasscloset, table, closet_l, closet_r ]
    
    const camera_config = {
      'main_zoom': 1,
      'mini_zoom': 0.25,
      'mini_scrollX': 400,
      'mini_scrollY': 300
    }
    this.sceneload.create(colliders, this.items, this.npcs, camera_config, data)

    this.game.stage.mapEvent(this) // activate stage

    // check npc dialogue-key
    if (useGameStore().stage.scenes_config['Breakfast'].npc['breakfast_maid'].dialogueKey === 'prologue') {
      // if breakfast_maid.dialogueKey === prologue, play prologue event
      const prologue_config = {
        'breakfast-event-npc0': {
          sceneKey: 'Breakfast',
          x: 0,
          y: 0,
          dialogue: [
            {
              "image": "maid_smile",
              "line": "아, 일어나셨나요 아가씨?",
              "name": "사치코"
            },
            {
              "image": "maid_smile",
              "line": "갑작스러웠을텐데도 이렇게 빨리 와주셔서 정말 감사합니다.",
              "name": "사치코"
            },
            {
              "image": "sami_neutral",
              "line": "아니야, 당연한 일인데. 아빠는 교회 일을 마무리 짓고 오시느라 며칠 늦으신다는 것 같지만.",
              "name": "사미"
            },
            {
              "image": "maid_smile",
              "line": "허기지실텐데, 제가 아침도 상에 차려놨어요.",
              "name": "사치코"
            },
            {
              "image": "maid_smile",
              "line": "이동은 방향키 로, 원하는 인물이나 사물을 향해 마주보고 스페이스 / 엔터 를 누르면 해당 인물이나 사물과 상호작용 할 수 있어요.",
              "name": "사치코"
            },
            {
              "image": "maid_smile",
              "line": "이미 눈치채셨겠지만 대화문을 넘기는 것도 스페이스 / 엔터 를 누르면 돼요.",
              "name": "사치코"
            },
            {
              "image": "sami_smile",
              "line": "고마워. 아침은 잘 먹을게.",
              "name": "사미"
            },
            {
              "image": "maid_smile",
              "line": "제가 어제 드린 주인님 유품은 살펴보셨어요?",
              "name": "사치코"
            },
            {
              "image": "sami_neutral",
              "line": "아, 이 '단서판서' 라고 되어있는 거 말이지. 응, 살펴봤어. 아무 것도 쓰여있지 않지만.",
              "name": "사미"
            },
            {
              "image": "maid_smile",
              "line": "..그래도 주인님의 얼마 안 남은 유품 중 하나니까 소중히 여겨주세요.",
              "name": "사치코"
            },
            {
              "image": "maid_smile",
              "line": "'단서판서'는 상단의 네비바를 클릭해서도 열 수 있지만, tab / shift+tab 을 이용해서도 열 수 있어요.",
              "name": "사치코"
            },
            {
              "image": "sami_smile",
              "line": "그렇구나. 그건 몰랐네. 알려줘서 고마워.",
              "name": "사미"
            },
            {
              "image": "sami_neutral",
              "line": "..엄마의 유품들은 대부분 경찰에서 가져갔지?",
              "name": "사미"
            },
            {
              "image": "maid_neutral",
              "line": "..네. 아무래도 대부분 수사 자료니까요.",
              "name": "사치코"
            },
            {
              "image": "sami_neutral",
              "line": "탐정이란 직업도 참 잔인하네.",
              "name": "사미"
            },
            {
              "image": "sami_neutral",
              "line": "원래는 어머니 장례식도 떠들썩하게 국장으로 치뤄질 예정이었다며?",
              "name": "사미"
            },
            {
              "image": "maid_neutral",
              "line": "저도 그렇다고 들었어요. 다행이 주인님 친구분의 도움으로 가족들과 가까운 친지끼리만 소박하게 치뤄질 수 있도록 조율되었다는 것 같아요.",
              "name": "사치코"
            },
            {
              "image": "maid_smile",
              "line": "장례식에 대한 자세한 건 부친분이 조율해주실테니까 아가씨는 걱정하지 않으셔도 돼요! 아가씨는 여독을 푸시는 데만 집중하세요!",
              "name": "사치코"
            },
            {
              "image": "sami_neutral",
              "line": "응. 항상 고마워 사치코.",
              "name": "사미"
            }
          ],
          event: { eventKey: 'breakfast-event-npc0', eventData: { id: 'breakfast_maid', data: 'prologue' } }
        }
      }
      this.events.emit('quiz-event', 'breakfast-event-npc0', prologue_config)
    }
  }

  update() {
    this.sceneload.update(this.items, this.npcs)
  }
}