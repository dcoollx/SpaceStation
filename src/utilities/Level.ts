/// <reference path="../custom.d.ts"/>


import TiledMap, { TiledLayer } from 'tiled-types'
import Player from '../entities/Player';

export default abstract class Level extends Phaser.Scene{
    private mapName:string;
    private level: TiledMap;
    collisionLayer: Phaser.Tilemaps.TilemapLayer;
    map:Phaser.Tilemaps.Tilemap;
    cursors : Phaser.Types.Input.Keyboard.CursorKeys;
    public tileSets: Array<string>
    constructor(level: any, scene_name : string,){
        super({key:scene_name});
        this.mapName = scene_name + '_map';
        this.level = level;
        this.tileSets = [];
       
    }
    preload(){
        this.level.tilesets.forEach(({ name, image, tiles }) =>{
            if(!image){
                // inside a collection of images
                tiles.forEach((tile) =>{
                    this.load.image(name + tile.id, tile.image);
                    return;
                })

            }
            this.load.image(name, encodeURI(image))
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
        this.map.objects.forEach(({name: layerName, ...rest}) => {
            rest.objects.forEach(({ name })=>{
                switch(name){
                    case'player spawn':
                        
                        break;
                }
            })
                
            //this.map.createFromObjects(name,)
        })
        console.log(this.map.layers);
        this.map.setCollisionFromCollisionGroup(true, false, 'Collision')
        this.cameras.main.setBounds(0,0,this.game.scale.width * 3,this.game.scale.height);
        console.log(this.map)
        
    }
}