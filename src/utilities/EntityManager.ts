// all entity will register itself with this manaager

import Enitity from "../entities/Entity"

type EntityConstructor<T extends Enitity> = new (entityType: string, scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) => T

export class EntityManager{
    static list: Map<string, EntityConstructor<Enitity>> = new Map()

    static register(name: string, constructor: EntityConstructor<Enitity>){
        EntityManager.list.set(name, constructor)
    }
    static get(name: string){
             return EntityManager.list.get(name) ?? null;
    }
}

export const EntityRegister = (constructor:  new (...args: any[]) => any) => {
        EntityManager.register(constructor.name, constructor)
}