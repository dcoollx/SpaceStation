import Phaser from 'phaser';
import theme from  '../../assets/Space_Station_Title_Screen.mp3';

export default class Menu extends Phaser.Scene{
    constructor(config: any){
        super({key:'main_menu'});
        //good spot to load save files
    }

    preload(){
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('background','assets/skies/space3.png');
        this.load.audio('theme',theme);
    }
    create(){
        this.sound.play('theme',{loop:true});
        let image = this.add.image(400,300,'background');
        image.setScale(this.game.scale.width, this.game.scale.height)
        const title = this.add.text(this.game.scale.width/2,this.game.scale.height/2,'Space Station ');
        const start = this.add.text(this.game.scale.width/2,title.y + 100,'Start ');
        start.setInteractive();
        const settings = this.add.text(this.game.scale.width/2,title.y + 200,'settings').setInteractive().on('pointerup',()=>{
            console.log('show settings')
        })
        
        start.on('pointerup', ()=>{
            this.scene.transition({ target : 'testLevel', duration: 2000, sleep: true, moveAbove:true})
            this.sound.stopAll();
        })
    }
}