import 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload,
        create,
        update
    }
};

new Phaser.Game(config);

function preload() {
    this.load.image('floor', 'assets/floor.jpg');
    this.load.spritesheet('player-1', 'assets/player.png', {
        frameWidth: 32,
        frameHeight: 32
    });
}

function create() {
    this.add.image(400, 300, 'floor');
    this.player = this.add.sprite(400, 300, 'player-1');

    this.anims.create({
        key: 'player-idle',
        frames: [{
            key: 'player-1',
            frame: 20
        }],
    });

    this.anims.create({
        key: 'player-left',
        frames: this.anims.generateFrameNumbers('player-1', {
            start: 0,
            end: 3
        }),
        repeat: -1
    });

    this.anims.create({
        key: 'player-right',
        frames: this.anims.generateFrameNumbers('player-1', {
            start: 4,
            end: 7
        }),
        repeat: -1
    });

    this.keys = this.input.keyboard.createCursorKeys();
}

function update() {

    if (this.keys.left.isDown) {
        this.player.anims.play('player-left');
        this.player.x -= 5;
    } else if (this.keys.right.isDown) {
        this.player.anims.play('player-right');
        this.player.x += 5;
    } else {
        this.player.anims.play('player-idle');
    }
}