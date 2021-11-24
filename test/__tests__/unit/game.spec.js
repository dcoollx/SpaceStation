//check if canvas is added to page
/** global it jest test Game */


describe('Game starts up',()=>{
    it.only('starts',()=>{
        const canvas = document.querySelector('canvas');
        expect(canvas).toBeTruthy();
        canvas.focus()
        expect(Game.isBooted).toBeTruthy();
    });
    it('is the right scale',()=>{
        expect(Game.config.width).toBe(1024);
        expect(Game.config.height).toBe(768);
    })
   
});