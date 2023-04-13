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

// import npc+sami log image
import maid_neutral from '../assets/npc_log/maid_neutral.png'
import maid_surprise from '../assets/npc_log/maid_surprise.png'
import maid_smile from '../assets/npc_log/maid_smile.png'
import sami_neutral from '../assets/sami_log/sami_무표정.png'
import sami_smile from '../assets/sami_log/sami_웃음.png'

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
              "line": "아직 여독이 가시지 않아 피곤하실텐데 오늘은 쉬시는게 어떤가요?"
            }
          }
        ]
      },
      "answer-default": {
        dialogue: [
          {
            "image": "maid_smile",
            "line": "뭘 하시는건 좋은데 일단은 뭐든 드시고 하시지요."
          }
        ],
        event: null
      },
      "answer-no-plan": {
        dialogue: [
          {
            "image": "maid_smile",
            "line": "뭘 할지 계획은 있으신가요?"
          },
          {
            "image": "sami_neutral",
            "line": "...."
          },
          {
            "image": "sami_neutral",
            "line": "(생각해보니 딱히 계획이 없다.)"
          }
        ],
        event: null
      },
      "answer-clear": {
        dialogue: [
          {
            "image": "maid_smile",
            "line": "뭘 할지 계획은 있으신가요?"
          },
          {
            "image": "sami_neutral",
            "line": "나, 탐정 시험을 보려고."
          },
          {
            "image": "maid_surprise",
            "line": ".."
          },
          {
            "image": "maid_surprise",
            "line": "..아"
          },
          {
            "image": "maid_neutral",
            "line": "전 주인님께서 그렇게 가시고 주인님이 같은 길을 가실 생각을 하실 줄은 몰라서.."
          },
          {
            "image": "sami_neutral",
            "line": "(..그렇겟지. 나도 아까 신문을 보기 전까지는 생각하지 않았던 일이니까.)"
          },
          {
            "image": "sami_smile",
            "line": "어머니를 위해 할 수 있는 일을 하고 싶어졌어."
          },
          {
            "image": "maid_surprise",
            "line": "설마 어머님의 죽음이 의심스러우신가요?"
          },
          {
            "image": "sami_neutral",
            "line": "그럴리가. 그런게 아냐."
          },
          {
            "image": "sami_smile",
            "line": "어머니는 본인이 탐정인 걸 자랑스러워 하셨으니까"
          },
          {
            "image": "sami_smile",
            "line": "자식으로서 그 유지를 이어받음으로써 뒤늦게나마 경의를 표하고 싶은거야."
          },
          {
            "image": "sami_neutral",
            "line": "(생각해보면 어머니도, 어머니의 일도 그동안 너무 모르고 살았어.)"
          },
          {
            "image": "sami_neutral",
            "line": "(이제부터라도 알고싶어. 이대로 모르는채로 덮어놓고 흘려보내고 싶지 않아.)"
          },
          {
            "image": "maid_neutral",
            "line": "...."
          },
          {
            "image": "maid_smile",
            "line": "..저는 주인님이 어떤 길을 가시든 진심으로 응원해요."
          },
          {
            "image": "sami_smile",
            "line": "이해해줘서 고마워, 사치코"
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
    "x": 420,
    "y": 240
  }
]

const items_JSON = [
  {
    "name": "newspaper",
    "id": "breakfast_item0",
    "x": 570,
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
    "x": 460,
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
    const background = this.add.image(150, 100, 'kitchen').setOrigin(0, 0).setScale(2)
    this.physics.world.setBounds(159, 100, background.width*2-18, background.height*2, true, true, true, true)

    // add obstacle image + adjust body
    const cupboard = this.physics.add.staticImage(150,100,'cupboard').setOrigin(0,0)
    cupboard.visible = false, cupboard.body.x = 150, cupboard.body.y = 100, cupboard.body.setSize(500,80,false)
    const sink = this.physics.add.staticImage(150,100,'sink').setOrigin(0,0)
    sink.visible = false, sink.body.x = 240, sink.body.y = 190, sink.body.setSize(300,50,false)
    const glasscloset = this.physics.add.staticImage(150,100,'glasscloset').setOrigin(0,0)
    glasscloset.visible = false, glasscloset.body.x = 655, glasscloset.body.y = 110, glasscloset.body.setSize(125,115,false)
    
    const table = this.physics.add.staticImage(150,95,'table').setOrigin(0,0).setScale(2)
    table.body.x = 340, table.body.y = 350, table.body.setSize(250,100,false)
    
    this.physics.add.staticImage(150,100,'closet').setOrigin(0,0).setScale(2).setDepth(15)
    const closet_l = this.physics.add.staticImage(150,100,'closet_l').setOrigin(0,0)
    closet_l.visible = false, closet_l.body.x = 150, closet_l.body.y = 395, closet_l.body.setSize(50,150,false)
    const closet_r = this.physics.add.staticImage(150,100,'closet_r').setOrigin(0,0)
    closet_r.visible = false, closet_r.body.x = 725, closet_r.body.y = 395, closet_r.body.setSize(50,150,false)

    const chairs = this.physics.add.staticGroup() // chairs do not apply collision
    chairs.create(150,95,'backchair').setOrigin(0,0).setScale(2)
      .refreshBody().setDepth(15)
    chairs.create(150,95,'frontchair').setOrigin(0,0).setScale(2)
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
  }

  update() {
    this.sceneload.update(this.items, this.npcs)
  }
}