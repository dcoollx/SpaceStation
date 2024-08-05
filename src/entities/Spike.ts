import Level from '../utilities/Level';
import Enitity from './Entity';

export default class Spike extends Enitity {
    scene: Level
    constructor(scene: Level ,x: number, y: number){
        super(scene,x, y,'prototype', 1);
        //if(this.scene.player !== null){
            this.scene.physics.add.overlap(this, this.scene.player,()=>{
                this.scene.cameras.main.flash();
                console.log('hit')
            });
            //this.setCollideWorldBounds(true);
        //}
    }
}

Phaser.GameObjects.GameObjectFactory.register('spike', function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number){
    const spike = new Spike(this.scene as Level, x,y)
    this.scene.physics.add.existing(spike, true);
    return spike
});