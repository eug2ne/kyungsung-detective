import { Scene } from 'phaser'

import sami from '@/game/assets/주인공걸음마확대_frame1.png'

import back1 from '@/game/assets/test1scene/궁정리.png'
import back2 from '@/game/assets/test1scene/건물레이어(나무밑).png'
import treess from '@/game/assets/test1scene/다리자른 나무.png'
import house1 from '@/game/assets/test1scene/궁_0000s_0004_건물6_충돌버전.png'
import tree from '@/game/assets/test1scene/궁_0004_나무한그루_충돌.png'
import left_h_g from '@/game/assets/test1scene/경복궁왼쪽충돌.png'
import mid_h from '@/game/assets/test1scene/경복궁 충돌 중앙.png'
import mini_h from '@/game/assets/test1scene/미니집.png'
import left_h from '@/game/assets/test1scene/왼쪽집.png'
import tight_h from '@/game/assets/test1scene/오른쪽집.png'
import north_o from '@/game/assets/test1scene/위에 충돌(궁하나 혼자).png'
import west_o from '@/game/assets/test1scene/오른쪽에 충돌(궁하나 혼자).png'

import fo1 from '@/game/assets/test1scene/오른쪽숲1.png'
import fo2 from '@/game/assets/test1scene/오른쪽숲2.png'
import fo3 from '@/game/assets/test1scene/오른쪽숲3.png'
import fo4 from '@/game/assets/test1scene/오른쪽숲4.png'
import fo5 from '@/game/assets/test1scene/오른쪽숲5.png'
import fo6 from '@/game/assets/test1scene/오른쪽숲6.png'

import gr1 from '@/game/assets/test1scene/궁오른쪽1.png'
import gr2 from '@/game/assets/test1scene/궁오른쪽2.png'
import gr3 from '@/game/assets/test1scene/궁오른쪽3.png'
import gr4 from '@/game/assets/test1scene/궁오른쪽4.png'

import item3 from '@/assets/item/item3.png'
import item4 from '@/assets/item/item4.png'
import item5 from '@/assets/item/item5.png'

//village scene
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

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    this.load.image('back1', back1)
    this.load.image('back2', back2)
    this.load.image('treess', treess)
    this.load.spritesheet('sami', sami, {
      frameWidth: 7870 / 17,
      frameHeight: 500
    })

    //충돌 이미지
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

    this.load.image('item3', item3)
    this.load.image('item4', item4)
    this.load.image('item5', item5)

    //village scene
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
  }

  create() {
    // this.scene.start('Test1Scene')
    this.scene.start('VillageScene')
  }
}
