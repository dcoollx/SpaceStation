// ts-ignore
import { Interactable, InteractableWithPhysics, SpriteConfig } from '../utilities/Interactables';
import Level from '../utilities/Level';
import Player from './Player';

export default class Ledge extends InteractableWithPhysics {
    constructor(scene: Level, config: SpriteConfig){
        super(scene, Player.Player_States.hang, config, null);
    }

    onInteract(player: Player): void {
        player.sm.go(this.action, this)
    }

}