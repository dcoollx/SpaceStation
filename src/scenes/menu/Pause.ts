export default class Pause extends Phaser.Scene{
    constructor(config: any){
        super({key:'pause_menu'});
    }
    preload(){}
    create(){
        const mask = this.add.rectangle(0, 0, this.game.scale.width, this.game.scale.height, 0xff0000,50);
        this.input.keyboard.on('keydown-ESC',()=>{
            this.scene.transition({target:'test_level'});
            console.log('key event')
        })
    }
    update(){}

    
}