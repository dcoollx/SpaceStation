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
type playerStats = {
    hp: number;
    mp: number;

}

export default class Player extends Character{
    private MAX_SPEED:number;
    public Acceleration: number;
    private cursors:Phaser.Types.Input.Keyboard.CursorKeys
    public jumpPower: number;
    private sm : typestate.FiniteStateMachine<Player_States>;
    public stats: playerStats;

   
    constructor(scene: Phaser.Scene, x: number, y: number,controls: Phaser.Types.Input.Keyboard.CursorKeys, frame?: string | number){
        super(scene, x, y, 'player-idle');

        this.stats = {
            hp: 100,
            mp: 100,
        }
        scene.physics.add.existing(this);
        scene.cameras.main.startFollow(this);
        this.setCollideWorldBounds(true);
        this.body.setMass(300);
        //this.play = ()=>null;
        this.sm = new typestate.FiniteStateMachine<Player_States>(Player_States.falling);
        this.cursors = controls;
        this.Acceleration = 20;
        this.jumpPower = -400;
        //setup state machine     
        this.sm.fromAny(Player_States).to(Player_States.idle);
        this.sm.fromAny(Player_States).to(Player_States.jump);
        this.sm.fromAny(Player_States).to(Player_States.run);
        this.sm.fromAny(Player_States).to(Player_States.falling);
        this.registerEvents();
        //animations
        this.addAnimation([{
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('player-idle'),
            frameRate: 4,
            repeat: -1
        }, {
            key: 'jump',
            frames: this.scene.anims.generateFrameNames('player-jump',{ frames: [0,1,2] }),
            frameRate: 8,
            repeat: 0,
        },{
            key: 'fall',
            frames: this.scene.anims.generateFrameNames('player-jump', { frames: [2,3, 4,] }),
            frameRate: 8,
            repeat: 0
        },{
            key: 'run',
            frames: this.scene.anims.generateFrameNames('player-run', { frames: [0, 1, 2, 3, 5, 6, 7, 8] }),
            frameRate: 8,
            repeat: 0
        }]);

        this.scale = 1; // why was this 2?
        
    }


    registerEvents(){
     let sm = this.sm; // short cut to statemachine
        sm.onInvalidTransition((from, to)=>{
            return from === to
        })
       
        sm.onEnter(Player_States.jump,(from, event)=>{
          if(!this.body.blocked.down){ // no double jump
            return false
          }else
            return true;
        });
        sm.onEnter(Player_States.run,(from: Player_States, e)=>{
            if(from === Player_States.falling || from === Player_States.jump){
                if(this.body.blocked.down){
                    return true
                }else{
                    //not going to change to running but still move left/right
                    this.setFlipX(e);
                    this.body.velocity.x += !e ? this.Acceleration : -1* this.Acceleration;
                    return false;
                }
            }

            return this.body.blocked.down
        });
        sm.on(Player_States.falling,()=>{
            if(this.body.touching.down){
                sm.go(Player_States.idle);
                return;
            }
            //this.play('fall', true);
        });
        sm.on(Player_States.idle,()=>{
            this.play('idle', true);
        });
        sm.on(Player_States.jump,()=>{
            this.body.velocity.y = this.jumpPower;
            this.play('jump')
            //sm.go(Player_States.falling);
            //play jump sound

        });
        sm.on(Player_States.run,(from: any, e: any)=>{
            this.setFlipX(e);
            this.play('run', true)
            this.body.velocity.x += !e ? this.Acceleration : -1* this.Acceleration;
        });
    }
    update():void{
        let input =false
        //let charState = this.stateMachine.currentState.name

        if(this.sm.currentState == Player_States.jump){
            if(this.body.velocity.y > 0){
                this.sm.go(Player_States.falling);
            }
        }
        if(this.sm.currentState == Player_States.falling){
            if(this.body.blocked.down){
                this.sm.go(Player_States.idle);
            }
        }
     

        if (this.cursors.left.isDown || this.cursors.right.isDown) {
            input = true;
            this.sm.go(Player_States.run, !this.cursors.right.isDown)
        }
        if (this.cursors.up.isDown) {
            input = true;
            if(this.sm.currentState !== Player_States.jump)
                this.sm.go(Player_States.jump);

        }
        if(!input && this.body.velocity.y === 0){
            this.sm.go(Player_States.idle);
            this.body.velocity.x =0;

        }

        //this.stateMachine.run(input);

    }
    
}
Phaser.GameObjects.GameObjectFactory.register('Player', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, controls: Phaser.Types.Input.Keyboard.CursorKeys ){
    const player = new Player(this.scene, x, y, controls);
    this.displayList.add(player);
    this.updateList.add(player);
    return player;
  })