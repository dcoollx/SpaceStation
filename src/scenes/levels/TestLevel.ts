import Level from '../../utilities/Level';
import testLevelData from '../../data/test.json';
import Player from '../../entities/Player';

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
        this.load.spritesheet('marine', 'assets/space-marine-idle.png', { frameWidth: 40, frameHeight: 48, spacing: 8 })
        this.load.spritesheet('marine_run_sprites','assets/space-marine-run.png', { frameWidth: 40, frameHeight: 48, spacing: 8 });
        this.load.spritesheet('marine_jump_sprite', 'assets/space-marine-jump.png', { frameWidth: 36, frameHeight: 33 });
        this.load.audio('theme', 'assets/Space_Station_Title_Screen.mp3');
        console.timeEnd('loading')
    }
    create() {
        super.create();
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.gravity.y = 700;
        this.player = new Player('marine', this, this.input.keyboard.createCursorKeys());
        this.player.sprite.setCollideWorldBounds(true);
        const music = this.sound.play('theme',{loop:true});
        this.sound.volume = 0.3;
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setZoom(2);
        //this.cameras.main.followOffset.set(-50,0);
        this.physics.add.collider(this.player.sprite, this.collisionLayer)
        


    }
    update(time: any, delta: any) {
        this.player.update()
       
    }
}