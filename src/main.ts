import Phaser from 'phaser';
import Menu from './scenes/menu/Menu';
import setTargetSize from './utilities/device';
import testLevel from './scenes/levels/test_level/test_level';
import Game from './utilities/Game';

const defaultSettings = {
    debug:true,
    screenRatio : {x:21,y:9}
}
const settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : defaultSettings
const config: Phaser.Types.Core.GameConfig ={
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: settings.debug
        }
    },            
    scale : {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        ...setTargetSize(settings.screenRatio)
        
    },
    backgroundColor: 'blue',
    transparent: true,
    clearBeforeRender: false,
    scene : [testLevel]
};


new Game(config, true);