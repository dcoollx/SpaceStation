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

export interface Trigger extends Phaser.GameObjects.GameObject {
    name: string;
    id: number;
    onTrigger(source?: GameObjects.GameObject): void;
}

export abstract class BaseTrigger extends Phaser.GameObjects.GameObject implements Trigger{
    //public name: string;
    protected control?: number;
    public id: number;
    constructor(scene: Level, id: number, config: { name: string }){
        super(scene, config.name);
        this.id = id;
        this.name = config.name
    }

    abstract onTrigger(source?: GameObjects.GameObject): void;
}

export class TriggerZone extends BaseTrigger {
    body!: Phaser.Physics.Arcade.StaticBody;
    triggerEvents: Function[]
    constructor(scene: Level, id: number, config: { name: string, height?: number, width?: number, x?: number, y?: number }, control?: number){
        
        super(scene, id, config)
        this.body = this.scene.physics.add.staticBody(config.x ?? 0, config.y ?? 0, config.width, config.height)
        this.triggerEvents = [];
        this.scene.physics.add.overlap(this, scene.player,()=> this.onTrigger(scene.player))
    }

    setOnTrigger<T>(triggerFN: (source?: GameObjects.GameObject) => T): number {
        this.triggerEvents.push(triggerFN)
        return this.triggerEvents.length -1 // return key of event
    }

    removeTriggerEvent(key: number){
       delete this.triggerEvents[key];
    }

    onTrigger(source?: GameObjects.GameObject): void {
        this.triggerEvents.forEach(t=>t(source))
    }

}

