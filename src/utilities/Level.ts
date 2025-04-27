/// <reference path="../custom.d.ts"/>


import TiledMap, { TiledLayer } from 'tiled-types'
import StaticHazard from '../entities/Spike';
import Player from '../entities/Player';
import Spike from '../entities/Spike';
import { Sign } from '../entities/interactables/Sign';
import { Interactable } from './Interactables';
import { Switch } from '../entities/interactables/Switch';
import { Door } from '../entities/interactables/Doors';
import { tiledPropertyfolder } from './tiledPropertyfolder';

export enum Groups {
    interactables= 'interactables',
    solid = 'solid',
}

export default abstract class Level extends Phaser.Scene{
    private mapName:string;
    private level: TiledMap;
    collisionLayer!: Phaser.Tilemaps.TilemapLayer;
    map!:Phaser.Tilemaps.Tilemap;
    player!: Player;
    groups: Record<Groups, Phaser.GameObjects.Group>
    cursors! : Phaser.Types.Input.Keyboard.CursorKeys;
    public background!: Phaser.GameObjects.TileSprite; 
    public tileSets: Array<string>
    constructor(level: any, scene_name : string,){
        super({key:scene_name});
        this.mapName = scene_name + '_map';
        this.level = level;
        this.tileSets = [];
        this.groups = {} as Record<Groups, Phaser.GameObjects.Group>;
        
    }
    preload(){
        this.groups.interactables = this.add.group();
        this.groups.solid =  this.add.group()
        this.level.tilesets.forEach(({ name, image, tiles, tileheight: frameHeight, tilewidth: frameWidth, spacing, firstgid: startFrame }) =>{
            if(!image){
                // inside a collection of images
                tiles!.forEach((tile) =>{
                    this.load.image(name + tile.id, tile.image);
                    return;
                })

            }
            this.load.spritesheet(name, encodeURI(image!), { frameWidth, frameHeight, spacing, startFrame})
            this.tileSets.push(name);
        })

        this.level.layers.forEach(({name, type, ...rest })=>{
            if(type === 'imagelayer'){
                this.load.image(name, encodeURI((rest as any).image));
            }
        })
       
        if(!this.input.keyboard){
            throw new Error('keyboard plugin missing')
        }
        this.cursors = this.input.keyboard.createCursorKeys();
        this.load.tilemapTiledJSON(this.mapName,this.level)
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
        this.map.getObjectLayer('interactions')!.objects.forEach(({properties, id, gid: frame, type, ...rest }) =>{
            console.log({properties, frame, type, ...rest });
            const foldedProperties = tiledPropertyfolder(properties);
            console.log(foldedProperties)
            switch(type){
                case 'Sign':{
                const sign = new Sign(this, id, foldedProperties?.['text'] as string ?? '', {frame, ...rest}, '');
                this.groups.interactables.add(sign, true);
                //this.add.existing(sign);
                break;
            };
            case 'Switch': {
                console.log('controls',properties[0].value );
                const controls = foldedProperties?.['controls'] as number ?? 0
                const button = new Switch(this, id, controls, rest);
                this.groups.interactables.add(button);
                this.add.existing(button);
                break;
            }
            case 'Door': {
                const door = new Door(this, id, foldedProperties?.['isLocked'] as boolean, foldedProperties?.['isOpen'] as boolean, {frame, ...rest},null);
                this.groups.interactables.add(door)
                this.groups.solid.add(door);
                this.add.existing(door);
                break;
            }
            default:{
                console.warn(`encountered an unregistered object in the interaction layer: ${type}`)
            }
        }
        });
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