import { Physics } from 'phaser';
import { SpriteConfig, Trigger, TriggerZone } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';
import Enitity from '../Entity';

export class Door extends Enitity{
    private isLocked: boolean;
    public isOpen: boolean;
    private trigger: TriggerZone | null;
    scene!: Level;
    constructor(scene: Level, id:number, isLocked: boolean, isOpen: boolean, config: SpriteConfig){
        super(scene, config.x!, config.y!, config.name, config.frame)
        this.isLocked = false//isLocked;
        this.isOpen = isOpen;
        this.trigger = new TriggerZone(scene, id, config)
        this.setName(config.name);
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