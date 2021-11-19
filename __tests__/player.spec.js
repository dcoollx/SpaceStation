//check if canvas is added to page
/** global it jest test */
import Player from '../src/utilities/Player';

jest.mock('phaser');

let test_player;
beforeAll(()=>{
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
    }
    document.createElement('canvas')
    document.body.appendChild('canvas')
    const test_scene = new Scene(config);
    //test_player= new Player('player',test_scene,test_scene.input.keyboard.createCursorKeys());
}) 

describe.skip('Player Controls',()=>{
    it('starts in idle state',()=>{

         document.querySelector('canvas')
    });
   
});