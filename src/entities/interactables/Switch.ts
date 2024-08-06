import { GameObjects } from 'phaser';
import { Interactable, SpriteConfig } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Switch extends Interactable {
    protected controls: number;
    constructor(level: Level, controls: number, config: SpriteConfig, control?: number){
        super(level, Player_States.idle, config, 'prototype', Phaser.Input.Keyboard.KeyCodes.F);
        this.controls = controls;
        this.body = this.scene.physics.add.existing(this, true).body
    }
    onInteract(player: Player): void {

        const door = this.scene.interactables.get(this.controls)
        console.log(door)
        door.onInteract(player);
    }
}