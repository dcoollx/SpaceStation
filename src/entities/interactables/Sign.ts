import { Interactable } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Sign extends Interactable {
    text: string;
    display: Phaser.GameObjects.Text
    constructor(level: Level, text: string,x: number, y: number, texture: string | Phaser.Textures.Texture, action: Player_States, frame?: string | number, control?: number){
        super(level, x, y, texture, Player_States.idle, frame, Phaser.Input.Keyboard.KeyCodes.F);
        this.text = text;
        this.body = this.scene.physics.add.existing(this, true).body
        this.display = this.scene.add.text(this.x - 10, this.y - 50, this.text).setDepth(50000).setVisible(false);
    }
    displayText(){
        this.display.setVisible(true);
    }
    onInteract(player: Player): void {
        this.displayText()
    }
}