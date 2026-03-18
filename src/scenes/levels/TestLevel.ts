import Level from '../../utilities/Level';
import Player from '../../entities/Player';


export class TestLevel extends Level {
    speed: { x: number, y: number };
    constructor(){
        super('testlevel/test.json', TestLevel.levelKey);
        this.speed = { x: 0, y: 0 };
    }
    static levelKey = 'testLevel' as const
    preload() {
        console.time('loading')
        this.load.setBaseURL('assets')
        super.preload('assets/testlevel');
        this.load.setBaseURL('assets')
        this.load.audio('theme', 'sounds/Space_Station_Title_Screen.mp3');
        this.load.spritesheet('player-idle', 'player/space-marine-idle.png', { frameWidth: 35, frameHeight: 48, spacing: 13 });
        this.load.spritesheet('player-run', 'player/space-marine-run.png', { frameWidth: 35, frameHeight: 48, spacing: 13 });
        this.load.spritesheet('player-jump', 'player/space-marine-jump.png', { frameWidth: 34, frameHeight: 32, spacing: 2 });
        this.load.spritesheet('spike', 'player/space-marine-jump.png', {frameWidth: 32, frameHeight:32} )
        console.timeEnd('loading')
    }
    create() {
        super.create();
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.gravity.y = 700;
        const music = this.sound.play('theme',{loop:true});
        this.sound.volume = 0.3;
        this.cameras.main.setZoom(2);
        //this.cameras.main.followOffset.set(-50,0);
        this.player = new Player(this, 0,0, this.input.keyboard!.createCursorKeys());
        console.log('collision layer', this.collisionLayer)
        this.physics.add.collider(this.player, this.collisionLayer!);
        this.physics.add.collider(this.player, this.interactables);
       


    }
    update(time: any, delta: any) {
        this.player.update()
       
    }
}