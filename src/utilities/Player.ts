import Character from './Character';

export default class Player extends Character{
    private MAX_SPEED:number;
    public Acceleration: number;
    private cursors:Phaser.Types.Input.Keyboard.CursorKeys
    public jumpPower: number
    constructor(key:string, scene: Phaser.Scene, controls: Phaser.Types.Input.Keyboard.CursorKeys){
        super(key, scene);
        this.cursors = controls;
        this.Acceleration = 20;
        this.jumpPower = -400;
        this.sprite.body.setMaxVelocityX(200);       
        this.sprite.body.setMass(300)
        
    }
    setAcceleration(newAccel:number):void{

    }
    registerControls():void{
        if (this.cursors.left.isDown) {
            this.sprite.body.velocity.x -=this.Acceleration;
            this.play('run', true);
            this.sprite.setFlipX(true);
        }

        else if (this.cursors.right.isDown) {
            this.sprite.body.velocity.x +=this.Acceleration;
            this.play('run', true);
            this.sprite.setFlipX(false);
        }
        else {
          this.play('idle', true);
          this.sprite.body.setVelocityX(0);

        }
        if (this.cursors.up.isDown && this.sprite.body.onFloor()) {
            this.sprite.body.velocity.y = this.jumpPower;
        }
    }
    
}