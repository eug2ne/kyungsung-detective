// mission: talk to inspector >> get hint+quiz
// >> (if solve quiz) talk to newspaper stand >> get item (마패)
// >> talk to inspector with item

import Phaser from 'phaser'
import Item from '../GameObjects/Item'
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

// import npc spritesheet
import inspector_sprite from '../assets/npc_sprite/맵 관리자.png'

// import npc log image
import inspector_neutral from '../assets/npc_log/관리자.png'
import inspector_smile from '../assets/npc_log/관리자_웃음.png'

const npcs_JSON = [
  {
    "name": "감독관",
    "id": "test1_inspector",
    "dialogue": {
      "clue": [
        {
          "image": "inspector_neutral",
          "line": "탐정 시험을 보러 온건가?"
        },
        {
          "image": "inspector_neutral",
          "line": "받아라. 첫 번째 문제다."
        }
      ],
      "post_c_repeat": [
        {
          "image": "inspector_neutral",
          "line": "뭐지."
        },
        {
          "image": "inspector_neutral",
          "line": "정답을 알아낸게 아니면 말을 걸지말라."
        }
      ],
      "answer": [
        {
          "image": "inspector_smile",
          "line": "오호. 제법이군. 정답이다."
        },
        {
          "image": "inspector_smile",
          "line": "두 번째 문제는 나를 따라오도록."
        }
      ]
    },
    "question": null,
    "spritesheet": "inspector_sprite",
    "scale": 1.2,
    "anim_config": {
      "frames": {
        "1,4": "left",
        "5,8": "back",
        "9,12": "front",
        "13,16": "right"
      },
      "repeat": {
        "left": false,
        "back": false,
        "front": true,
        "right": false
      },
      "default": "front",
      "auto_start": true
    },
    "clue": {
      "story": "시작",
      "title": "붉은 마패를 찾아라.",
      "description": "탐정시험의 첫 번째 문제는 붉은 마패를 찾아오는 것이다. 붉은 마패는 어디 있을까?",
      "background_img": "../assets/item/붉은마패_배경투명화.png",
      "subClues": [
        {
          "title": "붉은 마패를 찾았다!",
          "description": "붉은 마패는 황실에서 발행하는 신문을 말하는 것이다. 신문팔이에게 가서 붉은 마패를 달라고 해보자!",
          "quiz_id": null,
          "background_img": null,
          "require": false
        }
      ]
    },
    "answer": null,
    "x": 1000,
    "y": 1600
  },
  {
    "name": "신문팔이",
    "id": "test1_newpaperstand",
    "dialogue": {
      "post_c_repeat": [
        {
          "image": null,
          "line": "신문 사세요."
        },
        {
          "image": null,
          "line": "오늘자 신문 팝니다. 신문 사세요."
        }
      ],
      "answer": [
        {
          "image": null,
          "line": "'붉은 마패' 한 부 주세요."
        },
        {
          "image": null,
          "line": "탐정 시험 보러오셨군요."
        },
        {
          "image": null,
          "line": "여깄습니다. 남은 시험도 잘 보세요!"
        }
      ]
    },
    "question": null,
    "spritesheet": "inspector_sprite",
    "scale": 1.2,
    "anim_config": {
      "frames": {
        "1,4": "left",
        "5,8": "back",
        "9,12": "front",
        "13,16": "right"
      },
      "repeat": {
        "left": false,
        "back": false,
        "front": true,
        "right": false
      },
      "default": "front",
      "auto_start": true
    },
    "clue": null,
    "answer": null,
    "x": 2000,
    "y": 900
  }
]

export default class Test1_Scene extends Phaser.Scene {
  constructor () {
    super({'key':'Test1'})
  }

  init(player_config) {
    // pass player_config to sceneload plugin
    this.sceneload.init(player_config)
  }

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

    // load npc image+spritesheet
    this.load.image('inspector_neutral', inspector_neutral)
    this.load.image('inspector_smile', inspector_smile)
    this.load.spritesheet('inspector_sprite', inspector_sprite, { frameWidth: 6528 / 17, frameHeight: 558 })

    // sceneload plugin preload()
    this.sceneload.preload()
  }

  create() {
    this.physics.world.setBounds(0, 0, 2800,1981)

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

    house_m.create(1220*2, 775*2,'house1').refreshBody()
    tree_sss.create(700*2, 495.25*2,'treess').refreshBody().setDepth(10)
    platforms.create(700.45*2,495.25*2,'back2').refreshBody().setDepth(5)

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
        npc.id,
        npc.spritesheet,
        npc.scale,
        npc.anim_config,
        npc.x,
        npc.y,
        npc.dialogue,
        npc.question,
        npc.clue,
        npc.answer
      ))
    })
    
    const camera_config = {
      'main_zoom': 0.9,
      'mini_zoom': 0.065,
      'mini_scrollX': 1306,
      'mini_scrollY': 925
    }

    this.sceneload.create(colliders, [], this.npcs, camera_config)
  }

  update() {
    this.sceneload.update([], this.npcs)
  }
}