import Level from '../../utilities/Level';
import testLevelData from '../../data/test.json';
import Player from '../../entities/Player';

const levelManifest = {

}

const levelKey = 'testLevel' as const
export class TestLevel extends Level {
    player: Player;
    speed: { x: number, y: number };
    constructor(){
        super(testLevelData, levelKey);
        this.speed = { x: 0, y: 0 };
        this.player;
    }
    preload() {
        console.time('loading')
        super.preload();
        this.load.audio('theme', 'assets/Space_Station_Title_Screen.mp3');
        this.load.spritesheet('player-idle', '../assets/space-marine-idle.png', { frameWidth: 35, frameHeight: 48, spacing: 13 });
        this.load.spritesheet('player-run', '../assets/space-marine-run.png', { frameWidth: 35, frameHeight: 48, spacing: 13 });
        this.load.spritesheet('player-jump', '../assets/space-marine-jump.png', { frameWidth: 35, frameHeight: 48, spacing: 13 });
        console.timeEnd('loading')
    }
    create() {
        super.create();
        this.player = new Player(this, 0,0, this.input.keyboard.createCursorKeys())
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.gravity.y = 700;
        const music = this.sound.play('theme',{loop:true});
        this.sound.volume = 0.3;
        this.cameras.main.setZoom(2);
        //this.cameras.main.followOffset.set(-50,0);
        this.physics.add.collider(this.player, this.collisionLayer)
        


    }
    update(time: any, delta: any) {
        this.player.update()
       
    }
}