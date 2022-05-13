import Phaser from 'phaser'
import _ from 'lodash'
import Player from './GameObjects/Player'
import NPC from './GameObjects/NPC'
import Item from './GameObjects/Item'
import sami from './assets/sami_sprite/sami_frame1.png'
import Dialogue from './GameObjects/Dialogue'

export default class SceneLoadPlugin extends Phaser.Plugins.ScenePlugin {
  private config: { scenes: any,
    p_scene: {sceneKey: string, x: number, y: number},
    item_carry: [ Item ] }
  private player: Player
  private minimap: Phaser.Cameras.Scene2D.Camera
  private controls: { cursor: any, space: Phaser.Input.Keyboard.Key, enter: Phaser.Input.Keyboard.Key }
  private item_text: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, 0, 0, '스페이스를 눌러 아이템을 얻으시오', {
    fontFamily: 'NeoDunggeunmo',
    fontSize: '35px',
    stroke: '#000',
    strokeThickness: 6,
    color: '#fff'
  })
  private readonly inventory: Item[]

  constructor(scene: Phaser.Scene, manager: Phaser.Plugins.PluginManager, key: string) {
    super(scene, manager, key)
    this.inventory = []
  }

  destroy() {
    // save scene data to this.game.active_scenes
    
  }

  public get scene_config() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    return {
      'x': this.player.x,
      'y': this.player.y,
      'npc': null,
      'item': ['test1-0', 'test1-1', 'test1-2']
    }
  }

  init(player_config: any) {
    this.config = player_config
  }

  preload() {
    // preload player spitesheet
    this.scene.load.spritesheet('sami', sami, { frameWidth: 7870 / 17, frameHeight: 500 })
  }

  create(colliders: [ Phaser.Physics.Arcade.StaticGroup ], items: [ Item ], npcs: [ NPC ]) {
    let current_sceneKey = this.config.p_scene.sceneKey
    let current_sceneConfig = this.config.scenes[current_sceneKey]
    
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
    this.scene.input.keyboard.addCapture([this.controls.cursor, 'ENTER', 'SPACE']) // prevent event propagation

    // create player on scene
    this.player = new Player(
      this.scene,
      this.config.p_scene.x,
      this.config.p_scene.y,
      this.scene.textures.get('sami'),
      this.config.item_carry
    )
    this.player.create()
    colliders.forEach(collider => {
      this.scene.physics.add.collider(this.player, collider)
    }) // add collider physics on player

    // show item on scene according to scene-config
    items.forEach((item: Item) => {
      item.visible = false
      current_sceneConfig.item.forEach((visible_item: string) => {
        if (item.id == visible_item) {
          item.visible = true
        } else {
          // pass
        }
      })
    })
    this.scene.physics.add.collider(this.player, items) // add collider
    this.scene.add.existing(this.item_text).setDepth(15)
    this.item_text.visible = false // add item_text
    this.scene.physics.add.overlap(this.player.interact_area, items, (area, item) => {
      const cameraX = this.scene.cameras.main.worldView.x, cameraY = this.scene.cameras.main.worldView.y
      
      const textX = cameraX + 220
      const textY = cameraY + 530

      this.item_text.setPosition(textX, textY)

      if (Phaser.Input.Keyboard.JustDown(this.controls.space)||Phaser.Input.Keyboard.JustDown(this.controls.enter)) {
        // add item to inventory
        this.scene.events.emit('add-to-inventory', item)
      }
    }) // add overlap callback
    this.scene.events.on('add-to-inventory', (item: Item) => {
      // add item to inventory
      this.inventory.push(item)

      // remove item.id from config
      const remove_i = current_sceneConfig.item.indexOf(item.id)
      current_sceneConfig.item.splice(remove_i, 1)
      item.destroy()
    })

    // create npc on screen
    this.scene.physics.add.overlap(this.player.interact_area, npcs, (area, npc) => {
      if (Phaser.Input.Keyboard.JustDown(this.controls.enter)) {
        this.scene.events.emit('start-talking', npc)
        this.controls.enter.isDown = false
      }
    }) // overlap-talk event
    this.scene.events.on('start-talking', (npc: NPC) => {
      console.log('start-talking')
      this.minimap.visible = false // remove minimap
      npc.anims.pause() // pause npc anim
      this.controls.cursor.down.enabled = false
      this.controls.cursor.left.enabled = false
      this.controls.cursor.right.enabled = false 
      this.controls.cursor.up.enabled = false // cursor disable

      const cameraX = this.scene.cameras.main.worldView.x, cameraY = this.scene.cameras.main.worldView.y
      const dialogueKey = current_sceneConfig.npc[npc.id]
      npc.dialogue = dialogueKey /* choose dialogue according to npc dialogueKey */
      const dialogue = new Dialogue(this.scene, cameraX, cameraY, npc.dialogue, npc.id)
      dialogue.create()

      this.scene.input.keyboard.on('keydown-SPACE', () => {
        dialogue.emit('update-line')
      })
    })
    this.scene.events.on('end-talking', (dialogue: Dialogue, npc_id: string) => {
      console.log('end talking')
      this.minimap.visible = true // add minimap
      npcs.find((npc: NPC) => {
        return npc.id == npc_id
      })?.anims.restart() // restart npc anim
      this.controls.cursor.down.enabled = true
      this.controls.cursor.left.enabled = true
      this.controls.cursor.right.enabled = true 
      this.controls.cursor.up.enabled = true // cursor enable

      dialogue.destroy()
    })
    this.scene.physics.add.collider(this.player, npcs)
  }

  update(items: [Item], npcs: [ NPC ]) {
    // update item_text.visible
    this.item_text.visible = this.scene.physics.overlap(this.player.interact_area, items) ? true:false

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
    npcs.forEach((npc: NPC) => {
      npc.update()
    })
  }
}