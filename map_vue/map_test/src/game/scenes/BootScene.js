import { Scene } from 'phaser'
import Back1 from '@/game/map_png/궁정리.png'
import Back2 from '@/game/map_png/건물레이어(나무밑).png'
import Treess from '@/game/map_png/다리자른 나무.png'
import Sami from '@/game/map_png/주인공걸음마확대_frame1.png'
import House1 from '@/game/map_png/궁_0000s_0004_건물6_충돌버전.png'
import Tree from '@/game/map_png/궁_0004_나무한그루_충돌.png'
import Left_h_g from '@/game/map_png/경복궁왼쪽충돌.png'
import Mid_h from '@/game/map_png/경복궁 충돌 중앙.png'
import Mini_h from '@/game/map_png/미니집.png'
import Left_h from '@/game/map_png/왼쪽집.png'
import Right_h from '@/game/map_png/오른쪽집.png'
import North_o from '@/game/map_png/위에 충돌(궁하나 혼자).png'
import West_o from '@/game/map_png/오른쪽에 충돌(궁하나 혼자).png'

import Fo1 from '@/game/map_png/오른쪽숲1.png'
import Fo2 from '@/game/map_png/오른쪽숲2.png'
import Fo3 from '@/game/map_png/오른쪽숲3.png'
import Fo4 from '@/game/map_png/오른쪽숲4.png'
import Fo5 from '@/game/map_png/오른쪽숲5.png'
import Fo6 from '@/game/map_png/오른쪽숲6.png'


import Gr1 from '@/game/map_png/궁오른쪽1.png'
import Gr2 from '@/game/map_png/궁오른쪽2.png'
import Gr3 from '@/game/map_png/궁오른쪽3.png'
import Gr4 from '@/game/map_png/궁오른쪽4.png'




export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('back1', Back1);
    this.load.image('back2', Back2);
    this.load.image('treess', Treess);
    this.load.spritesheet('sami', Sami, { frameWidth: 463, frameHeight: 500 });
    
//충돌 이미지
    this.load.image('house1', House1);
    this.load.image('tree', Tree);
    this.load.image('left_h_g', Left_h_g);
    this.load.image('mid_h', Mid_h);
    this.load.image('mini_h', Mini_h);
    this.load.image('left_h', Left_h);
    this.load.image('right_h', Right_h);
    this.load.image('north_o', North_o);
    this.load.image('west_o', West_o);

    this.load.image('fo1', Fo1);
    this.load.image('fo2', Fo2);
    this.load.image('fo3', Fo3);
    this.load.image('fo4', Fo4);
    this.load.image('fo5', Fo5);
    this.load.image('fo6', Fo6);
    this.load.image('gr1', Gr1);
    this.load.image('gr2', Gr2);
    this.load.image('gr3', Gr3);
    this.load.image('gr4', Gr4);
  }

  create () {
    this.scene.start('PlayScene')
  }
}