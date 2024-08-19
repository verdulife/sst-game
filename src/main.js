import 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1088,
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
    this.load.spritesheet('grass-img', 'assets/enviorment/grass-ground.png', {
        frameWidth: 32,
        frameHeight: 32,
    });

    this.load.image('walls-img', 'assets/enviorment/walls.png', {
        frameWidth: 32,
        frameHeight: 32
    });

    this.load.tilemapTiledJSON('map-1', 'assets/map-1/map1.json');

    this.load.spritesheet('player-1', 'assets/entities/player.png', {
        frameWidth: 32,
        frameHeight: 32
    });
}


function create() {
    this.map = this.make.tilemap({
        key: 'map-1',
        tileWidth: 32,
        tileHeight: 32
    });

    this.tilesetGrass = this.map.addTilesetImage('grass', 'grass-img');
    this.grassLayer = this.map.createLayer('grass', this.tilesetGrass, 0, 0);

    this.tilesetWalls = this.map.addTilesetImage('walls', 'walls-img');
    this.wallsLayer = this.map.createLayer('walls', this.tilesetWalls, 0, 0);

    this.player = this.physics.add.sprite(400, 300, 'player-1').setCollideWorldBounds(true);

    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });

    this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height);
    this.wallsLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.wallsLayer);

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
    let runSpeed = 1.5;

    const keyW = this.input.keyboard.addKey('W');
    const keyA = this.input.keyboard.addKey('A');
    const keyS = this.input.keyboard.addKey('S');
    const keyD = this.input.keyboard.addKey('D');
    const keyF = this.input.keyboard.addKey('F');
    const keyG = this.input.keyboard.addKey('G');
    const keyH = this.input.keyboard.addKey('H');

    const PLAYER_UPLEFT = keyA.isDown && keyW.isDown;
    const PLAYER_UPRIGHT = keyD.isDown && keyW.isDown;
    const PLAYER_DOWNLEFT = keyA.isDown && keyS.isDown;
    const PLAYER_DOWNRIGHT = keyD.isDown && keyS.isDown;
    const PLAYER_LEFT = keyA.isDown;
    const PLAYER_RIGHT = keyD.isDown;
    const PLAYER_UP = keyW.isDown;
    const PLAYER_DOWN = keyS.isDown;
    const PLAYER_RUN = keyF.isDown;
    const PLAYER_SHOOT = keyG.isDown;
    const PLAYER_RELOAD = keyH.isDown;

    if (PLAYER_RUN) {
        speed = speed * runSpeed;
        diagonalSpeed = diagonalSpeed * runSpeed;
    }

    if (PLAYER_SHOOT) {
        console.log('shoot');
    }

    if (PLAYER_RELOAD) {
        console.log('reload');
    }

    if (PLAYER_UPLEFT) {
        this.player.anims.play('player-up-left', true);
        this.player.x -= diagonalSpeed;
        this.player.y -= diagonalSpeed;
    }
    else if (PLAYER_UPRIGHT) {
        this.player.anims.play('player-up-right', true);
        this.player.x += diagonalSpeed;
        this.player.y -= diagonalSpeed;
    }
    else if (PLAYER_DOWNLEFT) {
        this.player.anims.play('player-down-left', true);
        this.player.x -= diagonalSpeed;
        this.player.y += diagonalSpeed;
    }
    else if (PLAYER_DOWNRIGHT) {
        this.player.anims.play('player-down-right', true);
        this.player.x += diagonalSpeed;
        this.player.y += diagonalSpeed;
    }
    else if (PLAYER_UP) {
        this.player.anims.play('player-up', true);
        this.player.y -= speed;
    }
    else if (PLAYER_LEFT) {
        this.player.anims.play('player-left', true);
        this.player.x -= speed;
    }
    else if (PLAYER_RIGHT) {
        this.player.anims.play('player-right', true);
        this.player.x += speed;
    }
    else if (PLAYER_DOWN) {
        this.player.anims.play('player-down', true);
        this.player.y += speed;
    }
    else {
        this.player.anims.pause();
    }
}