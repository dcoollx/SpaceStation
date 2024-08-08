import Phaser from 'phaser';

export default class Menu extends Phaser.Scene{
    constructor(config: any){
        super({key:'main_menu'});
        //good spot to load save files
    }

    preload(){
        this.load.animation('background','https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFvMjJyMmc5aTNsNThlcGE0emh4bnZheXQ5Ynd1dWJ0aHRyMjRzbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5KzrBfcXcLDJm/200.webp');
    }
    create(){
        let image = this.add.image(400,300,'background');
        this.add.text(0,0,'Phasers Deploy ');
    }
}