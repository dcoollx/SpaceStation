import { Physics } from 'phaser';
import { SpriteConfig, Trigger, TriggerZone } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';
import Entity from '../Entity';
import { EntityManager, EntityRegister } from '../../utilities/EntityManager';

export class Door extends Entity{
    private isLocked: boolean;
    public isOpen: boolean;
    private trigger: TriggerZone | null;
    scene!: Level;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number){
        super(scene, x, y, texture, frame)
        this.isLocked = true
        this.isOpen = true;
        this.body = scene.physics.add.body(x, y, this.width, this.height)
        this.body.onCollide = true;
        this.body.checkCollision.left = true;
        this.body.checkCollision.none = false;
        (scene as Level).collisionLayer?.add(this)
        this.trigger = new TriggerZone(scene as Level, 1,  { x, y, height:0, width: 0, name: ''})
        console.log('door', this)
        this.trigger.setOnTrigger(() => {
            const interactionKey = scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
            if(!interactionKey) throw new Error('failed to create key')
            if(!this.isLocked && scene.input.keyboard?.checkDown(interactionKey)){
                this.setOpen();
                console.log('is opening')
            }
        });
    }

    private toggleLock(){
        this.isLocked = !this.isLocked;
        //play open/close animation
    }
    private toggleOpen() {
        this.isOpen = !this.isOpen;
        if(this.isOpen){
            this.body!.checkCollision.none = true;
        }
        else {
            this.body!.onCollide = true;
            this.body!.checkCollision.left = true;
            this.body!.checkCollision.none = false;
        }
    }
    private setOpen(){
        this.isOpen = true;
        this.body!.enable = false
    }
    update(...args: any[]): void {
    }
}