import { Physics } from 'phaser';
import { Interactable, InteractableWithPhysics, SpriteConfig } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Door extends InteractableWithPhysics{
    private isLocked: boolean;
    public isOpen: boolean;
    private trigger: Interactable | null;
    body: Phaser.Physics.Arcade.StaticBody
    constructor(scene: Level, isLocked: boolean, isOpen: boolean, action: Player_States, config: SpriteConfig, control?: number){
        super(scene, action, config, null)
        this.isLocked = isLocked;
        this.isOpen = isOpen;
        this.body.checkCollision.right = true;
        this.body.checkCollision.left = true;
        this.scene.physics.add.collider(this, this.scene.player, (door, player)=> alert('door hit player'));
        // this.body.setCollisionCategory(1);
        // this.body.setCollidesWith([1,2,3,4])
        if(this.isLocked){  
            
            this.body.debugBodyColor = 255000000
            
        }
        
        console.log('door', this)
    }
    protected onCollison(){
        console.log('collsion with', this.name)
    }
    public setTrigger(trigger: Interactable){
        this.trigger = trigger;
    }
    public onInteract(source: Phaser.GameObjects.GameObject): void {
        if(source === this.scene.player && !this.isLocked){
            this.toggleOpen();
            console.log(`${this.name} is ${this.isOpen ? 'open' : 'closed'}`)
        }else {
            console.log(`${this.name} is ${this.isLocked ? 'locked': 'unlocked'}`)
            this.toggleLock();
        }
    }
    private toggleLock(){
        this.isLocked = !this.isLocked;
        //play open/close animation
    }
    private toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}