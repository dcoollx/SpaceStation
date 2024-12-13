import { Physics } from 'phaser';
import { Interactable, InteractableSprite, SpriteConfig } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Door extends InteractableSprite{
    private isLocked: boolean;
    public isOpen: boolean;
    private trigger: Interactable | null;
    scene!: Level;
    constructor(scene: Level, id:number, isLocked: boolean, isOpen: boolean, config: SpriteConfig, action: Player_States| null, control?: number){
        super(scene, id, '', config)
        this.isLocked = false//isLocked;
        this.isOpen = isOpen;
        this.trigger = null;
        this.body.onCollide = !isOpen
        this.setName(config.name);
        this.body.setSize(this.width, this.height)
        if(this.isLocked){  
            this.body.debugBodyColor = 215;

            
        }
        
        console.log('door', this)
    }

    public setTrigger(trigger: Interactable){
        this.trigger = trigger;
    }
    public onInteract(source: Phaser.GameObjects.GameObject): void {
        //if(source === this.scene.player && !this.isLocked){
            this.toggleOpen();
            console.log(`${this.name} is ${this.isOpen ? 'open' : 'closed'}`)
        // }else {
        //     console.log(`${this.name} is ${this.isLocked ? 'locked': 'unlocked'}`)
        //     this.toggleLock();
        // }
    }
    private toggleLock(){
        this.isLocked = !this.isLocked;
        //play open/close animation
    }
    private toggleOpen() {
        this.isOpen = !this.isOpen;
        if(this.isOpen){
            this.body.checkCollision.none = true;
        }
        else {
            this.body.onCollide = true;
            this.body.checkCollision.left = true;
            this.body.checkCollision.none = false;
        }
    }
    update(...args: any[]): void {
    }
}