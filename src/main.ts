import Phaser from 'phaser';
import Menu from './scenes/menu/Menu';
import setTargetSize from './utilities/device';
import testLevel from './scenes/levels/test_level/test_level';
//import settings from 'setting.json';

const defaultSettings = {}
let settings = localStorage.getItem('settings') ? localStorage.getItem('settings') : defaultSettings
class Game extends Phaser.Game{
    constructor(){
        console.log(setTargetSize({x:4,y:3}));
        let config ={
            type: Phaser.AUTO,            
            scale : {
                autoCenter: Phaser.Scale.CENTER_BOTH,
                ...setTargetSize({x:4,y:3}),
                
            },
            backgroundColor: 'blue',
            transparent: true,
            clearBeforeRender: false,
            scene : [testLevel]
        };
        super(config);
    }
    
}

new Game();