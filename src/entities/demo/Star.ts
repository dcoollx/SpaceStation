import { EntityRegister } from "../../utilities/EntityManager";
import Level from "../../utilities/Level";
import Entity from "../Entity";

@EntityRegister
export class Star extends Entity{
    constructor(scene: Level, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number){
        super(scene, x, y, texture, frame);
        this.body = scene.physics.add.body(x, y);
        this.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        const collisionLayer = (scene as Level).collisionLayer
        if(!collisionLayer) return;
        // scene.physics.add.collider(collisionLayer, this);
        // scene.physics.add.overlap(scene.player, this, this.onCollide)
    }
    onCollide(){
        this.disableBody(true,true)
    }
    static update(){
        // console.log('updating stars')
    }
}