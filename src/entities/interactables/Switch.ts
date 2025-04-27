import { GameObjects } from 'phaser';
import { Interactable, InteractableSprite, SpriteConfig } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Switch extends InteractableSprite {
    scene!: Level;
    protected controlsId: number | undefined;
    protected controls: Interactable | null;
    constructor(level: Level, id:number, controlsId: number, config: SpriteConfig, controlId?: number){
        super(level, id, 'prototype', config);
        this.controls = null;
        this.controlsId = controlId;
        this.body = this.scene.physics.add.existing(this, true).body
        this.setOrigin(-1, 1)
        this.body.onCollide = false;
        //     this.scene.physics.add.overlap(this, this.scene.player, ()=> console.log('button overlap'))
    }
    onInteract(source: Phaser.GameObjects.GameObject): void {
        if(!this.controls){
            this.controls = this.scene.groups.interactables.getMatching('id', this.controlsId)[0]
        }
        this.controls?.onInteract(this);
    }
    
}