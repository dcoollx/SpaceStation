import Phaser from 'phaser';
import { TestLevel } from '../levels/TestLevel';

export default class Menu extends Phaser.Scene{
    constructor(config: any){
        super({key:'main_menu'});
        //good spot to load save files
    }
    preload(){
    const planeturl = 'rotatingplanet_spritesheet2.png';
    const test = 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFvMjJyMmc5aTNsNThlcGE0emh4bnZheXQ5Ynd1dWJ0aHRyMjRzbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5KzrBfcXcLDJm/200.webp'
        this.load.setBaseURL('assets/')
        this.load.spritesheet('planet',planeturl, { frameWidth: 380, frameHeight: 200, startFrame: 1 });
    }
    create(){
        let image = this.add.sprite(100,100, 'planet')
        const text = this.add.text(0,0,'Phasers Deploy ');
        text.setInteractive()
        text.on('pointerdown', ()=>{
            this.scene.start(TestLevel.levelKey)
        })
        const animation = image.anims.generateFrameNumbers('planet', {start: 1, end: 47 });
        image.anims.create({
            key: 'rotate',
            frames: animation,
            repeat: -1,
            frameRate:24,
            skipMissedFrames: true
        })
        image.anims.play('rotate')
    }
}