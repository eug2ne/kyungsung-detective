// mission: eat breakfast + read newspaper >> talk to maid

import Phaser from "phaser"
import { useGameStore } from "../game"
import SCENE_DEFAULT_CONFIG from './config/SCENE_DEFAULT_CONFIG.json'
import Item2 from "../GameObjects/Item2"
import NPC from "../GameObjects/NPC"
import kitchen from '../assets/breakfast/kitchen_background.png'
import frontchair from '../assets/breakfast/kitchen_frontchair.png'
import leftchair from '../assets/breakfast/kitchen_leftchair.png'
import rightchair from '../assets/breakfast/kitchen_rightchair.png'
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

export default class Breakfast extends Phaser.Scene {
  constructor() {
    super({key: 'Breakfast'})
  }

  preload() {
    // load map image
    this.load.image('kitchen', kitchen)
    this.load.image('frontchair', frontchair)
    this.load.image('leftchair', leftchair)
    this.load.image('rightchair', rightchair)
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
    cupboard.visible = false, cupboard.body.x = 350, cupboard.body.y = 100, cupboard.body.setSize(500,120,false)
    const sink = this.physics.add.staticImage(350,100,'sink').setOrigin(0,0)
    sink.visible = false, sink.body.x = 440, sink.body.y = 190, sink.body.setSize(300,70,false)
    const glasscloset = this.physics.add.staticImage(350,100,'glasscloset').setOrigin(0,0)
    glasscloset.visible = false, glasscloset.body.x = 855, glasscloset.body.y = 110, glasscloset.body.setSize(125,150,false)
    
    const table = this.physics.add.staticImage(528,351,'table').setOrigin(0,0).setScale(2)
    table.body.x = 540, table.body.y = 351, table.body.setSize(250,120,false)
    
    this.physics.add.staticImage(350,100,'closet').setOrigin(0,0).setScale(2).setDepth(15)
    const closet_l = this.physics.add.staticImage(350,100,'closet_l').setOrigin(0,0)
    closet_l.visible = false, closet_l.body.x = 350, closet_l.body.y = 385, closet_l.body.setSize(50,160,false)
    const closet_r = this.physics.add.staticImage(350,100,'closet_r').setOrigin(0,0)
    closet_r.visible = false, closet_r.body.x = 925, closet_r.body.y = 385, closet_r.body.setSize(50,160,false)

    const chairs = this.physics.add.staticGroup() // chairs do not apply collision
    chairs.create(350,95,'backchair').setOrigin(0,0).setScale(2)
      .refreshBody().setDepth(15)
    chairs.create(350,95,'frontchair').setOrigin(0,0).setScale(2)
      .refreshBody().setDepth(7)

    this.add.existing(cupboard,sink,glasscloset,table,closet,closet_l,closet_r)

    this.items = []
    SCENE_DEFAULT_CONFIG['Breakfast'].item_json.forEach((item) => {
      this.items.push(new Item2(
        this,
        item.id,
        item.x,
        item.y,
        item.name,
        item.scale,
        item.depth_config,
        item.body_config,
        item.texture,
        item.interact
      ))
    })
    this.npcs = []
    SCENE_DEFAULT_CONFIG['Breakfast'].npc_json.forEach((npc) => {
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
        'prologue': {
          sceneKey: 'Breakfast',
          playerX: 863,
          playerY: 472,
          cameraX: 863,
          cameraY: 472,
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
          event: null
        }
      }
      this.events.emit('quiz-event', 'prologue', prologue_config)


      this.events.once('end-talking', () => {
        useGameStore().$patch((state) => {
          state.stage.scenes_config['Breakfast'].npc['breakfast_maid'].dialogueKey = 'default-question'
        })
      })
    }
  }

  update() {
    this.sceneload.update(this.npcs)
  }
}