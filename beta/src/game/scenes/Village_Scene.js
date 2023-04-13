import Phaser from 'phaser'
import vback from '@/game/assets/villagescene/마을최종-2800.png'
import { TrackOpTypes } from 'vue'

export default class VillageScene extends Phaser.Scene {
  constructor () {
    super({key: 'Village'})
  }

  init(player_config) {
    this.sceneload.init(player_config)
  }

  preload() {
    this.load.image('vback', vback)

    // sceneload plugin preload()
    this.sceneload.preload()
  }

  create(data) {
    // add background image + set world bound
    const background = this.add.image(0, 0, 'vback').setOrigin(0, 0)
    this.physics.world.setBounds(0, 0, background.width*2-18, background.height*2, true, true, true, true)

    // add obstacle image + adjust body
    const floatGroup = this.physics.add.staticGroup()
    const fields = this.physics.add.staticGroup()
    const trees = this.physics.add.staticGroup()
    const grass = this.physics.add.staticGroup()
    const houses = this.physics.add.staticGroup()

    // upper-left field
    fields.create(350,770,undefined,undefined,false,false).body.setSize(380,180)
    fields.create(460,600,undefined,undefined,false,false).body.setSize(350,160)
    fields.create(718,482,undefined,undefined,false,false).body.setSize(210,50)
    fields.create(837,500,undefined,undefined,false,false).body.setSize(22,20)
    fields.create(630,435,undefined,undefined,false,false).body.setSize(300,40)
    fields.create(607,400,undefined,undefined,false,false).body.setSize(300,25)
    fields.create(600,375,undefined,undefined,false,false).body.setSize(240,25)
    fields.create(600,350,undefined,undefined,false,false).body.setSize(180,25)
    // upper-right field
    fields.create(1680,310,undefined,undefined,false,false).body.setSize(400,50)
    fields.create(1680,360,undefined,undefined,false,false).body.setSize(400,50)
    fields.create(1680,410,undefined,undefined,false,false).body.setSize(440,50)
    fields.create(1635,460,undefined,undefined,false,false).body.setSize(400,50)
    fields.create(1595,510,undefined,undefined,false,false).body.setSize(378,50)
    fields.create(1610,560,undefined,undefined,false,false).body.setSize(240,40)
    fields.create(1615,605,undefined,undefined,false,false).body.setSize(110,50)

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
