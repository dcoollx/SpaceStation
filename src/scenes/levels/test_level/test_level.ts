import Level from '../../../utilities/Level';
import test_level from './Test_2.json';
import marine from '../../../images/space-marine-idle.png';
import marine_run from '../../../images/space-marine-run.png';
import space from '../../../images/1024x1024 Blue Nebula 1.png';
import Character from '../../../utilities/Character';
export default class testLevel extends Level{
    player:Character;
    speed:{x:number, y:number};
    constructor(){
        super(test_level, 'testLevel');
        this.speed = {x:0,y:0};
        this.player = new Character('marine', marine, {frameHeight:48, frameWidth:48});
    }
    preload(){
        super.preload();
       this.player.preload(this);
       this.load.spritesheet('marine_run_sprites', marine_run, {frameWidth:48, frameHeight:48})
       this.load.image('background', space);
    }
    create(){
        super.create();
        this.player.create(this);
        const width = this.scale.width;
        const height = this.scale.height;
        let background = this.add.image(0.5 * width,0.5* height,'background').setOrigin(0.5).setDisplaySize(this.game.canvas.width, this.game.canvas.width).setScrollFactor(0.2);
        background.depth = -100;
       // this.player = this.physics.add.sprite(200,0,'marine');
        this.player.body.mass =300;
        this.player.addAnimation({
            key:'idle',
            frames: this.anims.generateFrameNames('marine',{frames:[0,1,2,3]}),
            frameRate : 8,
            repeat:-1
        });
        this.player.addAnimation({
            key:'run',
            frames: this.anims.generateFrameNames('marine_run_sprites',{frames:[0,1,2,3,5,6,7,8]}),
            frameRate : 8,
            repeat:0
        });
        
        this.player.sprite.scale = 2;
        this.player.sprite.body.setMaxSpeed(200);
        this.cameras.main.startFollow(this.player.sprite);
        this.player.play('idle');
        this.map.setCollisionFromCollisionGroup(true, false, this.map.getLayer('Floor_and_walls').tilemapLayer)
        this.physics.add.collider(this.player.sprite, this.map.getLayer('Floor_and_walls').tilemapLayer);
        console.log(this.physics.getConfig())
        Object.assign(window,{sh:this.shadowLayer});
       

        
    }
    update(time:any, delta:any){
       const cam = this.cameras.main;
       const SPEED = 10;

       if(this.cursors.left.isDown){
           this.player.sprite.body.velocity.x -= SPEED;
           this.player.play('run',true);
           this.player.sprite.setFlipX(true);
           console.log('left');
       }
       
       else if(this.cursors.right.isDown){
        this.player.sprite.body.velocity.x += SPEED;
        this.player.play('run', true);
        this.player.sprite.setFlipX(false);
       }
       else{
          // this.player.stop()
           this.player.play('idle', true);
           this.player.sprite.body.velocity.x = 0;
       }
       
    }
}