// mission: talk to inspector >> get hint+quiz
// >> (if solve quiz) talk to newspaper stand >> get item (마패)
// >> talk to inspector with item

import Phaser from 'phaser'
import NPC from '../GameObjects/NPC'
import back1 from '@/game/assets/test1_map/궁정리.png'
import back2 from '@/game/assets/test1_map/건물레이어(나무밑).png'
import treess from '@/game/assets/test1_map/다리자른 나무.png'
import house1 from '@/game/assets/test1_map/궁_0000s_0004_건물6_충돌버전.png'
import tree from '@/game/assets/test1_map/궁_0004_나무한그루_충돌.png'
import left_h_g from '@/game/assets/test1_map/경복궁왼쪽충돌.png'
import mid_h from '@/game/assets/test1_map/경복궁 충돌 중앙.png'
import mini_h from '@/game/assets/test1_map/미니집.png'
import left_h from '@/game/assets/test1_map/왼쪽집.png'
import tight_h from '@/game/assets/test1_map/오른쪽집.png'
import north_o from '@/game/assets/test1_map/위에 충돌(궁하나 혼자).png'
import west_o from '@/game/assets/test1_map/오른쪽에 충돌(궁하나 혼자).png'

import fo1 from '@/game/assets/test1_map/오른쪽숲1.png'
import fo2 from '@/game/assets/test1_map/오른쪽숲2.png'
import fo3 from '@/game/assets/test1_map/오른쪽숲3.png'
import fo4 from '@/game/assets/test1_map/오른쪽숲4.png'
import fo5 from '@/game/assets/test1_map/오른쪽숲5.png'
import fo6 from '@/game/assets/test1_map/오른쪽숲6.png'


import gr1 from '@/game/assets/test1_map/궁오른쪽1.png'
import gr2 from '@/game/assets/test1_map/궁오른쪽2.png'
import gr3 from '@/game/assets/test1_map/궁오른쪽3.png'
import gr4 from '@/game/assets/test1_map/궁오른쪽4.png'
import guard_flip from '../assets/npc_sprite/수문관_좌우반전.png'

// import npc spritesheet
import inspector_sprite from '../assets/npc_sprite/관리자.png'
import newspaper_sprite from '../assets/npc_sprite/신문팔이.png'
import applicant1_sprite from '../assets/npc_sprite/지원자1.png'
import applicant2_sprite from '../assets/npc_sprite/지원자2.png'
import applicant3_sprite from '../assets/npc_sprite/지원자3_간격조정.png'
import applicant4_sprite from '../assets/npc_sprite/지원자4.png'
import applicant5_sprite from '../assets/npc_sprite/지원자5.png'
import applicant6_sprite from '../assets/npc_sprite/지원자6.png'
import applicant7_sprite from '../assets/npc_sprite/지원자7.png'
import applicant8_sprite from '../assets/npc_sprite/지원자8.png'

// import npc + sami log image
import inspector_neutral from '../assets/npc_log/관리자.png'
import inspector_smile from '../assets/npc_log/관리자_웃음.png'
import newspaper_smile1 from '../assets/npc_log/신문팔이_이미지_1.png'
import newspaper_smile2 from '../assets/npc_log/신문팔이_이미지_2.png'
import applicant1_neutral from '../assets/npc_log/지원자1_이미지.png'
import applicant2_smile from '../assets/npc_log/지원자2_이미지.png'
import applicant3_think from '../assets/npc_log/지원자3_이미지.png'
import applicant4_neutral from '../assets/npc_log/지원자4_이미지.png'
import applicant5_sad from '../assets/npc_log/지원자5_이미지.png'
import guard_neutral from '../assets/npc_log/수문관_이미지.png'
import sami_smile from '../assets/sami_log/sami_웃음.png'
import sami_smile2 from '../assets/sami_log/sami_웃음2.png'
import sami_smile3 from '../assets/sami_log/sami_웃음3.png'
import sami_sus from '../assets/sami_log/sami_의심.png'
import sami_sure2 from '../assets/sami_log/sami_확신2.png'

const npcs_JSON = [
  {
    "name": "감독관",
    "id": "test1_inspector",
    "dialogue": {
      "clue": {
        dialogue: [
          {
            "image": "inspector_neutral",
            "line": "탐정 시험을 보러 온건가?",
            "name": "감독관"
          },
          {
            "image": "inspector_neutral",
            "line": "시험은 총 세 단계로 구성된다.",
            "name": "감독관"
          },
          {
            "image": "inspector_neutral",
            "line": "첫 번째 시험과 두 번째 시험은 이곳, 경무대에서 오늘 중으로 모두 치를 것이고,",
            "name": "감독관"
          },
          {
            "image": "inspector_neutral",
            "line": "세 번째 시험은 실제 현장에서 파견 감독관의 동행 하에 3일간 치러질 것이다.",
            "name": "감독관"
          },
          {
            "image": "inspector_neutral",
            "line": "받아라. 첫 번째 시험이다.",
            "name": "감독관"
          }
        ],
        event: { eventKey: "cJ89EcZyF5EHwElEGRGZ", eventData: {id: "test1_inspector", data: "inspector-clue"} }
      },
      "post_c_repeat": {
        dialogue: [
          {
            "image": "inspector_neutral",
            "line": "뭐지.",
            "name": "감독관"
          },
          {
            "image": "inspector_neutral",
            "line": "정답을 알아낸게 아니면 말을 걸지말라.",
            "name": "감독관"
          }
        ],
        event: null
      },
      "answer": {
        dialogue: [
          {
            "image": "inspector_smile",
            "line": "오호. 제법이군. 정답이다.",
            "name": "감독관"
          },
          {
            "image": "inspector_smile",
            "line": "두 번째 시험은 나를 따라오도록.",
            "name": "감독관"
          }
        ],
        event: { eventKey: "cJ89EcZyF5EHwElEGRGZ", eventData: {id: "test1_inspector", data: "inspector-clear"} },
        check: "k_detective_beta.test1_newspaper"
      }
    },
    "spritesheet": "inspector_sprite",
    "scale": 1.1,
    "anim_config": {
      "frames": {
        "0,4": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    "x": 465,
    "y": 445
  },
  {
    "name": "???",
    "id": "test1_applicant1",
    "dialogue": {
      "default": {
        dialogue: [
          {
            "image": "applicant1_neutral",
            "line": "아...이번 탐정 시험도 낙방하는 거 아닌가. 당장 이번 달 경비는 어디서 번담.",
            "name": "???"
          }
        ]
      }
    },
    "spritesheet": "applicant1_sprite",
    "scale": 4.5,
    "anim_config": {
      "frames": {
        "0,3": "walk_right",
        "4,5": "sigh_right",
        "5,6": "sigh_left",
        "6,9": "walk_left"
      },
      "repeat": {
        "walk_right": false,
        "sigh_right": false,
        "sigh_left": false,
        "walk_left": false
      },
      "default": null,
      "auto_start": false
    },
    "clue": null,
    "answer": null,
    "check": null,
    "x": 2400,
    "y": 700
  },
  {
    "name": "???",
    "id": "test1_applicant2",
    "dialogue": {
      "default": {
        dialogue: [
          {
            "image": "applicant2_smile",
            "line": "후후후 내 예감이 확실히 말해주고 있어.",
            "name": "???"
          },
          {
            "image": "applicant2_smile",
            "line": "확실해! 붉은 마패는 여기 있어!",
            "name": "???"
          }
        ]
      }
    },
    "spritesheet": "applicant2_sprite",
    "scale": 4.5,
    "anim_config": {
      "frames": {
        "0,7": "searching"
      },
      "repeat": {
        "searching": true
      },
      "default": "searching",
      "auto_start": true
    },
    "clue": null,
    "answer": null,
    "check": null,
    "x": 1070,
    "y": 1755
  },
  {
    "name": "???",
    "id": "test1_applicant3",
    "dialogue": {
      "default": {
        dialogue: [
          {
            "image": "applicant3_think",
            "line": "흠...붉은 마패..붉은 마패라....",
            "name": "???"
          }
        ]
      }
    },
    "spritesheet": "applicant3_sprite",
    "scale": 4.5,
    "anim_config": {
      "frames": {
        "0,5": "smoking"
      },
      "repeat": {
        "smoking": true
      },
      "default": "smoking",
      "auto_start": true
    },
    "clue": null,
    "answer": null,
    "check": null,
    "x": 500,
    "y": 800
  },
  {
    "name": "???",
    "id": "test1_applicant4",
    "dialogue": {
      "default": {
        dialogue: [
          {
            "image": "applicant4_neutral",
            "line": "오오오 보인다!",
            "name": "???"
          },
          {
            "image": "applicant4_neutral",
            "line": "보여..! 역시..그런 거였어!!",
            "name": "???"
          },
          {
            "image": "applicant4_neutral",
            "line": "예? 그게 아니라구요 선생님?",
            "name": "???"
          },
          {
            "image": null,
            "line": "(아무래도 사건 해결을 미신에 의지하는 사람인 것 같다. 무시하고 지나가자.)"
          }
        ]
      }
    },
    "spritesheet": "applicant4_sprite",
    "scale": 4.5,
    "anim_config": {
      "frames": {
        "0,7": "jumping"
      },
      "repeat": {
        "jumping": true
      },
      "default": "jumping",
      "auto_start": true
    },
    "clue": null,
    "answer": null,
    "check": null,
    "x": 2050,
    "y": 1200
  },
  {
    "name": "???",
    "id": "test1_applicant5",
    "dialogue": {
      "default": {
        dialogue: [
          {
            "image": "applicant5_sad",
            "line": "역시 당신이 '붉은 마패' 맞잖아요!",
            "name": "???"
          },
          {
            "image": "guard_neutral",
            "line": "거 그만두게도! 자꾸 이러면 형법에 따라 응당 값을 치르게 될 것이야!",
            "name": "수문장"
          }
        ]
      }
    },
    "spritesheet": "applicant5_sprite",
    "scale": 4.5,
    "anim_config": {
      "frames": {
        "0,4": "begging"
      },
      "repeat": {
        "begging": true
      },
      "default": "begging",
      "auto_start": true
    },
    "clue": null,
    "answer": null,
    "check": null,
    "x": 1162,
    "y": 1155
  },
  {
    "name": "???",
    "id": "test1_applicant6",
    "dialogue": null,
    "spritesheet": "applicant6_sprite",
    "scale": 5.0,
    "anim_config": {
      "frames": {
        "0,5": "throwing"
      },
      "repeat": {
        "throwing": true
      },
      "default": "throwing",
      "auto_start": true
    },
    "clue": null,
    "answer": null,
    "check": null,
    "x": 1800,
    "y": 1500
  },
  {
    "name": "???",
    "id": "test1_applicant7",
    "dialogue": null,
    "spritesheet": "applicant7_sprite",
    "scale": 4.5,
    "anim_config": {
      "frames": {
        "0,5": "throwing"
      },
      "repeat": {
        "throwing": true
      },
      "default": "throwing",
      "auto_start": true
    },
    "clue": null,
    "answer": null,
    "check": null,
    "x": 2300,
    "y": 1400
  },
  {
    "name": "???",
    "id": "test1_applicant8",
    "dialogue": null,
    "spritesheet": "applicant8_sprite",
    "scale": 4.5,
    "anim_config": {
      "frames": {
        "0,3": "praying"
      },
      "repeat": {
        "praying": true
      },
      "default": "praying",
      "auto_start": true
    },
    "clue": null,
    "answer": null,
    "check": null,
    "x": 1600,
    "y": 1780
  },
  {
    "name": "신문팔이",
    "id": "test1_newspaperstand",
    "dialogue": {
      "default": {
        dialogue: [
          {
            "image": "newspaper_smile1",
            "line": "신문 사세요.",
            "name": "???"
          },
          {
            "image": "newspaper_smile1",
            "line": "오늘자 신문 팝니다. 신문 사세요.",
            "name": "???"
          }
        ],
        event: null
      },
      "answer": {
        dialogue: [
          {
            "image": "sami_sure2",
            "line": "'붉은 마패' 한 부 주세요.",
            "name": "사미"
          },
          {
            "image": "newspaper_smile1",
            "line": "탐정 시험 보러오셨군요.",
            "name": "신문팔이"
          },
          {
            "image": "newspaper_smile2",
            "line": "여깄습니다. 남은 시험도 잘 보세요!",
            "name": "신문팔이"
          }
        ],
        event: { eventKey: "cJ89EcZyF5EHwElEGRGZ", eventData: {id: "test1_newspaperstand", data: "newspaper-get"} }
      },
      "post_a": {
        dialogue: [
          {
            "image": "newspaper_smile1",
            "line": "신문 사세요.",
            "name": "신문팔이"
          },
          {
            "image": "newspaper_smile1",
            "line": "오늘자 신문 팝니다. 신문 사세요.",
            "name": "신문팔이"
          }
        ],
        event: null
      }
    },
    "spritesheet": "newspaper_sprite",
    "scale": 4.7,
    "anim_config": {
      "frames": {
        "0,2": "default"
      },
      "repeat": {
        "default": true
      },
      "default": "default",
      "auto_start": true
    },
    "clue": null,
    "answer": {
      "name": "신문",
      "id": "k_detective_beta.test1_newspaper",
      "descript": "오늘자 제국익문사 신문이자, '붉은 마패'이다",
      "texture": "newspaper.png"
    },
    "check": null,
    "x": 2350,
    "y": 930
  }
]

export default class Test1 extends Phaser.Scene {
  constructor() {
    super({key: 'Test1'})
  }

  // init(player_config) {
  //   // pass player_config to sceneload plugin
  //   this.sceneload.init(player_config)
  // }

  preload() {
    // load map image
    this.load.image('back1', back1)
    this.load.image('back2', back2)
    this.load.image('treess', treess)
    
    // collision image
    this.load.image('house1', house1)
    this.load.image('tree', tree)
    this.load.image('left_h_g', left_h_g)
    this.load.image('mid_h', mid_h)
    this.load.image('mini_h', mini_h)
    this.load.image('left_h', left_h)
    this.load.image('right_h', tight_h)
    this.load.image('north_o', north_o)
    this.load.image('west_o', west_o)

    this.load.image('fo1', fo1)
    this.load.image('fo2', fo2)
    this.load.image('fo3', fo3)
    this.load.image('fo4', fo4)
    this.load.image('fo5', fo5)
    this.load.image('fo6', fo6)
    this.load.image('gr1', gr1)
    this.load.image('gr2', gr2)
    this.load.image('gr3', gr3)
    this.load.image('gr4', gr4)
    this.load.image('guard_flip', guard_flip)

    // load npc+sami image+spritesheet
    this.load.image('inspector_neutral', inspector_neutral)
    this.load.image('inspector_smile', inspector_smile)
    this.load.image('newspaper_smile1', newspaper_smile1)
    this.load.image('newspaper_smile2', newspaper_smile2)
    this.load.image('applicant1_neutral', applicant1_neutral)
    this.load.image('applicant2_smile', applicant2_smile)
    this.load.image('applicant3_think', applicant3_think)
    this.load.image('applicant4_neutral', applicant4_neutral)
    this.load.image('applicant5_sad', applicant5_sad)
    this.load.image('guard_neutral', guard_neutral)
    this.load.spritesheet('inspector_sprite', inspector_sprite, { frameWidth: 1893 / 5, frameHeight: 558 })
    this.load.spritesheet('newspaper_sprite', newspaper_sprite, { frameWidth: 324 / 3, frameHeight: 157 })
    this.load.spritesheet('applicant1_sprite', applicant1_sprite, { frameWidth: 880 / 10, frameHeight: 130 })
    this.load.spritesheet('applicant2_sprite', applicant2_sprite, { frameWidth: 856 / 8, frameHeight: 130 })
    this.load.spritesheet('applicant3_sprite', applicant3_sprite, { frameWidth: 528 / 6, frameHeight: 130 })
    this.load.spritesheet('applicant4_sprite', applicant4_sprite, { frameWidth: 856 / 8, frameHeight: 190 })
    this.load.spritesheet('applicant5_sprite', applicant5_sprite, { frameWidth: 770 / 5, frameHeight: 157 })
    this.load.spritesheet('applicant6_sprite', applicant6_sprite, { frameWidth: 924 / 6, frameHeight: 106 })
    this.load.spritesheet('applicant7_sprite', applicant7_sprite, { frameWidth: 924 / 6, frameHeight: 127 })
    this.load.spritesheet('applicant8_sprite', applicant8_sprite, { frameWidth: 428 / 4, frameHeight: 130 })
    this.load.image('sami_smile', sami_smile)
    this.load.image('sami_smile2', sami_smile2)
    this.load.image('sami_smile3', sami_smile3)
    this.load.image('sami_sus', sami_sus)
    this.load.image('sami_sure2', sami_sure2)

    // sceneload plugin preload()
    this.sceneload.preload()
  }

  create(data) {
    this.physics.world.setBounds(0,0,2800,1981)

    this.add.image(2800/2,1981/2,'back1')
    var platforms = this.physics.add.staticGroup() //그룹으로 묶는다. 
    var house_m = this.physics.add.staticGroup()
    var trees = this.physics.add.staticGroup()
    var tree_sss = this.physics.add.staticGroup()
    var col_left_h_g = this.physics.add.staticGroup()
    var col_mid_h = this.physics.add.staticGroup()
    var col_west_o = this.physics.add.staticGroup()
    var col_north_o = this.physics.add.staticGroup()
    var col_mini_h = this.physics.add.staticGroup()
    var col_left_h = this.physics.add.staticGroup()
    var col_right_h = this.physics.add.staticGroup()
    var col_fo1= this.physics.add.staticGroup()
    var col_fo2 = this.physics.add.staticGroup()
    var col_fo3 = this.physics.add.staticGroup()
    var col_fo4 = this.physics.add.staticGroup()
    var col_fo5 = this.physics.add.staticGroup()
    var col_fo6 = this.physics.add.staticGroup()
    var col_gr1 = this.physics.add.staticGroup()
    var col_gr2 = this.physics.add.staticGroup()
    var col_gr3 = this.physics.add.staticGroup()
    var col_gr4 = this.physics.add.staticGroup()

    // create guard_flip as static image
    this.physics.add.staticImage(750,1100,'guard_flip').setOrigin(0,0).setScale(0.7)

    house_m.create(1220*2, 775*2,'house1').refreshBody()
    tree_sss.create(700*2, 495.25*2,'treess').refreshBody().setDepth(10)
    platforms.create(700.45*2,495.25*2,'back2').refreshBody().setDepth(10)

    col_left_h_g.create(446.5*2,467*2,'left_h_g').refreshBody()
    col_mid_h.create(705*2,475*2,'mid_h').refreshBody()
    col_mini_h.create(2405,1753,'mini_h').refreshBody()
    col_mini_h.create(2495,1753,'mini_h').refreshBody()
    col_left_h.create(1295,1380,'left_h').refreshBody()
    col_right_h.create(1863,1325,'right_h').refreshBody()
    col_gr1.create(1726,809,'gr1').refreshBody()
    col_gr2.create(1648,943,'gr2').refreshBody()
    col_gr3.create(1780,888,'gr3').refreshBody()
    col_gr4.create(1756,968,'gr4').refreshBody()
    col_fo1.create(2478,317,'fo1').refreshBody()
    col_fo2.create(2074,61,'fo2').refreshBody()
    col_fo3.create(2330,123,'fo3').refreshBody()
    col_fo4.create(2398,229,'fo4').refreshBody()
    col_fo5.create(2340,325/2,'fo5').refreshBody()
    col_fo6.create(2309.5,196/2,'fo6').refreshBody()

    col_north_o.create(1574,470,'north_o').refreshBody()
    col_west_o.create(2570,948,'west_o').refreshBody()

    //나무 심기(충돌때문에 하나씩)
    //왼쪽 위에 숲
    trees.create(95*2, 65*2,'tree').setScale(0.8).refreshBody()
    trees.create(155*2, 30*2,'tree').setScale(0.8).refreshBody()
    trees.create(215*2, 20*2,'tree').setScale(0.8).refreshBody()
    trees.create(90*2, 165*2,'tree').setScale(0).refreshBody()
    trees.create(120*2, 225*2,'tree').setScale(0.8).refreshBody()
    //위 중앙 숲
    trees.create(330*2, 190*2,'tree').setScale(0.8).refreshBody()
    trees.create(350*2, 95*2,'tree').setScale(0.8).refreshBody()
    trees.create(400*2, 25*2,'tree').setScale(0.8).refreshBody()
    trees.create(490*2, 20*2,'tree').setScale(0.8).refreshBody()
    trees.create(435*2, 80*2,'tree').setScale(0.8).refreshBody()
    trees.create(435*2, 80*2,'tree').setScale(0.8).refreshBody()
    trees.create(465*2, 150*2,'tree').setScale(0.8).refreshBody()
    trees.create(430*2, 230*2,'tree').setScale(0.8).refreshBody()
    trees.create(485*2, 280*2,'tree').setScale(0.8).refreshBody()
    trees.create(520*2, 135*2,'tree').setScale(0.8).refreshBody()
    trees.create(535*2, 85*2,'tree').setScale(0.8).refreshBody()
    trees.create(525*2, 210*2,'tree').setScale(0.8).refreshBody()
    trees.create(630*2, 165*2,'tree').setScale(0.8).refreshBody()
    trees.create(620*2, 104*2,'tree').setScale(0.8).refreshBody()
    
    //중간 숲
    trees.create(270*2, 753*2,'tree').setScale(0.8).refreshBody()
    trees.create(385*2, 750*2,'tree').setScale(0.8).refreshBody()
    trees.create(425*2, 640*2,'tree').setScale(0.8).refreshBody()
    trees.create(1090*2, 640*2,'tree').setScale(0.8).refreshBody()
    trees.create(1175*2, 627*2,'tree').setScale(0.8).refreshBody()
    trees.create(1235*2, 638*2,'tree').setScale(0.8).refreshBody()

    //밑에 숲
    trees.create(80*2, 698*2,'tree').setScale(0.8).refreshBody()
    trees.create(100*2, 778*2,'tree').setScale(0.8).refreshBody()
    trees.create(90*2, 930*2,'tree').setScale(0.8).refreshBody()
    trees.create(150*2, 985*2,'tree').setScale(0.8).refreshBody()
    trees.create(160*2, 937*2,'tree').setScale(0.8).refreshBody()
    trees.create(250*2, 990.5*2,'tree').setScale(0.8).refreshBody()
    trees.create(340*2, 990.5*2,'tree').setScale(0.8).refreshBody()
    trees.create(395*2, 970*2,'tree').setScale(0.8).refreshBody()
    trees.create(492*2, 984*2,'tree').setScale(0.8).refreshBody()
    trees.create(553*2, 962*2,'tree').setScale(0.8).refreshBody()
    trees.create(568*2, 863*2,'tree').setScale(0.8).refreshBody()
    trees.create(626*2, 889*2,'tree').setScale(0.8).refreshBody()
    trees.create(705*2, 896*2,'tree').setScale(0.8).refreshBody()
    trees.create(760*2, 962*2,'tree').setScale(0.8).refreshBody()
    trees.create(623*2, 963*2,'tree').setScale(0.8).refreshBody()


    trees.create(1706, 1930,'tree').setScale(0.8).refreshBody()
    trees.create(1764, 1740,'tree').setScale(0.8).refreshBody()
    trees.create(1870, 1718,'tree').setScale(0.8).refreshBody()
    trees.create(1842, 1897,'tree').setScale(0.8).refreshBody()
    trees.create(1940, 1755,'tree').setScale(0.8).refreshBody()
    trees.create(2000, 1900,'tree').setScale(0.8).refreshBody()
    trees.create(2122, 1922,'tree').setScale(0.8).refreshBody()
    trees.create(2190, 1974,'tree').setScale(0.8).refreshBody()
    trees.create(2350, 1944,'tree').setScale(0.8).refreshBody()
    trees.create(2540, 1900,'tree').setScale(0.8).refreshBody()
    trees.create(2640, 1850,'tree').setScale(0.8).refreshBody()
    trees.create(2690, 1690,'tree').setScale(0.8).refreshBody()
    trees.create(2738, 1516,'tree').setScale(0.8).refreshBody()
    trees.create(2627, 1505,'tree').setScale(0.8).refreshBody()
    trees.create(2654, 1344,'tree').setScale(0.8).refreshBody()
    trees.create(2776, 1243,'tree').setScale(0.8).refreshBody()

    const colliders = [ house_m, trees, tree_sss,
        col_left_h_g, col_left_h, col_mid_h, col_mini_h, col_north_o, col_right_h, col_west_o,
        col_fo1, col_fo2, col_fo3, col_fo4, col_fo5, col_fo6,
        col_gr1, col_gr2, col_gr3, col_gr4 ]

    // create NPCs
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
        npc.d_question,
        npc.options_config
      ))
    })

    const camera_config = {
      'main_zoom': 0.9,
      'mini_zoom': 0.065,
      'mini_scrollX': 1306,
      'mini_scrollY': 925
    }
    this.sceneload.create(colliders, [], this.npcs, camera_config, data)
    this.game.stage.mapEvent(this) // activate stage
  }

  update() {
    this.sceneload.update([], this.npcs)

    const npc_applicant1 = this.npcs.find((ele) => ele.id == 'test1_applicant1')
    npc_applicant1.anims.playAfterDelay({ key: 'walk_right', repeat: 3 }, 1000)
    npc_applicant1.anims.chain({ key: 'sigh_right', repeat: 1 })
    npc_applicant1.anims.playAfterDelay({ key: 'walk_left', repeat: 3 }, 1000)
    npc_applicant1.anims.chain({ key: 'sigh_left', repeat: 1 })
  }
}