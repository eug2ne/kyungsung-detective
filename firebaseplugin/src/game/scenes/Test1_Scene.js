import { BlendModes, Scene } from 'phaser'

export default class Test1_Scene extends Scene {
  constructor () {
    super({ key: 'Test1_Scene' })
  }

  create () {
    this.physics.world.setBounds(0, 0, 2800,1981)
    this.cameras.main.setBounds(0, 0, 2800,1981).setZoom(0.9).setName('main')

    this.minimap = this.cameras.add(15, 15, 2700*0.07, 1981*0.07).setZoom(0.065).setName('mini');

    this.minimap.setBackgroundColor(0xaca2a0)
    this.minimap.scrollX = 1306
    this.minimap.scrollY = 925

    this.add.image(2800/2,1981/2,'back1')
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

    house_m.create(1220*2, 775*2,'house1').refreshBody()
    tree_sss.create(700*2, 495.25*2,'treess').refreshBody().setDepth(10)
    platforms.create(700.45*2,495.25*2,'back2').refreshBody().setDepth(5)

    col_left_h_g.create(446.5*2,467*2,'left_h_g').refreshBody()
    col_mid_h.create(705*2,475*2,'mid_h').refreshBody()
    col_mini_h.create(2405,1753,'mini_h').refreshBody()
    col_mini_h.create(2495,1753,'mini_h').refreshBody()
    col_left_h.create(1295,1380,'left_h').refreshBody()
    col_right_h.create(1863,1325,'right_h').refreshBody()
    col_gr1.create(1726,809,'gr1').refreshBody()
    col_gr2.create(1648,943,'gr2').refreshBody()
    col_gr3.create(1780,888,'gr3').refreshBody()
    col_gr4.create(1756,968,'gr4').refreshBody()
    col_fo1.create(2478,317,'fo1').refreshBody()
    col_fo2.create(2074,61,'fo2').refreshBody()
    col_fo3.create(2330,123,'fo3').refreshBody()
    col_fo4.create(2398,229,'fo4').refreshBody()
    col_fo5.create(2340,325/2,'fo5').refreshBody()
    col_fo5.create(2309.5,196/2,'fo6').refreshBody()

    col_north_o.create(1574,470,'north_o').refreshBody()
    col_west_o.create(2570,948,'west_o').refreshBody()

    //나무 심기(충돌때문에 하나씩)
    //왼쪽 위에 숲
    trees.create(95*2, 65*2,'tree').setScale(0.8).refreshBody()
    trees.create(155*2, 30*2,'tree').setScale(0.8).refreshBody()
    trees.create(215*2, 20*2,'tree').setScale(0.8).refreshBody()
    trees.create(90*2, 165*2,'tree').setScale(0).refreshBody()
    trees.create(120*2, 225*2,'tree').setScale(0.8).refreshBody()
    //위 중앙 숲
    trees.create(330*2, 190*2,'tree').setScale(0.8).refreshBody()
    trees.create(350*2, 95*2,'tree').setScale(0.8).refreshBody()
    trees.create(400*2, 25*2,'tree').setScale(0.8).refreshBody()
    trees.create(490*2, 20*2,'tree').setScale(0.8).refreshBody()
    trees.create(435*2, 80*2,'tree').setScale(0.8).refreshBody()
    trees.create(435*2, 80*2,'tree').setScale(0.8).refreshBody()
    trees.create(465*2, 150*2,'tree').setScale(0.8).refreshBody()
    trees.create(430*2, 230*2,'tree').setScale(0.8).refreshBody()
    trees.create(485*2, 280*2,'tree').setScale(0.8).refreshBody()
    trees.create(520*2, 135*2,'tree').setScale(0.8).refreshBody()
    trees.create(535*2, 85*2,'tree').setScale(0.8).refreshBody()
    trees.create(525*2, 210*2,'tree').setScale(0.8).refreshBody()
    trees.create(630*2, 165*2,'tree').setScale(0.8).refreshBody()
    trees.create(620*2, 104*2,'tree').setScale(0.8).refreshBody()
    
    //중간 숲
    trees.create(270*2, 753*2,'tree').setScale(0.8).refreshBody()
    trees.create(385*2, 750*2,'tree').setScale(0.8).refreshBody()
    trees.create(425*2, 640*2,'tree').setScale(0.8).refreshBody()
    trees.create(1090*2, 640*2,'tree').setScale(0.8).refreshBody()
    trees.create(1175*2, 627*2,'tree').setScale(0.8).refreshBody()
    trees.create(1235*2, 638*2,'tree').setScale(0.8).refreshBody()

    //밑에 숲
    trees.create(80*2, 698*2,'tree').setScale(0.8).refreshBody()
    trees.create(100*2, 778*2,'tree').setScale(0.8).refreshBody()
    trees.create(90*2, 930*2,'tree').setScale(0.8).refreshBody()
    trees.create(150*2, 985*2,'tree').setScale(0.8).refreshBody()
    trees.create(160*2, 937*2,'tree').setScale(0.8).refreshBody()
    trees.create(250*2, 990.5*2,'tree').setScale(0.8).refreshBody()
    trees.create(340*2, 990.5*2,'tree').setScale(0.8).refreshBody()
    trees.create(395*2, 970*2,'tree').setScale(0.8).refreshBody()
    trees.create(492*2, 984*2,'tree').setScale(0.8).refreshBody()
    trees.create(553*2, 962*2,'tree').setScale(0.8).refreshBody()
    trees.create(568*2, 863*2,'tree').setScale(0.8).refreshBody()
    trees.create(626*2, 889*2,'tree').setScale(0.8).refreshBody()
    trees.create(705*2, 896*2,'tree').setScale(0.8).refreshBody()
    trees.create(760*2, 962*2,'tree').setScale(0.8).refreshBody()
    trees.create(623*2, 963*2,'tree').setScale(0.8).refreshBody()


    trees.create(1706, 1930,'tree').setScale(0.8).refreshBody()
    trees.create(1764, 1740,'tree').setScale(0.8).refreshBody()
    trees.create(1870, 1718,'tree').setScale(0.8).refreshBody()
    trees.create(1842, 1897,'tree').setScale(0.8).refreshBody()
    trees.create(1940, 1755,'tree').setScale(0.8).refreshBody()
    trees.create(2000, 1900,'tree').setScale(0.8).refreshBody()
    trees.create(2122, 1922,'tree').setScale(0.8).refreshBody()
    trees.create(2190, 1974,'tree').setScale(0.8).refreshBody()
    trees.create(2350, 1944,'tree').setScale(0.8).refreshBody()
    trees.create(2540, 1900,'tree').setScale(0.8).refreshBody()
    trees.create(2640, 1850,'tree').setScale(0.8).refreshBody()
    trees.create(2690, 1690,'tree').setScale(0.8).refreshBody()
    trees.create(2738, 1516,'tree').setScale(0.8).refreshBody()
    trees.create(2627, 1505,'tree').setScale(0.8).refreshBody()
    trees.create(2654, 1344,'tree').setScale(0.8).refreshBody()
    trees.create(2776, 1243,'tree').setScale(0.8).refreshBody()

    // player = this.physics.add.sprite(200, 900, 'sami').setScale(0.16)
    // this.cameras.main.startFollow(player, false, 0.2, 0.2)
    // //player.setCollideWorldBounds(true)

    // this.anims.create({
    //   key: 'left',
    //   frames: this.anims.generateFrameNumbers('sami', { start: 1, end: 4 }),
    //   frameRate: 10,
    //   repeat: -1
    // })
    // this.anims.create({
    //     key: 'back',
    //     frames: this.anims.generateFrameNumbers('sami', { start: 5, end: 8 }),
    //     frameRate: 10,
    //     repeat: -1
    // })
    // this.anims.create({
    //     key: 'front',
    //     frames: this.anims.generateFrameNumbers('sami', { start: 9, end: 12 }),
    //     frameRate: 10,
    //     repeat: -1
    // })
    // this.anims.create({
    //     key: 'right',
    //     frames: this.anims.generateFrameNumbers('sami', { start: 13, end: 16 }),
    //     frameRate: 10,
    //     repeat: -1
    // })


    // cursors = this.input.keyboard.createCursorKeys()


    // this.physics.add.collider(player, house_m)
    // this.physics.add.collider(player, trees)
    // this.physics.add.collider(player, col_left_h_g)
    // this.physics.add.collider(player, col_mid_h)
    // this.physics.add.collider(player, col_mini_h)
    // this.physics.add.collider(player, col_left_h)
    // this.physics.add.collider(player, col_right_h)
    // this.physics.add.collider(player, col_north_o)
    // this.physics.add.collider(player, col_west_o)
    // this.physics.add.collider(player, col_fo1)
    // this.physics.add.collider(player, col_fo2)
    // this.physics.add.collider(player, col_fo3)
    // this.physics.add.collider(player, col_fo4)
    // this.physics.add.collider(player, col_fo5)
    // this.physics.add.collider(player, col_fo6)
    // this.physics.add.collider(player, col_gr1)
    // this.physics.add.collider(player, col_gr2)
    // this.physics.add.collider(player, col_gr3)
    // this.physics.add.collider(player, col_gr4)
  }

//   update () {
//     const x = player.x, y = player.y;
//     const distance = 30;

//     player.body.setVelocity(0);

//     if (cursors.left.isDown){ 
//         player.body.setVelocityX(-160*4);
//     }
//     else if (cursors.right.isDown){
//         player.body.setVelocityX(160*4);
//     }
//     if(cursors.up.isDown){
//         player.body.setVelocityY(-160*4);
//     }
//     else if(cursors.down.isDown){
//         player.body.setVelocityY(160*4);
//     }
    
//     if (cursors.left.isDown) {
//         player.anims.play('left', true);
//     }else if (cursors.right.isDown) {
//         player.anims.play('right', true);
//     } else if (cursors.up.isDown) {
//         player.anims.play('back', true);
//     } else if (cursors.down.isDown) {
//         player.anims.play('front', true);
//     } else {
//         player.anims.stop();
//     }
//     player.body.velocity.normalize().scale(50*4);
//   }
}