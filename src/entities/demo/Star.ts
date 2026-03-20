import { EntityRegister } from "../../utilities/EntityManager";
import Level from "../../utilities/Level";
import Entity from "../Entity";

@EntityRegister
export class Star extends Entity{
    constructor(scene: Level, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number){
        super(scene, x, y, texture, frame);
        this.body = scene.physics.add.existing(this).body;
        this.setBounceY(1);
        const collisionLayer = (scene as Level).collisionLayer
        if(!collisionLayer) return;
        scene.physics.add.collider(collisionLayer, this);
        scene.interactables.add(this);
    }
    onCollide(){
        this.disableBody(true,true);
        (this.scene as any).score++;
        (this.scene as any).hud.setText('Score: ' + (this.scene as any).score);
    }
    static update(){
        // console.log('updating stars')
    }
}