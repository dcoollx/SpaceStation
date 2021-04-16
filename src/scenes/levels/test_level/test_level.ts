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
        //let background = this.add.image(0,0,'background').setOrigin(0).setDisplaySize(this.game.canvas.width, this.game.canvas.width);
        //background.depth = -100;
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
        this.player.setOrigin(0,0);
        this.player.play('idle');
        document.addEventListener('keydown',e=>{
            if(e.keyCode == 37){//left
                this.player.flipX = true;
                this.speed.x = -1
                //this.player.play('run')
            }else if(e.keyCode == 39){//right
                this.player.flipX = false;
                this.speed.x = 1;
                //this.player.play('run');
            }
            else{
                this.speed.x =0;
            }
        });

        
    }
    update(delta:any){
        const FRICTION = 0.3;
        this.player.setPosition(this.player.x + this.speed.x, this.player.y);
        this.speed.x -= this.speed.x * FRICTION 
        }
}