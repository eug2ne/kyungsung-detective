import Phaser from 'phaser'
import vback1 from '@/game/assets/villagescene/마을최종.png'

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


export default class VillageScene extends Phaser.Scene {
  constructor () {
    super({key: 'Village'})
  }

  init(player_config) {
    this.sceneload.init(player_config)
  }

  preload() {
    this.load.image('vback1', vback1)

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
    this.physics.world.setBounds(0, 0, 2800, 1981)

    this.add.image(2800/2, 1981/2,'vback1')

    var floatGroup = this.physics.add.staticGroup()
    var fields = this.physics.add.staticGroup()
    var trees = this.physics.add.staticGroup()
    var grass = this.physics.add.staticGroup()
    var houses = this.physics.add.staticGroup()

    floatGroup.create(2800/2-234, 1981/2+22,'vcutted_tree').refreshBody().setDepth(10)
    floatGroup.create(420, 968, 'vhouse_1_float').refreshBody().setDepth(5)
    floatGroup.create(338, 888, 'vhouse_1_fence_float').refreshBody().setDepth(4)
    floatGroup.create(759, 687, 'vhouse_2_float').refreshBody().setDepth(5)
    floatGroup.create(1148, 195, 'vhouse_3_float').refreshBody().setDepth(5)
    floatGroup.create(1274, 748, 'vhouse_4_float').refreshBody().setDepth(5)
    floatGroup.create(2045, 752, 'vhouse_5_float').refreshBody().setDepth(5)

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

    trees.create(845, 234, 'vtree').refreshBody()
    trees.create(1445, 246, 'vtree').refreshBody()
    trees.create(2264, 853, 'vtree').refreshBody()
    trees.create(1344, 1895, 'vtree').refreshBody()
    trees.create(65, 1740, 'vtree').refreshBody()
    trees.create(150, 1880, 'vtree').refreshBody()
    trees.create(215, 1310, 'vtree').refreshBody()

    grass.create(49, 1629, 'vgrass_1').refreshBody()
    grass.create(69, 757, 'vgrass_2').refreshBody()
    grass.create(1400, 89, 'vgrass_3').refreshBody()
    grass.create(2149, 165, 'vgrass_4').refreshBody()
    grass.create(2490, 229, 'vgrass_5').refreshBody()
    grass.create(2453, 558, 'vgrass_6').refreshBody()
    grass.create(2192, 527, 'vgrass_7').refreshBody()
    grass.create(2315, 633, 'vgrass_7').refreshBody()
    grass.create(2593, 915, 'vgrass_8').refreshBody()
    grass.create(2673, 990, 'vgrass_9').refreshBody()
    grass.create(2625, 1683, 'vgrass_10').refreshBody()
    grass.create(2495, 1815, 'vgrass_11').refreshBody()
    grass.create(2191, 1865, 'vgrass_7').refreshBody()
    grass.create(2272, 1925, 'vgrass_12').refreshBody()
    grass.create(309, 130, 'vgrass_12').refreshBody()

    houses.create(423, 1027, 'vhouse_1').refreshBody()
    houses.create(760, 725, 'vhouse_2').refreshBody()
    houses.create(1148, 295, 'vhouse_3').refreshBody()
    houses.create(1233, 847, 'vhouse_4_1').refreshBody()
    houses.create(1490, 879, 'vhouse_4_2').refreshBody()
    houses.create(1463, 780, 'vhouse_4_3').refreshBody()
    houses.create(2046, 847, 'vhouse_5').refreshBody()

    fields.setAlpha(0)
    trees.setAlpha(0)
    grass.setAlpha(0)
    houses.setAlpha(0)

    const colliders = [ floatGroup, fields, trees, grass, houses ]

    const camera_config = {
      'main_zoom': 0.9,
      'mini_zoom': 0.065,
      'mini_scrollX': 1306,
      'mini_scrollY': 925
    }

    this.sceneload.create(colliders, [], [], camera_config, data)
  }

  update() {
    this.sceneload.update()
  }
}
