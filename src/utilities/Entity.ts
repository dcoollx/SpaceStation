/* 
  an abstraction of the animated sprite, 
  handles all preload and creation steps
*/
//import {StateMachine} from './StateMachine';
export interface frameData{
  frameWidth:number, frameHeight:number
}
export default abstract class Enitity{
  sprite:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  key:string;
  body: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody;
 // stateMachine:StateMachine
  constructor(key:string){
    this.key = key;
    this.sprite;
  }
  abstract create(scene : Phaser.Scene, pos?:{x:number,y:number}):Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
   
  addAnimation(animation : Array<Phaser.Types.Animations.Animation> | Phaser.Types.Animations.Animation){
    if(animation instanceof Array)
      animation.forEach(a=>this.sprite.anims.create(a));
    else
      return this.sprite.anims.create(animation)
  }
  play(key:string, ignore?:boolean){
    this.sprite.play(key, ignore || false);
  }

}