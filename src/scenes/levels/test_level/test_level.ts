import Level from '../../../utilities/Level';
import test_level from './Test_2.json';
import marine from '../../../images/space-marine-idle.png';
import marine_run from '../../../images/space-marine-run.png';
import space from '../../../images/1024x1024 Blue Nebula 1.png';
export default class testLevel extends Level{
    player:Phaser.GameObjects.Sprite;
    speed:{x:number, y:number};
    constructor(){
        super(test_level, 'testLevel');
        this.speed = {x:0,y:0};
    }
    preload(){
        super.preload();
       this.load.spritesheet('marine',marine, {frameHeight:48, frameWidth:48});
       this.load.spritesheet('marine_run_sprites', marine_run, {frameWidth:48, frameHeight:48});
       this.load.image('background', space);
    }
    create(){
        super.create();
        const width = this.scale.width;
        const height = this.scale.height;
        let background = this.add.image(0.5 * width,0.5* height,'background').setOrigin(0.5).setDisplaySize(this.game.canvas.width, this.game.canvas.width).setScrollFactor(0);
        background.depth = -100;
        this.player = this.add.sprite(200,400,'marine');
        this.anims.create({
            key:'idle',
            frames: this.anims.generateFrameNames('marine',{frames:[0,1,2,3]}),
            frameRate : 8,
            repeat:-1
        });
        this.anims.create({
            key:'run',
            frames: this.anims.generateFrameNames('marine_run_sprites',{frames:[0,1,2,3,4,5,6,7,8,9,10]}),
            frameRate : 8,
            repeat:-1
        });
        this.player.scale = 2;
        this.player;
        this.player.play('idle');
       

        
    }
    update(delta:any){
       const cam = this.cameras.main;
       const SPEED = 3;

       if(this.cursors.left.isDown){
           cam.scrollX -= SPEED;
           console.log('left');
       }
       
       if(this.cursors.right.isDown){
        cam.scrollX += SPEED;
       }
    }
}