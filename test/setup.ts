import Game from '../src/utilities/Game';
import setTargetSize from '../src/utilities/device';
import testLevel from '../src/scenes/levels/test_level/test_level';

const test_config: Phaser.Types.Core.GameConfig = {
    type: Phaser.HEADLESS,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },            
    scale : {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        ...setTargetSize({x:4,y:3})
        
    },
    backgroundColor: 'blue',
    transparent: true,
    clearBeforeRender: false,
    scene : [testLevel]
}

global['Game'] = new Game(test_config, true); 