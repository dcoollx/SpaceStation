/* 
  an abstraction of the animated sprite, 
  handles all preload and creation steps
*/
//import {StateMachine} from './StateMachine';
export interface frameData{
  frameWidth:number, frameHeight:number
}
export default abstract class Enitity extends Phaser.Physics.Arcade.Sprite {
  key:string;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number){
    super(scene, x, y, texture, frame);
    scene.add.existing(this)
}
    
  addAnimation(animation : Array<Phaser.Types.Animations.Animation> | Phaser.Types.Animations.Animation){
    if(animation instanceof Array)
      animation.forEach(a=>this.anims.create(a));
    else
      return this.anims.create(animation)
  }

}
