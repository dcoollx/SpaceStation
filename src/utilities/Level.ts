/// <reference path="../custom.d.ts"/>


import TiledMap, { TiledLayer } from 'tiled-types'
import StaticHazard from '../entities/Spike';
import Player from '../entities/Player';
import Spike from '../entities/Spike';
import { Sign } from '../entities/interactables/Sign';
import { Interactable } from './Interactables';

export default abstract class Level extends Phaser.Scene{
    private mapName:string;
    private level: TiledMap;
    collisionLayer: Phaser.Tilemaps.TilemapLayer;
    map:Phaser.Tilemaps.Tilemap;
    player: Player;
    interactables: Interactable[];
    cursors : Phaser.Types.Input.Keyboard.CursorKeys;
    public tileSets: Array<string>
    constructor(level: any, scene_name : string,){
        super({key:scene_name});
        this.mapName = scene_name + '_map';
        this.level = level;
        this.tileSets = [];
        this.interactables = [];
        this.player = null;
    }
    preload(){
        this.level.tilesets.forEach(({ name, image, tiles, tileheight: frameHeight, tilewidth: frameWidth, spacing, firstgid: startFrame }) =>{
            if(!image){
                // inside a collection of images
                tiles.forEach((tile) =>{
                    this.load.image(name + tile.id, tile.image);
                    return;
                })

            }
            this.load.spritesheet(name, encodeURI(image), { frameWidth, frameHeight, spacing, startFrame})
            this.tileSets.push(name);
        })

        this.level.layers.forEach(({name, type, ...rest })=>{
            if(type === 'imagelayer'){
                this.load.image(name, encodeURI((rest as any).image));
            }
        })
       
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.load.tilemapTiledJSON(this.mapName,this.level)
    }
    create(){
        this.map = this.make.tilemap({ key: this.mapName });
        this.tileSets.forEach(tileSet=>{
            this.map.addTilesetImage(tileSet)
        });
        
        this.map.images.forEach(( {x, y, name}) => {
            this.add.image(x,y,name)
        })
        this.map.layers.forEach(layer => {
            this.collisionLayer = this.map.createLayer(layer.name, this.map.tilesets.map(l=>l.name) ).setCollisionByProperty({ isSolid: true});
             
        });
        // this.map.filterObjects('hazards', (obj)=>obj.name === 'spike').forEach(spike=>{
        //     console.log('adding spike', spike)
        //     const hazard = new Spike(this, spike.x, spike.y).setOrigin(0.5,1);
        //     this.physics.add.existing(hazard, true);
        // })
        //interactions
        this.map.getObjectLayer('interactions').objects.forEach(({properties, x, y, gid, type }) =>{
            console.log({properties, x, y, gid, type })
            if(type === 'Sign'){
                const sign = new Sign(this,properties[0].value, x, y, 'prototype',null, gid-2 );
                this.interactables.push(sign);
                this.add.existing(sign);
            };
        });
        console.log(this.map.layers);
        this.map.setCollisionFromCollisionGroup(true, false, 'Collision')
        this.cameras.main.setBounds(0,0,this.game.scale.width * 3,this.game.scale.height);
        console.log(this.map)
        
    }
}