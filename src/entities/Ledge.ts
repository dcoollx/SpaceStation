// ts-ignore
import { Interactable } from '../utilities/Interactables';
import Level from '../utilities/Level';
import Player from './Player';

export default class Ledge extends Interactable {
    // constructor(scene: Level){
    //     //super(scene, Player.Player_States.hang);
    // }

    onInteract(player: Player): void {
        player.sm.go(this.action, this)
    }

}