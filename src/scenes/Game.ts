import { Scene } from "phaser";
import { getMagnitude } from "../lib/utils";

export class GameScene extends Scene {
  constructor() {
    super("Game");
  }

  private player: Phaser.Physics.Arcade.Sprite;
  private map: Phaser.Tilemaps.Tilemap;
  private tilesetGrass: Phaser.Tilemaps.Tileset;
  private tilesetWalls: Phaser.Tilemaps.Tileset;
  private wallsLayer: Phaser.Tilemaps.TilemapLayer;
  private keys: Phaser.Input.Keyboard.CursorKeys;

  preload() {
    this.load.spritesheet('grass-img', 'assets/enviorment/grass-ground.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('walls-img', 'assets/enviorment/walls.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.tilemapTiledJSON('map-1', 'assets/map-1/map1.json');

    this.load.spritesheet('player-1', 'assets/entities/player.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    this.map = this.make.tilemap({
      key: 'map-1',
      tileWidth: 32,
      tileHeight: 32
    });

    this.tilesetGrass = this.map.addTilesetImage('grass', 'grass-img') as Phaser.Tilemaps.Tileset;
    this.map.createLayer('grass', this.tilesetGrass, 0, 0);

    this.tilesetWalls = this.map.addTilesetImage('walls', 'walls-img') as Phaser.Tilemaps.Tileset;
    this.wallsLayer = this.map.createLayer('walls', this.tilesetWalls, 0, 0) as Phaser.Tilemaps.TilemapLayer;

    this.player = this.physics.add.sprite(400, 300, 'player-1').setCollideWorldBounds(true);

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
  }

  update() {
    let speed = 1;
    let diagonalSpeed = speed / getMagnitude(speed, speed);
    let runSpeed = 1.5;

    const keyW = new Phaser.Input.Keyboard.Key(Phaser., 'W');
    const keyA = new Phaser.Input.Keyboard.Key(this.input.keyboard, 'A');
    const keyS = new Phaser.Input.Keyboard.Key(this.input.keyboard, 'S');
    const keyD = new Phaser.Input.Keyboard.Key(this.input.keyboard, 'D');
    const keyF = new Phaser.Input.Keyboard.Key(this.input.keyboard, 'F');
    const keyG = new Phaser.Input.Keyboard.Key(this.input.keyboard, 'G');
    const keyH = new Phaser.Input.Keyboard.Key(this.input.keyboard, 'H');

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
}