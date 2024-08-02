import Phaser from 'phaser';
import Menu from './scenes/menu/Menu';
import setTargetSize from './utilities/device';
import { TestLevel } from './scenes/levels/TestLevel';
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
            gravity: { y: 300, x:0 },
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
    scene : [TestLevel]
};


new Game(config, true);