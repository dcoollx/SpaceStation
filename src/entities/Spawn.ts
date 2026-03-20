import { EntityRegister } from "../utilities/EntityManager";
import Level from "../utilities/Level";

@EntityRegister
export class Spawn extends Phaser.GameObjects.Zone {
        constructor(scene: Level, x: number, y: number, width?: number, height?: number, name?: any){
        super(scene, x, y, width, height);
        scene.zones.add(this)
       
    }
    static needToFix(){
        console.log('still need to figure out how to import objects without refs')
    }
    setTexture(){
        return;
    }
}