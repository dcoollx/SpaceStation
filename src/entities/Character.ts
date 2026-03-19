import Entity from './Entity';

export default class Character extends Entity {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number){
        super(scene, x, y, texture, frame);
    }
}