import { Scene } from 'phaser'
import back1 from '@/game/assets/test1_map/궁정리.png'
import back2 from '@/game/assets/test1_map/건물레이어(나무밑).png'
import treess from '@/game/assets/test1_map/다리자른 나무.png'
import sami from '@/game/assets/sami_sprite/주인공걸음마확대_frame1.png'
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

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('back1', back1)
    this.load.image('back2', back2)
    this.load.image('treess', treess)
    this.load.spritesheet('sami', sami, { frameWidth: 7870 / 17, frameHeight: 500 })
    
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
  }

  create () {
    this.scene.start('PlayScene')
  }
}