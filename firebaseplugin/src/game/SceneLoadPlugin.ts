import Phaser from 'phaser'
import _ from 'lodash'
import Player from './GameObjects/Player'
import NPC from './GameObjects/NPC'
import Item from './GameObjects/Item'
import sami from './assets/sami_sprite/sami_frame1.png'

export default class SceneLoadPlugin extends Phaser.Plugins.ScenePlugin {
  private player: Player
  private npcs: NPC[] = []
  private items: Item[] = []
  private npcs_JSON: []
  private items_JSON: []
  private minimap: Phaser.Cameras.Scene2D.Camera
  private controls: { cursor: any, space: Phaser.Input.Keyboard.Key, enter: Phaser.Input.Keyboard.Key }
  private item_text: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, 0, 0, '스페이스를 눌러 아이템을 얻으시오', {
    fontFamily: 'NeoDunggeunmo',
    fontSize: '35px',
    stroke: '#000',
    strokeThickness: 6,
    color: '#fff'
  })

  constructor(scene: Phaser.Scene, manager: Phaser.Plugins.PluginManager, key: string) {
    super(scene, manager, key)
    // install dialogue-render plugin
  }

  destroy() {
    super.destroy()   
  }

  preload() {
    // preload player spitesheet
    this.scene.load.spritesheet('sami', sami, { frameWidth: 7870 / 17, frameHeight: 500 })

    // import NPCs, Items JSON
    const scene_id = _.split(this.scene.scene.key, '_')[0]

    // create this.npcs
    import(`./scenes/${scene_id}_NPCs.js`)
      .then(Response => {
        this.npcs_JSON = Response.default
      })

    // create this.items
    import(`./scenes/${scene_id}_Items.js`)
      .then(Response => {
        this.items_JSON = Response.default
        Response.default.forEach((item: any) => {
          this.scene.load.image(item.texture, item.texture)
        })
      })
  }

  create(colliders: [ Phaser.Physics.Arcade.StaticGroup ]) {
    console.log('sceneload create')
    // create minimap
    this.minimap = this.scene.cameras.add(15, 15, 2700*0.07, 1981*0.07).setZoom(0.065).setName('mini');

    this.minimap.setBackgroundColor(0xaca2a0)
    this.minimap.scrollX = 1306
    this.minimap.scrollY = 925

    // create controls
    this.controls = {
      cursor: this.scene.input.keyboard.createCursorKeys(),
      space: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false),
      enter: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER, true, false)
    }

    // create player on scene
    this.player = new Player(
      this.scene,
      400,
      900,
      this.scene.textures.get('sami')
    )
    this.player.create()
    colliders.forEach(collider => {
      this.scene.physics.add.collider(this.player, collider)
    }) // add collider physics on player

    // create item on screen
    this.items_JSON.forEach((json: any) => {
      this.items.push(new Item(
        this.scene,
        json.x,
        json.y,
        json.name,
        json.texture
      ))
    })
    this.scene.physics.add.collider(this.player, this.items) // add collider
    this.scene.add.existing(this.item_text).setDepth(15)
    this.item_text.visible = false // add item_text
    this.scene.physics.add.overlap(this.player.interact_area, this.items, (area, item) => {
      const cameraX = this.scene.cameras.main.worldView.x, cameraY = this.scene.cameras.main.worldView.y
      
      const textX = cameraX + 220
      const textY = cameraY + 530

      this.item_text.setPosition(textX, textY)
    }) // add overlap callback

    // create npc on screen
    this.npcs_JSON.forEach((json: any) => {
      this.npcs.push(new NPC(
        this.scene,
        json.id,
        json.spritesheet,
        json.sprite_func,
        json.x,
        json.y,
        json.dialogue,
        json.hint
      ))
    })

    this.npcs.forEach((npc: NPC) => {
      npc.create()
    })
    this.scene.physics.add.overlap(this.player.interact_area, this.npcs, (area, npc) => {
      const cameraX = this.scene.cameras.main.worldView.x, cameraY = this.scene.cameras.main.worldView.y
      if (Phaser.Input.Keyboard.JustDown(this.controls.space)||Phaser.Input.Keyboard.JustDown(this.controls.enter)) {
        console.log('talk to npc')
        // create dialogue-box on screen
        const white = Phaser.Display.Color.GetColor32(255,255,255,0.1)
        this.scene.add.rectangle(cameraX+650, cameraY+600, 700, 200, white)
          .setDepth(20) // line-box
        this.scene.add.rectangle(cameraX+150, cameraY+600, 200, 200, white)
          .setDepth(20) // image-box

        const line = new Phaser.GameObjects.Text(
          this.scene,
          cameraX+310,
          cameraY+510,
          'loading...',
          {
            fontFamily: 'NeoDunggeunmo',
            fontSize: '30px',
            color: '#000',
            padding: {
              x: 5,
              y: 5
            }
        }
        ).setWordWrapWidth(690)
        this.scene.add.existing(line).setDepth(20)

        // choose dialogue
      }
    })
    this.scene.physics.add.collider(this.player, this.npcs)
  }

  update() {
    const x = this.player.x, y = this.player.y
    const distance = 30
    // update item_text.visible
    this.item_text.visible = this.scene.physics.overlap(this.player.interact_area, this.items)

    // set controls
    this.player.setVelocity(0)

    if (this.controls.cursor.left.isDown) {
      this.player.update('left')
    } else if (this.controls.cursor.right.isDown) {
      this.player.update('right')
    } else if (this.controls.cursor.up.isDown) {
      this.player.update('up')
    } else if (this.controls.cursor.down.isDown) {
      this.player.update('down')
    } else {
      this.player.anims.stop()
    }

    // npc animation
    this.npcs.forEach((npc: NPC) => {
      // this.minimap.visible = !startTalk // when talking to npc, remove minimap
      // npc.anims.pause() // when talking to npc, pause npc anim
      npc.update()
    })
  }
}