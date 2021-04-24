import Character from './Character';
import StateMachine, {State} from './StateMachine';

export default class Player extends Character{
    private MAX_SPEED:number;
    public Acceleration: number;
    private cursors:Phaser.Types.Input.Keyboard.CursorKeys
    public jumpPower: number;

    constructor(key:string, scene: Phaser.Scene, controls: Phaser.Types.Input.Keyboard.CursorKeys){
        super(key, scene);
        this.cursors = controls;
        this.Acceleration = 20;
        this.jumpPower = -400;
        this.sprite.body.setMaxVelocityX(200);       
        this.sprite.body.setMass(300);
        
        
    }
    setAcceleration(newAccel:number):void{

    }
    registerControls():void{
        //let charState = this.stateMachine.currentState.name
     

        let input='idle';
        if (this.cursors.left.isDown) {
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