import Phaser from 'phaser';


export default class Game extends Phaser.Game{ 
    constructor(config: Phaser.Types.Core.GameConfig, debug?: boolean){

        super(config);
         if(debug){
            Object.assign(window, {game : this,scene: this.scene.getScene('testLevel')})
        }
    }
    
}
