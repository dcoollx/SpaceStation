/// <reference path="../custom.d.ts"/>


import TiledMap, { TiledLayer } from 'tiled-types'
import Player from '../entities/Player';
 import { Door } from '../entities/interactables/Doors';
import { tiledPropertyfolder } from './tiledPropertyfolder';

export default abstract class Level extends Phaser.Scene{
    private mapName:string;
    private level: string;
    collisionLayer!: Phaser.Tilemaps.TilemapLayer;
    map!:Phaser.Tilemaps.Tilemap;
    player!: Player;
    interactables!: Phaser.GameObjects.Group;
    cursors! : Phaser.Types.Input.Keyboard.CursorKeys;
    public background!: Phaser.GameObjects.TileSprite; 
    public tileSets: Array<string>
    levelKey: string;
    constructor(level: string, scene_name : string,){
        super({key:scene_name});
        this.mapName = scene_name + '_map';
        this.level = level;
        this.levelKey = scene_name + '_level';
        this.tileSets = [];
    }
    preload(baseUrl?: string){
        this.load.setBaseURL(baseUrl)
        this.load.json(this.levelKey, this.level)
        this.load.on(`filecomplete-json-${this.levelKey}`, (_: string, _2: unknown, level: TiledMap)=>{
             level.tilesets.forEach(({ name, image, tiles, tileheight: frameHeight, tilewidth: frameWidth, spacing, firstgid: startFrame }) =>{
            if(!image){
                // inside a collection of images
                tiles!.forEach((tile) =>{
                    
                    this.load.image(name + tile.id, tile.image);
                    return;
                })

            }
            this.load.setBaseURL(baseUrl)
            this.load.spritesheet(name, encodeURI(image!), { frameWidth, frameHeight, spacing, startFrame})
            this.tileSets.push(name);
        })

        level.layers.forEach(({name, type, ...rest })=>{
            if(type === 'imagelayer'){
                this.load.image(name, encodeURI((rest as any).image));
            }
        })
         this.load.tilemapTiledJSON(this.mapName,level)
        })
       
        if(!this.input.keyboard){
            throw new Error('keyboard plugin missing')
        }
        this.cursors = this.input.keyboard.createCursorKeys();
       
    }
    create(){
        this.map = this.make.tilemap({ key: this.mapName });
        this.tileSets.forEach(tileSet=>{
            this.map.addTilesetImage(tileSet)
        });


        
        this.map.images.forEach(( {x, y, name, repeatx, parallaxx }) => {
            const image = this.add.tileSprite(x, y, 0,0, name)
            image.setScrollFactor(0,  0 )
            image.setOrigin(0);
            this.background = image;
        })

        this.map.layers.forEach(layer => {
            this.collisionLayer = this.map.createLayer(layer.name, this.map.tilesets.map(l=>l.name) )!.setCollisionByProperty({ isSolid: true});
             
        });
        // this.map.filterObjects('hazards', (obj)=>obj.name === 'spike').forEach(spike=>{
        //     console.log('adding spike', spike)
        //     const hazard = new Spike(this, spike.x, spike.y).setOrigin(0.5,1);
        //     this.physics.add.existing(hazard, true);
        // })
        //interactions
        console.log(this.map.layers);
        this.map.setCollisionFromCollisionGroup(true, false, 'Collision')
        this.cameras.main.setBounds(0,0,this.game.scale.width * 3,this.game.scale.height);
        console.log(this.map)
        
    }

    update(time: number, delta: number): void {
        if(this.background){
            this.background.tilePositionX = this.cameras.main.scrollX * 0.3
        }
        
    }
}