import Player, { Player_States } from '../entities/Player';
import Level from './Level';

export abstract class Interactable extends Phaser.GameObjects.Sprite{
    scene: Level
    protected action: Player_States
    protected control?: number
    constructor(scene: Level, x: number, y: number, texture: string | Phaser.Textures.Texture, action: Player_States, frame?: string | number, control?: number){
        super(scene, x, y, texture, frame);
        this.action = action;
        this.control = control;
    }

    abstract onInteract(player: Player): void
}