//check if canvas is added to page
/** global it jest test Game */
import Player from '../../../src/utilities/Player';
import testLevel from '../../../src/scenes/levels/test_level/test_level';

let test_player;
describe.skip('Player Controls',()=>{
    it('returns a new player obj',()=>{

        const test_player = new Player('test' ,testLevel)//Game.scene.scenes[0])
    });
   
});