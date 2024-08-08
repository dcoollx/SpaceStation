import { Interactable, InteractableSprite, SpriteConfig } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Sign extends InteractableSprite {
    text: string;
    display: Phaser.GameObjects.Text
    constructor(level: Level, text: string, config: SpriteConfig, action: Player_States, frame?: string | number, control?: number){
        super(level, Player_States.idle, config,null, Phaser.Input.Keyboard.KeyCodes.F);
        this.text = text;
        this.body = this.scene.physics.add.existing(this, true).body
        this.display = this.scene.add.text(this.x - 10, this.y - 50, this.text).setDepth(50000).setVisible(false);
    }
    displayText(){
        this.display.setVisible(true);
        this.setFrame(13); // redlight // should be in properties
    }
    onInteract(player: Player): void {
        this.displayText()
    }
}