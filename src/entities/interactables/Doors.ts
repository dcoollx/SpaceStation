import { Interactable, SpriteConfig } from '../../utilities/Interactables';
import Level from '../../utilities/Level';
import Player, { Player_States } from '../Player';

export class Door extends Interactable{
    private isLocked: boolean;
    private trigger: Interactable | null;
    constructor(scene: Level, isLocked: boolean, action: Player_States, config: SpriteConfig, control?: number){
        super(scene,action, config, null)
        this.isLocked = isLocked;
        this.body = this.scene.physics.add.existing<Interactable>(this, true).body;
        if(this.isLocked){
            this.body.gameObject
        }
        
        
    }
    public setTrigger(trigger: Interactable){
        this.trigger = trigger;
    }
    public onInteract(player: Player): void {
        console.log(`${this.name} is ${this.isLocked}`)
       this.toggleLock()
    }
    private toggleLock(){
        this.isLocked = !this.isLocked;
        //play open/close animation
    }
}