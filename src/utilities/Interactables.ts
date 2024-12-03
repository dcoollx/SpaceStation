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
    onInteract(source: GameObjects.GameObject): void;
}

export abstract class BaseInteractable extends Phaser.GameObjects.GameObject implements Interactable{
    scene: Level
    protected action: Player_States
    //public name: string;
    protected control?: number
    constructor(scene: Level, action: Player_States, config: { name: string }, control?: number){
        super(scene, config.name);
        this.action = action;
        this.control = control;
        this.name = config.name
    }

    abstract onInteract(source: GameObjects.GameObject): void;
}

export abstract class InteractableSprite extends Phaser.Physics.Arcade.Sprite implements Interactable {
    scene: Level
    constructor(scene: Level, action: Player_States, config: SpriteConfig, texture: string | Phaser.Textures.Texture, control?: number){
        super(scene, config.x,config.y, texture, (config.frame as number)-1);
        this.setOrigin(1)
    }
    
    abstract onInteract(source: GameObjects.GameObject): void;
}
export abstract class InteractableWithPhysics extends Phaser.GameObjects.GameObject implements Interactable {
    scene: Level
    name: string;
    width: number;
    height: number;
    action: Player_States
    constructor(scene: Level, action: Player_States, config: SpriteConfig, control?: number){
        super(scene, 'trigger');
        //this.body = scene.physics.add.staticBody(config.x, config.y, config.width, config.height)
        this.body = new Phaser.Physics.Arcade.StaticBody(this.scene.physics.world, this);
        scene.physics.add.existing(this, true);
        // this.body.setSize(config.width, config.height)
        // this.body.setCollisionCategory(2);
        //this.body.immovable = true;
        this.body.setCollidesWith([1,2,3,4])
        scene.add.existing(this);
        // this.width = config.width;
        // this.height = config.height;
        this.setName(config.name);
        this.action = action;
        scene.physics.world.enableBody(this, Phaser.Physics.Arcade.STATIC_BODY);
    }
    abstract onInteract(source: GameObjects.GameObject): void;
}