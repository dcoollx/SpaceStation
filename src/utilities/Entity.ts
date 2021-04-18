/* 
  an abstraction of the animated sprite, 
  handles all preload and creation steps
*/

export default class Enitity{
  sprite_url: string ;
  sprite:Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  key:string;
  body: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody;
  frameData: {frameWidth:number, frameHeight:number};
  constructor(key:string, sprite: string, frameData: {frameWidth:number, frameHeight:number}){
    this.sprite_url = sprite;
    this.key = key;
    this.frameData = frameData;
    this.sprite;
  }
  preload(scene : Phaser.Scene){
    scene.load.spritesheet(this.key,this.sprite_url,this.frameData);
  }
  create(scene : Phaser.Scene, pos?:{x:number,y:number}){
   
    this.sprite = scene.physics.add.sprite(100, 0,this.key);
    this.body = this.sprite.body;
  }
  addAnimation(animation : Array<Phaser.Types.Animations.Animation> | Phaser.Types.Animations.Animation){
    if(animation instanceof Array)
      animation.forEach(a=>this.sprite.anims.create(a));
    else
      this.sprite.anims.create(animation)
  }
  play(key:string, ignore?:boolean){
    this.sprite.play(key, ignore || false);
  }

}