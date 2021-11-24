//check if canvas is added to page
/** global it jest test Game */


describe('Game starts up',()=>{
    it('starts',()=>{
        expect(document.querySelector('canvas')).toBeTruthy();
        //expect(window.game.isRunning).toBeTruthy();
    });
    it('is the right scale',()=>{
        expect(Game.config.width).toBe(1024);
        expect(Game.config.height).toBe(768);
    })
   
});