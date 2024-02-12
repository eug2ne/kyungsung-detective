import Phaser from 'phaser'
import { useGameStore } from '../game'
import SCENE_DEFAULT_CONFIG from './config/SCENE_DEFAULT_CONFIG.json'
import Item2 from "../GameObjects/Item2"
import NPC from "../GameObjects/NPC"
import test2 from '@/game/assets/test2_map/test2.png'
import desk from '@/game/assets/test2_map/test2-desk.png'
import sofa from '@/game/assets/test2_map/test2-sofa.png'
import table from '@/game/assets/test2_map/test2-table.png'
import deadbody from '@/game/assets/test2_map/test2-deadbody.png'
import deskbook from '@/game/assets/test2_map/test2-deskbook.png'
import bookshelf from '@/game/assets/test2_map/test2-bookshelf.png'
import tea from '@/game/assets/test2_map/test2-tea.png'

// import npc spritesheet
import suspect1_sprite from '@/game/assets/npc_sprite/친구_박유신.png'
import suspect2_sprite from '@/game/assets/npc_sprite/동생_김현수.png'
import suspect3_sprite from '@/game/assets/npc_sprite/가정부_안연정.png'

// import npc + sami log image
import victim_neutral from '@/game/assets/npc_log/박씨.png'
import suspect1_neutral from '@/game/assets/npc_log/친구.png'
import suspect2_neutral from '@/game/assets/npc_log/동생.png'
import suspect3_neutral from '@/game/assets/npc_log/가정부2.png'
import inspector_neutral from '@/game//assets/npc_log/관리자.png'
import inspector_smile from '../assets/npc_log/관리자_웃음.png'
import applicant4_neutral from '@/game//assets/npc_log/지원자4_이미지.png'
import sami_neutral from '@/game/assets/sami_log/sami_무표정.png'
import sami_sus from '@/game/assets/sami_log/sami_의심.png'
import sami_angry1 from '@/game/assets/sami_log/sami_화.png'
import sami_angry2 from '@/game/assets/sami_log/sami_화2.png'
import sami_smile from '@/game//assets/sami_log/sami_웃음2.png'

export default class Test2 extends Phaser.Scene {
  constructor () {
    super({key: 'Test2'})
  }

  preload() {
    // load map image
    this.load.image('test2', test2)
    this.load.image('desk', desk)
    this.load.image('sofa', sofa)
    this.load.image('table', table)

    // load npc+sami image+spritesheet
    this.load.image('victim_neutral', victim_neutral)
    this.load.image('suspect1_neutral', suspect1_neutral)
    this.load.image('suspect2_neutral', suspect2_neutral)
    this.load.image('suspect3_neutral', suspect3_neutral)
    this.load.image('inspector_neutral', inspector_neutral)
    this.load.image('inspector_smile', inspector_smile)
    this.load.image('applicant4_neutral', applicant4_neutral)
    this.load.spritesheet('suspect1_sprite', suspect1_sprite, { frameWidth: 5304 / 17, frameHeight: 492 })
    this.load.spritesheet('suspect2_sprite', suspect2_sprite, { frameWidth: 4844 / 17, frameHeight: 477 })
    this.load.spritesheet('suspect3_sprite', suspect3_sprite, { frameWidth: 5100 / 17, frameHeight: 468 })
    this.load.image('sami_neutral', sami_neutral)
    this.load.image('sami_sus', sami_sus)
    this.load.image('sami_angry1', sami_angry1)
    this.load.image('sami_angry2', sami_angry2)
    this.load.image('sami_smile', sami_smile)

    // load item image
    this.load.image('deadbody', deadbody)
    this.load.image('bookshelf', bookshelf)
    this.load.image('deskbook', deskbook)
    this.load.image('tea', tea)
    
    // sceneload plugin preload()
    this.sceneload.preload()
  }

  create(data) {
    // add background image + set world bound
    const background = this.add.image(500, 100, 'test2').setOrigin(0, 0).setScale(2)
    this.physics.world.setBounds(509, 100, background.width*2-18, background.height*2, true, true, true, true)

    // create items 
    this.items = []
    SCENE_DEFAULT_CONFIG['Test2'].item_json.forEach((item) => {
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

    // create NPCs
    this.npcs = []
    SCENE_DEFAULT_CONFIG['Test2'].npc_json.forEach((npc) => {
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

    const camera_config = {
      'main_zoom': 0.8,
      'mini_zoom': 0.15,
      'mini_scrollX': 400,
      'mini_scrollY': 600,
      'player_scale': 1.8
    }
    this.sceneload.create([], this.items, this.npcs, camera_config, data)

    this.investigation.create() // activate investigation-plugin

    this.game.stage.mapEvent(this) // activate stage
    
    // check clue update
    if (!useGameStore().cluenote[1]) {
      // if Test2 clue not exist, play stage-start event
      const start_config = { 
        'start': {
          sceneKey: 'Test2',
          playerX: null,
          playerY: null,
          cameraX: 750,
          cameraY: 500,
          dialogue: [
            {
              image: "inspector_neutral",
              line: "두 번째 시험은 모의 수사다.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "이번 시험부터는 사건의 진상을 입증해야만 통과할 수 있다.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "그리고 사건의 진상을 입증하기 위해서는 특정 주제를 증명하는 단서를 모아서 제시해야 하지. 어떤 주제를 증명해야 하는지는 사건에 따라 다르며, 이번 문제에서는 '사인', '범행 방법', '동기'를 증명해야 한다.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "각 주제를 증명하기 위해 제시할 수 있는 단서는 최대 5개. 조사하면서 얻는 단서 중 자네가 특정 주제를 증명한다고 생각하는 단서가 있다면 5개까지 따로 모을 수 있네.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "만약 사건 입증에 필요한 단서가 충분히 모였다고 생각된다면 '단서 노트'에 새로 추가된 '사건입증' 버튼을 누르면 된다.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "말로만 설명하면 복잡하다고 느껴질지 몰라도 막상 직접 해보면 별 거 아니라고 느낄 걸세. 뭐, 탐정이 되면 직접 몸으로 부딪쳐야 하는 순간도 있을테니 미리 경험해본다 생각하도록.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "이번에는 모의 수사라 '사건입증'에 실패해도 얼마든지 불이익 없이 몇 번이고 다시 도전할 수 있으니, 부담 가질 필요도 없으니까 말일세.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "그럼, 사건에 대해 설명하겠다. 피해자의 이름은 김철수.",
              name: "감독관"
            },
            {
              image: "victim_neutral",
              line: "나이는 29세. 지병 없이 건강하고 건장한 체형이나 오늘 오후 자택에서 숨진채 발견되었다.",
              name: "김철수(고인)"
            },
            {
              image: "suspect2_neutral",
              line: "피해자를 가장 먼저 발견한 건 자택을 방문한 동생인 김현수.",
              name: "김현수"
            },
            {
              image: "inspector_neutral",
              line: "그 외에 사건 전후로 현장에 드나들었던 사람들은,",
              name: "감독관"
            },
            {
              image: "suspect1_neutral",
              line: "오전 중에 피해자를 방문했던 친구, 박유신",
              name: "박유신"
            },
            {
              image: "suspect3_neutral",
              line: "자택에서 일하는 가정부, 안연정이다.",
              name: "안연정"
            },
            {
              image: "inspector_neutral",
              line: "방 안을 조사하고 용의자들과 대화하여 사건의 전말을 밝히도록.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "비록 이 방은 가상의 사건을 재현한 공간이고, 용의자들은 연기자이나 실제 사건처럼 진지하게 임하길 바란다.",
              name: "감독관"
            },
            {
              image: "applicant4_neutral",
              line: "훗 이 정도는 너무 쉽군.",
              name: "???"
            },
            {
              image: "applicant4_neutral",
              line: "범인은 친구인 박유신이다!",
              name: "???"
            },
            {
              image: "inspector_neutral",
              line: "근거는?",
              name: "감독관"
            },
            {
              image: "applicant4_neutral",
              line: "뱀눈은 전형적인 범죄자상이지.",
              name: "???"
            },
            {
              image: "applicant4_neutral",
              line: "거기다 콧대와 콧방울이 얇아 자기 재산도 지키지 못 하는 상이군.",
              name: "???"
            },
            {
              image: "applicant4_neutral",
              line: "그렇다면 뻔하지. 피해자와 돈 문제 때문에 다투고 홧김에 죽인거야!",
              name: "???"
            },
            {
              image: "applicant4_neutral",
              line: "10년간 관상을 봐온 내 경력이 확실히 증명한다!",
              name: "???"
            },
            {
              image: "inspector_neutral",
              line: "....",
              name: "감독관"
            },
            {
              image: "sami_neutral",
              line: "....",
              name: "사미"
            }
          ],
          event: { eventKey: "start", eventData: {data: "no-clue"} }
        }
      }
      this.events.emit('quiz-event', 'start', start_config)
    }
  }

  update() {
    this.sceneload.update(this.npcs)

    this.npcs.forEach((npc) => {
      npc.anims.playAfterDelay({ key: 'front', repeat: Math.floor(Math.random()*5) }, 1000) 
    })
  }
}
