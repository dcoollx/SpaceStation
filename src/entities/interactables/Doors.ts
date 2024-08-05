import { Interactable } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Door extends Interactable{
    private isLocked: boolean;
    protected physics : Phaser.Physics.Arcade.StaticBody;
    constructor(scene: Level, isLocked: boolean, x: number, y: number, texture: string | Phaser.Textures.Texture, action: Player_States, frame?: string | number, control?: number){
        super(scene, x, y, texture, action, frame, control)
        this.isLocked = isLocked;
        this.scene.physics.add.existing(this, true);
        this.physics = (this as unknown as Phaser.Physics.Arcade.StaticBody)
        this.physics.addCollidesWith(0);
        
        
    }
    public onInteract(player: Player): void {
       this.toggleLock()
    }
    private toggleLock(){
        this.isLocked = !this.isLocked;
        //play open/close animation
    }
}