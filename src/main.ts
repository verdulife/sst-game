import { Game, Types } from "phaser";
import { GameScene } from "./scenes/Game";

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1088,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: [GameScene],
    physics: {
        default: 'arcade',
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true
    }
};

export default new Game(config);