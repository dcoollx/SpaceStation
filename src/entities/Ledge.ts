// ts-ignore
import { Interactable, InteractableSprite, SpriteConfig } from '../utilities/Interactables';
import Level from '../utilities/Level';
import Player, { Player_States } from './Player';

export default class Ledge extends InteractableSprite {
    constructor(scene: Level, id:number, config: SpriteConfig){
        super(scene, id, '', config);
    }

    onInteract(player: Player): void {
        player.sm.go(Player_States.hang, this)
    }

}