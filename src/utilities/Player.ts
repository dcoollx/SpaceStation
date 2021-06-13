import Character from './Character';
import StateMachine, {State} from './StateMachine';

export default class Player extends Character{
    private MAX_SPEED:number;
    public Acceleration: number;
    private cursors:Phaser.Types.Input.Keyboard.CursorKeys
    public jumpPower: number;
    private sm : StateMachine;

    constructor(key:string, scene: Phaser.Scene, controls: Phaser.Types.Input.Keyboard.CursorKeys){
        super(key, scene);
        this.cursors = controls;
        this.Acceleration = 20;
        this.jumpPower = -400;
        this.sprite.body.setMaxVelocityX(200);       
        this.sprite.body.setMass(300);
        let idle = new State('idle',['jump','fall','run'],()=>null,(input)=>this.play('idle',true),()=>null);
        let jump = new State('jump',['fall'],(pl:Player)=>pl.sprite.body.setAccelerationY(pl.jumpPower),function(pl:Player){if(pl.sprite.body.acceleration.y >= 0){this.stateMachine.transistion('fall')}});
        let run = new State('run',['idle','jump'],null,function(pl){})
        this.sm = new StateMachine('idle',{'idle':idle,'jump':jump},this)
        
    }
    setAcceleration(newAccel:number):void{

    }
    registerControls():void{
        //let charState = this.stateMachine.currentState.name
     

        let input='idle';
        if (this.cursors.left.isDown) {
            //this.sm.step('left')
            this.sprite.body.velocity.x -=this.Acceleration;
            input = 'run';
            this.sprite.setFlipX(true);
            
        }

        if (this.cursors.right.isDown) {
            this.sprite.body.velocity.x +=this.Acceleration;
            input = 'run';
            this.sprite.setFlipX(false);

        }if (this.cursors.up.isDown) {
            this.sprite.body.velocity.y = this.jumpPower;
            input = 'jump';

        }

        //this.stateMachine.run(input);
       
        

        

       
    }
    
}