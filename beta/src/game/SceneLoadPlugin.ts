import Phaser from 'phaser'
import _ from 'lodash'
import Player from './GameObjects/Player'
import NPC from './GameObjects/NPC'
import Item from './GameObjects/Item'
import sami from './assets/sami_sprite/sami_frame1.png'
import Dialogue from './GameObjects/Dialogue'

export default class SceneLoadPlugin extends Phaser.Plugins.ScenePlugin {
  private _config: {
    player_config: { sceneKey: string, x: number, y:number },
    item_carry: [ Item? ],
    scenes_config: any
  } = {
    player_config: { sceneKey: 'undefined', x: 0, y: 0 },
    item_carry: [],
    scenes_config: {}
  }
  private player: Player
  private minimap: Phaser.Cameras.Scene2D.Camera
  private controls: { cursor: any, enter: Phaser.Input.Keyboard.Key } = {
    cursor: this.scene.input.keyboard.createCursorKeys(),
    enter: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER, true, false)
  }
  private item_text: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, 0, 0, '엔터를 눌러 아이템 얻기', {
    fontFamily: 'NeoDunggeunmo',
    fontSize: '20px',
    stroke: '#000',
    strokeThickness: 6,
    color: '#fff'
  })
  private keyboard_text: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, 0, 0,
    '방향키:이동   Enter:상호작용   Space:대사 건너뛰기',
    {
      fontFamily: 'NeoDunggeunmo',
      fontSize: '20px',
      stroke: '#fff',
      strokeThickness: 5,
      color: '#000'
    })
  private readonly inventory: [ Item? ]

  constructor(scene: Phaser.Scene, manager: Phaser.Plugins.PluginManager, key: string) {
    super(scene, manager, key)
    this.inventory = []
  }

  destroy() {
    // save scene data to this.game.active_scenes
    super.destroy()
  }

  public set config(value) {
    this._config = value
  }

  public get config() {
    this._config.player_config.x = this.player ? this.player.x:0
    this._config.player_config.y = this.player ? this.player.y:0

    return this._config
  }
  
  // init(config: {
  //   player_config: { sceneKey: string, x: number, y: number },
  //   item_carry: [ Item? ],
  //   scenes_config: any
  // }) {
  //   this._config = config
  // }

  preload() {
    // preload player spitesheet
    this.scene.load.spritesheet('sami', sami, { frameWidth: 7870 / 17, frameHeight: 500 })
  }

  create(colliders: [ Phaser.Physics.Arcade.StaticGroup ],
    items: [ Item ]|[],
    npcs: [ NPC ]|[],
    camera_config: { main_zoom: number, mini_zoom: number, mini_scrollX: number, mini_scrollY: number}) {
    this.scene.cameras.main
      .setBounds(0, 0, 2800, 1981)
      .setSize(2800/3, 1981/3)
      .setZoom(camera_config.main_zoom)
      .setName('main')
    
    // create minimap
    this.minimap = this.scene.cameras.add(15, 15, 2700*0.07, 1981*0.07).setZoom(camera_config.mini_zoom).setName('mini')

    this.minimap.setBackgroundColor(0xaca2a0)
    this.minimap.scrollX = camera_config.mini_scrollX
    this.minimap.scrollY = camera_config.mini_scrollY
    this.minimap.ignore([ this.item_text, this.keyboard_text ]) // item_text, keyboard_text invisible in minimap

    // add keyboard_text to scene
    this.scene.add.existing(this.keyboard_text).setDepth(30)
    this.scene.input.keyboard.addCapture([this.controls.cursor, 'ENTER', 'SPACE']) // prevent event propagation

    // create player on scene
    this.player = new Player(
      this.scene,
      this._config.player_config.x,
      this._config.player_config.y,
      this.scene.textures.get('sami'),
      this._config.item_carry
    )
    this.player.create()
    this.player.setCollideWorldBounds(true) // set player world bound
    this.minimap.startFollow(this.player) // minimap follow player
    colliders.forEach(collider => {
      this.scene.physics.add.collider(this.player, collider)
    }) // add collider physics on player

    // show item on scene according to scene-config
    const scene_config = this._config.scenes_config[this._config.player_config.sceneKey]
    if (scene_config.item.length != 0) {
      items.forEach((item: Item) => {
        if (_.includes(scene_config.item, item.id)) {
          // pass
          item.create()
        } else {
          item.destroy()
        }
      })
    }
    this.scene.physics.add.collider(this.player, items) // add collider 
    this.scene.add.existing(this.item_text).setDepth(15)
    this.item_text.visible = false // add item_text
    this.scene.physics.add.overlap(this.player.interact_area, items, (area: any, item: any) => {
      // item-interact event
      if (Phaser.Input.Keyboard.JustDown(this.controls.enter)) {
        this.controls.enter.isDown = false
        
        const cameraX = this.scene.cameras.main.worldView.x, cameraY = this.scene.cameras.main.worldView.y
        item.emit('item-interact', cameraX, cameraY)
      }
    }) // add overlap callback

    // create npc on screen
    if (Object.keys(scene_config.npc).length != 0) {
      npcs.forEach((npc: NPC) => {
        npc.create()
      })
    }
    this.scene.physics.add.overlap(this.player.interact_area, npcs, (area, npc: any) => {
      if (Phaser.Input.Keyboard.JustDown(this.controls.enter)) {
        this.controls.enter.isDown = false

        npc.dialogueKey =  scene_config.npc[npc.id]
        console.log(npc.dialogueKey)
        const cameraX = this.scene.cameras.main.worldView.x, cameraY = this.scene.cameras.main.worldView.y
        npc.emit('start-talking', npc.dialogueKey, cameraX, cameraY)
      }
    }) // overlap-talk event
    this.scene.events.on('start-talking', () => {
      this.minimap.visible = false // remove minimap
      this.controls.cursor.down.enabled = false
      this.controls.cursor.left.enabled = false
      this.controls.cursor.right.enabled = false 
      this.controls.cursor.up.enabled = false // cursor disable
    })
    this.scene.events.on('end-talking', (dialogue?: Dialogue) => {
      this.minimap.visible = true // add minimap
      this.controls.cursor.down.enabled = true
      this.controls.cursor.left.enabled = true
      this.controls.cursor.right.enabled = true 
      this.controls.cursor.up.enabled = true // cursor enable

      dialogue?.destroy()
    })
    
    this.scene.physics.add.collider(this.player, npcs)
  }

  update(items: [ Item ], npcs: [ NPC ]) {
    // update keyboard_text.x,y
    const cameraX = this.scene.cameras.main.worldView.x, cameraY = this.scene.cameras.main.worldView.y
    this.keyboard_text.setPosition(cameraX + 410, cameraY + 10)

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