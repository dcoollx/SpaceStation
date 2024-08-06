import Player, { Player_States } from '../entities/Player';
import Level from './Level';



export interface SpriteConfig {
    name: string,
    x?: number,
    y?: number,
    frame?: string | number,
}
export abstract class Interactable extends Phaser.GameObjects.Sprite{
    scene: Level
    protected action: Player_States
    //public name: string;
    protected control?: number
    constructor(scene: Level, action: Player_States, config: SpriteConfig, texture: string | Phaser.Textures.Texture, control?: number){
        super(scene, config.x,config.y, texture, (config.frame as number)-1);
        this.action = action;
        this.control = control;
        this.setOrigin(1);
        this.name = config.name
    }

    abstract onInteract(player: Player): void
}