import Phaser from 'phaser';

export default class Menu extends Phaser.Scene{
    constructor(config: any){
        super({key:'main_menu'});
        //good spot to load save files
    }

    preload(){
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('background','assets/skies/space3.png');
    }
    create(){
        let image = this.add.image(400,300,'background');
        this.add.text(0,0,'Phasers Deploy ');
    }
}