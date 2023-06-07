import Phaser from 'phaser'
import _ from 'lodash'
import Player from './GameObjects/Player'
import NPC from './GameObjects/NPC'
import Item from './GameObjects/Item'
import sami from './assets/sami_sprite/sami_frame1fixedversion (1).png'
import Dialogue from './GameObjects/Dialogue'

export default class SceneLoadPlugin extends Phaser.Plugins.ScenePlugin {
  private _config: {
    player_config: { sceneKey: string, x: number, y:number },
    scenes_config: any
  } = {
    player_config: { sceneKey: 'undefined', x: 0, y: 0 },
    scenes_config: {}
  }
  private player: Player
  private minimap: Phaser.Cameras.Scene2D.Camera
  private controls: { cursor: any, enter: Phaser.Input.Keyboard.Key } = {
    cursor: this.scene!.input.keyboard!.createCursorKeys(),
    enter: this.scene!.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER, true, false)
  }
  private item_text: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene!, 0, 0, '엔터를 눌러 아이템 얻기', {
    fontFamily: 'NeoDunggeunmo',
    fontSize: '20px',
    stroke: '#000',
    strokeThickness: 6,
    color: '#fff'
  })
  private keyboard_text: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene!, 0, 0,
    '방향키:이동  Enter:상호작용',
    {
      fontFamily: 'NeoDunggeunmo',
      fontSize: '20px',
      stroke: '#fff',
      strokeThickness: 5,
      color: '#000'
    })

  constructor(scene: Phaser.Scene, manager: Phaser.Plugins.PluginManager, key: string) {
    super(scene, manager, key)
  }

  destroy() {
    // save scene data to this.game.active_scenes
    super.destroy()
  }

  private set config(data) {
    this._config = data
  }

  public get config() {
    this._config.player_config.x = this.player ? this.player.x:0
    this._config.player_config.y = this.player ? this.player.y:0

    return this._config
  }

  preload() {
    // preload player spitesheet
    this.scene!.load.spritesheet('sami', sami, { frameWidth: 1088 / 17, frameHeight: 64 })
  }

  create(colliders: [ Phaser.Physics.Arcade.StaticGroup ],
    items: [ Item ]|[],
    npcs: [ NPC ]|[],
    camera_config: { main_zoom: number, mini_zoom: number, mini_scrollX: number, mini_scrollY: number, player_scale?: number },
    data: {
      player_config: {x: number, y: number, sceneKey: string},
      scenes_config: any
    }) {
    this.config = _.cloneDeep(data)

    this.scene!.cameras.main
      .setBounds(0, 0, 2800, 1980)
      .setSize(2800/3, 1981/3)
      .setZoom(camera_config.main_zoom)
      .setName('main')
    
    // create minimap
    this.minimap = this.scene!.cameras.add(15, 15, 2700*0.07, 1981*0.07).setZoom(camera_config.mini_zoom).setName('mini')

    this.minimap.setBackgroundColor(0xaca2a0)
    this.minimap.scrollX = camera_config.mini_scrollX
    this.minimap.scrollY = camera_config.mini_scrollY
    this.minimap.ignore([ this.item_text, this.keyboard_text ]) // item_text, keyboard_text invisible in minimap

    // add keyboard_text to scene
    this.scene!.add.existing(this.keyboard_text).setDepth(30)
    this.scene!.input.keyboard!.addCapture([this.controls.cursor, 'ENTER', 'SPACE']) // prevent event propagation

    // create player on scene
    this.player = new Player(
      this.scene!,
      data.player_config.x,
      data.player_config.y,
      this.scene!.textures.get('sami'),
      camera_config.player_scale
    )
    this.player.create()
    this.player.setCollideWorldBounds(true) // set player world bound
    this.minimap.startFollow(this.player) // minimap follow player
    colliders.forEach(collider => {
      this.scene!.physics.add.collider(this.player, collider)
    }) // add collider physics on player

    // get scene_config
    const scene_config = data.scenes_config[data.player_config.sceneKey]
    
    // create item on screen
    if (Object.keys(scene_config.item).length != 0) {
      items.forEach((item: Item) => {
        item.create()
      })
    }
    this.scene!.physics.add.collider(this.player, items) // add collider 
    this.scene!.add.existing(this.item_text).setDepth(15)
    this.item_text.visible = false // add item_text
    this.scene!.physics.add.overlap(this.player.interact_area, items, (area: any, item: any) => {
      // item-interact event
      if (Phaser.Input.Keyboard.JustDown(this.controls.enter)) {
        this.controls.enter.isDown = false
        
        const key = scene_config.item[item.id]
        const cameraX = this.scene!.cameras.main.worldView.x, cameraY = this.scene!.cameras.main.worldView.y
        item.emit('item-interact', key, cameraX, cameraY)
      }
    }) // add overlap callback

    // create npc on screen
    if (Object.keys(scene_config.npc).length != 0) {
      npcs.forEach((npc: NPC) => {
        npc.create()
      })
    }
    this.scene!.physics.add.overlap(this.player.interact_area, npcs, (area, npc: any) => {
      if (Phaser.Input.Keyboard.JustDown(this.controls.enter)) {
        this.controls.enter.isDown = false

        // get dialogueKey + optionKey
        npc.dialogueKey = scene_config.npc[npc.id] ? scene_config.npc[npc.id].dialogueKey : undefined
        const options = scene_config.npc[npc.id] ? scene_config.npc[npc.id].options : undefined

        // get cameraX + cameraY
        const cameraX = this.scene!.cameras.main.worldView.x, cameraY = this.scene!.cameras.main.worldView.y
        npc.emit('start-talking', { dialogueKey: npc.dialogueKey, options: options }, cameraX, cameraY)
      }
    }) // overlap-talk event
    this.scene!.events.on('start-talking', () => {
      this.minimap.visible = false // remove minimap
      this.controls.cursor.down.enabled = false
      this.controls.cursor.left.enabled = false
      this.controls.cursor.right.enabled = false
      this.controls.cursor.up.enabled = false // cursor disable
      this.controls.enter.enabled = false // enter disable
    })
    this.scene!.events.on('end-talking', (dialogue?: Dialogue) => {
      this.minimap.visible = true // add minimap
      this.controls.cursor.down.enabled = true
      this.controls.cursor.left.enabled = true
      this.controls.cursor.right.enabled = true 
      this.controls.cursor.up.enabled = true // cursor enable
      this.controls.enter.enabled = true // enter enable

      dialogue?.destroy()
    })
    
    this.scene!.physics.add.collider(this.player, npcs)

  /* quiz-progress event */

    this.scene!.events.on('quiz-event', (id: string, progress_config: any) => {
      // set player.position to given value
      this.controls.cursor.down.isDown = false
      this.controls.cursor.left.isDown = false
      this.controls.cursor.right.isDown = false
      this.controls.cursor.up.isDown = false // stop player
      this.player.x = progress_config[id].x ?? this.player.x
      this.player.y = progress_config[id].y ?? this.player.y

      this.scene!.events.emit('start-talking') // emit talking event to scene
      
      // create dialogue
      const cameraX = this.scene!.cameras.main.worldView.x, cameraY = this.scene!.cameras.main.worldView.y
      const zoom = this.scene!.cameras.main.zoom
      const dialogue = new Dialogue(this.scene!, cameraX, cameraY, zoom, id, progress_config)
      dialogue.create(id)
    }) // create progress-event dialogue
  }

  update(items: [ Item ], npcs: [ NPC ]) {
    // update keyboard_text.x,y
    const cameraX = this.scene!.cameras.main.worldView.x, cameraY = this.scene!.cameras.main.worldView.y
    this.keyboard_text.setPosition(cameraX+670, cameraY+10)

    // set controls
    this.player.setVelocity(0,0)

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