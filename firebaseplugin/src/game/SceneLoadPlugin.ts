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

  constructor(scene: Phaser.Scene, manager: Phaser.Plugins.PluginManager, key: string) {
    super(scene, manager, key)
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
        Response.default.forEach((npc: any) => {
          this.scene.load.spritesheet(`${npc.id}_scenetexture`, npc.scenetexture, { frameWidth: 3808 / 17, frameHeight: 330 })
          this.scene.load.image(`${npc.id}_logtexture`, npc.logtexture)
          
          // this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
          //   const scenetexture = this.scene.textures.get(`${npc.id}_scenetexture`)
          //   const logtexture = this.scene.textures.get(`${npc.id}_logtexture`)
            
          //   this.npcs.push(new NPC(
          //     this.scene,
          //     npc.id,
          //     npc.type,
          //     npc.lines,
          //     scenetexture,
          //     logtexture,
          //     npc.x,
          //     npc.y
          //   ))
          // })
        })
      })

    // create this.items
    import(`./scenes/${scene_id}_Items.js`)
      .then(Response => {
        this.items_JSON = Response.default
        Response.default.forEach((item: any) => {
          this.scene.load.image(item.texture, item.texture)
          
          // this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
          //   this.items.push(new Item(
          //     this.scene,
          //     item.x,
          //     item.y,
          //     item.name,
          //     item.texture
          //   ))
          // })
        })
      })
  }

  create(colliders: [ Phaser.Physics.Arcade.StaticGroup ]) {
    console.log('sceneload create')
    // create player on scene
    this.player = new Player(
      this.scene,
      400,
      900,
      this.scene.textures.get('sami')
    )
    this.player.create()

    // add collider physics on player
    colliders.forEach(collider => {
      this.scene.physics.add.collider(this.player, collider)
    })

    // create item on screen
    this.items_JSON.forEach((json: {x: number, y: number, name: string , texture: string}) => {
      this.items.push(new Item(
        this.scene,
        json.x,
        json.y,
        json.name,
        json.texture
      ))
    })

    this.scene.physics.add.collider(this.items, this.player, (item, player) => {
      const text = this.scene.add.text(player.body.x, player.body.y, `스페이스 눌러 ${item.name} 얻기`).setDepth(15)
      text.setFontSize(35)
      text.setColor('#fff')
      text.setStroke('#000', 6)
      text.setFontFamily('NeoDunggeunmo')
    })

    // create npc on screen
    this.npcs_JSON.forEach((json: any) => {
      const scenetexture = this.scene.textures.get(`${json.id}_scenetexture`)
      const logtexture = this.scene.textures.get(`${json.id}_logtexture`)
      
      this.npcs.push(new NPC(
        this.scene,
        json.id,
        json.type,
        json.lines,
        scenetexture,
        logtexture,
        json.x,
        json.y
      ))
    })

    this.npcs.forEach((npc: NPC) => {
      npc.create()
      this.scene.physics.add.collider(npc, this.player)
    })
  }

  update() {
    // set controls
    this.player.setVelocity(0)

    const controls = {
      cursor: this.scene.input.keyboard.createCursorKeys(),
      space: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      enter: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    if (controls.cursor.left.isDown) {
      this.player.update('left')
    } else if (controls.cursor.right.isDown) {
      this.player.update('right')
    } else if (controls.cursor.up.isDown) {
      this.player.update('up')
    } else if (controls.cursor.down.isDown) {
      this.player.update('down')
    } else {
      this.player.anims.stop()
    }

    this.npcs.forEach((npc: NPC) => {
      npc.update()
    })
  }
}