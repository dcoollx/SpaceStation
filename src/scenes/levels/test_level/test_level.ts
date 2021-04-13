import Level from '../../../utilities/Level';
import test_level from './Test_2.json'
export default class testLevel extends Level{
    constructor(){
        super(test_level, 'testLevel');
        console.log(test_level, 'loaded');
    }
    preload(){
        super.preload();
        console.log('overwrite');
    }
}