import { GameObjects } from 'phaser';
import { Interactable, InteractableSprite, SpriteConfig } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Switch extends InteractableSprite {
    scene!: Level;
    protected controls: number;
    constructor(level: Level, id:number, controls: number, config: SpriteConfig, control?: number){
        super(level, id, 'prototype', config);
        this.controls = controls;
        this.body = this.scene.physics.add.existing(this, true).body
        this.body.checkCollision.none = true;
        this.body.onOverlap = true;
        //this.scene.physics.add.collider(this, this.scene.player)
    }
    onInteract(source: Phaser.GameObjects.GameObject): void {

        const door: Interactable = this.scene.interactables.getMatching('id', this.controls)[0]
        console.log(door)
        door.onInteract(this);
    }
}