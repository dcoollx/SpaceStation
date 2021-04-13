import Phaser from 'phaser';
import Menu from './scenes/menu/Menu';
import testLevel from './scenes/levels/test_level/test_level';
//import settings from 'setting.json';

const defaultSettings = {}
let settings = localStorage.getItem('settings') ? localStorage.getItem('settings') : defaultSettings
class Game extends Phaser.Game{
    constructor(){
        let config ={
            type: Phaser.AUTO,
            scale : {
                autoCenter: Phaser.Scale.CENTER_BOTH,
                min:{
                    width: 800,
                    height: 600,
                },
                mode: Phaser.Scale.FIT
            },
            backgroundColor: 'black',
            transparent: true,
            clearBeforeRender: false,
            scene : [testLevel]
        };
        super(config);
    }
    
}

new Game();