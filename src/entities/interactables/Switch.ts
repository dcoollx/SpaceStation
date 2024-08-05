import { Interactable } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Switch extends Interactable {
    protected controls: Interactable
    constructor(level: Level,controls: Interactable,x: number, y: number, texture: string | Phaser.Textures.Texture, action: Player_States, frame?: string | number, control?: number){
        super(level, x, y, texture, Player_States.idle, frame, Phaser.Input.Keyboard.KeyCodes.F);
        this.controls = controls;
        this.body = this.scene.physics.add.existing(this, true).body
    }
    onInteract(player: Player): void {
        this.controls.onInteract(player);
    }
}