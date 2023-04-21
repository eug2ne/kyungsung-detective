import Phaser from 'phaser'
import vback from '@/game/assets/villagescene/마을최종-2800.png'
import vhouse_1 from '@/game/assets/villagescene/집_1.png'
import vhouse_2 from '@/game/assets/villagescene/집_2.png'
import vhouse_3 from '@/game/assets/villagescene/집_3.png'
import vhouse_4_1 from '@/game/assets/villagescene/집_4_1.png'
import vhouse_4_2 from '@/game/assets/villagescene/집_4_2.png'
import vhouse_4_3 from '@/game/assets/villagescene/집_4_3.png'
import vhouse_5 from '@/game/assets/villagescene/집_5.png'
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
import vhouse_1_float from '@/game/assets/villagescene/집_1_float.png'
import vhouse_1_fence_float from '@/game/assets/villagescene/집_1_울타리_float.png'
import vhouse_2_float from '@/game/assets/villagescene/집_2_float.png'
import vhouse_3_float from '@/game/assets/villagescene/집_3_float.png'
import vhouse_4_float from '@/game/assets/villagescene/집_4_float.png'
import vhouse_5_float from '@/game/assets/villagescene/집_5_float.png'
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

// import npc spritesheet

// import npc + sami log image

export default class VillageScene extends Phaser.Scene {
  constructor () {
    super({key: 'Village'})
  }

  init(player_config) {
    this.sceneload.init(player_config)
  }

  preload() {
    this.load.image('vback', vback)

    this.load.image('vhouse_1', vhouse_1)
    this.load.image('vhouse_2', vhouse_2)
    this.load.image('vhouse_3', vhouse_3)
    this.load.image('vhouse_4_1', vhouse_4_1)
    this.load.image('vhouse_4_2', vhouse_4_2)
    this.load.image('vhouse_4_3', vhouse_4_3)
    this.load.image('vhouse_5', vhouse_5)
    
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

    this.load.image('vhouse_1_float', vhouse_1_float)
    this.load.image('vhouse_1_fence_float', vhouse_1_fence_float)
    this.load.image('vhouse_2_float', vhouse_2_float)
    this.load.image('vhouse_3_float', vhouse_3_float)
    this.load.image('vhouse_4_float', vhouse_4_float)
    this.load.image('vhouse_5_float', vhouse_5_float)

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

    // sceneload plugin preload()
    this.sceneload.preload()
  }

  create(data) {
    // add background image + set world bound
    const background = this.add.image(0, 0, 'vback').setOrigin(0, 0)
    this.physics.world.setBounds(0, 0, background.width-18, background.height, true, true, true, true)

    // // add obstacle image + adjust body
    const floatGroup = this.physics.add.staticGroup()
    const fields = this.physics.add.staticGroup()
    const trees = this.physics.add.staticGroup()
    const grass = this.physics.add.staticGroup()
    const houses = this.physics.add.staticGroup()

    fields.create(320, 380, 'vfield_1_1').refreshBody()
    fields.create(740, 510, 'vfield_1_2').refreshBody()
    fields.create(685, 383, 'vfield').refreshBody()
    fields.create(739, 425, 'vfield').refreshBody()
    fields.create(790, 475, 'vfield').refreshBody()
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

    grass.create(25, 1580, 'vgrass_1').body.setSize(50,50)
    grass.create(20, 600, 'vgrass_2').refreshBody()
    grass.create(1400, 10, 'vgrass_3').refreshBody()
    grass.create(2149, 130, 'vgrass_4').refreshBody()
    grass.create(2565, 229, 'vgrass_5').refreshBody()
    grass.create(2192, 527, 'vgrass_7').refreshBody()
    grass.create(2290, 558, 'vgrass_7').refreshBody()
    grass.create(2385, 633, 'vgrass_7').refreshBody()
    grass.create(700, 70, 'vgrass_7').refreshBody()
    grass.create(2620, 900, 'vgrass_8').refreshBody()
    grass.create(2710, 990, 'vgrass_9').refreshBody()
    grass.create(2625, 1683, 'vgrass_10').refreshBody()
    grass.create(2495, 1815, 'vgrass_11').refreshBody()
    grass.create(2191, 1865, 'vgrass_7').refreshBody()
    grass.create(2272, 1925, 'vgrass_12').refreshBody()

    houses.create(423, 1027, 'vhouse_1').refreshBody()
    houses.create(300, 870, 'vhouse_1').body.setSize(180,20)
    houses.create(765, 712, 'vhouse_2').body.setSize(450,165)
    houses.create(955, 625, 'vhouse_2').body.setSize(50,10)
    houses.create(1150, 290, 'vhouse_3').body.setSize(400,120)
    houses.create(1310, 220, 'vhouse_3').body.setSize(80,20)
    houses.create(1220, 832, 'vhouse_4_1').body.setSize(400,285)
    houses.create(1488, 879, 'vhouse_4_2').refreshBody()
    houses.create(1445, 725, 'vhouse_4_3').refreshBody()
    houses.create(1460, 755, 'vhouse_4_3').refreshBody()
    houses.create(1485, 775, 'vhouse_4_3').refreshBody()
    houses.create(2040, 852, 'vhouse_5').body.setSize(600,245)
    houses.create(2230, 705, 'vhouse_5').body.setSize(100,30)

    // set obstacle invisible
    fields.setVisible(false)
    trees.setVisible(false)
    grass.setVisible(false)
    houses.setVisible(false)

    const colliders = [ floatGroup, fields, trees, grass, houses ]

    const camera_config = {
      'main_zoom': 0.9,
      'mini_zoom': 0.065,
      'mini_scrollX': 1306,
      'mini_scrollY': 925
    }
    this.sceneload.create(colliders, [], [], camera_config, data)
    this.game.stage.mapEvent(this) // activate stage
  }

  update() {
    this.sceneload.update()
  }
}
