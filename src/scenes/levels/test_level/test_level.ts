import Level from '../../../utilities/Level';
import test_level from './Test_2.json';
import marine from '../../../assets/space-marine-idle.png';// 'src\assets\space-marine-idle.png'
import marine_run from '../../../assets/space-marine-run.png';
import marine_jump from '../../../assets/space-marine-jump.png';
import space from '../../../assets/1024x1024 Blue Nebula 1.png';
import theme from '../../../assets/theme1.ogg';
import Player from '../../../utilities/Player';
export default class testLevel extends Level {
    player: Player;
    speed: { x: number, y: number };
    constructor() {
        super(test_level, 'testLevel');
        this.speed = { x: 0, y: 0 };
        this.player;
    }
    preload() {
        let start = Date.now();
        super.preload();
        this.load.spritesheet('marine', marine, { frameWidth: 40, frameHeight: 48, spacing: 8 })
        this.load.spritesheet('marine_run_sprites', marine_run, { frameWidth: 40, frameHeight: 48, spacing: 8 });
        this.load.spritesheet('marine_jump_sprite', marine_jump, { frameWidth: 36, frameHeight: 33 });
        this.load.image('background', space);
        this.load.audio('theme', theme);
        console.log(Date.now() - start, 'load time');
    }
    create() {
        this.physics.world.setBounds(0,0,(150*16), 16*25);
        this.physics.world.gravity.y = 700;
        super.create();
        this.player = new Player('marine', this, this.input.keyboard.createCursorKeys());
        this.player.sprite.setCollideWorldBounds(true)
        const width = this.scale.width;
        const height = this.scale.height;
        const music = this.sound.play('theme');
        this.sound.volume = 0.3;
        let background = this.add.image(0.5 * width, 0.5 * height, 'background').setOrigin(0.5).setDisplaySize(this.game.canvas.width, this.game.canvas.width).setScrollFactor(0.2);
        background.depth = -100;
        // this.player = this.physics.add.sprite(200,0,'marine');
       
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setZoom(2)
        //this.cameras.main.followOffset.set(-50,0);
        this.map.setCollisionFromCollisionGroup(true, false, this.map.getLayer('Floor_and_walls').tilemapLayer)
        this.physics.add.collider(this.player.sprite, this.map.getLayer('Floor_and_walls').tilemapLayer);
        


    }
    update(time: any, delta: any) {
        const cam = this.cameras.main;
        const SPEED = 200;
        this.player.update()
       
    }
}