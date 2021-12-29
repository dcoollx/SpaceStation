/* 
    The main menu
    will have options to exit game, adjust settings, and start
*/
import Phaser from 'phaser';
import theme from  '../../assets/Space_Station_Title_Screen.mp3';
import twinkle from '../../assets/twinkle.gif';
import space from '../../assets/1024x1024 Blue Nebula 1.png';

export default class Menu extends Phaser.Scene{
    selectionIndex : number
    selection: Phaser.GameObjects.Text | null;
    options: Phaser.GameObjects.Text[];
    constructor(config: any){
        super({key:'main_menu'});
        this.selectionIndex = 0;
        this.options = [];
        //good spot to load save files
    }

    preload(){
        this.load.audio('theme',theme);
        this.load.image('twinkle',space);
    }
    create(){
        this.sound.play('theme',{loop:true});
        const twinkle = this.add.image(this.scale.width/2, this.scale.height/2, 'twinkle').setOrigin(0.5).setDisplaySize(this.game.scale.width, this.game.scale.height)
        const title = this.add.text(this.game.scale.width/2,this.game.scale.height/2,'Space Station',{fontSize: '46px'});
        title.text = 'Space Station'

        //controls
        const start = this.add.text(this.game.scale.width/2,title.y + 100,'> Start');
        start.setInteractive();
        this.options.push(start);
        this.selection = this.options[this.selectionIndex];
        const settings = this.add.text(this.game.scale.width/2,title.y + 200,'settings').setInteractive().on('pointerup',()=>{
            console.log('show settings')
        });
        this.options.push(settings);
        
        start.on('pointerup', ()=>{
            this.scene.transition({ target : 'testLevel', duration: 2000, sleep: true, moveAbove:true})
            this.sound.stopAll();
        });

        this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,(e:any)=>{
            if(e.key === 'ArrowUp' || e.key == 'ArrowDown'){
                this.options.forEach(o=>{
                    o.text = o.text.replace(/> /g,'');
                });
            
            }
            if(e.key === 'ArrowUp'){
                this.selectionIndex--;
                if(this.selectionIndex < 0)
                    this.selectionIndex = 0;
            }
            if(e.key == 'ArrowDown'){
                this.selectionIndex++;
                if(this.selectionIndex > this.options.length -1)
                    this.selectionIndex = this.options.length -1;
            }
            if(e.key == 'Enter'){
                this.options[this.selectionIndex].emit('pointerup')
            }
            this.selection = this.options[this.selectionIndex];

            if(e.key === 'ArrowUp' || e.key == 'ArrowDown'){
                this.selection.text = '> ' + this.selection.text;
            }
           
        });
    }
    update(){
       
        
        
    }
}