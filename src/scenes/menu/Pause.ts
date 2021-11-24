export default class Pause extends Phaser.Scene{
    constructor(config: any){
        super({key:'pause_menu'});
    }
    preload(){}
    create(){
        const image = this.add.image(Phaser.Math.Between())
    }
    update(){}

    
}