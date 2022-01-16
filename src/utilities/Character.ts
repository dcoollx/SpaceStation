import Enitity from './Entity';

export default class Character extends Enitity{
    constructor(key:string, scene: Phaser.Scene){
        super(key);
        this.create(scene);
    }
    create(scene : Phaser.Scene, pos?:{x:number,y:number}):Phaser.Types.Physics.Arcade.SpriteWithDynamicBody{
        this.sprite = scene.physics.add.sprite(100, 0,this.key);
        this.body = this.sprite.body;
        return this.sprite;
    }
}