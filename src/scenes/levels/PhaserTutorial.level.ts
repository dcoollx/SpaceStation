import Player from "../../entities/Player";
import Level from "../../utilities/Level";

export class TutorialLevel extends Level{
    constructor(){
        super('demo.tmj', 'demolevel')
    }

    preload(baseUrl?: string): void {
        super.preload('assets/demolevel');
        this.load.spritesheet('player-idle', 'dude.png', { frameWidth: 32, frameHeight: 48, startFrame:6, endFrame: 6 });
    }

    create(): void {
        super.create();
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.gravity.y = 700;
        this.player = new Player(this, 0,0, this.input.keyboard!.createCursorKeys());
        this.physics.add.collider(this.player, this.collisionLayer!);
        this.physics.add.collider(this.player, this.interactables);
    }

    update(time: number, delta: number): void {
        this.player.update()
    }
}