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
        this.sm.from(Player_States.idle, Player_States.run).to(Player_States.run);
        this.sm.fromAny(Player_States).to(Player_States.falling);
        this.registerEvents();
        
    }

    setAcceleration(newAccel:number):void{

    }
    registerEvents(){
        let sm = this.sm; // short cut to statemachine
        sm.onEnter(Player_States.jump,(from, event)=>{
          if(this.sprite.body.touching.down){
            return false
          }else
            return true;
        });
        sm.on(Player_States.falling,()=>{
            if(this.sprite.body.touching.down){
                sm.go(Player_States.idle);
            }
        });
        sm.on(Player_States.jump,()=>{
            this.sprite.body.velocity.y = this.jumpPower;
            //sm.go(Player_States.falling);
            //play jump sound

        });
        sm.on(Player_States.run,(from: any, e: any)=>{
            this.sprite.setFlipX(e);
            this.sprite.body.velocity.x += !e ? this.Acceleration : -1* this.Acceleration;
        });
    }
    update():void{
        //let charState = this.stateMachine.currentState.name
     

        let input='idle';
        if (this.cursors.left.isDown) {
            //this.sm.step('left')
            this.sprite.body.velocity.x -=this.Acceleration;
            input = 'run';
            this.sprite.setFlipX(true);
            
        }

        if(this.cursors.right.isDown) {
            this.sm.go(Player_States.run, false)

        }if (this.cursors.up.isDown) {
            if(this.sm.currentState !== Player_States.jump)
                this.sm.go(Player_States.jump);

        }

        //this.stateMachine.run(input);
        console.log('current state: ', this.sm.currentState);
       
        

        

       
    }
    
}