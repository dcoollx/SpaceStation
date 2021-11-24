import Phaser from 'phaser';
import Menu from './scenes/menu/Menu';
import setTargetSize from './utilities/device';
import testLevel from './scenes/levels/test_level/test_level';
//import settings from 'setting.json';

const defaultSettings = {
    debug:true,
    screenRatio : {x:4,y:3}
}
let settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : defaultSettings
export default class Game extends Phaser.Game{
    constructor(){
        let config ={
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
            scene : [Menu, testLevel]
        };
       
        super(config);
         if(defaultSettings.debug){
            Object.assign(window, {game : this,scene: this.scene.getScene('testLevel')})
        }
    }
    
}

new Game();