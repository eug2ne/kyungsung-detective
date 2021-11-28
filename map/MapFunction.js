
var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 990.5,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var platforms; 
var trees;
var tree_sss;
var house_m;
var cursors; //키보드 키 
var ground;


var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('back1', 'map_png/바닥.png');
    this.load.image('back2', 'map_png/건물만있는.png');
    this.load.image('house1', 'map_png/궁_0000s_0004_건물6_충돌버전.png');
    this.load.image('tree', 'map_png/궁_0004_나무한그루_충돌.png');
    this.load.image('treess', 'map_png/궁_0005_나무.png');
    this.load.spritesheet('sami', '주인공걸음마확대_frame.png', { frameWidth: 463, frameHeight: 500 });
    this.load.spritesheet('dude', 'map_png/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    this.add.image(700,495.25,'back1').setScale(0.5);
    platforms = this.physics.add.staticGroup(); //그룹으로 묶는다. 
    house_m = this.physics.add.staticGroup();
    trees = this.physics.add.staticGroup();
    tree_sss = this.physics.add.staticGroup();
    house_m.create(1220, 775,'house1').setScale(0.5).refreshBody();
    tree_sss.create(725, 495.25,'treess').setScale(0.5).refreshBody().setDepth(5);
    platforms.create(700,495.25,'back2').setScale(0.5).refreshBody().setDepth(10);
    //나무 심기(충돌때문에 하나씩 심음)
    //왼쪽 위에 숲
    trees.create(95, 65,'tree').setScale(0.4).refreshBody();
    trees.create(155, 30,'tree').setScale(0.4).refreshBody();
    trees.create(215, 20,'tree').setScale(0.4).refreshBody();
    trees.create(90, 165,'tree').setScale(0.4).refreshBody();
    trees.create(115, 225,'tree').setScale(0.4).refreshBody();
    //위 중앙 숲
    trees.create(330, 190,'tree').setScale(0.4).refreshBody();
    trees.create(350, 95,'tree').setScale(0.4).refreshBody();
    trees.create(400, 25,'tree').setScale(0.4).refreshBody();
    trees.create(490, 25,'tree').setScale(0.4).refreshBody();
    trees.create(435, 80,'tree').setScale(0.4).refreshBody();
    trees.create(435, 80,'tree').setScale(0.4).refreshBody();
    trees.create(465, 150,'tree').setScale(0.4).refreshBody();
    trees.create(430, 230,'tree').setScale(0.4).refreshBody();
    trees.create(485, 280,'tree').setScale(0.4).refreshBody();
    trees.create(520, 135,'tree').setScale(0.4).refreshBody();
    trees.create(530, 85,'tree').setScale(0.4).refreshBody();
    trees.create(530, 210,'tree').setScale(0.4).refreshBody();
    
    player = this.physics.add.sprite(100, 450, 'sami').setScale(0.08);
    player.setCollideWorldBounds(true);


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('sami', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'back',
        frames: this.anims.generateFrameNumbers('sami', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'front',
        frames: this.anims.generateFrameNumbers('sami', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('sami', { start: 12, end: 15  }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    //플레이어와 충돌
    this.physics.add.collider(player, house_m);
    this.physics.add.collider(player, trees);
    //this.physics.add.collider(player, ground);
    
    
}

function update ()
{
    const prevVelocity = player.body.velocity.clone();
    //키 입력 처리
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
