// mission: talk to inspector >> get hint+quiz
// >> (if solve quiz) talk to newspaper stand >> get item (마패)
// >> talk to inspector with item

import Phaser from 'phaser'
import SCENE_DEFAULT_CONFIG from './config/SCENE_DEFAULT_CONFIG.json'
import NPC from '../GameObjects/NPC'
import Item2 from '../GameObjects/Item2'
import back from '@/game/assets/test1_map/back.png'
import back_float from '@/game/assets/test1_map/back_float.png'
import tree_float from '@/game/assets/test1_map/tree_float.png'
import tree from '@/game/assets/test1_map/tree_collide.png'

import fo1 from '@/game/assets/test1_map/forest1.png'
import fo2 from '@/game/assets/test1_map/forest2.png'
import fo3 from '@/game/assets/test1_map/forest3.png'
import fo4 from '@/game/assets/test1_map/forest4.png'
import fo5 from '@/game/assets/test1_map/forest5.png'
import fo6 from '@/game/assets/test1_map/forest6.png'

import house1_body1 from '@/game/assets/test1_map/house1_body1.png'
import house1_body2 from '@/game/assets/test1_map/house1_body2.png'
import house1_body3 from '@/game/assets/test1_map/house1_body3.png'
import house1_body4 from '@/game/assets/test1_map/house1_body4.png'
import house1_body5 from '@/game/assets/test1_map/house1_body5.png'
import house1_body6 from '@/game/assets/test1_map/house1_body6.png'
import house1_body7 from '@/game/assets/test1_map/house1_body7.png'
import house1_body8 from '@/game/assets/test1_map/house1_body8.png'
import house1_body9 from '@/game/assets/test1_map/house1_body9.png'
import house1_body10 from '@/game/assets/test1_map/house1_body10.png'
import house1_body11 from '@/game/assets/test1_map/house1_body11.png'
import house2_body from '@/game/assets/test1_map/house2_body.png'
import house3_body from '@/game/assets/test1_map/house3_body.png'
import house4_body from '@/game/assets/test1_map/house4_body.png'
import house5_body from '@/game/assets/test1_map/house5_body.png'
import small_roof from '@/game/assets/test1_map/small_roof.png'

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
    this.load.image('back', back)
    // float image
    this.load.image('back_float', back_float)
    this.load.image('tree_float', tree_float)
    
    // collision image
    this.load.image('tree', tree) // tree
    this.load.image('fo1', fo1) // top-right forest
    this.load.image('fo2', fo2)
    this.load.image('fo3', fo3)
    this.load.image('fo4', fo4)
    this.load.image('fo5', fo5)
    this.load.image('fo6', fo6)
    this.load.image('house1_body1', house1_body1) // house
    this.load.image('house1_body2', house1_body2)
    this.load.image('house1_body3', house1_body3)
    this.load.image('house1_body4', house1_body4)
    this.load.image('house1_body5', house1_body5)
    this.load.image('house1_body6', house1_body6)
    this.load.image('house1_body7', house1_body7)
    this.load.image('house1_body8', house1_body8)
    this.load.image('house1_body9', house1_body9)
    this.load.image('house1_body10', house1_body10)
    this.load.image('house1_body11', house1_body11)
    this.load.image('house2_body', house2_body)
    this.load.image('house3_body', house3_body)
    this.load.image('house4_body', house4_body)
    this.load.image('house5_body', house5_body)
    this.load.image('small_roof', small_roof)

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

    this.add.image(2800/2,1981/2,'back')
    // add float image
    this.add.image(2800/2,1981/2,'back_float').setDepth(15)
    this.add.image(2800/2,1981/2,'tree_float').setDepth(15)
    //그룹으로 묶는다.
    var col_trees = this.physics.add.staticGroup()
    var col_houses = this.physics.add.staticGroup()
    var col_tr_forest= this.physics.add.staticGroup()

    // create guard_flip as static image
    this.physics.add.staticImage(750,1100,'guard_flip').setOrigin(0,0).setScale(0.7)

    // create house collision body
    col_houses.create(889, 962, 'house1_body1').refreshBody()
    col_houses.create(1410, 973, 'house1_body2').refreshBody()
    col_houses.create(1722, 812, 'house1_body3').refreshBody()
    col_houses.create(1708, 886, 'house1_body4').refreshBody()
    col_houses.create(1698, 926, 'house1_body5').refreshBody()
    col_houses.create(1628, 986, 'house1_body6').refreshBody()
    col_houses.create(1702, 980, 'house1_body7').refreshBody()
    col_houses.create(1725, 978, 'house1_body8').refreshBody()
    col_houses.create(1778, 948, 'house1_body9').refreshBody()
    col_houses.create(1768, 965, 'house1_body10').refreshBody()
    col_houses.create(1758, 993, 'house1_body11').refreshBody()
    col_houses.create(1578, 488, 'house2_body').refreshBody()
    col_houses.create(2576, 958, 'house3_body').refreshBody()
    col_houses.create(1295, 1384, 'house4_body').refreshBody()
    col_houses.create(1862, 1328, 'house5_body').refreshBody()
    
    col_houses.setVisible(false) // set visible false

    // create top-right forest collision body
    col_tr_forest.create(2478, 317, 'fo1').refreshBody
    col_tr_forest.create(2074, 61, 'fo2').refreshBody
    col_tr_forest.create(2330, 123, 'fo3').refreshBody
    col_tr_forest.create(2398, 229, 'fo4').refreshBody
    col_tr_forest.create(2340, 325/2, 'fo5').refreshBody
    col_tr_forest.create(2309.5, 98, 'fo6').refreshBody

    //나무 심기(충돌때문에 하나씩)
    //왼쪽 위에 숲
    col_trees.create(95*2, 65*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(155*2, 30*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(215*2, 20*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(90*2, 165*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(120*2, 225*2,'tree').setScale(0.8).refreshBody()
    //위 중앙 숲
    col_trees.create(330*2, 190*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(350*2, 95*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(400*2, 25*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(490*2, 20*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(435*2, 80*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(435*2, 80*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(465*2, 150*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(430*2, 230*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(485*2, 280*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(520*2, 135*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(535*2, 85*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(525*2, 210*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(630*2, 165*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(620*2, 104*2,'tree').setScale(0.8).refreshBody()
    
    //중간 숲
    col_trees.create(270*2, 753*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(385*2, 750*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(425*2, 640*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(1090*2, 640*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(1175*2, 627*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(1235*2, 638*2,'tree').setScale(0.8).refreshBody()

    //밑에 숲
    col_trees.create(80*2, 698*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(100*2, 778*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(90*2, 930*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(150*2, 985*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(160*2, 937*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(250*2, 990.5*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(340*2, 990.5*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(395*2, 970*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(492*2, 984*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(553*2, 962*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(568*2, 863*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(626*2, 889*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(705*2, 896*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(760*2, 962*2,'tree').setScale(0.8).refreshBody()
    col_trees.create(623*2, 963*2,'tree').setScale(0.8).refreshBody()


    col_trees.create(1706, 1930,'tree').setScale(0.8).refreshBody()
    col_trees.create(1764, 1740,'tree').setScale(0.8).refreshBody()
    col_trees.create(1870, 1718,'tree').setScale(0.8).refreshBody()
    col_trees.create(1842, 1897,'tree').setScale(0.8).refreshBody()
    col_trees.create(1940, 1755,'tree').setScale(0.8).refreshBody()
    col_trees.create(2000, 1900,'tree').setScale(0.8).refreshBody()
    col_trees.create(2122, 1922,'tree').setScale(0.8).refreshBody()
    col_trees.create(2190, 1974,'tree').setScale(0.8).refreshBody()
    col_trees.create(2350, 1944,'tree').setScale(0.8).refreshBody()
    col_trees.create(2540, 1900,'tree').setScale(0.8).refreshBody()
    col_trees.create(2640, 1850,'tree').setScale(0.8).refreshBody()
    col_trees.create(2690, 1690,'tree').setScale(0.8).refreshBody()
    col_trees.create(2738, 1516,'tree').setScale(0.8).refreshBody()
    col_trees.create(2627, 1505,'tree').setScale(0.8).refreshBody()
    col_trees.create(2654, 1344,'tree').setScale(0.8).refreshBody()
    col_trees.create(2776, 1243,'tree').setScale(0.8).refreshBody()

    const colliders = [ col_trees, col_houses, col_tr_forest ]

    // create Items
    this.items = []
    SCENE_DEFAULT_CONFIG['Test1'].item_json.forEach((item) => {
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
    SCENE_DEFAULT_CONFIG['Test1'].npc_json.forEach((npc) => {
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
    this.sceneload.create(colliders, this.items, this.npcs, camera_config, data)
    this.game.stage.mapEvent(this) // activate stage
  }

  update() {
    this.sceneload.update(this.npcs)
  }
}