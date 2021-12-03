<template>
    <div id="MapFunction"></div>
</template>

<script>
export default {
    name: 'Map',
    created() {       
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
    var house_m;
    var cursors; //키보드 키 
    var ground;


    var game = new Phaser.Game(config);

    function preload ()
    {
        this.load.image('back1', './assets/map_png/바닥.png');
        this.load.image('back2', './assets/map_png/건물만있는.png');
        this.load.image('house1', './assets/map_png/궁_0000s_0004_건물6_충돌버전.png');
        //this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', './assets/map_png/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    function create ()
    {
        this.add.image(700,495.25,'back1').setScale(0.5);
        platforms = this.physics.add.staticGroup(); //그룹으로 묶는다. 
        house_m = this.physics.add.staticGroup();

        //ground = this.physics.add.staticGroup();
        house_m.create(1220, 775,'house1').setScale(0.5).refreshBody();
        //ground.create(700, 495.25,'ground').refreshBody();
        platforms.create(700,495.25,'back2').setScale(0.5).refreshBody().setDepth(10);
    

        player = this.physics.add.sprite(100, 450, 'dude');

        player.setCollideWorldBounds(true);


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8  }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, house_m);
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
            player.anims.play('turn', true);
        } else if (cursors.down.isDown) {
            player.anims.play('turn', true);
        } else {
            player.anims.stop();
        }
        player.body.velocity.normalize().scale(160);
        
    }
 
    }
}
</script>

<style>
body {
    margin: 0;
}
</style>