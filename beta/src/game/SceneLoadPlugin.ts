import Phaser from 'phaser'
import _ from 'lodash'
import keyboardInterface from './interface/keyboardInterface'
import dialogueInterface from './interface/dialogueInterface'
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
  public player: Player
  private minimap: Phaser.Cameras.Scene2D.Camera
  private item_text: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene!, 0, 0, '엔터를 눌러 아이템 얻기', {
    fontFamily: 'NeoDunggeunmo',
    fontSize: '20px',
    stroke: '#000',
    strokeThickness: 6,
    color: '#fff'
  })
  private keyboard: keyboardInterface
  private dialogue: dialogueInterface
  private keyboard_text: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene!, 0, 0,
    '방향키:이동  Space/Enter:상호작용',
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
    this.scene!.add.existing(this.keyboard_text).setDepth(30).setFontSize(`${20/camera_config.main_zoom}px`)

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
      if (this.keyboard.interactWithNPCItem()) {
        // get dialogueKey + optionKey
        item.dialogueKey = scene_config.item[item.id] ? scene_config.item[item.id].interactionKey : undefined
        item.optionsData = scene_config.item[item.id] ? scene_config.item[item.id].options : undefined

        // get cameraX + cameraY
        const cameraX = this.scene!.cameras.main.worldView.x, cameraY = this.scene!.cameras.main.worldView.y
        // get zoom
        const zoom = this.scene!.cameras.main.zoom

        // create dialogue on scene
        if (!item.dialogueKey||!item.dialogueData) return
        this.dialogue.createDialogue(cameraX, cameraY, zoom, item.dialogueKey, item.dialogueData, item.optionsData)

        // emit start-talking event
        item.emit('start-talking')
        this.scene!.events.emit('start-talking')
      }
    }) // add overlap callback

    // create npc on screen
    if (Object.keys(scene_config.npc).length != 0) {
      npcs.forEach((npc: NPC) => {
        npc.create()
      })
    }
    this.scene!.physics.add.overlap(this.player.interact_area, npcs, (area, npc: any) => {
      // npc-interact event
      if (this.keyboard.interactWithNPCItem()) {
        // get dialogueKey + optionKey
        npc.dialogueKey = scene_config.npc[npc.id] ? scene_config.npc[npc.id].dialogueKey : undefined
        npc.optionsData = scene_config.npc[npc.id] ? scene_config.npc[npc.id].options : undefined

        // get cameraX + cameraY
        const cameraX = this.scene!.cameras.main.worldView.x, cameraY = this.scene!.cameras.main.worldView.y
        // get zoom
        const zoom = this.scene!.cameras.main.zoom

        // create dialogue on scene
        if (!npc.dialogueKey||!npc.dialogueData) return
        this.dialogue.createDialogue(cameraX, cameraY, zoom, npc.dialogueKey, npc.dialogueData, npc.optionsData)

        // emit start-talking event
        npc.emit('start-talking')
        this.scene!.events.emit('start-talking')
      }
    }) // add overlap callback
    this.scene!.events.on('start-talking', () => {
      this.player.anims.pause() // stop player animation
      this.minimap.visible = false // remove minimap
      this.keyboard.startTalking() // set key events to dialogue mode
    })
    this.scene!.events.on('end-talking', () => {
      this.dialogue.destroyDialogue() // destroy dialogue
      this.minimap.visible = true // add minimap
      this.keyboard.endTalking() // set key events to default mode
    })
    
    this.scene!.physics.add.collider(this.player, npcs)

  /* quiz-progress event */

    this.scene!.events.on('quiz-event', (id: string, progress_config: any) => {
      // set player.position to given value
      this.player.x = progress_config[id].x ?? this.player.x
      this.player.y = progress_config[id].y ?? this.player.y

      this.scene!.events.emit('start-talking') // emit talking event to scene
      
      // create dialogue
      const cameraX = this.scene!.cameras.main.worldView.x, cameraY = this.scene!.cameras.main.worldView.y
      const zoom = this.scene!.cameras.main.zoom
      const dialogue = new Dialogue(this.scene!, cameraX, cameraY, zoom, id, progress_config)
      dialogue.create(id)
    }) // create progress-event dialogue

    // create keyboard-interface
    this.keyboard = new keyboardInterface(this.game, this.scene!, this, this.scene!.input.keyboard!)
    this.keyboard.createKeys() // create cursor + enter + space keys

    // create dialogue-interface
    this.dialogue = new dialogueInterface(this.game, this.scene!, this, this.keyboard)
  }

  update(items: [ Item ], npcs: [ NPC ]) {
    // update keyboard_text.x,y
    const cameraX = this.scene!.cameras.main.worldView.x, cameraY = this.scene!.cameras.main.worldView.y
    this.keyboard_text.setPosition(cameraX+550, cameraY+10)

    // player move control
    this.player.setVelocity(0,0)
    this.keyboard.movePlayer()

    // dialogue control
    if (this.dialogue.option_pointer) {
      // option-pointer control
      switch (this.keyboard.interactWithDialogue()) {
        case 'option-up':
          // move option-pointer up
          this.dialogue.option_pointer!.movePointer('option-up')
          break

        case 'option-down':
          // move option-pointer down
          this.dialogue.option_pointer!.movePointer('option-down')
          break

        case 'click-keydown':
          // select option
          this.dialogue.option_pointer!.selectPointer()
          break
      }
    } else {
      if (this.keyboard.interactWithDialogue() === 'click-keydown') {
        // skip line
        this.dialogue.skipLine()
      }  
    }

    // npc animation
    npcs.forEach((npc: NPC) => {
      npc.update()
    })
  }
}