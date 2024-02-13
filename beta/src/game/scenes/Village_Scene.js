import Phaser from 'phaser'
import { useGameStore } from '../game'
import SCENE_DEFAULT_CONFIG from './config/SCENE_DEFAULT_CONFIG.json'
import Item2 from "../GameObjects/Item2"
import NPC from "../GameObjects/NPC"
import vback from '@/game/assets/villagescene/마을최종-2800.png'
// import float-image
import vhouse_float from '@/game/assets/villagescene/마을최종-housefloat.png'
import vlighttree_float from '@/game/assets/villagescene/마을최종-lighttree.png'
import vdarktree_float from '@/game/assets/villagescene/마을최종-darktree.png'
import vtree_float from '@/game/assets/villagescene/마을최종-2800-tree.png'

import house1_body1 from '@/game/assets/villagescene/house1_body1.png'
import house1_body2 from '@/game/assets/villagescene/house1_body2.png'
import house1_body3 from '@/game/assets/villagescene/house1_body3.png'
import house1_body4 from '@/game/assets/villagescene/house1_body4.png'
import house1_body5 from '@/game/assets/villagescene/house1_body5.png'
import house1_body6 from '@/game/assets/villagescene/house1_body6.png'
import house1_body7 from '@/game/assets/villagescene/house1_body7.png'
import house1_body8 from '@/game/assets/villagescene/house1_body8.png'
import house1_body9 from '@/game/assets/villagescene/house1_body9.png'
import house2_body1 from '@/game/assets/villagescene/house2_body1.png'
import house2_body2 from '@/game/assets/villagescene/house2_body2.png'
import house2_body3 from '@/game/assets/villagescene/house2_body3.png'
import house2_body4 from '@/game/assets/villagescene/house2_body4.png'
import house2_body5 from '@/game/assets/villagescene/house2_body5.png'
import house3_body1 from '@/game/assets/villagescene/house3_body1.png'
import house3_body2 from '@/game/assets/villagescene/house3_body2.png'
import house3_body3 from '@/game/assets/villagescene/house3_body3.png'
import house3_body4 from '@/game/assets/villagescene/house3_body4.png'
import house3_body5 from '@/game/assets/villagescene/house3_body5.png'
import house4_body1 from '@/game/assets/villagescene/house4_body1.png'
import house4_body2 from '@/game/assets/villagescene/house4_body2.png'
import house4_body3 from '@/game/assets/villagescene/house4_body3.png'
import house4_body4 from '@/game/assets/villagescene/house4_body4.png'
import house4_body5 from '@/game/assets/villagescene/house4_body5.png'
import house5_body1 from '@/game/assets/villagescene/house5_body1.png'
import house5_body2 from '@/game/assets/villagescene/house5_body2.png'

import vfield from '@/game/assets/villagescene/논밭.png'
import vfield_1_1 from '@/game/assets/villagescene/논밭_1_1.png'
import vfield_1_2 from '@/game/assets/villagescene/논밭_1_2.png'
import vfield_2_1 from '@/game/assets/villagescene/논밭_2_1.png'
import vfield_2_2 from '@/game/assets/villagescene/논밭_2_2.png'
import vfield_2_3 from '@/game/assets/villagescene/논밭_2_3.png'
import vfield_2_4 from '@/game/assets/villagescene/논밭_2_4.png'
import vfield_3_1 from '@/game/assets/villagescene/논밭_3_1.png'
import vfield_3_2 from '@/game/assets/villagescene/논밭_3_2.png'
import vfield_3_3 from '@/game/assets/villagescene/논밭_3_3.png'
import vfield_4_1 from '@/game/assets/villagescene/논밭_4_1.png'
import vfield_4_2 from '@/game/assets/villagescene/논밭_4_2.png'
import vfield_4_3 from '@/game/assets/villagescene/논밭_4_3.png'
import vcutted_tree from '@/game/assets/villagescene/다리자른나무.png'
import vtree from '@/game/assets/villagescene/나무충돌.png'
import vgrass_1 from '@/game/assets/villagescene/풀_1.png'
import vgrass_2 from '@/game/assets/villagescene/풀_2.png'
import vgrass_3 from '@/game/assets/villagescene/풀_3.png'
import vgrass_4 from '@/game/assets/villagescene/풀_4.png'
import vgrass_5 from '@/game/assets/villagescene/풀_5.png'
import vgrass_6 from '@/game/assets/villagescene/풀_6.png'
import vgrass_7 from '@/game/assets/villagescene/풀_7.png'
import vgrass_8 from '@/game/assets/villagescene/풀_8.png'
import vgrass_9 from '@/game/assets/villagescene/풀_9.png'
import vgrass_10 from '@/game/assets/villagescene/풀_10.png'
import vgrass_11 from '@/game/assets/villagescene/풀_11.png'
import vgrass_12 from '@/game/assets/villagescene/풀_12.png'
import mat from '@/game/assets/villagescene/mat.png'

// import npc spritesheet
import missing1mom_sprite from '@/game/assets/npc_sprite/missing1mom_spritesheet.png'
import missing1bro_sprite from '@/game/assets/npc_sprite/missing1bro_spritesheet.png'
import missing1sis_sprite from '@/game/assets/npc_sprite/missing1sis_spritesheet.png'
import missing2mom_sprite from '@/game/assets/npc_sprite/missing2mom_spritesheet.png'
import missing3mom_sprite from '@/game/assets/npc_sprite/missing3mom_spritesheet.png'
import missing3bro_sprite from '@/game/assets/npc_sprite/missing3bro_spritesheet.png'
import missing4mom_sprite from '@/game/assets/npc_sprite/missing4mom_spritesheet.png'
import villager1_sprite from '@/game/assets/npc_sprite/villager1_spritesheet.png'
import villager2_sprite from '@/game/assets/npc_sprite/villager2_spritesheet.png'
import villager3_sprite from '@/game/assets/npc_sprite/villager3_spritesheet.png'
import villager4_sprite from '@/game/assets/npc_sprite/villager4_spritesheet.png'
import police_sprite from '@/game/assets/npc_sprite/police_spritesheet.png'
import inspector_sprite from '@/game/assets/npc_sprite/inspector_spritesheet.png'

// import npc + sami log image
import missing1_angry from '@/game/assets/npc_log/missing1_angry.png'
import missing1_cry from '@/game/assets/npc_log/missing1_cry.png'
import missing1_neutral from '@/game/assets/npc_log/missing1_neutral.png'
import missing1_smile from '@/game/assets/npc_log/missing1_smile.png'
import missing1_surprise from '@/game/assets/npc_log/missing1_surprise.png'
import missing1bro_smile1 from '@/game/assets/npc_log/missing1bro_smile1.png'
import missing1bro_smile2 from '@/game/assets/npc_log/missing1bro_smile2.png'
import missing1bro_surprise from '@/game/assets/npc_log/missing1bro_surprise.png'
import missing1bro_worry from '@/game/assets/npc_log/missing1bro_worry.png'
import missing1mom_angry from '@/game/assets/npc_log/missing1mom_angry.png'
import missing1mom_neutral from '@/game/assets/npc_log/missing1mom_neutral.png'
import missing1mom_worry from '@/game/assets/npc_log/missing1mom_worry.png'
import missing1sis_neutral from '@/game/assets/npc_log/missing1sis_neutral.png'
import missing1sis_surprise from '@/game/assets/npc_log/missing1sis_surprise.png'
import missing1sis_sus from '@/game/assets/npc_log/missing1sis_sus.png'
import missing2_neutral from '@/game/assets/npc_log/missing2_neutral.png'
import missing2_pain from '@/game/assets/npc_log/missing2_pain.png'
import missing2_smile from '@/game/assets/npc_log/missing2_smile.png'
import missing2_surprise from '@/game/assets/npc_log/missing2_surprise.png'
import missing2mom_neutral from '@/game/assets/npc_log/missing2mom_neutral.png'
import missing2mom_sad from '@/game/assets/npc_log/missing2mom_sad.png'
import missing2mom_smile from '@/game/assets/npc_log/missing2mom_smile.png'
import missing2mom_surprise1 from '@/game/assets/npc_log/missing2mom_surprise1.png'
import missing2mom_surprise2 from '@/game/assets/npc_log/missing2mom_surprise2.png'
import missing2mom_worry from '@/game/assets/npc_log/missing2mom_worry.png'
import missing3_angry from '@/game/assets/npc_log/missing3_angry.png'
import missing3_neutral from '@/game/assets/npc_log/missing3_neutral.png'
import missing3_smile from '@/game/assets/npc_log/missing3_smile.png'
import missing3_surprise from '@/game/assets/npc_log/missing3_surprise.png'
import missing3_think from '@/game/assets/npc_log/missing3_think.png'
import missing3bro_angry from '@/game/assets/npc_log/missing3bro_angry.png'
import missing3bro_cry1 from '@/game/assets/npc_log/missing3bro_cry1.png'
import missing3bro_cry2 from '@/game/assets/npc_log/missing3bro_cry2.png'
import missing3bro_neutral from '@/game/assets/npc_log/missing3bro_neutral.png'
import missing3bro_smile from '@/game/assets/npc_log/missing3bro_smile.png'
import missing3mom_neutral from '@/game/assets/npc_log/missing3mom_neutral.png'
import missing3mom_sorry from '@/game/assets/npc_log/missing3mom_sorry.png'
import missing3mom_worry from '@/game/assets/npc_log/missing3mom_worry.png'
import missing4_neutral from '@/game/assets/npc_log/missing4_neutral.png'
import missing4_sick from '@/game/assets/npc_log/missing4_sick.png'
import missing4mom_angry from '@/game/assets/npc_log/missing4mom_angry.png'
import missing4mom_sad from '@/game/assets/npc_log/missing4mom_sad.png'
import missing4mom_surprise from '@/game/assets/npc_log/missing4mom_surprise.png'
import missing4mom_worry from '@/game/assets/npc_log/missing4mom_worry.png'
import villager1_smile from '@/game/assets/npc_log/villager1_smile.png'
import villager1_worry from '@/game/assets/npc_log/villager1_worry.png'
import villager2_smile from '@/game/assets/npc_log/villager2_smile.png'
import villager2_worry from '@/game/assets/npc_log/villager2_worry.png'
import villager3_neutral from '@/game/assets/npc_log/villager3_neutral.png'
import villager4_neutral from '@/game/assets/npc_log/villager4_neutral.png'
import police_neutral from '@/game/assets/npc_log/police_neutral.png'
import inspector_neutral from '@/game/assets/npc_log/inspector_neutral.png'
import sami_neutral from '@/game/assets/sami_log/sami_무표정.png'
import sami_frown from '@/game/assets/sami_log/sami_삐짐.png'
import sami_disappointment from '@/game/assets/sami_log/sami_실망.png'
import sami_surprise from '@/game/assets/sami_log/sami_화.png'

export default class VillageScene extends Phaser.Scene {
  constructor () {
    super({key: 'Village'})
  }

  init(player_config) {
    this.sceneload.init(player_config)
  }

  preload() {
    this.load.image('vback', vback)
    this.load.image('mat', mat)
    this.load.image('vhouse_float', vhouse_float)
    this.load.image('vlighttree_float', vlighttree_float)
    this.load.image('vdarktree_float', vdarktree_float)
    this.load.image('vtree_float', vtree_float)
    
    this.load.image('house1_body1', house1_body1)
    this.load.image('house1_body2', house1_body2)
    this.load.image('house1_body3', house1_body3)
    this.load.image('house1_body4', house1_body4)
    this.load.image('house1_body5', house1_body5)
    this.load.image('house1_body6', house1_body6)
    this.load.image('house1_body7', house1_body7)
    this.load.image('house1_body8', house1_body8)
    this.load.image('house1_body9', house1_body9)
    this.load.image('house2_body1', house2_body1)
    this.load.image('house2_body2', house2_body2)
    this.load.image('house2_body3', house2_body3)
    this.load.image('house2_body4', house2_body4)
    this.load.image('house2_body5', house2_body5)
    this.load.image('house3_body1', house3_body1)
    this.load.image('house3_body2', house3_body2)
    this.load.image('house3_body3', house3_body3)
    this.load.image('house3_body4', house3_body4)
    this.load.image('house3_body5', house3_body5)
    this.load.image('house4_body1', house4_body1)
    this.load.image('house4_body2', house4_body2)
    this.load.image('house4_body3', house4_body3)
    this.load.image('house4_body4', house4_body4)
    this.load.image('house4_body5', house4_body5)
    this.load.image('house5_body1', house5_body1)
    this.load.image('house5_body2', house5_body2)

    this.load.image('vfield', vfield)
    this.load.image('vfield_1_1', vfield_1_1)
    this.load.image('vfield_1_2', vfield_1_2)
    this.load.image('vfield_2_1', vfield_2_1)
    this.load.image('vfield_2_2', vfield_2_2)
    this.load.image('vfield_2_3', vfield_2_3)
    this.load.image('vfield_2_4', vfield_2_4)
    this.load.image('vfield_3_1', vfield_3_1)
    this.load.image('vfield_3_2', vfield_3_2)
    this.load.image('vfield_3_3', vfield_3_3)
    this.load.image('vfield_4_1', vfield_4_1)
    this.load.image('vfield_4_2', vfield_4_2)
    this.load.image('vfield_4_3', vfield_4_3)

    this.load.image('vcutted_tree', vcutted_tree)
    this.load.image('vtree', vtree)

    this.load.image('vgrass_1', vgrass_1)
    this.load.image('vgrass_2', vgrass_2)
    this.load.image('vgrass_3', vgrass_3)
    this.load.image('vgrass_4', vgrass_4)
    this.load.image('vgrass_5', vgrass_5)
    this.load.image('vgrass_6', vgrass_6)
    this.load.image('vgrass_7', vgrass_7)
    this.load.image('vgrass_8', vgrass_8)
    this.load.image('vgrass_9', vgrass_9)
    this.load.image('vgrass_10', vgrass_10)
    this.load.image('vgrass_11', vgrass_11)
    this.load.image('vgrass_12', vgrass_12)

    // load npc spritesheet
    this.load.spritesheet('missing1mom_sprite', missing1mom_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing1bro_sprite', missing1bro_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing1sis_sprite', missing1sis_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing2mom_sprite', missing2mom_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing3mom_sprite', missing3mom_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing3bro_sprite', missing3bro_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing4mom_sprite', missing4mom_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('villager1_sprite', villager1_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('villager2_sprite', villager2_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('villager3_sprite', villager3_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('villager4_sprite', villager4_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('police_sprite', police_sprite, { frameWidth: 5508 / 17, frameHeight: 498 })
    this.load.spritesheet('inspector_sprite', inspector_sprite, { frameWidth: 4692 / 17, frameHeight: 516 })
    // load npc+sami image
    this.load.image('missing1_angry', missing1_angry)
    this.load.image('missing1_cry', missing1_cry)
    this.load.image('missing1_neutral', missing1_neutral)
    this.load.image('missing1_smile', missing1_smile)
    this.load.image('missing1_surprise', missing1_surprise)
    this.load.image('missing1mom_angry', missing1mom_angry)
    this.load.image('missing1mom_neutral', missing1mom_neutral)
    this.load.image('missing1mom_worry', missing1mom_worry)
    this.load.image('missing1bro_smile1', missing1bro_smile1)
    this.load.image('missing1bro_smile2', missing1bro_smile2)
    this.load.image('missing1bro_surprise', missing1bro_surprise)
    this.load.image('missing1bro_worry', missing1bro_worry)
    this.load.image('missing1sis_neutral', missing1sis_neutral)
    this.load.image('missing1sis_surprise', missing1sis_surprise)
    this.load.image('missing1sis_sus', missing1sis_sus)
    this.load.image('missing2_neutral', missing2_neutral)
    this.load.image('missing2_pain', missing2_pain)
    this.load.image('missing2_smile', missing2_smile)
    this.load.image('missing2_surprise', missing2_surprise)
    this.load.image('missing2mom_neutral', missing2mom_neutral)
    this.load.image('missing2mom_sad', missing2mom_sad)
    this.load.image('missing2mom_smile', missing2mom_smile)
    this.load.image('missing2mom_surprise1', missing2mom_surprise1)
    this.load.image('missing2mom_surprise2', missing2mom_surprise2)
    this.load.image('missing2mom_worry', missing2mom_worry)
    this.load.image('missing3_angry', missing3_angry)
    this.load.image('missing3_neutral', missing3_neutral)
    this.load.image('missing3_smile', missing3_smile)
    this.load.image('missing3_surprise', missing3_surprise)
    this.load.image('missing3_think', missing3_think)
    this.load.image('missing3bro_angry', missing3bro_angry)
    this.load.image('missing3bro_cry1', missing3bro_cry1)
    this.load.image('missing3bro_cry2', missing3bro_cry2)
    this.load.image('missing3bro_neutral', missing3bro_neutral)
    this.load.image('missing3bro_smile', missing3bro_smile)
    this.load.image('missing3mom_neutral', missing3mom_neutral)
    this.load.image('missing3mom_sorry', missing3mom_sorry)
    this.load.image('missing3mom_worry', missing3mom_worry)
    this.load.image('missing4_neutral', missing4_neutral)
    this.load.image('missing4_sick', missing4_sick)
    this.load.image('missing4mom_angry', missing4mom_angry)
    this.load.image('missing4mom_sad', missing4mom_sad)
    this.load.image('missing4mom_surprise', missing4mom_surprise)
    this.load.image('missing4mom_worry', missing4mom_worry)
    this.load.image('villager1_smile', villager1_smile)
    this.load.image('villager1_worry', villager1_worry)
    this.load.image('villager2_smile', villager2_smile)
    this.load.image('villager2_worry', villager2_worry)
    this.load.image('villager3_neutral', villager3_neutral)
    this.load.image('villager4_neutral', villager4_neutral)
    this.load.image('police_neutral', police_neutral)
    this.load.image('inspector_neutral', inspector_neutral)
    this.load.image('sami_neutral', sami_neutral)
    this.load.image('sami_frown', sami_frown)
    this.load.image('sami_disappointment', sami_disappointment)
    this.load.image('sami_surprise', sami_surprise)

    // sceneload plugin preload()
    this.sceneload.preload()
  }

  create(data) {
    // add background image + set world bound
    const background = this.add.image(0, 0, 'vback').setOrigin(0, 0)
    this.physics.world.setBounds(0, 0, background.width-18, background.height, true, true, true, true)
    console.log(background.width, background.height)

    this.physics.add.staticImage(1880,950,'mat').setScale(1.5)
    // add obstacle image + adjust body
    const floatGroup = this.physics.add.staticGroup()
    const fields = this.physics.add.staticGroup()
    const trees = this.physics.add.staticGroup()
    const grass = this.physics.add.staticGroup()
    const houses = this.physics.add.staticGroup()

    floatGroup.create(195,150,'vhouse_float').setOrigin(0,0).setDepth(15)
    floatGroup.create(0,0,'vlighttree_float').setOrigin(0,0).setDepth(15)
    floatGroup.create(0,0,'vdarktree_float').setOrigin(0,0).setDepth(15)
    floatGroup.create(0,0,'vtree_float').setOrigin(0,0).setDepth(15)

    houses.create(2145,812,'house1_body1')
    houses.create(1815,935,'house1_body2')
    houses.create(1860,990,'house1_body3')
    houses.create(2285,820,'house1_body4')
    houses.create(2305,865,'house1_body5')
    houses.create(2325,950,'house1_body6')
    houses.create(2230,930,'house1_body7')
    houses.create(2185,985,'house1_body8')
    houses.create(1880,814,'house1_body9')
    houses.create(1220,860,'house2_body1')
    houses.create(1440,880,'house2_body2')
    houses.create(1470,890,'house2_body3')
    houses.create(1490,900,'house2_body4')
    houses.create(1515,915,'house2_body5')
    houses.create(920,745,'house3_body1')
    houses.create(740,750,'house3_body2')
    houses.create(625,715,'house3_body3')
    houses.create(605,735,'house3_body3')
    houses.create(600,790,'house3_body4')
    houses.create(555,795,'house3_body5')
    houses.create(555,785,'house3_body5')
    houses.create(345,1050,'house4_body1')
    houses.create(210,1055,'house4_body2')
    houses.create(530,1100,'house4_body3')
    houses.create(620,1160,'house4_body4')
    houses.create(615,1195,'house4_body5')
    houses.create(1050,320,'house5_body1')
    houses.create(1250,315,'house5_body2')

    fields.create(150, 120, 'vfield_1_1').setScale(0.5).refreshBody()
    fields.create(300, 70, 'vfield_1_1').setScale(0.5).refreshBody()
    fields.create(400, 0, 'vfield_1_1').setScale(0.5).refreshBody()
    fields.create(740, 510, 'vfield_1_2').refreshBody()
    fields.create(570, 560, 'vfield_1_2').refreshBody()
    fields.create(270, 760, 'vfield').refreshBody()
    fields.create(310, 700, 'vfield').refreshBody()
    fields.create(420, 560, 'vfield').refreshBody()
    fields.create(520, 450, 'vfield').refreshBody()
    fields.create(570, 400, 'vfield').refreshBody()
    fields.create(620, 370, 'vfield').refreshBody()
    fields.create(640, 690, 'vfield').refreshBody()
    fields.create(685, 383, 'vfield').refreshBody()
    fields.create(739, 425, 'vfield').refreshBody()
    fields.create(790, 475, 'vfield').refreshBody()
    fields.create(600, 510, 'vfield_2_1').setScale(0.8).refreshBody()
    fields.create(450, 590, 'vfield_2_1').setScale(0.5).refreshBody()
    fields.create(420, 650, 'vfield_2_1').setScale(0.5).refreshBody()
    fields.create(370, 730, 'vfield_2_1').setScale(0.5).refreshBody()
    fields.create(300, 800, 'vfield_2_1').setScale(0.3).refreshBody()
    fields.create(1700, 355, 'vfield_2_1').refreshBody()
    fields.create(1645, 465, 'vfield_2_2').refreshBody()
    fields.create(1595, 503, 'vfield_2_3').refreshBody()
    fields.create(1625, 550, 'vfield_2_4').refreshBody()
    fields.create(1617, 609, 'vfield').refreshBody()
    fields.create(337, 1609, 'vfield_3_1').refreshBody()
    fields.create(356, 1500, 'vfield_3_1').refreshBody()
    fields.create(839, 1351, 'vfield_3_1').refreshBody()
    fields.create(889, 1321, 'vfield_3_1').refreshBody()
    fields.create(723, 1500, 'vfield_3_2').refreshBody()
    fields.create(1190, 1406, 'vfield_3_3').refreshBody() 
    fields.create(1799, 1412.5, 'vfield_4_1').refreshBody()
    fields.create(2084, 1375, 'vfield_4_2').refreshBody()
    fields.create(2405, 1363.5, 'vfield_4_3').refreshBody()

    trees.create(845, 250, 'vtree').refreshBody()
    trees.create(1445, 260, 'vtree').refreshBody()
    trees.create(160, 1880, 'vtree').refreshBody()
    trees.create(1120, 1890, 'vtree').refreshBody()
    trees.create(1340, 1890, 'vtree').refreshBody()

    grass.create(25, 1580, 'vgrass_1').refreshBody()
    grass.create(20, 600, 'vgrass_2').refreshBody()
    grass.create(1400, 10, 'vgrass_3').refreshBody()
    grass.create(2149, 130, 'vgrass_4').refreshBody()
    grass.create(2565, 229, 'vgrass_5').refreshBody()
    grass.create(2192, 527, 'vgrass_7').refreshBody()
    grass.create(2191, 1865, 'vgrass_7').refreshBody()
    grass.create(2290, 558, 'vgrass_7').refreshBody()
    grass.create(2385, 633, 'vgrass_7').refreshBody()
    grass.create(700, 70, 'vgrass_7').refreshBody()
    grass.create(620, 120, 'vgrass_7').refreshBody()
    grass.create(2620, 900, 'vgrass_8').refreshBody()
    grass.create(2710, 990, 'vgrass_9').refreshBody()
    grass.create(2625, 1683, 'vgrass_10').refreshBody()
    grass.create(2495, 1815, 'vgrass_11').refreshBody()
    grass.create(2272, 1925, 'vgrass_12').refreshBody()

    // set obstacle invisible
    fields.setVisible(false)
    trees.setVisible(false)
    grass.setVisible(false)
    houses.setVisible(false)

    const colliders = [ fields, trees, grass, houses ]

    // create Items
    this.items = []
    SCENE_DEFAULT_CONFIG['Village'].item_json.forEach((item) => {
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
    SCENE_DEFAULT_CONFIG['Village'].npc_json.forEach((npc) => {
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
      'main_zoom': 0.9,
      'mini_zoom': 0.065,
      'mini_scrollX': 1306,
      'mini_scrollY': 925
    }
    this.sceneload.create(colliders, this.items, this.npcs, camera_config, data)
    this.game.stage.mapEvent(this) // activate stage

    // check clue update
    if (!useGameStore().cluenote[2]) {
      // if Test3 clue not exist, play stage-start event
      const start_config = { 
        'start': {
          sceneKey: 'Village',
          playerX: null,
          playerY: null,
          cameraX: 1600,
          cameraY: 1500,
          dialogue: [
            {
              image: "inspector_neutral",
              line: "자네가 탐정 시험 지원자인 사미인가?",
              name: "감독관"
            },
            {
              image: "sami_neutral",
              line: "네 맞습니다.",
              name: "사미"
            },
            {
              image: "inspector_neutral",
              line: "만나서 반갑네. 난 세번째 시험에 동행하게 된 감독관일세. 자네가 실제 사건을 해결하는 과정을 옆에서 지켜보며 탐정으로써의 자질을 평가하는 역할이지.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "이 마을에서 아이들이 한 번에 넷이나 사라졌네.",
              name: "감독관"
            },
            {
              image: "sami_surprise",
              line: "아이들이 사라졌다고요?",
              name: "사미"
            },
            {
              image: "inspector_neutral",
              line: "그래. 아이들의 안전을 위해서 한시라도 빨리 해결되어야 하는 사건인거지.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "단서를 모아 아이들이 사라진 '원인', '방법', '현재 위치'를 증명하게.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "만일 자네가 사건을 해결하는데 너무 오래 걸려 아이들의 안전이 우려되는 상황이 발생한다면 내가 나서겠지만, 그 전까지 나는 어떤 도움도 주지 않을걸세.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "그럼 이 점을 염두에 두고 사건을 해결해보게나.",
              name: "감독관"
            },
            {
              image: "sami_frown",
              line: "'제길. 한 마디로 모의 수사와 달리 사건을 입증할 기회가 제한되어 있다는 거군.'",
              name: "사미"
            },
            {
              image: "sami_frown",
              line: "'정신 바짝 차려야겠는데..'",
              name: "사미"
            },
            {
              image: "police_neutral",
              line: "오시기로 한 탐정분들인가요? 여기 실종된 아이들의 인적사항입니다. 받으십시오.",
              name: "경찰"
            }
          ],
          event: { eventKey: 'start', eventData: {data: 'no-clue'} }
        }
      }
      this.events.emit('quiz-event', 'start', start_config)
    }
    // game-clear event
    this.events.on('game-clear', () => {
      // set scene invisible
      this.scene.setVisible(false, this)

      // create game-clear dialogue
      // get cameraX + cameraY
      const cameraX = this.cameras.main.worldView.x, cameraY = this.cameras.main.worldView.y      
      const d_data = [
        {
          image: "missing1sis_surprise",
          line: "제가 안내할게요!"
        },
        "....",
        "저기 동굴 안에 불빛이 보인다!",
        "아이들이 보인다! 서둘러!",
        {
          image: "missing1mom_worry",
          line: "정숙아!"
        },
        {
          image: "missing2mom_worry",
          line: "선자야!"
        },
        {
          image: "missing3mom_worry",
          line: "정웅아!"
        },
        {
          image: "missing4mom_worry",
          line: "영길아!"
        },
        {
          image: "missing4_neutral",
          line: "으음...엄마..?"
        },
        "아이들은 모포를 덮은 채 촛불을 둘러싸고 앉아있었으며, 모두 다친 데 없이 무사했다.",
        "해가 져서 기온이 떨어진 것 때문에 저체온증을 걱정했는데, 다행이 촛불과 서로의 온기로 저체온증에도 걸리지 않은 것 같다.",
        {
          image: "missing3mom_worry",
          line: "해가 지기 전에 산에서 내려왔어야지! 해 떨어지면 산 속이 제일 위험하다고 했잖아!"
        },
        {
          image: "missing2mom_worry",
          line: "그래 다음부터는 절대로 이런 짓 하지 마. 알겠지?"
        },
        {
          image: "missing3_neutral",
          line: "하지만, 산 걸인이 와서 어른들이 올 때까지 동굴에서 기다리라고 했단 말이예요."
        },
        {
          image: "missing1mom_worry",
          line: "뭐? 산 걸인이 왜 나타나? 그런 거짓말 하면 못 써!"
        },
        {
          image: "missing1_angry",
          line: "진짜야! 우리 다같이 봤다고!"
        },
        "아이들은 모두 동굴 안에 있을 때 갑자기 나타난 '동굴 할머니'에 대해서 얘기했다.",
        "그리고 그 '동굴 할머니'가 어른들이 올 때까지 동굴에서 나오지 말고 기다리라고 했다는 얘기도.",
        {
          image: "sami_neutral",
          line: "아이들 모두 똑같은 내용을 말하고 있어. 이건 환영이나 착각이 아니야."
        },
        {
          image: "sami_sus",
          line: "그럼 이 '동굴 할머니'는 누구지? 왜 아이들에게 동굴 밖으로 나오지 말라고 한 거고?"
        },
        "계속..."
      ]
      const dialogue = new Dialogue(this, cameraX, cameraY, 0.9, undefined, d_data)
      dialogue.create(undefined)
      this.scene.events.emit('start-talking')
    })
  }

  update() {
    this.sceneload.update(this.npcs)
  }
}
