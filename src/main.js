import 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
    },
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

function getMagnitude(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function preload() {
    this.load.image('floor', 'assets/floor.jpg');
    this.load.spritesheet('player-1', 'assets/player.png', {
        frameWidth: 32,
        frameHeight: 32
    });
}

function create() {
    this.add.tileSprite(0, 0, config.width, config.height, 'floor').setOrigin(0, 0);

    this.player = this.physics.add.sprite(400, 300, 'player-1').setCollideWorldBounds(true);

    this.anims.create({
        key: 'player-up',
        frames: this.anims.generateFrameNumbers('player-1', {
            start: 0,
            end: 7
        }),
        repeat: -1
    });

    this.anims.create({
        key: 'player-down',
        frames: this.anims.generateFrameNumbers('player-1', {
            start: 32,
            end: 39
        }),
        repeat: -1
    });

    this.anims.create({
        key: 'player-left',
        frames: this.anims.generateFrameNumbers('player-1', {
            start: 48,
            end: 55
        }),
        repeat: -1
    });

    this.anims.create({
        key: 'player-right',
        frames: this.anims.generateFrameNumbers('player-1', {
            start: 16,
            end: 23
        }),
        repeat: -1
    });

    this.anims.create({
        key: 'player-down-left',
        frames: this.anims.generateFrameNumbers('player-1', {
            start: 40,
            end: 47
        }),
        repeat: -1
    });

    this.anims.create({
        key: 'player-down-right',
        frames: this.anims.generateFrameNumbers('player-1', {
            start: 24,
            end: 31
        }),
        repeat: -1
    });

    this.anims.create({
        key: 'player-up-left',
        frames: this.anims.generateFrameNumbers('player-1', {
            start: 56,
            end: 63
        }),
        repeat: -1
    });

    this.anims.create({
        key: 'player-up-right',
        frames: this.anims.generateFrameNumbers('player-1', {
            start: 8,
            end: 15
        }),
        repeat: -1
    });

    this.keys = this.input.keyboard.createCursorKeys();
}

function update() {
    let speed = 1;
    let diagonalSpeed = speed / getMagnitude(speed, speed);

    if (this.keys.up.isDown && this.keys.left.isDown) {
        this.player.anims.play('player-up-left', true);
        this.player.x -= diagonalSpeed;
        this.player.y -= diagonalSpeed;
    }
    else if (this.keys.up.isDown && this.keys.right.isDown) {
        this.player.anims.play('player-up-right', true);
        this.player.x += diagonalSpeed;
        this.player.y -= diagonalSpeed;
    }
    else if (this.keys.down.isDown && this.keys.left.isDown) {
        this.player.anims.play('player-down-left', true);
        this.player.x -= diagonalSpeed;
        this.player.y += diagonalSpeed;
    }
    else if (this.keys.down.isDown && this.keys.right.isDown) {
        this.player.anims.play('player-down-right', true);
        this.player.x += diagonalSpeed;
        this.player.y += diagonalSpeed;
    }
    else if (this.keys.up.isDown) {
        this.player.anims.play('player-up', true);
        this.player.y -= speed;
    }
    else if (this.keys.left.isDown) {
        this.player.anims.play('player-left', true);
        this.player.x -= speed;
    }
    else if (this.keys.right.isDown) {
        this.player.anims.play('player-right', true);
        this.player.x += speed;
    }
    else if (this.keys.down.isDown) {
        this.player.anims.play('player-down', true);
        this.player.y += speed;
    }
    else {
        this.player.anims.pause();
    }
}