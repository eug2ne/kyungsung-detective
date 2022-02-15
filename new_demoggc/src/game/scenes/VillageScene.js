import { Scene } from 'phaser'

var player, box
var cursors

export default class VillageScene extends Scene {
  constructor () {
    super({ key: 'VillageScene' })
  }

  create () {
    this.physics.world.setBounds(0, 0, 2800, 1981)
    this.cameras.main.setBounds(0, 0, 2800, 1981).setZoom(0.9).setName('main')

    this.minimap = this.cameras.add(15, 15, 2700*0.07, 1981*0.07).setZoom(0.065).setName('mini');

    this.minimap.setBackgroundColor(0xaca2a0)
    this.minimap.scrollX = 1306
    this.minimap.scrollY = 925

    this.add.image(2800/2, 1981/2,'vback1')

    var floatGroup = this.physics.add.staticGroup()
    var fields = this.physics.add.staticGroup()
    var trees = this.physics.add.staticGroup()
    var grass = this.physics.add.staticGroup()
    var houses = this.physics.add.staticGroup()

    floatGroup.create(2800/2-234, 1981/2+22,'vcutted_tree').refreshBody().setDepth(10)
    floatGroup.create(420, 968, 'vhouse_1_float').refreshBody().setDepth(5)
    floatGroup.create(338, 888, 'vhouse_1_fence_float').refreshBody().setDepth(4)
    floatGroup.create(759, 687, 'vhouse_2_float').refreshBody().setDepth(5)
    floatGroup.create(1148, 195, 'vhouse_3_float').refreshBody().setDepth(5)
    floatGroup.create(1274, 748, 'vhouse_4_float').refreshBody().setDepth(5)
    floatGroup.create(2045, 752, 'vhouse_5_float').refreshBody().setDepth(5)

    fields.create(320, 380, 'vfield_1_1').refreshBody()
    fields.create(740, 510, 'vfield_1_2').refreshBody()
    fields.create(685, 383, 'vfield').refreshBody()
    fields.create(739, 425, 'vfield').refreshBody()
    fields.create(790, 475, 'vfield').refreshBody()
    fields.create(1700, 355, 'vfield_2_1').refreshBody()
    fields.create(1645, 465, 'vfield_2_2').refreshBody()
    fields.create(1595, 503, 'vfield_2_3').refreshBody()
    fields.create(1625, 550, 'vfield_2_4').refreshBody()
    fields.create(1617, 609, 'vfield').refreshBody()
    fields.create(337, 1609, 'vfield_3_1').refreshBody()
    fields.create(356, 1500, 'vfield_3_1').refreshBody()
    fields.create(839, 1351, 'vfield_3_1').refreshBody()
    fields.create(889, 1321, 'vfield_3_1').refreshBody()
    fields.create(723, 1500, 'vfield_3_2').refreshBody()
    fields.create(1190, 1406, 'vfield_3_3').refreshBody() 
    fields.create(1799, 1412.5, 'vfield_4_1').refreshBody()
    fields.create(2084, 1375, 'vfield_4_2').refreshBody()
    fields.create(2405, 1363.5, 'vfield_4_3').refreshBody()

    trees.create(845, 234, 'vtree').refreshBody()
    trees.create(1445, 246, 'vtree').refreshBody()
    trees.create(2264, 853, 'vtree').refreshBody()
    trees.create(1344, 1895, 'vtree').refreshBody()
    trees.create(65, 1740, 'vtree').refreshBody()
    trees.create(150, 1880, 'vtree').refreshBody()
    trees.create(215, 1310, 'vtree').refreshBody()

    grass.create(49, 1629, 'vgrass_1').refreshBody()
    grass.create(69, 757, 'vgrass_2').refreshBody()
    grass.create(1400, 89, 'vgrass_3').refreshBody()
    grass.create(2149, 165, 'vgrass_4').refreshBody()
    grass.create(2490, 229, 'vgrass_5').refreshBody()
    grass.create(2453, 558, 'vgrass_6').refreshBody()
    grass.create(2192, 527, 'vgrass_7').refreshBody()
    grass.create(2315, 633, 'vgrass_7').refreshBody()
    grass.create(2593, 915, 'vgrass_8').refreshBody()
    grass.create(2673, 990, 'vgrass_9').refreshBody()
    grass.create(2625, 1683, 'vgrass_10').refreshBody()
    grass.create(2495, 1815, 'vgrass_11').refreshBody()
    grass.create(2191, 1865, 'vgrass_7').refreshBody()
    grass.create(2272, 1925, 'vgrass_12').refreshBody()
    grass.create(309, 130, 'vgrass_12').refreshBody()

    houses.create(423, 1027, 'vhouse_1').refreshBody()
    houses.create(760, 725, 'vhouse_2').refreshBody()
    houses.create(1148, 295, 'vhouse_3').refreshBody()
    houses.create(1233, 847, 'vhouse_4_1').refreshBody()
    houses.create(1490, 879, 'vhouse_4_2').refreshBody()
    houses.create(1463, 780, 'vhouse_4_3').refreshBody()
    houses.create(2046, 847, 'vhouse_5').refreshBody()

    fields.setAlpha(0)
    trees.setAlpha(0)
    grass.setAlpha(0)
    houses.setAlpha(0)

    player = this.physics.add.sprite(1625, 1140, 'sami').setScale(0.16)
    this.cameras.main.startFollow(player, false, 0.2, 0.2)
    player.body.collideWorldBounds = true

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('sami', { start: 1, end: 4 }),
      frameRate: 3,
      repeat: -1
    })
    this.anims.create({
        key: 'back',
        frames: this.anims.generateFrameNumbers('sami', { start: 5, end: 8 }),
        frameRate: 3,
        repeat: -1
    })
    this.anims.create({
        key: 'front',
        frames: this.anims.generateFrameNumbers('sami', { start: 9, end: 12 }),
        frameRate: 3,
        repeat: -1
    })
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('sami', { start: 13, end: 16 }),
        frameRate: 3,
        repeat: -1
    })

    cursors = this.input.keyboard.createCursorKeys()
    box = this.physics.add.existing(this.add.rectangle(0, 0, 40, 40));

    this.physics.add.collider(player, fields)
    this.physics.add.collider(player, trees)
    this.physics.add.collider(player, grass)
    this.physics.add.collider(player, houses)
  }

  update () {
    const x = player.x, y = player.y;
    const distance = 30;

    player.body.setVelocity(0);

    if (cursors.left.isDown){ 
        player.body.setVelocityX(-200);
        box.setPosition(x - distance, y);
    }
    else if (cursors.right.isDown){
        player.body.setVelocityX(200);
        box.setPosition(x + distance, y);
    }
    if(cursors.up.isDown){
        player.body.setVelocityY(-200);
        box.setPosition(x, y - distance);
    }
    else if(cursors.down.isDown){
        player.body.setVelocityY(200);
        box.setPosition(x, y + distance);
    }
    
    if (cursors.left.isDown) {
        player.anims.play('left', true);
    }else if (cursors.right.isDown) {
        player.anims.play('right', true);
    } else if (cursors.up.isDown) {
        player.anims.play('back', true);
    } else if (cursors.down.isDown) {
        player.anims.play('front', true);
    } else {
        player.anims.stop();
    }

    player.body.velocity.normalize().scale(200);
  }
}