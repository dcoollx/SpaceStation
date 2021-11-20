import Character from './Character';
//import StateMachine, {State} from './StateMachine';
import { typestate } from 'typestate';


enum Player_States{
            idle,
            //walk,
            run,
            falling,
            climb,
            jump
        }

export default class Player extends Character{
    private MAX_SPEED:number;
    public Acceleration: number;
    private cursors:Phaser.Types.Input.Keyboard.CursorKeys
    public jumpPower: number;
    private sm : typestate.FiniteStateMachine<any>;

   
    constructor(key:string, scene: Phaser.Scene, controls: Phaser.Types.Input.Keyboard.CursorKeys){
        super(key, scene);

        
        this.sm = new typestate.FiniteStateMachine<Player_States>(Player_States.idle);
        this.cursors = controls;
        this.Acceleration = 20;
        this.jumpPower = -400;
        this.sprite.body.setMaxVelocityX(200);       
        this.sprite.body.setMass(300);
        this.sm.fromAny(Player_States).to(Player_States.idle);
        this.sm.fromAny(Player_States).to(Player_States.jump);
        this.sm.fromAny(Player_States).to(Player_States.run);
        this.sm.fromAny(Player_States).to(Player_States.falling);
        this.registerEvents();
        //animations
        this.addAnimation({
            key: 'idle',
            frames: this.sprite.scene.anims.generateFrameNames('marine'),
            frameRate: 4,
            repeat: -1
        });
        let jump = this.addAnimation({
            key: 'jump',
            frames: this.sprite.scene.anims.generateFrameNames('marine_jump_sprite',{ frames: [0,1,2] }),
            frameRate: 8,
            repeat: 0
        });
        this.addAnimation({
            key: 'fall',
            frames: this.sprite.scene.anims.generateFrameNames('marine_jump_sprite', { frames: [2,3, 4,] }),
            frameRate: 8,
            repeat: 0
        });
        this.addAnimation({
            key: 'run',
            frames: this.sprite.scene.anims.generateFrameNames('marine_run_sprites', { frames: [0, 1, 2, 3, 5, 6, 7, 8] }),
            frameRate: 8,
            repeat: 0
        });

        this.sprite.scale = 2;
        
    }

    setAcceleration(newAccel:number):void{

    }
    registerEvents(){
     let sm = this.sm; // short cut to statemachine
        sm.onInvalidTransition((from, to)=>{
            return from === to
        })
       
        sm.onEnter(Player_States.jump,(from, event)=>{
          if(!this.sprite.body.blocked.down){ // no double jump
            return false
          }else
            return true;
        });
        sm.onEnter(Player_States.run,(from: Player_States, e)=>{
            if(from === Player_States.falling || from === Player_States.jump){
                if(this.sprite.body.blocked.down){
                    return true
                }else{
                    //not going to change to running but still move left/right
                    this.sprite.setFlipX(e);
                    this.sprite.body.velocity.x += !e ? this.Acceleration : -1* this.Acceleration;
                    return false;
                }
            }

            return this.sprite.body.blocked.down
        });
        sm.on(Player_States.falling,()=>{
            if(this.sprite.body.touching.down){
                sm.go(Player_States.idle);
                return;
            }
            this.play('fall', true);
        });
        sm.on(Player_States.idle,()=>{
            this.play('idle', true);
        });
        sm.on(Player_States.jump,()=>{
            this.sprite.body.velocity.y = this.jumpPower;
            this.play('jump')
            //sm.go(Player_States.falling);
            //play jump sound

        });
        sm.on(Player_States.run,(from: any, e: any)=>{
            this.sprite.setFlipX(e);
            this.play('run',true);
            this.sprite.body.velocity.x += !e ? this.Acceleration : -1* this.Acceleration;
        });
    }
    update():void{
        let input =false
        //let charState = this.stateMachine.currentState.name

        if(this.sm.currentState == Player_States.jump){
            if(this.sprite.body.velocity.y > 0){
                this.sm.go(Player_States.falling);
            }
        }
        if(this.sm.currentState == Player_States.falling){
            if(this.sprite.body.blocked.down){
                this.sm.go(Player_States.idle);
            }
        }
     

        if (this.cursors.left.isDown) {
            input = true;
            this.sm.go(Player_States.run, true)
            
        }

        if(this.cursors.right.isDown) {
            input = true;
            this.sm.go(Player_States.run, false)

        }if (this.cursors.up.isDown) {
            input = true;
            if(this.sm.currentState !== Player_States.jump)
                this.sm.go(Player_States.jump);

        }
        if(!input && this.sprite.body.velocity.y === 0){
            this.sm.go(Player_States.idle);
            this.sprite.body.velocity.x =0;

        }

        //this.stateMachine.run(input);
        console.log('current state: ', this.sm.currentState);
       
        

        

       
    }
    
}