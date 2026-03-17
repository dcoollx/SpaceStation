import { Interactable, InteractableSprite, SpriteConfig } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Sign extends InteractableSprite {
    text: string;
    display: Phaser.GameObjects.Text
    constructor(level: Level, id:number, text: string, config: SpriteConfig, texture: Phaser.Textures.Texture | string, control?: number, action?: Player_States , frame?: string | number){
        super(level,id, texture, config);
        this.text = text;
        this.body = this.scene.physics.add.existing(this, true).body
        this.display = this.scene.add.text(this.x - 10, this.y - 50, this.text).setDepth(50000).setVisible(false);
    }
    protected displayText(){
        this.display.setVisible(true);
        this.setFrame(13); // redlight // should be in properties
    }
    public onInteract(player: Player): void {
        this.displayText()
    }
}