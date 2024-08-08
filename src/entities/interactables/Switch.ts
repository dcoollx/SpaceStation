import { GameObjects } from 'phaser';
import { InteractableSprite, SpriteConfig } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Switch extends InteractableSprite {
    protected controls: number;
    constructor(level: Level, controls: number, config: SpriteConfig, control?: number){
        super(level, Player_States.idle, config, 'prototype', Phaser.Input.Keyboard.KeyCodes.F);
        this.controls = controls;
        this.body = this.scene.physics.add.existing(this, true).body
    }
    onInteract(source: Phaser.GameObjects.GameObject): void {

        const door = this.scene.interactables.get(this.controls)
        console.log(door)
        door.onInteract(this);
    }
}