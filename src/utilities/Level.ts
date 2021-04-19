/// <reference path="../custom.d.ts"/>
import { Path } from 'typescript';
import background from '../assets/Mech_background_tileset_128x128.png';
import Ground_and_walls from '../assets/mech_tileset_16x16.png'
import Shadows from '../assets/shadow_Tileset_16x16.png'
//import test_map from '../../build/assets/testLevel.json';

export default class Level extends Phaser.Scene{
    private mapName:string;
    private level: any;
    map:Phaser.Tilemaps.Tilemap;
    cursors : Phaser.Types.Input.Keyboard.CursorKeys;
    public tileSets: Array<Phaser.Tilemaps.Tileset>
    constructor(level: any, scene_name : string,){
        super({key:scene_name});
        this.mapName = scene_name + '_map';
        this.level = level;
        this.tileSets = [];
        this.map;
    
    }
    preload(){
        this.load.image('Background',background);
        this.load.image('Shadows', Shadows);
        this.load.image('Ground_and_walls',Ground_and_walls);
        this.load.tilemapTiledJSON(this.mapName, this.level);
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.load.tilemapTiledJSON(this.mapName,this.level)
        

    }
    create(){
        this.cameras.main.setBounds(0,0,this.game.scale.width * 3,this.game.scale.height);
        this.map = this.make.tilemap({key:this.mapName});
        this.level.tilesets.forEach((ts:any)=>{
             this.map.addTilesetImage(ts.name, ts.name, ts.tilewidth, ts.tileheight, 0,0,ts.gid);
        });
        console.log(this.map);
        this.level.layers.forEach((layer:Phaser.Tilemaps.LayerData, i:number)=>{
         this.map.createLayer(layer.name,this.map.tilesets, layer.x, layer.y);
        })
        
    }
}