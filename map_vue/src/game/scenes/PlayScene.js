import { Scene } from 'phaser'

var player
var cursors
export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }

  create () {
    this.add.image(700,495.25,'back1').setScale(0.5)
    var platforms = this.physics.add.staticGroup() //그룹으로 묶는다. 
    var house_m = this.physics.add.staticGroup()
    var trees = this.physics.add.staticGroup()
    var tree_sss = this.physics.add.staticGroup()
    var col_left_h_g = this.physics.add.staticGroup()
    var col_mid_h = this.physics.add.staticGroup()
    var col_west_o = this.physics.add.staticGroup()
    var col_north_o = this.physics.add.staticGroup()
    var col_mini_h = this.physics.add.staticGroup()
    var col_left_h = this.physics.add.staticGroup()
    var col_right_h = this.physics.add.staticGroup()
    var col_fo1= this.physics.add.staticGroup()
    var col_fo2 = this.physics.add.staticGroup()
    var col_fo3 = this.physics.add.staticGroup()
    var col_fo4 = this.physics.add.staticGroup()
    var col_fo5 = this.physics.add.staticGroup()
    var col_fo6 = this.physics.add.staticGroup()
    var col_gr1 = this.physics.add.staticGroup()
    var col_gr2 = this.physics.add.staticGroup()
    var col_gr3 = this.physics.add.staticGroup()
    var col_gr4 = this.physics.add.staticGroup()
    house_m.create(1220, 775,'house1').setScale(0.5).refreshBody()
    tree_sss.create(700, 495.25,'treess').setScale(0.5).refreshBody().setDepth(10)
    platforms.create(700.45,495.25,'back2').setScale(0.5).refreshBody().setDepth(5)

    col_left_h_g.create(446.5,467,'left_h_g').setScale(0.5).refreshBody()
    col_mid_h.create(705,475,'mid_h').setScale(0.5).refreshBody()
    col_mini_h.create(2405/2,1753/2,'mini_h').setScale(0.5).refreshBody()
    col_mini_h.create(2495/2,1753/2,'mini_h').setScale(0.5).refreshBody()
    col_left_h.create(1295/2,1380/2,'left_h').setScale(0.5).refreshBody()
    col_right_h.create(1863/2,1325/2,'right_h').setScale(0.5).refreshBody()
    col_gr1.create(1726/2,809/2,'gr1').setScale(0.5).refreshBody()
    col_gr2.create(1648/2,943/2,'gr2').setScale(0.5).refreshBody()
    col_gr3.create(1780/2,888/2,'gr3').setScale(0.5).refreshBody()
    col_gr4.create(1756/2,968/2,'gr4').setScale(0.5).refreshBody()
    col_fo1.create(2478/2,317/2,'fo1').setScale(0.5).refreshBody()
    col_fo2.create(2074/2,61/2,'fo2').setScale(0.5).refreshBody()
    col_fo3.create(2330/2,123/2,'fo3').setScale(0.5).refreshBody()
    col_fo4.create(2398/2,229/2,'fo4').setScale(0.5).refreshBody()
    col_fo5.create(2340/2,325/4,'fo5').setScale(0.5).refreshBody()
    col_fo5.create(2309.5/2,196/4,'fo6').setScale(0.5).refreshBody()

    col_north_o.create(1574/2,470/2,'north_o').setScale(0.5).refreshBody()
    col_west_o.create(2570/2,948/2,'west_o').setScale(0.5).refreshBody()

    //나무 심기(충돌때문에 하나씩)
    //왼쪽 위에 숲
    trees.create(95, 65,'tree').setScale(0.4).refreshBody()
    trees.create(155, 30,'tree').setScale(0.4).refreshBody()
    trees.create(215, 20,'tree').setScale(0.4).refreshBody()
    trees.create(90, 165,'tree').setScale(0.4).refreshBody()
    trees.create(120, 225,'tree').setScale(0.4).refreshBody()
    //위 중앙 숲
    trees.create(330, 190,'tree').setScale(0.4).refreshBody()
    trees.create(350, 95,'tree').setScale(0.4).refreshBody()
    trees.create(400, 25,'tree').setScale(0.4).refreshBody()
    trees.create(490, 20,'tree').setScale(0.4).refreshBody()
    trees.create(435, 80,'tree').setScale(0.4).refreshBody()
    trees.create(435, 80,'tree').setScale(0.4).refreshBody()
    trees.create(465, 150,'tree').setScale(0.4).refreshBody()
    trees.create(430, 230,'tree').setScale(0.4).refreshBody()
    trees.create(485, 280,'tree').setScale(0.4).refreshBody()
    trees.create(520, 135,'tree').setScale(0.4).refreshBody()
    trees.create(535, 85,'tree').setScale(0.4).refreshBody()
    trees.create(525, 210,'tree').setScale(0.4).refreshBody()
    trees.create(630, 165,'tree').setScale(0.4).refreshBody()
    trees.create(620, 104,'tree').setScale(0.4).refreshBody()
    
    //중간 숲
    trees.create(270, 753,'tree').setScale(0.4).refreshBody()
    trees.create(385, 750,'tree').setScale(0.4).refreshBody()
    trees.create(425, 640,'tree').setScale(0.4).refreshBody()
    trees.create(1090, 640,'tree').setScale(0.4).refreshBody()
    trees.create(1175, 627,'tree').setScale(0.4).refreshBody()
    trees.create(1235, 638,'tree').setScale(0.4).refreshBody()

    //밑에 숲
    trees.create(80, 698,'tree').setScale(0.4).refreshBody()
    trees.create(100, 778,'tree').setScale(0.4).refreshBody()
    trees.create(90, 930,'tree').setScale(0.4).refreshBody()
    trees.create(150, 985,'tree').setScale(0.4).refreshBody()
    trees.create(160, 937,'tree').setScale(0.4).refreshBody()
    trees.create(250, 990.5,'tree').setScale(0.4).refreshBody()
    trees.create(340, 990.5,'tree').setScale(0.4).refreshBody()
    trees.create(395, 970,'tree').setScale(0.4).refreshBody()
    trees.create(492, 984,'tree').setScale(0.4).refreshBody()
    trees.create(553, 962,'tree').setScale(0.4).refreshBody()
    trees.create(568, 863,'tree').setScale(0.4).refreshBody()
    trees.create(626, 889,'tree').setScale(0.4).refreshBody()
    trees.create(705, 896,'tree').setScale(0.4).refreshBody()
    trees.create(760, 962,'tree').setScale(0.4).refreshBody()
    trees.create(623, 963,'tree').setScale(0.4).refreshBody()
    trees.create(1706/2, 1930/2,'tree').setScale(0.4).refreshBody()
    trees.create(1764/2, 1740/2,'tree').setScale(0.4).refreshBody()
    trees.create(1870/2, 1718/2,'tree').setScale(0.4).refreshBody()
    trees.create(1842/2, 1897/2,'tree').setScale(0.4).refreshBody()
    trees.create(1940/2, 1755/2,'tree').setScale(0.4).refreshBody()
    trees.create(2000/2, 1900/2,'tree').setScale(0.4).refreshBody()
    trees.create(2122/2, 1922/2,'tree').setScale(0.4).refreshBody()
    trees.create(2190/2, 1974/2,'tree').setScale(0.4).refreshBody()
    trees.create(2350/2, 1944/2,'tree').setScale(0.4).refreshBody()
    trees.create(2540/2, 1900/2,'tree').setScale(0.4).refreshBody()
    trees.create(2640/2, 1850/2,'tree').setScale(0.4).refreshBody()
    trees.create(2690/2, 1690/2,'tree').setScale(0.4).refreshBody()
    trees.create(2738/2, 1516/2,'tree').setScale(0.4).refreshBody()
    trees.create(2627/2, 1505/2,'tree').setScale(0.4).refreshBody()
    trees.create(2654/2, 1344/2,'tree').setScale(0.4).refreshBody()
    trees.create(2776/2, 1243/2,'tree').setScale(0.4).refreshBody()

    player = this.physics.add.sprite(100, 450, 'sami').setScale(0.1)
    player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('sami', { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
        key: 'back',
        frames: this.anims.generateFrameNumbers('sami', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    })
    this.anims.create({
        key: 'front',
        frames: this.anims.generateFrameNumbers('sami', { start: 9, end: 12 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('sami', { start: 13, end: 16  }),
        frameRate: 10,
        repeat: -1
    })
   
    cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(player, house_m)
    this.physics.add.collider(player, trees)
    this.physics.add.collider(player, col_left_h_g)
    this.physics.add.collider(player, col_mid_h)
    this.physics.add.collider(player, col_mini_h)
    this.physics.add.collider(player, col_left_h)
    this.physics.add.collider(player, col_right_h)
    this.physics.add.collider(player, col_north_o)
    this.physics.add.collider(player, col_west_o)
    this.physics.add.collider(player, col_fo1)
    this.physics.add.collider(player, col_fo2)
    this.physics.add.collider(player, col_fo3)
    this.physics.add.collider(player, col_fo4)
    this.physics.add.collider(player, col_fo5)
    this.physics.add.collider(player, col_fo6)
    this.physics.add.collider(player, col_gr1)
    this.physics.add.collider(player, col_gr2)
    this.physics.add.collider(player, col_gr3)
    this.physics.add.collider(player, col_gr4)
   
  }

  update () {
    player.body.setVelocity(0);
    if (cursors.left.isDown)
    { 
        player.body.setVelocityX(-160);
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(160);
    }

    if(cursors.up.isDown)
    {
        player.body.setVelocityY(-160);
    }
    else if(cursors.down.isDown){
        player.body.setVelocityY(160);
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
    player.body.velocity.normalize().scale(160);
    
  }
}
