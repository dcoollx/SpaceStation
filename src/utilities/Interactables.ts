import { GameObjects } from 'phaser';
import Player, { Player_States } from '../entities/Player';
import Level from './Level';



export interface SpriteConfig {
    name: string,
    x?: number,
    y?: number,
    frame?: string | number,
    height?: number,
    width?: number,
}

export interface Interactable extends Phaser.GameObjects.GameObject {
    name: string;
    id: number;
    onInteract(source: GameObjects.GameObject): void;
}

export abstract class BaseInteractable extends Phaser.GameObjects.GameObject implements Interactable{
    protected action: Player_States
    //public name: string;
    protected control?: number;
    public id: number;
    constructor(scene: Level, id: number, action: Player_States, config: { name: string }, control?: number){
        super(scene, config.name);
        this.action = action;
        this.id = id;
        this.control = control;

        this.name = config.name
    }

    abstract onInteract(source: GameObjects.GameObject): void;
}

export abstract class InteractableSprite extends Phaser.Physics.Arcade.Sprite implements Interactable {
    public id: number;
    body!: Phaser.Physics.Arcade.StaticBody;
    constructor(scene: Level, id: number, texture: string | Phaser.Textures.Texture,  config: SpriteConfig){
        super(scene, config.x!, config.y!, 'prototype', (config.frame as number)-1);
        this.setOrigin(0,-1);
        this.height = config.height ?? this.height;
        this.width = config.width ?? this.width;
        this.id = id;
        this.setName(config.name);
        this.body = this.scene.physics.add.existing(this, true).body
    }
    
    abstract onInteract(source: GameObjects.GameObject): void;
}
